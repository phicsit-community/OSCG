import React from "react";

export default function PRDistribution() {
  return (
    <div
      className="relative w-full h-full rounded-2xl p-5
                 bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617]
                 border border-[#1e293b]
                 shadow-[0_0_35px_rgba(59,130,246,0.15)]"
    >
      {/* Glow Border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-sky-500/30" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-sm">PR Distribution</h3>
          <p className="text-xs text-gray-400 mt-0.5">By difficulty level</p>
        </div>

        <span className="text-xs text-gray-300 bg-[#0b1220]/80 px-2.5 py-1 rounded-full border border-[#1e293b]">
          0 total
        </span>
      </div>

      {/* Distribution */}
      <div className="flex justify-between text-center mt-8">
        <StatDot color="bg-emerald-400" label="Easy" />
        <StatDot color="bg-sky-400" label="Medium" />
        <StatDot color="bg-amber-400" label="Hard" />
        <StatDot color="bg-rose-400" label="Expert" />
      </div>
    </div>
  );
}

/* ---------- Small piece ---------- */

function StatDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`w-2.5 h-2.5 rounded-full ${color} mb-2`} />
      <p className="text-xs text-gray-300 font-medium">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">0</p>
      <p className="text-[10px] text-gray-600">0 pts</p>
    </div>
  );
}
