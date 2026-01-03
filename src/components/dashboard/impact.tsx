import React from "react";
import { GitPullRequest, Bug, GitCommit, Folder, Eye } from "lucide-react";

export default function ImpactOverview() {
  return (
    <div className="w-full h-full">
      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-white text-xl font-bold tracking-tight">Impact Overview</h3>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Your contribution metrics</p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/10">
            <Eye className="w-3.5 h-3.5 text-[#00D6B2]" />
            22 Views
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<GitPullRequest className="w-5 h-5 text-[#00D6B2]" />}
            value="0"
            label="Pull Requests"
            sub="0 total"
          />

          <MetricCard
            icon={<Bug className="w-5 h-5 text-rose-400" />}
            value="0"
            label="Issues Closed"
            sub="0 open"
          />

          <MetricCard
            icon={<GitCommit className="w-5 h-5 text-[#4FD1D0]" />}
            value="0"
            label="Commits"
            sub="all time"
          />

          <MetricCard
            icon={<Folder className="w-5 h-5 text-yellow-400" />}
            value="0"
            label="Projects"
            sub="contributed"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- small reusable card ---------- */

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
    <div className="group/metric relative rounded-2xl p-5 bg-white/5 border border-white/10 flex flex-col gap-3 hover:bg-white/8 hover:border-white/20 transition-all">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/metric:scale-110 transition-transform">
        {icon}
      </div>

      <div>
        {/* Value */}
        <div className="text-3xl font-black text-white tracking-tighter mb-1">{value}</div>

        {/* Label */}
        <div>
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{sub}</p>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 text-white/10 group-hover/metric:text-[#00D6B2] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
