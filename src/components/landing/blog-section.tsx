"use client";

import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const LatestInsights = () => {
  // Use the first 3 real blog posts
  const insights = blogPosts.slice(0, 3);

  return (
    <section className="section-container bg-transparent">
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={fadeUp}>
            Latest <span className="text-accent-gradient">Insights</span>
          </motion.h2>
          <motion.p variants={fadeUp}>
            Stay updated with the latest news, tutorials, and insights from the
            open source community
          </motion.p>
        </motion.div>


        <motion.div
          className="grid gap-6 md:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {insights.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="contents"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group unified-card overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="relative h-48 bg-linear-to-br from-white/5 to-white/0 flex items-center justify-center border-b border-white/5">
                  <div className="text-(--text-muted) text-sm">Article Image</div>
                  <div className="absolute left-4 top-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-medium text-white">
                    {article.category}
                  </div>
                </div>


                <div className="p-6">

                  <div className="mb-4 flex items-center gap-4 text-xs text-(--text-muted)">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </div>
                  </div>


                  <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-(--accent-secondary) transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-5 text-sm text-(--text-muted) leading-relaxed line-clamp-2">
                    {article.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/10 mb-4" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-(--text-secondary)">
                      <User className="h-4 w-4" />
                      {article.author.name}
                    </div>

                    <div className="inline-flex items-center text-(--accent-primary) group-hover:text-(--accent-secondary) font-medium text-sm transition-colors">
                      Read
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="cursor-pointer text-black bg-(--accent-primary) hover:bg-[#00c4a3] rounded-2xl px-10 h-14 font-semibold shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all text-base"
            >
              View All Blogs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestInsights;
