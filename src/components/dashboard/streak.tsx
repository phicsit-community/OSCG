import React from "react";
import { Flame } from "lucide-react";

export default function Streak() {
  return (
    <div className="bg-[#151b2d] rounded-3xl p-5 w-full shadow-2xl border border-[#1e293b] h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">🔥</div>
        <div>
          <h1 className="text-white text-lg font-bold">Streak</h1>
          <p className="text-gray-400 text-xs">Keep it going!</p>
        </div>
      </div>

      {/* Current Streak Card */}
      <div className="bg-[#1e293b] rounded-xl p-4 mb-3 border border-[#2d3748]">
        <p className="text-gray-400 text-xs mb-2">Current Streak</p>
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-white text-4xl font-bold">0</span>
          <span className="text-gray-300 text-lg">days</span>
        </div>
        <p className="text-gray-500 text-xs italic">No active streak</p>
      </div>

      {/* Best Streak Card */}
      <div className="bg-[#1e293b] rounded-xl p-4 mb-4 border border-[#2d3748]">
        <p className="text-gray-400 text-xs mb-2">Best Streak</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-white text-4xl font-bold">0</span>
          <span className="text-gray-300 text-lg">days</span>
        </div>
      </div>

      {/* Contribution Range */}
      <div className="text-gray-400 text-xs">
        <p className="mb-0.5">Contribution Range</p>
        <p className="text-gray-300 font-mono text-xs">Start: Jan 1, 2026</p>
      </div>
    </div>
  );
}
