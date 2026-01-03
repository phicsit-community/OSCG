import React from "react";
import { Calendar } from "lucide-react";

export default function Streak() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00D6B2]/10 border border-[#00D6B2]/20 text-2xl shadow-lg">
          🔥
        </div>
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight">Streak</h1>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Keep it going!</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current Streak Card */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 group hover:bg-white/8 transition-all">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Current Streak</p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-white text-5xl font-black tracking-tighter group-hover:text-[#00D6B2] transition-colors">0</span>
            <span className="text-white/40 text-lg font-bold uppercase tracking-wider">Days</span>
          </div>
          <p className="text-[#00D6B2]/60 text-[10px] font-bold uppercase tracking-wider italic">No active streak</p>
        </div>

        {/* Best Streak Card */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 group hover:bg-white/8 transition-all">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Best Streak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-white text-5xl font-black tracking-tighter group-hover:text-[#4FD1D0] transition-colors">0</span>
            <span className="text-white/40 text-lg font-bold uppercase tracking-wider">Days</span>
          </div>
        </div>
      </div>

      {/* Contribution Range */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-1.5">Contribution Range</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
          <Calendar className="w-3 h-3 text-[#00D6B2]" />
          <p className="text-white/60 font-mono text-[10px] font-bold">JAN 1, 2026</p>
        </div>
      </div>
    </div>
  );
}
