import React from "react";

export default function PRDistribution() {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 w-full border border-white/5 min-h-[480px] h-full hover:border-[#00D6B2]/20 transition-all duration-500 flex flex-col cursor-pointer shadow-2xl relative overflow-hidden group">
      {/* Decorative background glow */}
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
          0 TOTAL
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-7 relative z-10 px-2">
        <DistributionBar label="Easy" color="bg-[#00D6B2]" percentage={0} pts="5" />
        <DistributionBar label="Medium" color="bg-[#4FD1D0]" percentage={0} pts="10" />
        <DistributionBar label="Hard" color="bg-amber-400" percentage={0} pts="20" />
        <DistributionBar label="Expert" color="bg-rose-500" percentage={0} pts="40" />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5 relative z-10">
        <StatDot color="bg-[#00D6B2]" label="Easy" count="0" />
        <StatDot color="bg-[#4FD1D0]" label="Med" count="0" />
        <StatDot color="bg-amber-400" label="Hard" count="0" />
        <StatDot color="bg-rose-500" label="Exp" count="0" />
      </div>
    </div>
  );
}

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
