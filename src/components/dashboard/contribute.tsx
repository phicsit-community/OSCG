import React from "react";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function ReadyToContribute() {
  return (
    <div className="bg-linear-to-br from-[#00D6B2]/20 via-[#4FD1D0]/10 to-transparent backdrop-blur-md rounded-3xl p-8 w-full border border-[#00D6B2]/20 h-full flex flex-col justify-center items-center relative overflow-hidden group">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D6B2]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Icon */}
      <div className="mb-6 relative">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#00D6B2] to-[#4FD1D0] flex items-center justify-center shadow-[0_0_30px_rgba(0,214,178,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-500">
          <Rocket className="w-8 h-8 text-[#0A0F15] fill-[#0A0F15]/20" />
        </div>
        <div className="absolute inset-0 bg-[#00D6B2] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      </div>

      {/* Heading */}
      <h2 className="text-center text-white text-2xl font-black mb-3 tracking-tighter">
        Ready to Contribute?
      </h2>

      {/* Sub text */}
      <p className="text-center text-white/50 text-sm font-medium max-w-xs mx-auto mb-8 leading-relaxed">
        Join the open source community and make an impact today. Earn points, rank up, and grow!
      </p>

      {/* CTA Button */}
      <Link
        href="/projects"
        className="group/btn relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-[#00D6B2] transition-all duration-300 shadow-xl overflow-hidden"
      >
        <span className="relative z-10">Explore Projects</span>
        <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-[#00D6B2] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
      </Link>
    </div>
  );
}
