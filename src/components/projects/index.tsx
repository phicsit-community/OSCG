"use client";

import React, { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS } from "@/data/projects";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const CATEGORIES = ["All", "AI", "Blockchain", "Python"] as const;

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-[#050505]">
      {/* Dynamic background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D6B2]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4FD1D0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              Explore <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D6B2] via-[#4FD1D0] to-[#00D6B2] bg-size-[200%_auto] animate-gradient">Open Source</span>
            </h2>
            <p className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto mt-4 px-4 font-medium leading-relaxed">
              Find your next contribution. Filter by your expertise and join high-impact global projects.
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`h-11 px-8 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${activeCategory === category
                ? "bg-[#00D6B2] text-black shadow-[0_0_25px_rgba(0,214,178,0.3)] scale-105"
                : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                variants={fadeUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/2">
            <p className="text-white/40 font-medium italic">No projects found in this category yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
