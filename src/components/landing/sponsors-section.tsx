"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const partners = [
  { name: "Orbiton", logo: "/partners/orbiton.jpg" },
  { name: "Asura Legion", logo: "/partners/asuralegion.jpg" },
  { name: "Future Minds United", logo: "/partners/FMU.jpeg" },
  { name: "Cloud Loop", logo: "/partners/cloudloop.jpg" },
  { name: "GDG Amity University", logo: "/partners/googledevgroup.jpg" },
];

const SponsersSection = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -(partners.length * (340 + 32))],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 35,
          ease: "linear" as const,
        },
      },
    },
  };

  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative py-24 bg-transparent overflow-hidden" id="sponsors">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Network <span className="text-accent-gradient">Partners</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Leading the way in open-source innovation through powerful global collaborations.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative px-4 mb-20">
        <div
          className="relative w-full overflow-hidden py-8"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex gap-8 whitespace-nowrap will-change-transform"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="relative group flex-shrink-0 cursor-pointer transition-transform duration-700 scale-[0.96] hover:scale-100"
              >
                <div className="relative w-[340px] h-[210px] rounded-[3.5rem] bg-[#111] overflow-hidden flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#00D6B2]/50 group-hover:shadow-[0_0_40px_rgba(0,214,178,0.2)]">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 group-hover:opacity-100 hidden md:block transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-center">
                    <p className="text-white text-base md:text-xl font-black tracking-[0.1em] uppercase drop-shadow-2xl">
                      {partner.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-24 text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[var(--text-secondary)] mb-8 text-lg md:text-xl font-medium">
            Interested in sponsoring? Join the global open source community.
          </p>
          <Link
            href="mailto:hello@osconnect.org"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#00D6B2] text-black font-extrabold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg active:shadow-inner"
          >
            Become a Sponsor
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsersSection;
