"use client";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";

const projects = [
  {
    title: "CloudNative Orchestrator",
    description:
      "A modern container orchestration platform built for scalability and performance",
    language: "Go",
    languageColor: "bg-cyan-500",
    stars: "12.5k",
    forks: "2.3k",
  },
  {
    title: "DataFlow Pipeline",
    description:
      "Real-time data processing framework with distributed architecture",
    language: "Python",
    languageColor: "bg-blue-500",
    stars: "8.9k",
    forks: "1.5k",
  },
  {
    title: "ReactUI Components",
    description:
      "Comprehensive component library with accessibility-first design",
    language: "TypeScript",
    languageColor: "bg-blue-400",
    stars: "15.2k",
    forks: "3.1k",
  },
  {
    title: "ML Vision Toolkit",
    description:
      "Computer vision library powered by cutting-edge machine learning models",
    language: "Python",
    languageColor: "bg-blue-500",
    stars: "9.8k",
    forks: "1.9k",
  },
  {
    title: "SecureAuth Framework",
    description: "Enterprise-grade authentication and authorization solution",
    language: "Rust",
    languageColor: "bg-orange-600",
    stars: "6.7k",
    forks: "987",
  },
  {
    title: "DevOps Automation",
    description:
      "Complete CI/CD automation suite for modern development workflows",
    language: "JavaScript",
    languageColor: "bg-yellow-500",
    stars: "11.3k",
    forks: "2.4k",
  },
];

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
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
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
            of technology
          </p>
        </motion.div>

        {/* Coming Soon Message */}
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

        {/* Projects Grid - Commented Out
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group unified-card p-6"
            >
              ...project cards...
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="cursor-pointer text-black bg-[var(--accent-primary)] hover:bg-[#00c4a3] rounded-2xl px-10 h-14 font-semibold shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all text-base"
          >
            Explore All Projects
          </Button>
        </motion.div>
        */}
      </div>
    </section>
  );
};

export default ProjectsSection;
