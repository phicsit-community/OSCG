"use client";
import { motion, Variants } from "framer-motion";
import { speakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/SpeakerCard";

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

const SpeakersPage = () => {
  return (
    <div className="min-h-screen text-white selection:bg-[var(--accent-primary)]/30 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="section-header mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.05] tracking-tight mt-14"
          >
            Our <span className="text-accent-gradient">Speakers</span>

          </h1>
          <p className="text-center text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Learn from industry leaders and open source pioneers who are driving
            innovation forward
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {speakers.map((speaker, index) => (
            <motion.div key={index} variants={cardVariants}>
              <SpeakerCard item={speaker} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SpeakersPage;
