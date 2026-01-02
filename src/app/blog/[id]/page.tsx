"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer-section";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";
import Image from "next/image";

const BlogDetailPage = () => {
    const params = useParams();
    const [activeId, setActiveId] = useState<string>("");
    const [showScrollTop, setShowScrollTop] = useState(false);
    const tocRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeId && tocRef.current) {
            const activeLink = tocRef.current.querySelector(`[data-toc-id="${activeId}"]`);
            if (activeLink) {
                activeLink.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    }, [activeId]);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handlePageScroll = () => {
            setIsScrolled(window.scrollY > 300);
            setShowScrollTop(window.scrollY > 600);
        };
        window.addEventListener("scroll", handlePageScroll);
        return () => window.removeEventListener("scroll", handlePageScroll);
    }, []);

    const slugify = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
    };

    const getHeadingText = (node: React.ReactNode): string => {
        if (!node) return "";
        if (typeof node === "string") return node;
        if (typeof node === "number") return String(node);
        if (Array.isArray(node)) return node.map(getHeadingText).join("");
        if (React.isValidElement(node) && node.props && typeof node.props === 'object' && 'children' in node.props) {
            return getHeadingText((node.props as { children?: React.ReactNode }).children);
        }
        return "";
    };

    const post = useMemo(() => {
        const postId = parseInt(params.id as string);
        return blogPosts.find((p) => p.id === postId) || null;
    }, [params.id]);

    const toc = useMemo(() => {
        if (!post) return [];
        const headerRegex = /^(#{2,3})\s+(.+)$/gm;
        const headers = [];
        let match;
        while ((match = headerRegex.exec(post.content)) !== null) {
            const cleanText = match[2].replace(/\[|\]|\(|\)|\*|_|:/g, '');
            headers.push({
                level: match[1].length,
                text: cleanText,
                id: slugify(cleanText),
            });
        }
        return headers;
    }, [post]);

    useEffect(() => {
        const handleScroll = () => {
            const headings = Array.from(document.querySelectorAll(".blog-content h2, .blog-content h3"));
            const offset = 160;

            let currentId = "";
            for (const heading of headings) {
                const top = heading.getBoundingClientRect().top;
                if (top <= offset) {
                    currentId = heading.id;
                } else {
                    break;
                }
            }

            if (currentId && currentId !== activeId) {
                setActiveId(currentId);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [post, toc, activeId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0A0F15] flex items-center justify-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#00D6B2]/20 blur-xl rounded-full animate-pulse" />
                    <div className="relative animate-spin rounded-full h-12 w-12 border-2 border-transparent border-t-[#00D6B2] border-r-[#00D6B2]" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white selection:bg-[#00D6B2]/30">
            <Navigation />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] bg-[#00D6B2]/[0.03] blur-[180px] rounded-full" />
                <div className="absolute bottom-[-30%] right-[-20%] w-[70%] h-[70%] bg-[#4FD1D0]/[0.03] blur-[180px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015] mix-blend-overlay" />
            </div>

            <main className="relative z-10 pt-28 pb-24 container mx-auto px-6 lg:px-10 max-w-7xl">
                {/* Back Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10"
                >
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#64748B] transition-colors hover:text-[#00D6B2]"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                        <span className="relative">
                            Back to Blog
                            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#00D6B2] transition-all group-hover:w-full" />
                        </span>
                    </Link>

                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0F15]/90 border border-[#00D6B2]/40 text-[#00D6B2] text-xs font-bold tracking-wider uppercase mb-6 shadow-lg">
                            <BookOpen className="w-3.5 h-3.5" />
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-8 leading-[1.15] tracking-tight">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <div className="flex items-center gap-4 group mb-6">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00D6B2] to-[#4FD1D0] rounded-full opacity-0 group-hover:opacity-40 blur transition-opacity duration-500" />
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="relative w-14 h-14 rounded-full border-2 border-white/10 bg-[#1a1f2e]"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg group-hover:text-[#00D6B2] transition-colors">
                                    {post.author.name}
                                </p>
                                <p className="text-sm text-[#64748B]">
                                    {post.author.role}
                                </p>
                            </div>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-6 text-sm text-[#64748B] font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#00D6B2]" />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#00D6B2]" />
                                {post.readTime}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#00D6B2]/20 to-[#4FD1D0]/10 blur-3xl rounded-3xl opacity-50" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                width={800}
                                height={450}
                                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F15]/50 via-transparent to-transparent" />
                        </div>
                    </motion.div>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[1fr_280px] gap-16">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="blog-content max-w-none"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ ...props }) => {
                                    const text = getHeadingText(props.children);
                                    const id = slugify(text);
                                    return (
                                        <h2 id={id} className="text-2xl md:text-3xl font-black mt-14 mb-6 tracking-tight text-white relative group">
                                            <span className="absolute -left-6 opacity-0 group-hover:opacity-100 text-[#00D6B2] transition-opacity">#</span>
                                            {props.children}
                                        </h2>
                                    );
                                },
                                h3: ({ ...props }) => {
                                    const text = getHeadingText(props.children);
                                    const id = slugify(text);
                                    return (
                                        <h3 id={id} className="text-xl md:text-2xl font-bold mt-10 mb-4 tracking-tight text-white relative group">
                                            <span className="absolute -left-5 opacity-0 group-hover:opacity-100 text-[#00D6B2]/70 transition-opacity text-lg">#</span>
                                            {props.children}
                                        </h3>
                                    );
                                },
                                p: ({ ...props }) => (
                                    <p className="text-[17px] text-[#94A3B8] leading-[1.8] mb-6">
                                        {props.children}
                                    </p>
                                ),
                                ul: ({ ...props }) => (
                                    <ul className="list-none pl-0 mb-6 space-y-3">
                                        {props.children}
                                    </ul>
                                ),
                                li: ({ ...props }) => (
                                    <li className="text-[#94A3B8] text-[17px] leading-relaxed flex items-start gap-3">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00D6B2] mt-2.5 flex-shrink-0" />
                                        <span>{props.children}</span>
                                    </li>
                                ),
                                strong: ({ ...props }) => (
                                    <strong className="text-white font-bold">
                                        {props.children}
                                    </strong>
                                ),
                                a: ({ ...props }) => (
                                    <a
                                        className="text-[#00D6B2] hover:text-[#4FD1D0] underline underline-offset-4 decoration-[#00D6B2]/30 hover:decoration-[#00D6B2] transition-all duration-300"
                                        {...props}
                                    >
                                        {props.children}
                                    </a>
                                ),
                                blockquote: ({ ...props }) => (
                                    <blockquote className="border-l-4 border-[#00D6B2] pl-6 my-8 italic text-[#94A3B8]">
                                        {props.children}
                                    </blockquote>
                                ),
                                pre: ({ children }) => (
                                    <pre className="bg-white/[0.03] border border-white/[0.06] p-5 rounded-xl overflow-x-auto my-6">
                                        {children}
                                    </pre>
                                ),
                                code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
                                    const match = /language-(\w+)/.exec(className || "");
                                    if (match) {
                                        return (
                                            <code className={`${className} font-mono text-sm text-[#E5E7EB]`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                    return (
                                        <code className="px-2 py-1 rounded-md bg-[#00D6B2]/10 text-[#00D6B2] font-mono text-sm border border-[#00D6B2]/20" {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                hr: () => (
                                    <hr className="border-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />
                                ),
                            }}
                        >
                            {post.content.trim()}
                        </ReactMarkdown>
                    </motion.div>

                    {/* Sidebar - Table of Contents */}
                    <div className="hidden lg:block">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                            >
                                <motion.div
                                    animate={{ opacity: isScrolled ? 0.5 : 1, y: isScrolled ? -5 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-5"
                                >
                                    <h3 className="text-sm font-bold flex items-center gap-2 text-white uppercase tracking-wider">
                                        <div className="w-1 h-5 bg-[#00D6B2] rounded-full" />
                                        On This Page
                                    </h3>
                                </motion.div>

                                <div
                                    ref={tocRef}
                                    className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2 no-scrollbar"
                                >
                                    <nav className="space-y-1">
                                        {toc.map((item, idx) => {
                                            const isActive = activeId === item.id;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={`#${item.id}`}
                                                    data-toc-id={item.id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const element = document.getElementById(item.id);
                                                        if (element) {
                                                            element.scrollIntoView({ behavior: 'smooth' });
                                                            setActiveId(item.id);
                                                        }
                                                    }}
                                                    className={`block py-2 text-sm transition-all duration-300 relative rounded-lg px-3
                                                        ${isActive
                                                            ? "text-[#00D6B2] font-semibold bg-[#00D6B2]/10"
                                                            : item.level === 2
                                                                ? "text-white/80 font-medium hover:text-[#00D6B2] hover:bg-white/[0.03]"
                                                                : "text-[#64748B] hover:text-[#00D6B2] hover:bg-white/[0.03]"
                                                        }
                                                        ${item.level !== 2 ? "ml-3 text-xs" : ""}
                                                    `}
                                                >
                                                    {item.text}
                                                </a>
                                            );
                                        })}
                                    </nav>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: showScrollTop ? 1 : 0,
                    scale: showScrollTop ? 1 : 0.8,
                    pointerEvents: showScrollTop ? "auto" : "none"
                }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#00D6B2] text-black flex items-center justify-center shadow-lg shadow-[#00D6B2]/30 hover:shadow-[#00D6B2]/50 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
                <ChevronUp className="w-5 h-5" />
            </motion.button>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
