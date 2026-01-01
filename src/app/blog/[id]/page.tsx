"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/landing/navigation";
import Footer from "@/components/landing/footer-section";
import { blogPosts } from "@/data/blog-posts";
import Link from "next/link";

const BlogDetailPage = () => {
    const params = useParams();
    const [activeId, setActiveId] = useState<string>("");
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

    if (!post) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D6B2]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white  selection:bg-[#00D6B2]/30">
            <Navigation />


            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00D6B2]/5 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4FD1D0]/5 blur-[150px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <main className="relative z-10 pt-32 pb-24 container mx-auto px-6 lg:px-10 max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12 flex items-center justify-between"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-(--text-muted) hover:text-[#00D6B2] transition-colors group relative py-1"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="relative">
                            Back to Blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D6B2] transition-all duration-300 group-hover:w-full" />
                        </span>
                    </Link>


                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-[#00D6B2]/10 border border-[#00D6B2]/20 text-[#00D6B2] text-xs font-semibold mb-6">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 group">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-linear-to-r from-[#00D6B2] to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="relative w-12 h-12 rounded-full border-2 border-white/10"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-white group-hover:text-[#00D6B2] transition-colors">
                                    {post.author.name}
                                </p>
                                <p className="text-sm text-(--text-muted)">
                                    {post.author.role}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 mt-8 text-sm text-(--text-muted) font-medium">
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute -inset-4 bg-[#00D6B2]/20 blur-3xl rounded-full opacity-50" />
                        <div className="relative rounded-4xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
                            />

                        </div>
                    </motion.div>
                </div>


                <div className="grid lg:grid-cols-[1fr_300px] gap-16">

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
                                        <h2 id={id} className="text-3xl font-black mt-12 mb-6 tracking-tight text-white">
                                            {props.children}
                                        </h2>
                                    );
                                },
                                h3: ({ ...props }) => {
                                    const text = getHeadingText(props.children);
                                    const id = slugify(text);
                                    return (
                                        <h3 id={id} className="text-2xl font-bold mt-10 mb-4 tracking-tight text-white">
                                            {props.children}
                                        </h3>
                                    );
                                },
                                p: ({ ...props }) => (
                                    <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">
                                        {props.children}
                                    </p>
                                ),
                                ul: ({ ...props }) => (
                                    <ul className="list-disc pl-5 mb-6 space-y-2">
                                        {props.children}
                                    </ul>
                                ),
                                li: ({ ...props }) => (
                                    <li className="text-[#94A3B8] text-lg">
                                        {props.children}
                                    </li>
                                ),
                                strong: ({ ...props }) => (
                                    <strong className="text-white font-bold">
                                        {props.children}
                                    </strong>
                                ),
                                a: ({ ...props }) => (
                                    <a className="text-[#00D6B2] hover:underline transition-color" {...props}>
                                        {props.children}
                                    </a>
                                ),

                                pre: ({ children }) => (
                                    <pre className="bg-white/5 p-4 rounded-xl overflow-x-auto">
                                        {children}
                                    </pre>
                                ),
                                code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
                                    const match = /language-(\w+)/.exec(className || "");
                                    if (match) {
                                        return (
                                            <code className={`${className} font-mono text-sm`} {...props}>
                                                {children}
                                            </code>
                                        );
                                    }

                                    return (
                                        <code className="px-1.5 py-0.5 rounded-md bg-white/10 text-[#E5E7EB] font-mono text-sm" {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {post.content.trim()}
                        </ReactMarkdown>

                    </motion.div>


                    <div className="hidden lg:block">
                        <div className="sticky top-32">
                            <motion.div
                                animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -10 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="mb-6 "
                            >
                                <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                    <div className="w-1.5 h-6 bg-[#00D6B2] rounded-full" />
                                    Table Of Contents
                                </h3>
                            </motion.div>

                            <div
                                ref={tocRef}
                                className="max-h-[calc(100vh-250px)] overflow-y-auto pr-6 no-scrollbar"
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
                                                className={`block py-2 text-sm transition-all duration-300 relative
                                                    ${isActive
                                                        ? "text-[#00D6B2] font-bold"
                                                        : item.level === 2
                                                            ? "text-white/90 font-bold"
                                                            : "text-[#64748B] hover:text-[#00D6B2]"
                                                    }
                                                    ${item.level !== 2 ? "pl-4 border-l ml-1" : ""}
                                                    ${isActive && item.level !== 2 ? "border-[#00D6B2]" : "border-white/10"}
                                                `}
                                            >
                                                {item.text}
                                                {isActive && item.level === 2 && (
                                                    <motion.div
                                                        layoutId="active-toc"
                                                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00D6B2] rounded-full shadow-[0_0_10px_#00D6B2]"
                                                    />
                                                )}
                                            </a>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BlogDetailPage;
