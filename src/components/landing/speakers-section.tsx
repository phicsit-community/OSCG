"use client";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import { speakers, topSpeakers } from "@/data/speakers";

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
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Empty placeholder for position 1 */}
          <motion.div
            className="hidden group unified-card text-center w-62.5 h-95 lg:flex justify-center items-center"
            variants={cardVariants}
          >
            <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="relative flex h-42.5 w-42.5 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg group-hover:shadow-[0_0_40px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                    <Image
                      src={""}
                      alt={""}
                      fill
                      sizes="112px"
                      className="object-cover rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2 mb-4 mx-[24.8px]">
                  {/* Name */}
                  <h3 className="text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                    Tanisha Bansal
                  </h3>
                  {/* Title */}
                  <p className="text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                    Software Development Engineer at SITA
                  </p>
                  {/* Expertise */}
                  <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                    ML & AWS Community Builder
                  </p>
                </div>
              </div>
          </motion.div>

          {/* Actual speaker cards at positions 2 and 3 */}
            <motion.div
              className={`group unified-card text-center w-62.5 h-95 flex justify-center items-center`}
              variants={cardVariants}
            >
              <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="relative flex h-42.5 w-42.5 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg group-hover:shadow-[0_0_40px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                    <Image
                      src="/speakers/OlenaYara.png"
                      alt="Olena Yara"
                      fill
                      sizes="112px"
                      className="object-cover rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2 mb-4 mx-[24.8px]">
                  {/* Name */}
                  <h3 className="text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                    Olena Yara
                  </h3>
                  {/* Title */}
                  <p className="text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                    Founder, Yara Agency
                  </p>
                  {/* Expertise */}
                  <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                    Marketing Strategist
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                    <a href="https://www.linkedin.com/in/olena-yara-a26567223/" target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                  {/* {speaker.twitter && (
                    <a href={speaker.twitter} target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </a>
                  )} */}
                </div>
              </div>
            </motion.div>
            <motion.div
              className={`group unified-card text-center w-62.5 h-95 flex justify-center items-center`}
              variants={cardVariants}
            >
              <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="relative flex h-38 w-38 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg group-hover:shadow-[0_0_40px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                    <Image
                      src="/speakers/Sebastiano.png"
                      alt="Sebastiano Fuccio"
                      fill
                      sizes="112px"
                      className="object-cover rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2 mb-4 mx-[24.8px]">
                  {/* Name */}
                  <h3 className="text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                    Sebastiano Fuccio
                  </h3>
                  {/* Title */}
                  <p className="text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                    Founder & CEO | Managing Partner
                  </p>
                  {/* Expertise */}
                  <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                    AI Strategy & Sovereign Innovation
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                    <a href="https://www.linkedin.com/in/sebastiano-fuccio/" target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                </div>
              </div>
            </motion.div>

          {/* Empty placeholder for position 4 */}
          <motion.div
            className="hidden group unified-card text-center w-62.5 h-95 lg:flex justify-center items-center"
            variants={cardVariants}
          >
            <div className="relative z-10">
                {/* Avatar */}
                <div className="mb-4 flex justify-center">
                  <div className="relative flex h-42.5 w-42.5 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg group-hover:shadow-[0_0_40px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                    <Image
                      src=""
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover rounded-full"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-2 mb-4 mx-[24.8px]">
                  {/* Name */}
                  <h3 className="text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                    Tarun Gupta
                  </h3>
                  {/* Title */}
                  <p className="text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                    Founder & CTO
                  </p>
                  {/* Expertise */}
                  <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
                    Salesforce Marketing Champion
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {false && (
                    <a href="" target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                  )}

                  {false && (
                    <a href="" target="_blank">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
