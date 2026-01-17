"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer-section";

export default function SwagsPage() {
    return (
        <main className="min-h-screen bg-[#090E1A] selection:bg-[#2BEEAD]/30 selection:text-[#2BEEAD] flex flex-col overflow-hidden">
            <Navigation />

            <div className="flex-1 w-full max-w-[1440px] mx-auto min-h-[850px] pt-[65px] px-6 lg:px-12 flex flex-col justify-center">
                <div className="w-full">
                    {/* Top Content: Image and Headline */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-8 lg:mb-12">
                        {/* Left: Swag Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex justify-center shrink-0"
                        >
                            <div className="relative w-full lg:w-[550px] lg:h-[423px] aspect-[634/488] rounded-b-[48px] rounded-t-[0px] overflow-hidden">
                                <Image
                                    src="/swags.png"
                                    alt="OSCG Swags"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Right: Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="shrink-0 lg:-mt-24"
                        >
                            <h1 className="text-[40px] sm:text-[50px] lg:text-[70px] xl:text-[85px] font-bold text-white leading-[1] tracking-[-0.1em] text-center lg:text-left uppercase">
                                GRAB YOUR SWAG
                                <br />
                                AND POWER UP
                                <br />
                                THE <span className="text-[#2BEEAD]">OPEN SOURCE</span>
                                <br />
                                SPIRIT.
                            </h1>
                        </motion.div>
                    </div>

                    {/* Bottom Content: Highlight Cards */}
                    <div className="flex flex-col xl:flex-row items-center justify-center gap-24 w-full">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#0A121A]/60 w-full xl:w-[530px] h-auto lg:h-[160px] p-[15.8px] rounded-[16px] relative overflow-hidden group shadow-xl backdrop-blur-xs shrink-0 flex items-start"
                            style={{
                                background: 'linear-gradient(90deg, rgba(0, 214, 178, 0.1) 0%, rgba(137, 207, 235, 0.1) 50%, rgba(0, 214, 178, 0.1) 100%)',
                                border: '1px solid rgba(0, 214, 178, 0.3)'
                            }}
                        >
                            <div className="absolute inset-0 bg-[#2BEEAD]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex gap-4 w-full lg:max-w-[490px] lg:h-[144px] items-start">
                                <div className="mt-1 shrink-0 w-5 h-5 lg:w-6 lg:h-6 relative">
                                    <Image
                                        src="/swags-tick.png"
                                        alt="Tick"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-[20px] lg:text-[27px] leading-[1.1] tracking-normal text-white font-bold">
                                    <span className="text-[#2BEEAD]">Exclusive swags for the Top</span>
                                    <br />
                                    <span className="text-[#2BEEAD]">Contributors</span>, selected based
                                    <br />
                                    on the quality of their
                                    <br />
                                    contributions.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-[#0A121A]/60 w-full xl:w-[530px] h-auto lg:h-[160px] p-[15.8px] rounded-[16px] relative overflow-hidden group shadow-xl backdrop-blur-xs shrink-0 flex items-start"
                            style={{
                                background: 'linear-gradient(90deg, rgba(0, 214, 178, 0.1) 0%, rgba(137, 207, 235, 0.1) 50%, rgba(0, 214, 178, 0.1) 100%)',
                                border: '1px solid rgba(0, 214, 178, 0.3)'
                            }}
                        >
                            <div className="absolute inset-0 bg-[#2BEEAD]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex gap-4 w-full lg:max-w-[490px] lg:h-[144px] items-start">
                                <div className="mt-1 shrink-0 w-5 h-5 lg:w-6 lg:h-6 relative">
                                    <Image
                                        src="/swags-tick.png"
                                        alt="Tick"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-[20px] lg:text-[27px] leading-[1.1] tracking-normal text-white font-bold">
                                    <span className="text-[#2BEEAD]">Certificates for all Contributors</span>, Project Admins, Mentors, and Organisers as a token of appreciation for your efforts.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                <Footer />
            </div>
        </main>
    );
}
