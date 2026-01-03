import React from "react";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function ReadyToContribute() {
  return (
    <div
      className="relative w-full h-full rounded-2xl p-8 flex flex-col justify-center
                 bg-[#22384a]
                 border border-[#2e4a63]"
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div
          className="w-12 h-12 rounded-xl
                     bg-emerald-500
                     flex items-center justify-center"
        >
          <Rocket className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-center text-white text-lg font-semibold mb-2">
        Ready to Contribute?
      </h2>

      {/* Sub text */}
      <p className="text-center text-sm text-gray-300 max-w-xs mx-auto mb-4">
        Join the open source community and make an impact today
      </p>

      {/* Badges */}
      <div className="flex justify-center gap-5 mb-5 text-sm">
        <span className="flex items-center gap-1 text-yellow-400">
          ⭐ Earn Points
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          ⚡ Rank Up
        </span>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Link
          href="/projects"
          className="flex items-center gap-2
                     px-5 py-2.5 rounded-lg
                     bg-white text-black
                     text-sm font-medium
                     hover:bg-gray-100 transition"
        >
          Explore Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
