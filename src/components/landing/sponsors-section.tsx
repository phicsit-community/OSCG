"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SponsersSection = () => {
  const [activeTab, setActiveTab] = useState<"platinum" | "gold" | "silver">("platinum");

  const sponsorsByTier = {
    platinum: [
      { name: "Platinum Sponsor 1", logo: "/nex.png" },
      { name: "Platinum Sponsor 2", logo: "/nex.png" },
      { name: "Platinum Sponsor 3", logo: "/nex.png" },
    ],
    gold: [
      { name: "Gold Sponsor 1", logo: "/nex.png" },
      { name: "Gold Sponsor 2", logo: "/nex.png" },
      { name: "Gold Sponsor 3", logo: "/nex.png" },
      { name: "Gold Sponsor 4", logo: "/nex.png" },
    ],
    silver: [
      { name: "Silver Sponsor 1", logo: "/nex.png" },
      { name: "Silver Sponsor 2", logo: "/nex.png" },
      { name: "Silver Sponsor 3", logo: "/nex.png" },
      { name: "Silver Sponsor 4", logo: "/nex.png" },
      { name: "Silver Sponsor 5", logo: "/nex.png" },
      { name: "Silver Sponsor 6", logo: "/nex.png" },
    ],
  };

  const allSponsors = [
    ...sponsorsByTier.platinum,
    ...sponsorsByTier.gold,
    ...sponsorsByTier.silver,
  ];

  return (
    <section className="py-32 bg-transparent overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1221]/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl text-white font-bold md:text-5xl tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1D0] to-[#1AD5BD]">Sponsors</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Supported by industry leaders who believe in the power of open source innovation
          </p>
        </motion.div>

        {/* Marquee Animation */}
        <div className="relative w-full overflow-hidden mask-linear-gradient mb-20">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#090E1A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#090E1A] to-transparent z-10" />

          <motion.div
            className="flex gap-12 items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...allSponsors, ...allSponsors].map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[200px] h-32 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/10 transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <span className="text-xl font-bold text-white">{sponsor.name}</span>
                {/* <Image src={sponsor.logo} alt={sponsor.name} width={150} height={50} className="object-contain" /> */}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sponsor Tier Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {[
            { tier: "platinum" as const, label: "Platinum", color: "#E5E4E2" },
            { tier: "gold" as const, label: "Gold", color: "#FFD700" },
            { tier: "silver" as const, label: "Silver", color: "#C0C0C0" },
          ].map(({ tier, label, color }) => (
            <button
              key={tier}
              onClick={() => setActiveTab(tier)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === tier
                  ? "bg-white/10 border-2 scale-105"
                  : "bg-white/5 border-2 border-transparent hover:bg-white/10"
              }`}
              style={{
                borderColor: activeTab === tier ? color : "transparent",
                color: activeTab === tier ? color : "#9CA3AF",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sponsor Tier Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className={`grid gap-8 ${
            activeTab === "platinum"
              ? "md:grid-cols-3"
              : activeTab === "gold"
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3 lg:grid-cols-3"
          }`}>
            {sponsorsByTier[activeTab].map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl bg-gradient-to-br border flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer ${
                  activeTab === "platinum"
                    ? "h-48 from-[#E5E4E2]/5 to-transparent border-[#E5E4E2]/20 hover:border-[#E5E4E2]/40"
                    : activeTab === "gold"
                    ? "h-40 from-[#FFD700]/5 to-transparent border-[#FFD700]/20 hover:border-[#FFD700]/40"
                    : "h-36 from-[#C0C0C0]/5 to-transparent border-[#C0C0C0]/20 hover:border-[#C0C0C0]/40"
                }`}
              >
                <span
                  className="font-medium text-center px-4"
                  style={{
                    color:
                      activeTab === "platinum"
                        ? "#E5E4E2"
                        : activeTab === "gold"
                        ? "#FFD700"
                        : "#C0C0C0",
                  }}
                >
                  {sponsor.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsersSection;
