import React from "react";
import { TrendingUp, Star, Trophy } from "lucide-react";

export default function RankProgress() {
  return (
    <div className="w-full rounded-3xl border border-[#1e293b] bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617] shadow-2xl p-5 h-full">
      {/* ===== TOP STATS ROW ===== */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard title="Current Rank" value="#50" sub="Top 100%" />
        <StatCard title="Day Streak" value="0" sub="days" />
        <StatCard title="Points" value="0 / 200" sub="to next rank" />
      </div>

      {/* ===== NEXT RANK ===== */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-white font-semibold text-xs tracking-wide">
            Progress to Next Rank
          </h2>
          <span className="text-[10px] text-sky-400">200 pts to go</span>
        </div>

        {/* Slim progress bar */}
        <div className="h-1.5 rounded-full bg-[#1e293b] overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" />
        </div>

        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0.0% complete</span>
          <span>Rank #30</span>
        </div>
      </div>

      {/* ===== ULTIMATE TARGET ===== */}
      <div className="rounded-xl border border-[#1e293b] bg-[#0b1220]/80 p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <h3 className="text-white font-semibold text-xs">
            Ultimate Target · Rank #1
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-2">
          <Metric label="Progress" value="0.0%" />
          <Metric label="Points Needed" value="2055" />
        </div>

        <div className="h-1 rounded-full bg-[#020617] overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-indigo-500 to-sky-500" />
        </div>
      </div>

      {/* ===== CURRENT RANK ===== */}
      <div className="flex items-center gap-3 rounded-xl border border-[#1e293b] bg-[#0b1220]/80 p-3">
        <div className="text-2xl">🏆</div>
        <div>
          <h3 className="text-white text-sm font-bold">Rank #50+</h3>
          <p className="text-[10px] text-gray-400">Top 100% of contributors</p>
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
    <div className="rounded-xl border border-[#1e293b] bg-[#0b1220]/80 p-3">
      <p className="text-[10px] text-gray-400 mb-0.5">{title}</p>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-[10px] text-gray-500">{sub}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
