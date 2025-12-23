"use client";

import { motion } from "framer-motion";
import { Sparkles } from "../ui/sparkles";
import { useEffect, useState } from "react";
import Link from "next/link";

// Sponsor data
const sponsors = [
  { name: "TechCorp" },
  { name: "DevStudio" },
  { name: "CloudBase" },
  { name: "OpenStack" },
  { name: "CodeLabs" },
  { name: "DataFlow" },
  { name: "NetSphere" },
  { name: "AppForge" },
  { name: "ByteWorks" },
  { name: "DevOps Co" },
  { name: "SecureNet" },
  { name: "AIVenture" },
];

const SponsersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSponsors = sponsors.length;
  const visibleCount = 5;

  // Auto-rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSponsors);
    }, 2500);
    return () => clearInterval(interval);
  }, [totalSponsors]);

  // Calculate position along the arc that follows the semicircle
  const getCardStyle = (index: number) => {
    let relativePos = index - currentIndex;

    if (relativePos > totalSponsors / 2) relativePos -= totalSponsors;
    if (relativePos < -totalSponsors / 2) relativePos += totalSponsors;

    const isVisible = Math.abs(relativePos) <= Math.floor(visibleCount / 2);

    // Arc parameters - matching the semicircle curve
    const arcSpread = 60; // Total degrees of the arc
    const anglePerCard = arcSpread / visibleCount;
    const baseAngle = 90; // Start from top of semicircle

    // Calculate angle on the arc (center card at 90 degrees = top)
    const angle = baseAngle + (relativePos * anglePerCard);
    const angleRad = angle * (Math.PI / 180);

    // Arc radius - this should match the visual semicircle
    const arcRadius = 400;

    // Position on the arc
    const x = Math.cos(angleRad) * arcRadius * 2.5; // Horizontal spread
    const y = -Math.sin(angleRad) * arcRadius * 0.3 + 80; // Vertical arc curve

    // Scale decreases toward edges
    const scale = isVisible ? 1 - Math.abs(relativePos) * 0.12 : 0;
    const opacity = isVisible ? 1 - Math.abs(relativePos) * 0.2 : 0;
    const zIndex = 10 - Math.abs(relativePos);

    return { x, y, scale, opacity, zIndex, isVisible };
  };

  return (
    <section className="section-container bg-transparent pt-8" id="sponsors">
      <div className="max-w-6xl mx-auto">
        {/* Our Sponsors - Coming Soon */}
        <motion.div
          className="section-header mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>
            Our <span className="text-accent-gradient">Sponsors</span>
          </h2>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="unified-card inline-block px-16 py-12">
            <p className="text-3xl font-bold text-[var(--accent-primary)] mb-4">
              Coming Soon
            </p>
            <p className="text-[var(--text-secondary)]">
              Exciting sponsor partnerships will be announced here
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p className="text-[var(--text-secondary)] mb-6">
            Interested in sponsoring? Join the global open source community.
          </p>
          <Link
            href="mailto:hello@osconnect.org"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[var(--accent-primary)] text-black font-semibold hover:bg-[#00c4a3] transition-all shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)]"
          >
            Become a Sponsor
          </Link>
        </motion.div>

        {/* Section Header */}
        <motion.div
          className="section-header mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>
            <span className="text-accent-gradient">Network Partners</span>
          </h2>
          <p>
            Supported by innovative companies who believe in the power of open source
          </p>
        </motion.div>

        {/* Combined Cards + Sparkles Section */}
        <div className="relative h-[320px] w-full overflow-hidden">
          {/* Card Carousel - positioned at top of the arc */}
          <div className="absolute inset-x-0 top-0 h-[160px] flex items-center justify-center z-20">
            {sponsors.map((sponsor, index) => {
              const style = getCardStyle(index);

              return (
                <motion.div
                  key={sponsor.name}
                  className="absolute flex items-center justify-center w-40 h-20 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-[var(--accent-primary)]/50"
                  initial={false}
                  animate={{
                    x: style.x,
                    y: style.y,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  style={{ zIndex: style.zIndex }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    {sponsor.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Sparkles Visual Effect - overlapping with cards */}
          <div className="absolute inset-0 top-[40px] [mask-image:radial-gradient(50%_50%,white,transparent)]">
            {/* Gradient background glow */}
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] before:opacity-40" />

            {/* Curved horizon line - cards follow this curve */}
            <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-white/20 bg-[#05080F]" />

            {/* Sparkles particles */}
            <Sparkles
              density={1200}
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
              color="var(--sparkles-color)"
            />
          </div>
        </div>


      </div>
    </section>
  );
};

export default SponsersSection;
