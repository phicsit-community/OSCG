"use client";

import { Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";

const speakers = [
  {
    initials: "DSC",
    name: "Dr. Sarah Chen",
    title: "Chief Technology Officer, CloudTech Inc.",
    expertise: "Cloud Architecture & Microservices",
  },
  {
    initials: "MR",
    name: "Marcus Rodriguez",
    title: "Open Source Advocate, GitHub",
    expertise: "Developer Relations & Community Building",
  },
  {
    initials: "AP",
    name: "Aisha Patel",
    title: "Principal Engineer, Meta",
    expertise: "Frontend Architecture & Performance",
  },
];

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
      <div className="max-w-6xl mx-auto">
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
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              className="group unified-card p-8 text-center"
              variants={cardVariants}
            >
              <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] text-2xl font-bold text-white shadow-lg group-hover:shadow-[0_0_40px_var(--accent-glow)] transition-all duration-500">
                    {speaker.initials}
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mb-2 text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                  {speaker.name}
                </h3>

                {/* Title */}
                <p className="mb-2 text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                  {speaker.title}
                </p>

                {/* Expertise */}
                <p className="mb-6 text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                  {speaker.expertise}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
