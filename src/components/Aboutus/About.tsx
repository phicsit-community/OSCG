"use client";
import React, { useState, useEffect, useRef } from "react";
import { Users, BookOpen, Lightbulb, Globe, Target, Shield, Heart, Zap } from "lucide-react";
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
    <div className="min-h-screen bg-[#0A0F15] text-white selection:bg-[var(--accent-primary)]/30 overflow-hidden pt-5">
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[30vh] bg-linear-to-b from-transparent via-[var(--accent-primary)]/5 to-transparent z-10"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--accent-primary)]/5 blur-[120px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--accent-primary)] uppercase">
              Connecting Innovators Globally
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-4xl lg:text-6xl font-bold mb-8 leading-[1.05] tracking-tight"
          >
            About <span className="text-accent-gradient">Our Journey</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl font-light text-[var(--text-secondary)] leading-relaxed"
          >
            Open Source Connect Global is a worldwide movement dedicated to
            bridging the gap between developers through shared knowledge and
            collective innovation.
          </motion.p>
        </motion.div>

        {/* Mission & Vision Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8 mb-32"
        >
          <motion.div variants={fadeUp} className="unified-card p-10 group hover:border-[var(--accent-primary)]/30 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center mb-8 border border-[var(--accent-primary)]/20 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7 text-[var(--accent-primary)]" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
              To empower developers worldwide by fostering an inclusive open source
              ecosystem where innovation thrives, knowledge is shared freely, and
              collaboration knows no boundaries. We believe in the power of
              community-driven development.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="unified-card p-10 group hover:border-[var(--accent-secondary)]/30 transition-all duration-500">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-secondary)]/10 flex items-center justify-center mb-8 border border-[var(--accent-secondary)]/20 group-hover:scale-110 transition-transform">
              <Globe className="w-7 h-7 text-[var(--accent-secondary)]" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Our Vision</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
              To become the world's leading platform for open source collaboration,
              connecting millions of developers across continents. We envision a
              future where every developer has the opportunity to contribute to
              meaningful, world-changing projects.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Values Section */}
        <div className="mb-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-20"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
              Our Core <span className="text-accent-gradient">Beliefs</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 px-4">
            {[
              {
                icon: Users,
                title: "Community First",
                desc: "We prioritize building strong, supportive communities where every voice matters and contributions are celebrated.",
                color: "var(--accent-primary)"
              },
              {
                icon: BookOpen,
                title: "Learning Together",
                desc: "Knowledge sharing is at our core. We create opportunities for developers to learn from each other and grow together.",
                color: "var(--accent-secondary)"
              },
              {
                icon: Zap,
                title: "Bold Innovation",
                desc: "The best solutions emerge when diverse minds work together. We facilitate meaningful collaborations across the globe.",
                color: "var(--accent-tertiary)"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="unified-card p-10 group hover:border-white/20 transition-all"
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                  <value.icon className="w-7 h-7" style={{ color: value.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Impact Stats */}
        <div className="relative pt-20 border-t border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-linear-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                  <Counter end={stat.end} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold">
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

