import React from "react";
import { GitPullRequest, Bug, GitCommit, Folder, Eye } from "lucide-react";

export default function ImpactOverview() {
  return (
    <div className="w-full h-full">
      {/* Main Card */}
      <div
        className="relative rounded-2xl p-5 h-full
                   bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617]
                   border border-[#1e293b]"
      >
        {/* Dotted border overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-sky-500/40" />

        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Impact Overview
            </h3>
            <p className="text-xs text-gray-400">Your contribution metrics</p>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Eye className="w-3.5 h-3.5" />
            22 views
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={<GitPullRequest className="w-4 h-4 text-emerald-400" />}
            value="0"
            label="Pull Requests"
            sub="0 total"
          />

          <MetricCard
            icon={<Bug className="w-4 h-4 text-rose-400" />}
            value="0"
            label="Issues Closed"
            sub="0 open"
          />

          <MetricCard
            icon={<GitCommit className="w-4 h-4 text-indigo-400" />}
            value="0"
            label="Commits"
            sub="all time"
          />

          <MetricCard
            icon={<Folder className="w-4 h-4 text-yellow-400" />}
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
    <div
      className="relative rounded-xl p-3
                 bg-[#0b1220]/80
                 border border-[#1e293b]
                 flex flex-col gap-1.5"
    >
      {/* Icon */}
      <div
        className="w-6 h-6 rounded-lg bg-[#020617] border border-[#1e293b]
                      flex items-center justify-center"
      >
        {icon}
      </div>

      {/* Value */}
      <div className="text-xl font-bold text-white">{value}</div>

      {/* Label */}
      <div>
        <p className="text-xs text-gray-300 font-medium">{label}</p>
        <p className="text-[10px] text-gray-500">{sub}</p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-2.5 right-2.5 text-gray-500 text-xs">↗</div>
    </div>
  );
}
