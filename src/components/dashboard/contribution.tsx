import React from "react";
import Image from "next/image";

export default function ContributionActivity({
  username,
}: {
  username: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-bold tracking-tight">Contribution Activity</h3>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
          Track your daily contributions and build your streak
        </p>
      </div>

      {/* Activity Matrix */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 group hover:bg-white/8 transition-all">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-white text-sm font-bold tracking-tight mb-1">
              Activity Matrix
            </p>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-none">
              Public GitHub contribution graph
            </p>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#00D6B2]/10 border border-[#00D6B2]/20">
            <span className="text-[#00D6B2] text-[10px] font-bold uppercase tracking-wider">Live Sync</span>
          </div>
        </div>

        {/* Image Wrapper */}
        <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden rounded-xl">
          {username ? (
            <Image
              src={`https://github-contributions-api.deno.dev/${username}.svg`}
              alt={`${username} contribution graph`}
              fill
              className="object-contain filter invert opacity-80 group-hover:opacity-100 transition-opacity"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/20">
              <div className="w-full h-px bg-white/5 absolute top-1/2" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] relative z-10 bg-[#0A0F15] px-4">Connect GitHub to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
