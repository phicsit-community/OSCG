"use client";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "../projects/ProjectCard";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

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
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-container bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2>
            Explore <span className="text-accent-gradient">Projects</span>
          </h2>
          <p>
            Discover innovative open source projects that are shaping the future
            of technology.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROJECTS.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>

        {/* Explore All Projects Button */}
        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="cursor-pointer text-black bg-[var(--accent-primary)] hover:bg-[#00c4a3] rounded-2xl px-10 h-14 font-semibold shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all text-base"
            >
              Explore All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
