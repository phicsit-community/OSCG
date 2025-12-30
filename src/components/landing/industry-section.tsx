"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const platinumSponsors = [
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Azure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
  },
];

const goldSponsors = [
  {
    name: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "GitHub",
    logo: "https://www.vectorlogo.zone/logos/github/github-tile.svg",
  },
  {
    name: "Docker",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_(container_engine)_logo.svg",
  },
];

const IndustrySection = () => {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="section-container relative py-20 overflow-hidden" id="industry">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,214,178,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-accent-gradient">Sponsors</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            Supported by industry leaders who believe in the power of open source innovation
          </p>
        </motion.div>


        {/* <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/40">Platinum Sponsors</h3>
            <div className="h-px w-12 bg-linear-to-l from-transparent via-white/20 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            {platinumSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                variants={fadeUp}
                className="group relative h-32 sm:h-40 rounded-3xl bg-white/[0.03] border border-white/5 flex items-center justify-center p-8 transition-all duration-500 hover:border-[var(--accent-primary)]/30 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(0,214,178,0.1)]"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>


        <div className="mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-linear-to-r from-transparent via-[#FFD700]/20 to-transparent" />
            <h3 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#FFD700]/70">Gold Sponsors</h3>
            <div className="h-px w-12 bg-linear-to-l from-transparent via-[#FFD700]/20 to-transparent" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {goldSponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                variants={fadeUp}
                className="group relative h-28 sm:h-36 rounded-2xl bg-[#FFD700]/[0.02] border border-[#FFD700]/20 flex items-center justify-center p-6 transition-all duration-500 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/5 hover:shadow-[0_0_50px_rgba(255,215,0,0.15)]"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain filter brightness-100 group-hover:brightness-125 transition-all duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </div> */}
        <motion.div
          className="text-center py-20"
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
              We're actively partnering with leading industry sponsors to support this initiative.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 text-center relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--text-secondary)] mb-8 text-lg font-medium">
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
      </div>
    </section>
  );
};

export default IndustrySection;