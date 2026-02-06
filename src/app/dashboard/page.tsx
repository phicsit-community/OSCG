"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Achievements from "@/components/dashboard/achievments";
import ProfileCard from "@/components/dashboard/profileCard";
import UnifiedProfile from "@/components/dashboard/UnifiedProfile";
import UnifiedMetrics from "@/components/dashboard/UnifiedMetrics";
import ProjectAdminSection from "@/components/dashboard/ProjectAdminSection";

import { toast } from "sonner";

const DashboardPage = () => {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [role, setRole] = useState("contributor");
    const [mergedPRs, setMergedPRs] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [score, setScore] = useState(0);
    const [difficultyCounts, setDifficultyCounts] = useState({ easy: 0, med: 0, hard: 0, exp: 0 });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfileAndSync() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
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
                            const { syncGitHubContribution } = await import("@/lib/actions/github");
                            const result = await syncGitHubContribution(user.id, profile.github);

                            if (result.success && result.data) {
                                setMergedPRs(result.data.mergedPRs);
                                setProjectsCount(result.data.projectsCount);
                                if (result.data.difficultyCounts) {
                                    setDifficultyCounts(result.data.difficultyCounts);
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
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#00D6B2] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-15 animate-in fade-in duration-700 w-full max-w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        <span className="bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] bg-clip-text text-transparent transition-all duration-500 hover:tracking-tight">
                            {role === 'project-admin' ? 'Project Admin Console' : 'Dashboard'}
                        </span>
                    </h1>
                    <p className="text-white/40 text-base font-semibold max-w-3xl leading-relaxed">
                        {role === 'project-admin'
                            ? 'Lead the community · Manage project impact'
                            : 'Track your open source journey'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00D6B2] animate-pulse shadow-[0_0_12px_#00D6B2]" />
                        <span className="text-xs font-bold text-white/60 uppercase tracking-[0.2em]">Real-time Status</span>
                    </div>
                </div>
            </div>

            {role === 'project-admin' ? (
                <div className="space-y-10">
                    <div className="max-w-md mx-auto">
                        <ProfileCard username={username} fullName={fullName} linkedin={linkedin} role={role} />
                    </div>

                    <div className="pt-8 border-t border-white/5">
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
                            difficultyCounts={difficultyCounts}
                        />
                    </div>


                </>
            )}
        </div>
    );
};

export default DashboardPage;
