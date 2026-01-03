"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Achievements from "@/components/dashboard/achievments";
import ReadyToContribute from "@/components/dashboard/contribute";
import ContributionActivity from "@/components/dashboard/contribution";
import ImpactOverview from "@/components/dashboard/impact";
import PRDistribution from "@/components/dashboard/prDistribution";
import ProfileCard from "@/components/dashboard/profileCard";
import RankProgress from "@/components/dashboard/rankProgress";
import Streak from "@/components/dashboard/streak";
import TechStack from "@/components/dashboard/techStack";

import { toast } from "sonner";

const DashboardPage = () => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("github_username")
                        .eq("id", session.user.id)
                        .single();

                    if (profile?.github_username) {
                        setUsername(profile.github_username);
                    } else {
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

        getProfile();
    }, []);

    return (
        <div className="space-y-8 mt-15 animate-in fade-in duration-700 w-full max-w-full">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        <span className="bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] bg-clip-text text-transparent transition-all duration-500 hover:tracking-tight">
                            Dashboard
                        </span>
                    </h1>
                    <p className="text-white/40 text-base font-bold uppercase tracking-[0.3em] max-w-3xl leading-relaxed">
                        Track your open source journey · Build your legacy
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00D6B2] animate-pulse shadow-[0_0_12px_#00D6B2]" />
                        <span className="text-xs font-bold text-white/60 uppercase tracking-[0.2em]">Real-time Status</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ProfileCard username={username} />
                <RankProgress />
                <Streak />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechStack />
                <PRDistribution />
            </div>

            <ContributionActivity username={username} />

            <Achievements />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                <ImpactOverview />
                <ReadyToContribute />
            </div>
        </div>
    );
};

export default DashboardPage;
