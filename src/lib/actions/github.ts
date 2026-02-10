/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { PROJECTS } from "@/data/projects";

/**
 * Syncs a user's GitHub contribution data (merged PRs and projects)
 * and updates their profile and score in the database.
 */
export async function syncGitHubContribution(userId: string, githubHandle: string) {
    const normalizedHandle = githubHandle.toLowerCase().trim();
    if (!normalizedHandle) return { success: false, error: "No GitHub handle provided" };

    // 1. Ownership & Role check
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("role, id, github, score")
        .eq("id", userId)
        .single();

    if (!profile) return { success: false, error: "Profile not found" };

    // Check if handle is taken by another account
    const { data: existingHandleAccount } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("github", normalizedHandle)
        .neq("id", userId)
        .maybeSingle();

    if (existingHandleAccount) {
        return { success: false, error: "This GitHub handle is already linked to another account." };
    }

    // Admins and Project Admins should NOT have any metrics or be on the leaderboard
    if (profile.role !== "contributor") {
        await supabaseAdmin
            .from("profiles")
            .update({
                score: 0,
                merged_prs: 0,
                projects_count: 0,
                updated_at: new Date().toISOString()
            })
            .eq("id", userId);

        return {
            success: true,
            data: {
                mergedPRs: 0,
                projectsCount: 0,
                score: 0,
                message: "Admins are excluded from stats"
            }
        };
    }

    // 2. Get all project repository identifiers (e.g., "owner/repo")
    // We extract these from the githubRepo URLs in our PROJECTS data
    const competitionRepos = PROJECTS.map(p => {
        try {
            // Remove trailing slash and .git suffix
            const url = p.githubRepo.trim().replace(/\/$/, "").replace(/\.git$/, "");
            const parts = url.split("/");
            if (parts.length >= 2) {
                const owner = parts[parts.length - 2].toLowerCase();
                const repo = parts[parts.length - 1].toLowerCase();
                return `${owner}/${repo}`;
            }
            return null;
        } catch {
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
        const query = `author:${normalizedHandle.replace('@', '')} is:pr is:merged`;
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

        // 3. Filter PRs and Categorize by Difficulty
        let mergedCount = 0;
        const difficultyCounts = { easy: 0, med: 0, hard: 0, exp: 0 };
        const uniqueProjectRepos = new Set<string>();

        for (const pr of allMergedPRs) {
            // Extract owner/repo from repository_url (e.g., "https://api.github.com/repos/owner/repo")
            const prRepoUrl = (pr.repository_url || "").toLowerCase();
            const prRepoSuffix = prRepoUrl.split("/repos/")[1];

            if (prRepoSuffix && competitionRepos.includes(prRepoSuffix)) {
                mergedCount++;

                // Track unique projects
                uniqueProjectRepos.add(prRepoSuffix);

                // Check difficulty labels
                const labels = pr.labels?.map((l: any) => l.name.toLowerCase()) || [];
                
                // Detection logic with expanded keywords
                const isExp = labels.some((l: string) => l.includes("expert") || l.includes("exp") || l.includes("advanced"));
                const isHard = labels.some((l: string) => l.includes("hard") || l.includes("high"));
                const isMed = labels.some((l: string) => l.includes("medium") || l.includes("med") || l.includes("intermediate") || l.includes("mid"));
                const isEasy = labels.some((l: string) => l.includes("easy") || l.includes("beginner") || l.includes("starter"));

                if (isExp) difficultyCounts.exp++;
                else if (isHard) difficultyCounts.hard++;
                else if (isMed) difficultyCounts.med++;
                else if (isEasy) difficultyCounts.easy++;
                else difficultyCounts.easy++; // Default to easy if no recognized level label is found
            }
        }

        const projectsCount = uniqueProjectRepos.size;

        // 4. Calculate Score based on Weighted Difficulty
        // Easy: 10, Medium: 20, Hard: 30, Expert: 50
        const calculatedScore = (difficultyCounts.easy * 10) +
            (difficultyCounts.med * 20) +
            (difficultyCounts.hard * 30) +
            (difficultyCounts.exp * 50);

        // 5. Update Database (Sync counts AND score)
        // We use Math.max to ensure that manual score updates by admins are preserved
        // if the calculated score from GitHub is lower.
        // Also ensure merged_prs and projects_count are updated.
        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                merged_prs: mergedCount,
                projects_count: projectsCount,
                score: Math.max(profile?.score || 0, calculatedScore),
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
                projectsCount: projectsCount,
                difficultyCounts,
                score: calculatedScore
            }
        };


    } catch (error) {
        console.error("Error loading projects:", error); // Updated console.error message
        return { success: false, error: "Configuration Error" }; // Updated error message
    }
}
