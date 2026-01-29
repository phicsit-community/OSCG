import React from "react";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function ReadyToContribute() {
  return (
    <div className="bg-linear-to-br from-[#00D6B2]/10 via-[#4FD1D0]/5 to-transparent backdrop-blur-md rounded-2xl p-6 w-full border border-[#00D6B2]/20 flex flex-col justify-center items-center relative overflow-hidden group mt-auto">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D6B2]/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

      {/* Icon */}
      <div className="mb-4 relative">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00D6B2] to-[#4FD1D0] flex items-center justify-center shadow-[0_0_20px_rgba(0,214,178,0.3)] relative z-10 group-hover:scale-110 transition-transform duration-500">
          <Rocket className="w-6 h-6 text-[#0A0F15] fill-[#0A0F15]/20" />
        </div>
        <div className="absolute inset-0 bg-[#00D6B2] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
      </div>

      {/* Heading */}
      <h2 className="text-center text-white text-lg font-black mb-2 tracking-tighter">
        Ready to Contribute?
      </h2>

      {/* Sub text */}
      <p className="text-center text-white/50 text-[10px] font-bold uppercase tracking-wide max-w-xs mx-auto mb-5 leading-relaxed">
        Join the open source community and make an impact today.
      </p>

      {/* CTA Button */}
      <Link
        href="/projects"
        className="group/btn relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00D6B2] transition-all duration-300 shadow-lg overflow-hidden w-full justify-center"
      >
        <span className="relative z-10">Explore Projects</span>
        <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        <div className="absolute inset-0 bg-[#00D6B2] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
      </Link>
    </div>
  );
}
