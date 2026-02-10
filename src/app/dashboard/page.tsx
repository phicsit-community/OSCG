/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Achievements from "@/components/dashboard/achievments";
import ProfileCard from "@/components/dashboard/profileCard";
import UnifiedProfile from "@/components/dashboard/UnifiedProfile";
import UnifiedMetrics from "@/components/dashboard/UnifiedMetrics";
import ProjectAdminSection from "@/components/dashboard/ProjectAdminSection";

import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { syncGitHubContribution } from "@/lib/actions/github";

const DashboardPage = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [role, setRole] = useState("contributor");
    const [mergedPRs, setMergedPRs] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [score, setScore] = useState(0);
    const [difficultyCounts, setDifficultyCounts] = useState<Record<string, number>>({ easy: 0, med: 0, hard: 0, exp: 0 });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let channel: any;

        async function getProfileAndSync() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    // Set up Real-time Profile Updates (for manual admin score changes)
                    channel = supabase
                        .channel(`dashboard_profile_${user.id}`)
                        .on(
                            "postgres_changes",
                            {
                                event: "UPDATE",
                                schema: "public",
                                table: "profiles",
                                filter: `id=eq.${user.id}`
                            },
                            (payload) => {
                                const updatedProfile = payload.new;
                                if (updatedProfile) {
                                    if (updatedProfile.score !== undefined) setScore(updatedProfile.score);
                                    if (updatedProfile.merged_prs !== undefined) setMergedPRs(updatedProfile.merged_prs);
                                    if (updatedProfile.projects_count !== undefined) setProjectsCount(updatedProfile.projects_count);
                                    if (updatedProfile.role) setRole(updatedProfile.role);
                                }
                            }
                        )
                        .subscribe();

                    // 1. Initial Profile Fetch
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("github, full_name, linkedin, role, merged_prs, projects_count, score")
                        .eq("id", user.id)
                        .single();

                    if (profile) {
                        if (profile.github) setUsername(profile.github);
                        if (profile.full_name) setFullName(profile.full_name);
                        if (profile.linkedin) setLinkedin(profile.linkedin);
                        if (profile.role) setRole(profile.role);

                        // Set Initial Metrics
                        setMergedPRs(profile.merged_prs || 0);
                        setProjectsCount(profile.projects_count || 0);
                        setScore(profile.score || 0);

                        // 2. Background Sync (Lazy Sync)
                        if (profile.github) {
                            const result = await syncGitHubContribution(user.id, profile.github);

                            if (result.success && result.data) {
                                setMergedPRs(result.data.mergedPRs);
                                setProjectsCount(result.data.projectsCount);
                                if (result.data.score !== undefined) {
                                    setScore(result.data.score);
                                }
                                if (result.data.difficultyCounts) {
                                    setDifficultyCounts(result.data.difficultyCounts as any);
                                }
                            }
                        }
                    }
                    else {
                        toast.warning("GitHub profile not found", {
                            description: "Please connect your GitHub in profile settings to track contributions.",
                            duration: 5000,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        getProfileAndSync();

        return () => {
            if (channel) supabase.removeChannel(channel);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#00D6B2] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 mt-10 animate-in fade-in duration-700 w-full max-w-full pb-20">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tightest mb-4 leading-none">
                        <span className="bg-linear-to-r from-[#00D6B2] via-[#4FD1D0] to-[#00D6B2] bg-clip-text text-transparent transition-all duration-500">
                            {role === 'project-admin' ? 'Project Admin Console' : 'Your Dashboard'}
                        </span>
                    </h1>
                    <p className="text-white/30 text-base md:text-lg font-medium max-w-3xl leading-relaxed">
                        {role === 'project-admin'
                            ? 'Lead the community, manage contributor impact, and drive project success.'
                            : 'Track your open source contributions, scores, and global rankings.'}
                    </p>
                </div>


            </div>

            {role === 'project-admin' ? (
                <div className="space-y-16">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
                        <div className="w-full max-w-md shrink-0">
                            <ProfileCard username={username} fullName={fullName} linkedin={linkedin} role={role} />
                        </div>

                        <div className="w-full max-w-xl">
                            <div className="bg-amber-400/10 border border-amber-400/20 rounded-[3rem] p-8 md:p-10 relative overflow-hidden group hover:border-amber-400/40 transition-all duration-500 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <AlertCircle className="w-32 h-32 text-amber-400 -rotate-12" />
                                </div>

                                <div className="flex items-center gap-5 mb-10 relative z-10">
                                    <div className="p-4 rounded-[1.25rem] bg-amber-400/20 border border-amber-400/30">
                                        <AlertCircle className="w-7 h-7 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-amber-400 font-black text-lg md:text-xl leading-none">Maintenance Protocol</h4>
                                    </div>
                                </div>

                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-3">
                                        <h5 className="text-white font-black text-sm md:text-base uppercase tracking-tight flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            Unified Labeling
                                        </h5>
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium pl-4">
                                            Apply difficulty labels (<span className="text-amber-400 font-bold uppercase italic tracking-tighter">easy, med, hard, expert</span>) to both **Issues** and **PRs**.
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-8 border-t border-white/5">
                                        <h5 className="text-white font-black text-sm md:text-base uppercase tracking-tight flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            Intelligent Sync
                                        </h5>
                                        <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium pl-4">
                                            Link PRs to Issues (e.g., &quot;Fixes #123&quot;). The system will automatically fetch the highest difficulty level detected.
                                        </p>
                                    </div>
                                </div>

                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/5 rounded-full blur-[80px] pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/5">
                        <ProjectAdminSection />
                    </div>
                </div>
            ) : (

                <>
                    <div className="w-full">
                        <UnifiedProfile
                            username={username}
                            fullName={fullName}
                            linkedin={linkedin}
                            role={role}
                            score={score}
                        />
                    </div>
                    <Achievements mergedPRs={mergedPRs} projectsCount={projectsCount} />
                    <div className="w-full">
                        <UnifiedMetrics
                            mergedPRs={mergedPRs}
                            projectsCount={projectsCount}
                            difficultyCounts={difficultyCounts as any}
                        />
                    </div>


                </>
            )}
        </div>
    );
};

export default DashboardPage;
