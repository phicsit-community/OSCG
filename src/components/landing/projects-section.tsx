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

        {/* Projects Grid */}
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
              <div className="relative z-10">
                {/* GitHub Icon */}
                <motion.div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-5 group-hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Github className="h-6 w-6 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-secondary)] transition-colors">
                  {project.description}
                </p>

                {/* Language Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group-hover:bg-white/10 transition-colors">
                    <div className={`h-3 w-3 rounded-full ${project.languageColor}`} />
                    <span className="text-white text-sm font-medium">
                      {project.language}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mb-5 flex items-center gap-5 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-4 w-4" />
                    <span>{project.forks}</span>
                  </div>
                </div>

                {/* View Project Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] font-medium transition-colors"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
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
      </div>
    </section>
  );
};

export default ProjectsSection;
