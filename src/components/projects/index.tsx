"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/data/projects";

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
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const ProjectsSection = () => {
  return (
    <section className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Dynamic background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00D6B2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4FD1D0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Active <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D6B2] to-[#4FD1D0]">Projects</span>
          </h2>
          <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto mt-4 px-4 font-medium leading-relaxed">
            Discover community-driven initiatives. View detailed architectures, tech stacks, and connect with lead mentors.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.title} variants={fadeUp}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
