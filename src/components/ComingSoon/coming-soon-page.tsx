import React from "react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen w-full  flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #00E0D5 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        ></div>
      </div>

      <div className="relative flex flex-col items-center text-center space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#00E0D5] rounded-full shadow-[0_0_10px_#00E0D580]"></div>
          <p className="text-[#EAFDFC] text-sm tracking-[0.25em] font-medium">
            OSCG
          </p>
        </div>

        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] 
  bg-gradient-to-r from-white to-[#00E0D5] bg-clip-text text-transparent"
        >
          Coming Soon
        </h1>

        <p className="text-[#A9BFC1] text-base max-w-sm leading-relaxed">
          We’re crafting something fresh. Hang tight.
        </p>

        <div className="w-full max-w-xs h-px mt-6 bg-gradient-to-r from-transparent via-[#FFFFFF22] to-transparent"></div>

        <p className="text-[#7A8F92] text-xs tracking-wide mt-2">
          © 2026 OSCG Designs. All rights reserved.
        </p>
      </div>
    </div>
  );
}
