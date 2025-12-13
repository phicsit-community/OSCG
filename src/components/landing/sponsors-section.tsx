"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

  const tierConfig = {
    platinum: { label: "Platinum", color: "#E5E4E2", cardHeight: "h-44" },
    gold: { label: "Gold", color: "#FFD700", cardHeight: "h-36" },
    silver: { label: "Silver", color: "#C0C0C0", cardHeight: "h-32" },
  };

  return (
    <section className="section-container bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>
            Our <span className="text-accent-gradient">Sponsors</span>
          </h2>
          <p>
            Supported by industry leaders who believe in the power of open source innovation
          </p>
        </motion.div>

        {/* Marquee Animation */}
        <div className="relative w-full overflow-hidden mb-16">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-dark)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-dark)] to-transparent z-10" />

          <motion.div
            className="flex gap-8 items-center w-max"
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
                className="flex items-center justify-center min-w-[180px] h-24 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/10 transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <span className="text-lg font-semibold text-white">{sponsor.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sponsor Tier Navigation */}
        <div className="flex justify-center gap-3 mb-10">
          {(["platinum", "gold", "silver"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTab(tier)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${activeTab === tier
                  ? "bg-white/10 scale-105"
                  : "bg-white/5 border-transparent hover:bg-white/10"
                }`}
              style={{
                borderColor: activeTab === tier ? tierConfig[tier].color : "transparent",
                color: activeTab === tier ? tierConfig[tier].color : "var(--text-muted)",
              }}
            >
              {tierConfig[tier].label}
            </button>
          ))}
        </div>

        {/* Sponsor Tier Cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`grid gap-6 ${activeTab === "platinum"
              ? "md:grid-cols-3"
              : activeTab === "gold"
                ? "md:grid-cols-2 lg:grid-cols-4"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}>
            {sponsorsByTier[activeTab].map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`unified-card ${tierConfig[activeTab].cardHeight} flex items-center justify-center cursor-pointer`}
                style={{
                  borderColor: `${tierConfig[activeTab].color}20`,
                }}
              >
                <span
                  className="font-medium text-center px-4"
                  style={{ color: tierConfig[activeTab].color }}
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
