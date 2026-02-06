import React, { useState } from "react";
import { Check, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type UnifiedProfileProps = {
    username: string;
    fullName?: string;
    linkedin?: string;
    role?: string;
    score?: number;
};

export default function UnifiedProfile({ username, fullName, linkedin, role, score = 0 }: UnifiedProfileProps) {
    // Extract handle if user pasted a full URL
    const cleanUsername = React.useMemo(() => {
        if (!username) return "";
        if (username.includes("github.com")) {
            return username.split('/').filter(Boolean).pop() || "";
        }
        return username;
    }, [username]);

    const handleSocialClick = (platform: "github" | "linkedin", e: React.MouseEvent) => {
        if (platform === "github" && !cleanUsername) {
            e.preventDefault();
            toast.warning("GitHub not linked", {
                description: "Please connect your GitHub in profile settings.",
            });
        } else if (platform === "linkedin" && !linkedin) {
            e.preventDefault();
            toast.warning("LinkedIn not linked", {
                description: "Please connect your LinkedIn in profile settings.",
            });
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] w-full border border-white/5 overflow-hidden hover:border-[#00D6B2]/20 transition-all duration-500 shadow-2xl group">
            <div className="flex flex-col lg:flex-row h-full">
                {/* ================= LEFT SIDE: PROFILE INFO ================= */}
                <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02]">
                    <div className="relative group/avatar mb-6">
                        <div className="absolute -inset-1 bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] rounded-full blur opacity-20 group-hover/avatar:opacity-40 transition duration-500" />
                        <div className="relative p-1 rounded-full bg-linear-to-br from-white/10 to-transparent">
                            <div className="w-28 h-28 rounded-full overflow-hidden bg-[#0A0F15] flex items-center justify-center border-2 border-white/5 py-8">
                                <Image
                                    src={cleanUsername ? `https://github.com/${cleanUsername}.png` : "/default-avatar.png"}
                                    alt={`${cleanUsername || "User"} avatar`}
                                    width={112}
                                    height={112}
                                    className="object-cover transition duration-500 group-hover/avatar:scale-110"
                                    priority
                                />
                            </div>
                        </div>

                        {cleanUsername && (
                            <div className="absolute bottom-1 right-1 shadow-lg scale-90">
                                <div className="bg-[#00D6B2] p-1.5 rounded-full border-4 border-[#0B0F17]">
                                    <Check className="w-3 h-3 text-white stroke-4" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-center w-full">
                        <h1 className="text-white text-2xl font-black tracking-tighter uppercase leading-tight mb-2 truncate px-2">
                            {fullName || cleanUsername || "Adventurer"}
                        </h1>

                        <div className="flex items-center justify-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5 w-fit mx-auto mb-6">
                            <Github className="w-3 h-3 text-[#00D6B2]" />
                            <span className="text-white/40 text-[11px] font-bold tracking-wider lowercase">
                                {cleanUsername ? `@${cleanUsername}` : "unlinked"}
                            </span>
                        </div>

                        <div className="flex gap-4 justify-center mb-6">
                            <a
                                href={cleanUsername ? `https://github.com/${cleanUsername}` : "#"}
                                target={cleanUsername ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                onClick={(e) => handleSocialClick("github", e)}
                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-[#00D6B2] hover:border-[#00D6B2]/20 hover:bg-[#00D6B2]/5 transition-all duration-300"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href={linkedin || "#"}
                                target={linkedin ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                onClick={(e) => handleSocialClick("linkedin", e)}
                                className="p-3 rounded-xl cursor-pointer bg-white/5 border border-white/10 text-white/40 hover:text-[#00D6B2] hover:border-[#00D6B2]/20 hover:bg-[#00D6B2]/5 transition-all duration-300"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="flex gap-2 justify-center mb-8">
                            <span className="bg-[#00D6B2]/10 text-[#00D6B2] text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border border-[#00D6B2]/10">
                                {role === 'project-admin' ? 'Project Admin' : 'Contributor'}
                            </span>
                            <span className="bg-white/5 text-white/40 text-[10px] px-3 py-1 rounded-lg flex items-center gap-1.5 border border-white/10 font-bold uppercase tracking-widest">
                                Verified
                            </span>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT SIDE: RANK INFO ================= */}
                <div className="w-full lg:w-3/5 p-6 md:p-8 flex flex-col h-full justify-center">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <StatCard title="Current Rank" value="#--" sub="Top 100%" />
                        <StatCard title="Day Streak" value="0" sub="days" />
                        <StatCard title="Total Points" value={score.toString()} sub="verified" />
                    </div>

                    <div className="flex flex-col gap-4 grow">
                        {/* Progress Bar Group */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors flex flex-col justify-center grow">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-white/70 font-bold text-[10px] uppercase tracking-widest">
                                    Progress to Next Rank
                                </h2>
                                <span className="text-[10px] font-bold text-[#00D6B2] uppercase tracking-wider">200 pts to go</span>
                            </div>

                            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full w-[5%] bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] rounded-full shadow-[0_0_10px_rgba(0,214,178,0.3)] transition-all duration-500"
                                    style={{ width: '5%' }}
                                />
                            </div>

                            <div className="flex justify-between text-[10px] font-bold text-white/40 mt-3 uppercase tracking-tighter">
                                <span>0.0% complete</span>
                                <span className="text-white/60">Rank #30</span>
                            </div>
                        </div>

                        {/* Contribution Graph Group */}
                        <div className="flex flex-col justify-center grow relative h-full min-h-[160px] w-full group/graph">
                            {/* LIVE SYNC Badge - Top Right */}
                            <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md bg-[#00D6B2]/10 border border-[#00D6B2]/20 backdrop-blur-md transition-opacity duration-300">
                                <span className="text-[#00D6B2] text-[9px] font-bold uppercase tracking-wider block leading-none">Live Sync</span>
                            </div>

                            {/* Label - Bottom Left */}
                            <div className="absolute bottom-2 left-2 z-10">
                                <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                                    Contribution Matrix
                                </p>
                            </div>

                            {/* Graph Container */}
                            <div className="relative w-full h-full flex items-center justify-center p-2">
                                {cleanUsername ? (
                                    /* using standard img tag with pure inversion for accurate GitHub Dark colors */
                                    <img
                                        src={`https://github-contributions-api.deno.dev/${cleanUsername}.svg`}
                                        alt="Contribution Graph"
                                        className="w-full h-full object-contain filter invert hue-rotate-180"
                                    />
                                ) : (
                                    <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest border border-dashed border-white/10 rounded-lg p-4 w-full text-center">
                                        Link GitHub to view
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ===== Small reusable pieces ===== */

function StatCard({
    title,
    value,
    sub,
}: {
    title: string;
    value: string;
    sub: string;
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/8 h-full flex flex-col justify-center">
            <p className="text-[9px] font-bold text-white/40 mb-1 uppercase tracking-widest leading-none">{title}</p>
            <p className="text-xl font-black text-white tracking-tighter mt-1">{value}</p>
            <p className="text-[9px] font-bold text-[#00D6B2] uppercase tracking-wider mt-0.5">{sub}</p>
        </div>
    );
}

function Metric({ label, value, color = "text-white" }: { label: string; value: string, color?: string }) {
    return (
        <div>
            <p className="text-[9px] font-bold text-white/40 mb-1 uppercase tracking-widest leading-none">{label}</p>
            <p className={`text-2xl font-black ${color} tracking-tighter`}>{value}</p>
        </div>
    );
}
