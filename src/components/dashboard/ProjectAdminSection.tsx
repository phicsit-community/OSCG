"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Trophy, Github, Star, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { updateUserScore } from "@/lib/actions/admin";
import { supabase } from "@/lib/supabase/client";

interface Contributor {
    id: string;
    full_name: string;
    email: string;
    github: string;
    score: number;
}

export default function ProjectAdminSection() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [selectedScores, setSelectedScores] = useState<Record<string, string>>({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 12;

    const fetchContributors = useCallback(async (page: number, search: string) => {
        setLoading(true);
        try {
            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            let query = supabase
                .from("profiles")
                .select("id, full_name, email, github, score", { count: "exact" })
                .eq("role", "contributor")
                .order("updated_at", { ascending: false });

            if (search) {
                query = query.or(`full_name.ilike.%${search}%,github.ilike.%${search}%,email.ilike.%${search}%`);
            }

            const { data, error, count } = await query.range(from, to);

            if (error) throw error;
            setContributors(data || []);
            setTotalCount(count || 0);
        } catch (error) {
            console.error("Error fetching contributors:", error);
            toast.error("Failed to load contributors");
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchContributors(1, "");
    }, [fetchContributors]);

    // Handle search debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            fetchContributors(1, searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, fetchContributors]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        fetchContributors(newPage, searchTerm);
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const handleScoreUpdate = async (userId: string, currentScore: number) => {
        const scoreToAdd = parseInt(selectedScores[userId] || "10");
        const newScore = scoreToAdd === 0 ? 0 : currentScore + scoreToAdd;
        setUpdatingId(userId);

        // Optimistic update
        setContributors(prev =>
            prev.map(c => c.id === userId ? { ...c, score: newScore } : c)
        );

        try {
            const result = await updateUserScore(userId, newScore);
            if (!result.success) {
                // Rollback
                setContributors(prev =>
                    prev.map(c => c.id === userId ? { ...c, score: currentScore } : c)
                );
                toast.error(result.error || "Failed to update score");
            } else {
                toast.success(scoreToAdd === 0 ? "Score reset!" : `+${scoreToAdd} points assigned!`);
            }
        } catch (error) {
            console.error("Score update error:", error);
            toast.error("Connection error");
            setContributors(prev =>
                prev.map(c => c.id === userId ? { ...c, score: currentScore } : c)
            );
        }

        setSelectedScores(prev => {
            const next = { ...prev };
            delete next[userId];
            return next;
        });

        setUpdatingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 leading-none">
                            <Trophy className="w-6 h-6 text-[#00D6B2]" />
                            Contributors
                        </h2>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-wider mt-1 hidden md:block">
                            Assign points based on impact
                        </p>
                    </div>

                    {/* Pagination Controls in Header */}
                    {totalCount > itemsPerPage && (
                        <div className="flex items-center gap-3 bg-[#0B0F17] h-10 px-3 border border-white/5 rounded-xl shadow-lg">
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 text-white/40 hover:text-[#00D6B2] hover:bg-[#00D6B2]/10 disabled:opacity-20 cursor-pointer transition-all"
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1 || loading}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center gap-2 px-2 border-x border-white/5 mx-1">
                                    <span className="text-[10px] font-black text-[#00D6B2] tabular-nums whitespace-nowrap uppercase tracking-tighter">
                                        Page {currentPage} of {totalPages || 1}
                                    </span>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 text-white/40 hover:text-[#00D6B2] hover:bg-[#00D6B2]/10 disabled:opacity-20 cursor-pointer transition-all"
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0 || loading}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative w-full md:w-72 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00D6B2] transition-colors" />
                    <Input
                        placeholder="Search all contributors..."
                        className="h-10 pl-11 bg-[#0B0F17] border-white/5 rounded-xl focus:border-[#00D6B2]/30 text-white transition-all outline-none text-sm"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                    {loading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="w-3 h-3 border-2 border-[#00D6B2] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>

            {/* Warning Message Box */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3 shadow-lg"
            >
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">Administrative Advisory</h4>
                    <p className="text-amber-200/80 text-xs font-medium leading-relaxed">
                        Only assign points to participants actively contributing to <span className="font-bold underline">your specific project</span>.
                        Unauthorized or &quot;fake&quot; scoring of external participants is strictly prohibited and will result in <span className="font-bold underline italic text-amber-400 uppercase">immediate disqualification and permanent ban</span> from the Project Admin Console.
                        Every assignment is audited and traceable to your account.
                    </p>
                </div>
            </motion.div>

            {loading && contributors.length === 0 ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-[#00D6B2] border-t-transparent rounded-full animate-spin" />
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Syncing Contributors...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            {contributors.map((c) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={c.id}
                                    className="bg-[#0B0F17] border border-white/5 rounded-2xl p-5 hover:border-[#00D6B2]/20 transition-all group relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-11 w-11 border border-white/10 group-hover:border-[#00D6B2]/30 transition-colors">
                                                <AvatarImage src={`https://github.com/${c.github}.png`} />
                                                <AvatarFallback className="bg-slate-800 text-xs font-black">{c.full_name?.[0] || 'U'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-white font-bold text-sm truncate max-w-[100px] leading-tight">{c.full_name || "Anonymous"}</h3>
                                                <div className="flex items-center gap-1.5 text-white/30">
                                                    <Github className="w-2.5 h-2.5" />
                                                    <span className="text-[9px] font-bold uppercase tracking-wider truncate max-w-[80px]">{c.github || "no-github"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-[#00D6B2] justify-end">
                                                <Star className="w-3.5 h-3.5 fill-[#00D6B2]" />
                                                <span className="text-xl font-black tabular-nums tracking-tighter">{c.score || 0}</span>
                                            </div>
                                            <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em]">Score</p>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center gap-2 relative z-10">
                                        <Select
                                            value={selectedScores[c.id] || "10"}
                                            onValueChange={(val) => setSelectedScores(prev => ({ ...prev, [c.id]: val }))}
                                        >
                                            <SelectTrigger className="h-9 flex-1 bg-white/2 border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0B0F17] border-white/10 text-slate-400">
                                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(n => (
                                                    <SelectItem key={n} value={n.toString()} className="text-[10px] font-black uppercase tracking-wider focus:bg-[#00D6B2]/10 focus:text-[#00D6B2] cursor-pointer">
                                                        {n === 0 ? "Reset (0)" : `+${n} Points`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            className="h-9 px-4 bg-[#00D6B2] hover:bg-[#0eb87f] text-[#090E1A] font-black text-[10px] uppercase tracking-widest rounded-lg transition-all shadow-[0_4px_12px_rgba(0,214,178,0.2)] cursor-pointer"
                                            onClick={() => handleScoreUpdate(c.id, c.score || 0)}
                                            disabled={updatingId === c.id}
                                        >
                                            {updatingId === c.id ? (
                                                <div className="w-4 h-4 border-2 border-[#090E1A] border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                "Assign"
                                            )}
                                        </Button>
                                    </div>

                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D6B2]/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {totalCount === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl">
                            <AlertCircle className="w-8 h-8 text-white/20 mb-3" />
                            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-xs">No contributors found</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
