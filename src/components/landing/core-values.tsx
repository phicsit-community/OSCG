"use client";
import { motion, Variants } from "framer-motion";
import { Users, GraduationCap, Lightbulb } from "lucide-react";

const CoreValues = () => {
  const values = [
    {
      icon: Users,
      title: "Community",
      description:
        "Building bridges between developers worldwide, fostering collaboration and knowledge sharing",
    },
    {
      icon: GraduationCap,
      title: "Learning",
      description:
        "Empowering growth through workshops, talks, and hands-on experiences with cutting-edge tech",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Showcasing groundbreaking projects that push the boundaries of open source development",
    },
  ];

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

  return (
    <section className="section-container bg-transparent">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="section-header" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-sm font-medium text-[var(--accent-primary)]">
              WHAT DRIVES US FORWARD
            </span>
          </div>
          <h2>
            Our Core <span className="text-accent-gradient">Values</span>
          </h2>
          <p>
            At Open Source Connect Global, we believe in the power of{" "}
            <span className="text-[var(--accent-primary)] font-medium">collaboration</span>,{" "}
            <span className="text-[var(--accent-tertiary)] font-medium">continuous learning</span>, and{" "}
            <span className="text-[var(--accent-primary)] font-medium">innovative thinking</span>.
          </p>
        </motion.div>

        {/* Values Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group unified-card p-8"
            >
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors"
                    style={{
                      boxShadow: "0 0 20px var(--accent-glow)",
                    }}
                  >
                    <value.icon
                      className="w-7 h-7 text-[var(--accent-secondary)]"
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] leading-relaxed group-hover:text-white/80 transition-colors">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div className="flex justify-center" variants={fadeUp}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Join us in building the future of open source
            </span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoreValues;
