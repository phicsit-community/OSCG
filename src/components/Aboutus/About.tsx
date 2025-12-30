"use client";
import React, { useState, useEffect, useRef } from "react";
import { Users, BookOpen, Globe, Target, Zap } from "lucide-react";
import { motion, Variants, useInView } from "framer-motion";

const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = Math.ceil(end / (duration / 16));
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }
        setCount(start);
      }, 16);
      return () => clearInterval(counter);
    }
  }, [end, isInView]);

  return <span ref={ref}>{count.toLocaleString()}+</span>;
};

export default function AboutUs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen  text-white selection:bg-[var(--accent-primary)]/30 overflow-hidden pt-20">


      <div className="relative z-10 container mx-auto px-6 py-12 md:py-16 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12 max-w-4xl mx-auto"
        >


          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            About <span className="text-accent-gradient">Our Journey</span>

          </h1>


          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 px-4">
            Open Source Connect Global is a worldwide movement dedicated to
            bridging the gap between developers through shared knowledge and
            collective innovation.


          </p>

        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 mb-24"
        >
          <motion.div
            variants={fadeUp}
            className="unified-card p-5 sm:p-6 group hover:border-[var(--accent-primary)]/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-5 border border-[var(--accent-primary)]/20 group-hover:scale-105 transition-transform">
              <Target className="w-5 h-5 text-[var(--accent-primary)]" />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Our Mission
            </h2>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              To empower developers worldwide by fostering an inclusive open source
              ecosystem where innovation thrives, knowledge is shared freely, and
              collaboration knows no boundaries.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="unified-card p-5 sm:p-6 group hover:border-[var(--accent-secondary)]/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center mb-5 border border-[var(--accent-secondary)]/20 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-[var(--accent-secondary)]" />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Our Vision
            </h2>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              To become the world's leading platform for open source collaboration,
              connecting developers across continents and enabling meaningful,
              world-changing projects.
            </p>
          </motion.div>
        </motion.div>


        <div className="mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              Our Core <span className="text-accent-gradient">Beliefs</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 px-4">
            {[
              {
                icon: Users,
                title: "Community First",
                desc: "We prioritize building strong, supportive communities where every voice matters and contributions are celebrated.",
                color: "var(--accent-primary)",
              },
              {
                icon: BookOpen,
                title: "Learning Together",
                desc: "Knowledge sharing is at our core. We create opportunities for developers to learn from each other and grow together.",
                color: "var(--accent-secondary)",
              },
              {
                icon: Zap,
                title: "Bold Innovation",
                desc: "The best solutions emerge when diverse minds work together. We facilitate meaningful collaborations across the globe.",
                color: "var(--accent-tertiary)",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="unified-card p-5 sm:p-6 group hover:border-white/20 transition-all duration-300"
              >
                <div className="mb-4 inline-flex p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <value.icon
                    className="w-5 h-5"
                    style={{ color: value.color }}
                  />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white">
                  {value.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-snug">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>


        <div className="relative pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "Community Members", end: 25000 },
              { label: "Countries Reached", end: 60 },
              { label: "Active Projects", end: 100 },
              { label: "Events Hosted", end: 50 }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-[var(--accent-secondary)] transition-colors">
                  <Counter end={stat.end} />
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

