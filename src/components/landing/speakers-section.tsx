"use client";

import { Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import ComingSoon from "../ComingSoon/coming-soon-page";

// const speakers = [
//   {
//     initials: "DSC",
//     name: "Dr. Sarah Chen",
//     title: "Chief Technology Officer, CloudTech Inc.",
//     expertise: "Cloud Architecture & Microservices",
//   },
//   {
//     initials: "MR",
//     name: "Marcus Rodriguez",
//     title: "Open Source Advocate, GitHub",
//     expertise: "Developer Relations & Community Building",
//   },
//   {
//     initials: "AP",
//     name: "Aisha Patel",
//     title: "Principal Engineer, Meta",
//     expertise: "Frontend Architecture & Performance",
//   },
// ];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const SpeakersSection = () => {
  return (
    <section className="section-container bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={fadeUp}>
            Our <span className="text-accent-gradient">Speakers</span>
          </motion.h2>
          <motion.p variants={fadeUp}>
            Learn from industry leaders and open source pioneers who are driving
            innovation forward
          </motion.p>
        </motion.div>

        {/* Speakers Grid */}

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
              Exciting open source projects will be showcased here
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
