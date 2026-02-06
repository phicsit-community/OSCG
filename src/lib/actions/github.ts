"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { PROJECTS } from "@/data/projects";

/**
 * Syncs a user's GitHub contribution data (merged PRs and projects)
 * and updates their profile and score in the database.
 */
export async function syncGitHubContribution(userId: string, githubHandle: string) {
    if (!githubHandle) return { success: false, error: "No GitHub handle provided" };

    // 1. Get all project repository identifiers (e.g., "owner/repo")
    // We extract these from the githubRepo URLs in our PROJECTS data
    const competitionRepos = PROJECTS.map(p => {
        try {
            const url = p.githubRepo.replace(/\/$/, ""); // remove trailing slash
            const parts = url.split("/");
            if (parts.length >= 2) {
                return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
            }
            return null;
        } catch (e) {
            return null;
        }
    }).filter(Boolean) as string[];

    // 2. Fetch merged PRs for this user from GitHub API
    // We search for PRs authored by the user that are merged.
    // Note: For a real production app, you should use a GITHUB_TOKEN in env
    // to avoid strict rate limits.
    const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

    try {
        // Search Query: PRs by author, merged, in the specific repos if possible, 
        // but a global author search is easier to manage and then filter.
        const query = `author:${githubHandle.replace('@', '')} is:pr is:merged`;
        const searchUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=100`;

        const response = await fetch(searchUrl, {
            headers: GITHUB_TOKEN ? {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            } : {
                Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            const err = await response.json();
            console.error("GitHub API Error:", err);
            return { success: false, error: "GitHub API rate limit or error" };
        }

        const searchData = await response.json();
        const allMergedPRs = searchData.items || [];

        // 3. Filter PRs to only counts those in our competition repos
        const competitionPRs = allMergedPRs.filter((pr: any) => {
            return competitionRepos.some(repo => pr.repository_url.toLowerCase().includes(repo.toLowerCase()));
        });

        const mergedCount = competitionPRs.length;

        // 4. Calculate unique competition projects contributed to
        const uniqueProjectRepos = new Set(
            competitionPRs.map((pr: any) => {
                const parts = pr.repository_url.split("/");
                return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`.toLowerCase();
            })
        );
        const projectsCount = uniqueProjectRepos.size;

        // 5. Update Database (ONLY counts, NEVER the score)
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                merged_prs: mergedCount,
                projects_count: projectsCount,
                updated_at: new Date().toISOString()
            })
            .eq("id", userId);

        if (error) {
            console.error("Database Update Error:", error);
            return { success: false, error: "Failed to update database" };
        }

        return {
            success: true,
            data: {
                mergedPRs: mergedCount,
                projectsCount: projectsCount
            }
        };

    } catch (error) {
        console.error("Sync Error:", error);
        return { success: false, error: "Unexpected error during synchronization" };
    }
}
