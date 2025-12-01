"use client";

import { useEffect, useRef } from "react";

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#05080F] overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4FD1D0]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#89CFEB]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(circle at center, black, transparent 80%)",
                }}
            />

            {/* Subtle Moving Lines (Optional, CSS animation can be added in globals.css if needed, but this is clean) */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>
    );
};

export default GlobalBackground;
