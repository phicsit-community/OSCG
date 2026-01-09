"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Globe, Award, Sparkles, TrendingUp } from "lucide-react";

const features = [
    {
        title: "Global Community",
        description: "Join 25,000+ developers from 60+ countries collaborating on the future of tech.",
        icon: Users,
        color: "from-[#00D6B2] to-[#11D392]",
        stats: "25k+ Members",
    },
    {
        title: "Open Innovation",
        description: "Contribute to cutting-edge projects in AI, Cloud, and Web3 with world-class mentors.",
        icon: Globe,
        color: "from-[#11D392] to-[#4FD1D0]",
        stats: "60+ Active Projects",
    },
    {
        title: "Professional Growth",
        description: "Earn verified badges and build a global reputation that opens doors to elite opportunities.",
        icon: Award,
        color: "from-[#4FD1D0] to-[#01B99F]",
        stats: "Verified Credentials",
    },
];

const AuthFeatureCards = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden p-8 lg:p-12">
            {/* Subtle OSCG Themed Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[#0B0F17]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-[120px]"
                    style={{
                        background: `radial-gradient(circle, #00D6B2 0%, #11D392 30%, transparent 70%)`
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-lg text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                        <Sparkles className="w-4 h-4 text-[#11D392]" />
                        <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">The Future of Collaboration</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-[1.1]">
                        Build Everything <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D6B2] to-[#11D392]">
                            You Imagine
                        </span>
                    </h2>

                    <p className="text-[#94A3B8] text-base mb-12 leading-relaxed max-w-sm mx-auto">
                        Join the global movement of creators building the next generation of open source technology.
                    </p>
                </motion.div>

                {/* Stacked Cards Container */}
                <div className="relative h-[360px] w-full mt-6">
                    <AnimatePresence mode="popLayout">
                        {features.map((feature, i) => {
                            const isTop = i === index;
                            const isPrev = i === (index - 1 + features.length) % features.length;
                            const isNext = i === (index + 1) % features.length;

                            if (!isTop && !isNext && !isPrev) return null;

                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, scale: 0.8, y: 60, rotate: -3 }}
                                    animate={{
                                        opacity: isTop ? 1 : isNext ? 0.3 : 0,
                                        scale: isTop ? 1 : 0.95,
                                        y: isTop ? 0 : 15,
                                        rotate: isTop ? 0 : 3,
                                        zIndex: isTop ? 30 : 20,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, y: -60, rotate: -6 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 25,
                                        opacity: { duration: 0.3 }
                                    }}
                                    className={`absolute inset-0 flex items-center justify-center pointer-events-none`}
                                >
                                    <div className={`w-full max-w-[320px] aspect-4/5 p-8 rounded-[2rem] bg-linear-to-br ${feature.color} shadow-2xl border border-white/20 relative overflow-hidden`}>
                                        {/* Simplified Overlay */}
                                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

                                        {/* Content Inner */}
                                        <div className="relative z-10 h-full flex flex-col items-start text-start">
                                            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6 border border-white/30 shadow-sm">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>

                                            <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                                                {feature.title}
                                            </h3>

                                            <p className="text-white/90 text-sm leading-relaxed mb-auto font-medium">
                                                {feature.description}
                                            </p>

                                            <div className="w-full pt-5 border-t border-white/20 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest mb-0.5">Metrics</span>
                                                    <span className="text-white font-black text-xs">{feature.stats}</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                    <TrendingUp className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Subtle Shine */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Clean Indicators */}
                    <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-2">
                        {features.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#11D392]' : 'w-1.5 bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthFeatureCards;
