"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import {
    Github,
    Star,
    AlertCircle,
    Search,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { updateUserScore } from "@/lib/actions/admin";

interface Contributor {
    id: string;
    full_name: string | null;
    github: string | null;
    score: number | null;
    role: string | null;
}

const ITEMS_PER_PAGE = 30;

export default function ProjectAdminSection() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [selectedScores, setSelectedScores] = useState<Record<string, string>>({});
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchContributors = useCallback(async () => {
        try {
            setLoading(true);
            let query = supabase
                .from("profiles")
                .select("id, full_name, github, score, role", { count: "exact" })
                .eq("role", "contributor")
                .order("score", { ascending: false });

            if (searchQuery) {
                query = query.or(`full_name.ilike.%${searchQuery}%,github.ilike.%${searchQuery}%`);
            }

            const from = (currentPage - 1) * ITEMS_PER_PAGE;
            const to = from + ITEMS_PER_PAGE - 1;

            const { data, error, count } = await query.range(from, to);

            if (error) throw error;
            setContributors(data || []);
            setTotalCount(count || 0);

            // Initialize select values
            const initialScores: Record<string, string> = {};
            data?.forEach(c => {
                initialScores[c.id] = "10";
            });
            setSelectedScores(initialScores);

        } catch (error) {
            console.error("Error fetching contributors:", error);
            toast.error("Failed to load contributors");
        } finally {
            setLoading(false);
        }
    }, [searchQuery, currentPage]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchContributors();
        }, 300); // Debounce search
        return () => clearTimeout(timer);
    }, [fetchContributors]);

    const handleScoreUpdate = async (userId: string, currentScore: number) => {
        const pointsToAdd = parseInt(selectedScores[userId]);
        const newScore = pointsToAdd === 0 ? 0 : currentScore + pointsToAdd;

        try {
            setUpdatingId(userId);
            const result = await updateUserScore(userId, newScore);

            if (result.success) {
                toast.success(pointsToAdd === 0 ? "Score reset successfully" : `Added ${pointsToAdd} points!`);
                setContributors(prev =>
                    prev.map(c => c.id === userId ? { ...c, score: newScore } : c)
                );
            } else {
                toast.error(result.error || "Failed to update score");
            }
        } catch (error) {
            console.error("Error updating score:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setUpdatingId(null);
        }
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <div className="space-y-8">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-[#00D6B2]/10 border border-[#00D6B2]/20 flex items-center justify-center">
                            <Star className="w-5 h-5 text-[#00D6B2] animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Contributor Tracker</h2>
                            <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] leading-none mt-1">Review impact & assign merit points</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Search Bar */}
                    <div className="relative group w-full md:w-80">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-4 h-4 text-white/20 group-focus-within:text-[#00D6B2] transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or github..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00D6B2] focus:ring-1 focus:ring-[#00D6B2]/50 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-white/2 border border-white/5 rounded-2xl p-2 pr-6 w-full md:w-auto">

                        <div>
                            <p className="text-white font-black text-sm tracking-tighter leading-none">{totalCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Warning Message Box */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-4 shadow-lg backdrop-blur-sm"
                >
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">Administrative Advisory</h4>
                        <p className="text-amber-200/80 text-[11px] font-medium leading-relaxed">
                            Only assign points to participants actively contributing to <span className="font-bold underline">your specific project</span>.
                            Unauthorized scoring is audited and tracing will result in <span className="font-bold underline italic text-amber-500 uppercase">permanent ban</span>.
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[400px]">
                            <AnimatePresence mode="popLayout">
                                {contributors.map((c) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={c.id}
                                        className="bg-[#0B0F17] border border-white/5 rounded-2xl p-5 hover:border-[#00D6B2]/20 transition-all group relative overflow-hidden shadow-xl"
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-11 w-11 border border-white/10 group-hover:border-[#00D6B2]/30 transition-colors shadow-inner">
                                                    <AvatarImage src={`https://github.com/${c.github}.png`} />
                                                    <AvatarFallback className="bg-slate-800 text-xs font-black">{c.full_name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                                <div className="max-w-[120px]">
                                                    <h3 className="text-white font-bold text-sm truncate leading-tight">{c.full_name || "Anonymous"}</h3>
                                                    <div className="flex items-center gap-1.5 text-white/30">
                                                        <Github className="w-2.5 h-2.5" />
                                                        <span className="text-[9px] font-bold uppercase tracking-wider truncate">{c.github || "no-github"}</span>
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
                                                <SelectTrigger className="h-9 flex-1 bg-white/2 border-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-white/5 transition-all cursor-pointer rounded-xl">
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
                                                className="h-9 px-4 bg-[#00D6B2] hover:bg-[#0eb87f] text-[#090E1A] font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_12px_rgba(0,214,178,0.2)] cursor-pointer"
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-4 pt-8">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1 || loading}
                                    className="bg-white/5 border-white/10 hover:bg-[#00D6B2] hover:text-[#090E1A] transition-all rounded-xl h-10 px-4 group"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Page</span>
                                    <span className="text-sm font-black text-[#00D6B2]">{currentPage}</span>
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">of</span>
                                    <span className="text-sm font-black text-white/40">{totalPages}</span>
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages || loading}
                                    className="bg-white/5 border-white/10 hover:bg-[#00D6B2] hover:text-[#090E1A] transition-all rounded-xl h-10 px-4 group"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
