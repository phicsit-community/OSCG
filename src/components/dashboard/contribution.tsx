import React from "react";
import Image from "next/image";

export default function ContributionActivity({
  username,
}: {
  username: string;
}) {
  return (
    <div
      className="relative w-full rounded-2xl p-6
                 bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617]
                 border border-[#1e293b]
                 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
    >
      {/* Dotted border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-sky-500/40" />

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">
          Contribution Activity
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Track your daily contributions and build your streak
        </p>
      </div>

      {/* Activity Matrix */}
      <div className="rounded-xl bg-[#0b1220]/70 border border-[#1e293b] p-4">
        <p className="text-xs text-gray-300 font-medium mb-1">
          Activity Matrix
        </p>
        <p className="text-[11px] text-gray-500 mb-4">
          Public GitHub contribution graph
        </p>

        {/* Image Wrapper */}
        <div className="relative w-full h-[120px]">
          <Image
            src={`https://github-contributions-api.deno.dev/${username}.svg`}
            alt={`${username} contribution graph`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
