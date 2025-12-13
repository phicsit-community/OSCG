"use client";

import { useEffect, useRef } from "react";

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#05080F] overflow-hidden">
            {/* Primary Gradient Orbs - positioned to blend with hero shader */}
            <div
                className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full blur-[150px] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(79, 209, 208, 0.15) 0%, rgba(79, 209, 208, 0) 70%)'
                }}
            />
            <div
                className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[130px] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(137, 207, 235, 0.12) 0%, rgba(137, 207, 235, 0) 70%)',
                    animationDelay: '1s'
                }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(137, 207, 235, 0.10) 0%, rgba(137, 207, 235, 0) 70%)',
                    animationDelay: '2s'
                }}
            />
            <div
                className="absolute bottom-[20%] left-[-5%] w-[35%] h-[35%] rounded-full blur-[100px] animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 214, 178, 0.08) 0%, rgba(0, 214, 178, 0) 70%)',
                    animationDelay: '3s'
                }}
            />

            {/* Grid Pattern - subtle and unified */}
            <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)",
                }}
            />

            {/* Subtle vignette for depth */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 8, 15, 0.4) 100%)'
                }}
            />
        </div>
    );
};

export default GlobalBackground;

