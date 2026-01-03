import React from "react";
import { Sparkles, Lock } from "lucide-react";

const ACHIEVEMENTS = Array.from({ length: 6 });

export default function Achievements() {
  return (
    <div className="w-full">
      {/* Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300 cursor-pointer">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 text-xl text-white font-bold tracking-tight">
              <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
              Achievements
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
              Unlock badges and milestones as you contribute
            </p>
          </div>

          <span className="text-[10px] font-bold text-white/70 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-wider">
            0/6 Unlocked
          </span>
        </div>

        {/* Achievement Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {ACHIEVEMENTS.map((_, idx) => (
            <div
              key={idx}
              className="group/ach aspect-square rounded-2xl
                         bg-white/5
                         border border-white/10
                         flex flex-col items-center justify-center
                         transition-all duration-300 hover:bg-[#00D6B2]/5 hover:border-[#00D6B2]/30"
            >
              <div className="p-3 rounded-full bg-white/5 mb-2 group-hover/ach:bg-[#00D6B2]/10 transition-colors">
                <Lock className="w-5 h-5 text-white/20 group-hover/ach:text-[#00D6B2] transition-colors" />
              </div>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] group-hover/ach:text-white/40 transition-colors">Locked</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
