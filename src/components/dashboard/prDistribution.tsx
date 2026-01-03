import React from "react";

export default function PRDistribution() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-[420px] hover:border-[#00D6B2]/40 transition-all duration-500 flex flex-col">
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00D6B2]/10 border border-[#00D6B2]/20 flex items-center justify-center shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00D6B2] animate-pulse" />
          </div>
          <div>
            <h3 className="text-white text-xl font-bold tracking-tight">PR Distribution</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] leading-none mt-1">Difficulty level</p>
          </div>
        </div>

        <span className="text-[10px] font-black text-[#00D6B2] bg-[#00D6B2]/10 px-4 py-1.5 rounded-xl border border-[#00D6B2]/20 uppercase tracking-widest">
          0 TOTAL
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-auto pb-6">
        <StatDot color="bg-[#00D6B2]" label="Easy" pts="5" />
        <StatDot color="bg-[#4FD1D0]" label="Medium" pts="10" />
        <StatDot color="bg-amber-400" label="Hard" pts="20" />
        <StatDot color="bg-rose-400" label="Expert" pts="40" />
      </div>
    </div>
  );
}

function StatDot({ color, label, pts }: { color: string; label: string; pts: string }) {
  return (
    <div className="flex flex-col items-center group/dot">
      <div className={`w-3.5 h-3.5 rounded-full ${color} mb-4 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover/dot:scale-125 transition-transform duration-300`} />
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-black text-white tracking-tighter mb-1">0</p>
      <p className="text-[10px] font-black text-[#00D6B2] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{pts} PTS</p>
    </div>
  );
}
