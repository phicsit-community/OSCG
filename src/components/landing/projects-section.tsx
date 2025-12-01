"use client";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "CloudNative Orchestrator",
    description:
      "A modern container orchestration platform built for scalability and performance",
    language: "Go",
    languageColor: "bg-cyan-500",
    stars: "12.5k",
    forks: "2.3k",
    borderColor: "border-t-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "DataFlow Pipeline",
    description:
      "Real-time data processing framework with distributed architecture",
    language: "Python",
    languageColor: "bg-blue-500",
    stars: "8.9k",
    forks: "1.5k",
    borderColor: "border-t-emerald-500",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    title: "ReactUI Components",
    description:
      "Comprehensive component library with accessibility-first design",
    language: "TypeScript",
    languageColor: "bg-blue-400",
    stars: "15.2k",
    forks: "3.1k",
    borderColor: "border-t-purple-500",
    gradient: "from-purple-500/20 to-indigo-500/10",
  },
  {
    title: "ML Vision Toolkit",
    description:
      "Computer vision library powered by cutting-edge machine learning models",
    language: "Python",
    languageColor: "bg-blue-500",
    stars: "9.8k",
    forks: "1.9k",
    borderColor: "border-t-orange-500",
    gradient: "from-orange-500/20 to-red-500/10",
  },
  {
    title: "SecureAuth Framework",
    description: "Enterprise-grade authentication and authorization solution",
    language: "Rust",
    languageColor: "bg-orange-600",
    stars: "6.7k",
    forks: "987",
    borderColor: "border-t-blue-400",
    gradient: "from-blue-400/20 to-cyan-400/10",
  },
  {
    title: "DevOps Automation",
    description:
      "Complete CI/CD automation suite for modern development workflows",
    language: "JavaScript",
    languageColor: "bg-yellow-500",
    stars: "11.3k",
    forks: "2.4k",
    borderColor: "border-t-amber-500",
    gradient: "from-amber-500/20 to-yellow-500/10",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

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

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: -15,
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

  const headerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(91, 235, 181, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <section
      id="projects"
      className="py-1 bg-transparent relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#4FD1D0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#00D4AA] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#5bebb5] rounded-full blur-2xl"></div>
      </motion.div>

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16 text-center"
        >
          <motion.h2
            className="mb-4 text-4xl text-white font-bold md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Explore <span className="text-[#4FD1D0]">Projects</span>
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-white/80 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover innovative open source projects that are shaping the future
            of technology
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative rounded-xl border-t-4 ${project.borderColor} bg-white/5 p-6 overflow-hidden backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 shadow-lg hover:shadow-2xl`}
            >
              <motion.div
                className={`absolute inset-0 bg-linear-to-br ${project.gradient} opacity-0 group-hover:opacity-100`}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className={`absolute top-0 left-0 w-full h-1 bg-linear
linear-to-r ${project.borderColor.replace(
                  "border-t-",
                  ""
                )} opacity-0 group-hover:opacity-100`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D313B] mb-4 group-hover:bg-[#363A45]"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <Github className="h-6 w-6 text-white" />
                </motion.div>

                <motion.h3
                  className="mb-3 text-xl font-semibold text-white group-hover:text-[#4FD1D0] transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  className="mb-4 text-sm text-white/60 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="mb-4 flex items-center gap-4 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 bg-[#2D313B] rounded-xl px-3 py-1.5 group-hover:bg-[#363A45] transition-colors">
                    <motion.div
                      className={`h-3 w-3 rounded-full ${project.languageColor}`}
                      whileHover={{ scale: 1.2 }}
                    />
                    <span className="text-white text-sm font-medium">
                      {project.language}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="mb-4 flex items-center gap-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 text-white/70">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="h-4 w-4" />
                    </motion.div>
                    {project.stars}
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GitFork className="h-4 w-4" />
                    </motion.div>
                    {project.forks}
                  </div>
                </motion.div>

                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 hover:underline text-sm text-[#00D4AA] hover:text-[#5bebb5] font-medium group/link"
                  transition={{ duration: 0.2 }}
                >
                  View Project
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2,
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </motion.div>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate={controls}

          className="text-center px-10"
        >
          <Button
            size="lg"
            className="cursor-pointer text-black bg-[#5bebb5] hover:bg-[#4dddabd3] rounded-full px-10 py-6 font-semibold shadow-lg text-lg relative overflow-hidden"
          >
            <span className="relative z-10">Explore All Projects</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
