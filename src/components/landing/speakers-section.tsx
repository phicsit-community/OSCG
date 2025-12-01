"use client";

import { ChevronLeft, ChevronRight, Linkedin, Twitter } from "lucide-react";
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

// Matching animation system
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
    y: 60,
    scale: 0.9,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const SpeakersSection = () => {
  return (
    <section className="py-10 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2
            className="mb-4 text-4xl text-white font-bold md:text-5xl"
            variants={fadeUp}
          >
            Our <span className="text-[#4FD1D0]">Speakers</span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-2xl text-white/80"
            variants={fadeUp}
          >
            Learn from industry leaders and open source pioneers who are driving
            innovation forward
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute -left-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card cursor-pointer hover:bg-white/90"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#1DD4BD]/50 hover:shadow-[0_0_40px_rgba(29,212,189,0.2)]"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="mb-6 flex justify-center">
                      <motion.div
                        className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#1DD4BD] to-[#07CAAB] text-3xl font-bold text-white shadow-lg group-hover:shadow-[0_0_30px_rgba(29,212,189,0.4)] transition-all duration-500"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {speaker.initials}
                        <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                      </motion.div>
                    </div>

                    <h3 className="mb-2 text-xl text-white font-bold group-hover:text-[#1DD4BD] transition-colors">
                      {speaker.name}
                    </h3>

                    <p className="mb-2 text-sm text-[#4FD1D0] font-medium tracking-wide uppercase">{speaker.title}</p>

                    <p className="mb-6 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {speaker.expertise}
                    </p>

                    <div className="flex justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-[#1DD4BD] hover:text-black transition-all duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-[#1DD4BD] hover:text-black transition-all duration-300"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute -right-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card cursor-pointer hover:bg-white/90"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
