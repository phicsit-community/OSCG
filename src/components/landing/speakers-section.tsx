"use client";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { speakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/SpeakerCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
const SpeakersSection = () => {
  const displaySpeakers = speakers.slice(0, 4);

  return (
    <section className="section-container bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="section-header mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-center mb-4">
            Our <span className="text-accent-gradient">Speakers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-(--text-muted) max-w-2xl mx-auto text-lg">
            Learn from industry leaders and open source pioneers who are driving
            innovation forward
          </motion.p>
        </motion.div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displaySpeakers.map((item, index) => (
            <motion.div key={index} variants={fadeUp}>
              <SpeakerCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <p className="text-white/60 mb-8 text-lg font-medium">
            Discover the industry leaders and pioneers joining us.
          </p>
          <Link
            href="/speakers"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#00D6B2] text-[#0A0F15] font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,214,178,0.4)] active:scale-95"
          >
            Explore All Speakers
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
