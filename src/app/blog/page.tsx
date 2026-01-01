"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Calendar, Clock, User, Loader2 } from "lucide-react";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";

const categories = [
    "All",
    "Best Practices",
    "Tutorial",
    "Insights",
    "Security",
    "Development",
    "Community",
];

const blogPosts = [
    {
        id: 1,
        category: "Best Practices",
        title: "How Open Source Connect Global is Uniting Developers",
        description: "Learn how to make meaningful contributions to open source projects and become a valued community member.",
        date: "October 20, 2025",
        readTime: "8 min read",
        author: "Sarah Chen",
    },
    {
        id: 2,
        category: "Tutorial",
        title: "How Contributing to Open Source Boosts Your Resume",
        description: "A comprehensive guide to designing and implementing scalable API architectures that can handle millions of requests.",
        date: "October 18, 2025",
        readTime: "12 min read",
        author: "Marcus Rodriguez",
    },
    {
        id: 3,
        category: "Insights",
        title: "Top 5 Reasons to Contribute to Open Source Projects",
        description: "Discover the top reasons why contributing to open source projects is beneficial for your career and the community.",
        date: "October 15, 2025",
        readTime: "10 min read",
        author: "Priya Sharma",
    },
    {
        id: 4,
        category: "Security",
        title: "Stories of Innovation Born in Open Source",
        description: "Explore the inspiring stories of innovation born in open source projects and how they have transformed the industry.",
        date: "November 12, 2025",
        readTime: "6 min read",
        author: "Sarah Chen",
    },
    {
        id: 5,
        category: "Development",
        title: "How Non-CS Students Can Thrive in Open Source",
        description: "Discover how non-CS students can make meaningful contributions to open source projects and succeed in the tech industry.",
        date: "November 10, 2025",
        readTime: "7 min read",
        author: "Marcus Rodriguez",
    },
    {
        id: 6,
        category: "Community",
        title: "How to Make Your First Open Source Code Contribution",
        description: "A step-by-step guide to making your first open source contribution and getting started with open source development.",
        date: "December 8, 2025",
        readTime: "9 min read",
        author: "Priya Sharma",
    },
    {
        id: 7,
        category: "Trends",
        title: "What Happens at Open Source Connect Events?",
        description: "Discover what happens at Open Source Connect events and how they are shaping the future of open source development.",
        date: "December 18, 2025",
        readTime: "5 min read",
        author: "Sarah Chen",
    },
    {
        id: 8,
        category: "Development",
        title: "The Role of Open Source in AI and ML Development",
        description: "Explore the role of open source in AI and ML development and how it is shaping the future of these technologies.",
        date: "December 12, 2025",
        readTime: "8 min read",
        author: "Marcus Rodriguez",
    },
    {
        id: 9,
        category: "Community",
        title: "Building a Career through Open Source Contributions",
        description: "Discover how open source contributions can help you build a career in the tech industry and make a positive impact on the community.",
        date: "March 10, 2025",
        readTime: "6 min read",
        author: "Priya Sharma",
    },
    {
        id: 10,
        category: "Development",
        title: "How to Choose the Right Open Source Project to Contribute To",
        description: "Learn how to choose the right open source project to contribute to and make the most of your contributions.",
        date: "December 18, 2025",
        readTime: "5 min read",
        author: "Sarah Chen",
    },
    {
        id: 11,
        category: "Community",
        title: "Grow Your Career by Giving Back Through Open Source",
        description: "Learn how to grow your career by giving back through open source contributions.",
        date: "March 10, 2025",
        readTime: "6 min read",
        author: "Priya Sharma",
    },
    {
        id: 12,
        category: "Development",
        title: "The Importance of UI/UX in Open Source Projects",
        description: "Learn how UI/UX design plays a crucial role in open source projects and how it can improve user experience and engagement.",
        date: "December 18, 2025",
        readTime: "5 min read",
        author: "Sarah Chen",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    const filteredPosts = activeCategory === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === activeCategory);

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMorePosts = visibleCount < filteredPosts.length;

    const loadMorePosts = () => {
        if (isLoading) return;

        setIsLoading(true);


        setTimeout(() => {
            setVisibleCount(prev => prev + 6);
            setIsLoading(false);
        }, 1000);
    };

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setVisibleCount(6);
    };

    return (
        <div className="min-h-screen text-white overflow-x-hidden selection:bg-[#00D6B2]/30">
            <Navigation />

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00D6B2]/5 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4FD1D0]/5 blur-[150px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <main className="relative z-10 pt-24 pb-24 container mx-auto px-10 max-w-7xl">
                <motion.div
                    className="section-header text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">
                        Latest <span className="text-accent-gradient">Insights</span>
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Stay updated with the latest news, tutorials, and insights from the open source community
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-24"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-8 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-500 border ${activeCategory === cat
                                ? "bg-[#00D6B2] border-[#00D6B2] cursor-pointer text-black shadow-[0_0_30px_rgba(0,214,178,0.4)]"
                                : "bg-white/5 border-white/10 text-[#64748B] cursor-pointer hover:text-white hover:border-[#00D6B2]/30 hover:bg-white/5"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="grid gap-6 md:grid-cols-3 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence mode="popLayout">
                        {visiblePosts.map((article) => (
                            <motion.div
                                key={article.id}
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: 20 }}
                                className="group unified-card overflow-hidden cursor-pointer"
                            >
                                <div className="relative h-48 bg-gradient-to-br cursor-pointer from-white/5 to-white/0 flex items-center justify-center border-b border-white/5">
                                    <div className="text-[var(--text-muted)] text-sm">Article Image</div>
                                    <div className="absolute left-4 top-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-medium text-white cursor-pointer">
                                        {article.category}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {article.readTime}
                                        </div>
                                    </div>

                                    <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-[var(--accent-secondary)] transition-colors line-clamp-2 cursor-pointer">
                                        {article.title}
                                    </h3>

                                    <p className="mb-5 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
                                        {article.description}
                                    </p>

                                    <div className="h-px bg-white/10 mb-4" />

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                            <User className="h-4 w-4" />
                                            {article.author}
                                        </div>

                                        <Button
                                            variant="link"
                                            className="h-auto p-0 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] cursor-pointer font-medium"
                                        >
                                            Read
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>


                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-12 gap-4"
                    >
                        <Loader2 className="h-8 w-8 text-[#00D6B2] animate-spin" />
                        <p className="text-[var(--text-muted)] text-sm animate-pulse">Loading articles...</p>
                    </motion.div>
                )}


                {hasMorePosts && !isLoading && (
                    <motion.div
                        className="text-center"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <Button
                            size="lg"
                            onClick={loadMorePosts}
                            disabled={isLoading}
                            className="cursor-pointer text-black bg-[var(--accent-primary)] hover:bg-[#00c4a3] rounded-2xl px-10 h-14 font-semibold shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Load More Articles
                        </Button>
                    </motion.div>
                )}



            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;