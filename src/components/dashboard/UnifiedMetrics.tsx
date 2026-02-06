import React from "react";
import { GitPullRequest, Bug, GitCommit, Folder, Eye } from "lucide-react";

export default function UnifiedMetrics({
    mergedPRs = 0,
    projectsCount = 0,
    difficultyCounts = { easy: 0, med: 0, hard: 0, exp: 0 }
}: {
    mergedPRs?: number;
    projectsCount?: number;
    difficultyCounts?: { easy: number; med: number; hard: number; exp: number };
}) {
    // Calculate Percentages for the distribution bars
    const total = mergedPRs || 1; // avoid divide by zero
    const getPercent = (count: number) => (count / total) * 100;

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] w-full border border-white/5 overflow-hidden hover:border-[#00D6B2]/20 transition-all duration-500 shadow-2xl group">
            <div className="flex flex-col lg:flex-row">

                <div className="w-full lg:w-3/5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#4FD1D0]/10 blur-[100px] rounded-full group-hover:bg-[#4FD1D0]/20 transition-colors duration-700" />

                    <div className="flex items-start justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#00D6B2]/10 border border-[#00D6B2]/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00D6B2] animate-pulse shadow-[0_0_12px_#00D6B2]" />
                            </div>
                            <div>
                                <h3 className="text-white text-xl font-black tracking-tight">PR Distribution</h3>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] leading-none mt-1">Difficulty level</p>
                            </div>
                        </div>

                        <span className="text-[10px] font-black text-[#00D6B2] bg-[#00D6B2]/10 px-4 py-2 rounded-xl border border-[#00D6B2]/10 uppercase tracking-widest shadow-inner">
                            {mergedPRs} TOTAL
                        </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-7 relative z-10 px-2 min-h-[240px]">
                        <DistributionBar label="Easy" color="bg-[#00D6B2]" percentage={getPercent(difficultyCounts.easy)} pts="5" />
                        <DistributionBar label="Medium" color="bg-[#4FD1D0]" percentage={getPercent(difficultyCounts.med)} pts="10" />
                        <DistributionBar label="Hard" color="bg-amber-400" percentage={getPercent(difficultyCounts.hard)} pts="20" />
                        <DistributionBar label="Expert" color="bg-rose-500" percentage={getPercent(difficultyCounts.exp)} pts="40" />
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5 relative z-10">
                        <StatDot color="bg-[#00D6B2]" label="Easy" count={difficultyCounts.easy.toString()} />
                        <StatDot color="bg-[#4FD1D0]" label="Med" count={difficultyCounts.med.toString()} />
                        <StatDot color="bg-amber-400" label="Hard" count={difficultyCounts.hard.toString()} />
                        <StatDot color="bg-rose-500" label="Exp" count={difficultyCounts.exp.toString()} />
                    </div>
                </div>


                <div className="w-full lg:w-2/5 p-6 md:p-8 bg-white/2">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-white text-xl font-bold tracking-tight">Impact Overview</h3>
                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Your contribution metrics</p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                            <Eye className="w-3.5 h-3.5 text-[#00D6B2]" />
                            Live Sync
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-start">
                        <MetricCard
                            icon={<GitPullRequest className="w-5 h-5 text-[#00D6B2]" />}
                            value={mergedPRs.toString()}
                            label="Pull Requests"
                            sub={`${mergedPRs} merged`}
                        />

                        <MetricCard
                            icon={<Bug className="w-5 h-5 text-rose-400" />}
                            value="0"
                            label="Issues Closed"
                            sub="0 open"
                        />

                        <MetricCard
                            icon={<GitCommit className="w-5 h-5 text-[#4FD1D0]" />}
                            value="--"
                            label="Commits"
                            sub="all time"
                        />

                        <MetricCard
                            icon={<Folder className="w-5 h-5 text-yellow-400" />}
                            value={projectsCount.toString()}
                            label="Projects"
                            sub="contributed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ===== Reusable Components ===== */

function DistributionBar({ label, color, percentage, pts }: { label: string; color: string; percentage: number; pts: string }) {
    return (
        <div className="space-y-2 group/bar">
            <div className="flex justify-between items-end px-1">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] group-hover/bar:text-[#00D6B2] transition-colors">{label}</span>
                <span className="text-[9px] font-black text-white/20 tracking-widest uppercase">{pts} PTS</span>
            </div>
            <div className="h-2.5 w-full bg-white/2 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,214,178,0.2)]`}
                    style={{ width: `${Math.max(percentage, 2)}%` }}
                />
            </div>
        </div>
    );
}

function StatDot({ color, label, count }: { color: string; label: string; count: string }) {
    return (
        <div className="flex flex-col items-center group/dot">
            <div className={`w-2 h-2 rounded-full ${color} mb-3 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover/dot:scale-150 transition-transform duration-500`} />
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-2xl font-black text-white tracking-tighter group-hover/dot:text-[#00D6B2] transition-colors">{count}</p>
        </div>
    );
}

function MetricCard({
    icon,
    value,
    label,
    sub,
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
    sub: string;
}) {
    return (
        <div className="group/metric relative rounded-2xl p-5 bg-white/5 border border-white/10 flex flex-col gap-3 hover:bg-white/8 hover:border-white/20 transition-all h-full justify-center">
            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/metric:scale-110 transition-transform">
                {icon}
            </div>

            <div>
                {/* Value */}
                <div className="text-2xl font-black text-white tracking-tighter mb-1">{value}</div>

                {/* Label */}
                <div>
                    <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mb-0.5">{label}</p>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{sub}</p>
                </div>
            </div>

            {/* Arrow indicator */}
            <div className="absolute top-4 right-4 text-white/10 group-hover/metric:text-[#00D6B2] transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
