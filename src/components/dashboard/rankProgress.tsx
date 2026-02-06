import React from "react";
import { Star } from "lucide-react";

export default function RankProgress() {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 h-full hover:border-[#00D6B2]/40 transition-all duration-300 cursor-pointer">
      {/* ===== TOP STATS ROW ===== */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard title="Current Rank" value="#50" sub="Top 100%" />
        <StatCard title="Day Streak" value="0" sub="days" />
        <StatCard title="Points" value="0 / 200" sub="to next rank" />
      </div>


      {/* ===== ULTIMATE TARGET ===== */}
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent p-4 mb-4">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-yellow-400/10">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
          <h3 className="text-white font-bold text-xs uppercase tracking-wider">
            Ultimate Target · Rank #1
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <Metric label="Progress" value="0.0%" color="text-[#00D6B2]" />
          <Metric label="Points Needed" value="2055" color="text-[#4FD1D0]" />
        </div>

        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-0 bg-linear-to-r from-[#00D6B2] to-[#4FD1D0]" />
        </div>
      </div>

      {/* ===== CURRENT RANK FOOTER ===== */}
      <div className="flex items-center gap-4 rounded-2xl border border-[#00D6B2]/20 bg-[#00D6B2]/5 p-4 transition-all hover:bg-[#00D6B2]/10">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#00D6B2] to-[#4FD1D0] text-2xl shadow-[0_0_15px_rgba(0,214,178,0.2)]">
          🏆
        </div>
        <div>
          <h3 className="text-white text-base font-black tracking-tight">Rank #50+</h3>
          <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Top 100% of contributors</p>
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/8">
      <p className="text-[9px] font-bold text-white/40 mb-1 uppercase tracking-widest leading-none">{title}</p>
      <p className="text-xl font-black text-white tracking-tighter">{value}</p>
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
