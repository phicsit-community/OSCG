import React from "react";
import { Sparkles, Lock } from "lucide-react";

const ACHIEVEMENTS = Array.from({ length: 6 });

export default function Achievements() {
  return (
    <div className="w-full">
      {/* Card */}
      <div
        className="relative rounded-2xl p-5
                   bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617]
                   border border-[#1e293b]"
      >
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-white font-semibold">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Your Achievements
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Unlock badges and milestones as you contribute
            </p>
          </div>

          <span className="text-xs text-gray-400 bg-[#0b1220]/80 px-2.5 py-1 rounded-full border border-[#1e293b]">
            0/6 unlocked
          </span>
        </div>

        {/* Achievement Tiles */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((_, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl
                         bg-[#0b1220]/80
                         border border-[#1e293b]
                         flex flex-col items-center justify-center
                         text-gray-500"
            >
              <Lock className="w-5 h-5 mb-1 opacity-70" />
              <span className="text-[10px]">???</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
