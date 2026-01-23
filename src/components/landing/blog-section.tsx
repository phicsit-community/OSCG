"use client";

import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const LatestInsights = () => {
  const insights = blogPosts.slice(0, 3);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00D6B2]/8 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#4FD1D0]/6 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D6B2]/10 border border-[#00D6B2]/20">
              <Sparkles className="w-4 h-4 text-[#00D6B2]" />
              <span className="text-[#00D6B2] text-sm font-bold tracking-wider uppercase">
                Knowledge Hub
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00D6B2] to-[#4FD1D0]">Insights</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Explore tutorials, best practices, and stories from the open source community
          </motion.p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid gap-8 lg:grid-cols-3 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {insights.map((article, index) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group block"
            >
              <motion.article
                variants={cardVariants}
                className="relative h-full flex flex-col rounded-3xl overflow-hidden bg-linear-to-b from-[#0D1520] to-[#080C14] border border-white/8 transition-all duration-500 hover:border-[#00D6B2]/40 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#080C14]">
                  {/* Animated Gradient Border on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#00D6B2] to-transparent" />
                  </div>

                  {/* Image with Ken Burns Effect */}
                  <div className="absolute inset-0 p-2">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-fill transition-all duration-700 group-hover:scale-102 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient Overlays */}
                    {/* <div className="absolute inset-0 bg-linear-to-t from-[#080C14]/40 via-transparent to-transparent" /> */}
                    <div className="absolute inset-0 bg-linear-to-br from-[#00D6B2]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Category Badge - Moved to bottom */}
                  <div className="absolute bottom-4 left-4 z-30">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#0A0F15]/90 backdrop-blur-sm border border-[#00D6B2]/40 text-[#00D6B2] shadow-lg">
                      <BookOpen className="w-3 h-3" />
                      {article.category}
                    </span>
                  </div>



                  {/* Floating Orb Effect */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#00D6B2]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Date */}
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#00D6B2]" />
                      <time className="font-medium">{article.date}</time>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight line-clamp-2 group-hover:text-[#00D6B2] transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-2 mb-6 flex-1">
                    {article.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/6">
                    {/* Author */}
                    {/* <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] rounded-full opacity-0 group-hover:opacity-70 blur transition-all duration-500" />
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="relative w-10 h-10 rounded-full border-2 border-white/10 bg-[#1a1f2e] group-hover:border-[#00D6B2]/50 transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">
                          {article.author.name}
                        </span>
                        <span className="text-xs text-[#64748B]">
                          {article.author.role}
                        </span>
                      </div>
                    </div> */}

                    {/* Read More Arrow */}
                    <div className="flex items-center justify-center w-full h-10 rounded-full bg-white/5 border border-white/10 text-[#64748B] group-hover:bg-[#00D6B2] group-hover:border-[#00D6B2] group-hover:text-black transition-all duration-300 gap-2">
                    <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-linear-to-t from-[#00D6B2]/10 via-transparent to-transparent rounded-3xl" />
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/blog">
            <Button
              size="lg"
              className="group cursor-pointer relative overflow-hidden bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] hover:from-[#00c4a3] hover:to-[#3fc1c0] text-black rounded-full px-10 h-14 font-bold tracking-wide shadow-[0_10px_40px_-10px_rgba(0,214,178,0.5)] hover:shadow-[0_20px_60px_-15px_rgba(0,214,178,0.6)] transition-all duration-500 hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                Explore All Articles
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default LatestInsights;
