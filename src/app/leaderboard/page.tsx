"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Users } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase/client";

interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
  country: string;
  mergedPRs: number;
  projectsCount: number;
}

export default function LeaderBoardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [totalContributors, setTotalContributors] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "contributor")
        .eq("is_admin", false);

      setTotalContributors(count || 0);

      // 1. Fetch all unique GitHub handles that belong to ANY Admin or Project Admin
      const { data: adminProfiles } = await supabase
        .from("profiles")
        .select("github")
        .or("role.eq.admin,role.eq.project-admin,is_admin.eq.true");

      const adminHandles = new Set(
        (adminProfiles || [])
          .map(p => p.github?.toLowerCase().trim())
          .filter(Boolean)
      );

      // 2. Fetch potential contributors
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, github, score, email, merged_prs, projects_count")
        .eq("role", "contributor")
        .eq("is_admin", false)
        .order("score", { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else if (data) {
        interface LeaderboardProfile {
          id: string;
          full_name: string | null;
          github: string | null;
          score: number | null;
          email: string | null;
          merged_prs: number | null;
          projects_count: number | null;
        }
        const seenGithub = new Set<string>();
        const dbPlayers = (data as LeaderboardProfile[])
          .filter((user) => {
            const handle = user.github?.toLowerCase().trim() || "";
            const name = user.full_name?.toLowerCase() || "";

            // SECURITY LOCK: If this identity is an admin on ANY account, boot them from contributor list
            if (adminHandles.has(handle) || name.includes("gopichand")) return false;

            if (handle === "" || seenGithub.has(handle)) return false;
            seenGithub.add(handle);
            return true;
          })
          .map((user) => {
            const rawScore = user.score || 0;
            const score = (user.merged_prs === 0 && user.projects_count === 0 && rawScore > 0) ? 0 : rawScore;

            return {
              id: user.id,
              name: user.full_name || "Anonymous",
              score: score,
              avatar: user.github
                ? `https://github.com/${user.github}.png`
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || user.id}`,
              country: "in",
              mergedPRs: user.merged_prs || 0,
              projectsCount: user.projects_count || 0,
            };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 50);

        setPlayers(dbPlayers);
      }
    } catch (err) {
      console.error("Unexpected error in fetchLeaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      if (isMounted) await fetchLeaderboard();
    };
    init();

    const channel = supabase
      .channel("leaderboard_feed")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (isMounted) fetchLeaderboard();
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  return (
    <div className="min-h-screen text-white pt-24 pb-14 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00D6B2]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4FD1D0]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        <div className="bg-[#0B0F17]/30 backdrop-blur-3xl border border-white/3 rounded-4xl p-8 md:p-10 mb-16 shadow-2xl relative overflow-hidden group">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                OSCG 2026<br />
                <span className="bg-linear-to-r from-[#00D6B2] via-[#4FD1D0] to-[#00D6B2] bg-clip-text text-transparent italic animate-pulse">Leaderboard.</span>
              </h1>
            </div>

            <div className="flex items-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/2 border border-white/5 rounded-[2.5rem] p-8 min-w-[280px] shadow-3xl text-center relative overflow-hidden group/card hover:border-[#00D6B2]/20 transition-all duration-500">
                <p className="text-xs font-black text-white/20 uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3">
                  <Users className="w-4 h-4 text-[#00D6B2]" />
                  Global Contributors
                </p>
                <div className="text-7xl font-black tracking-tightest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  {totalContributors}
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-[#00D6B2]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* PODIUM SECTION */}
        <div className="grid grid-cols-3 gap-3 md:gap-12 items-end mb-16 md:mb-32 h-[380px] md:h-[550px]">
          <PodiumStep player={players[1]} rank={2} color="from-slate-300 to-slate-600" />
          <PodiumStep player={players[0]} rank={1} color="from-yellow-300 to-amber-600" isCenter={true} />
          <PodiumStep player={players[2]} rank={3} color="from-orange-300 to-amber-800" />
        </div>

        {/* LIST SECTION - RESPONSIVE LAYOUT (NO SCROLL) */}
        <div className="space-y-3 md:space-y-4">
          <div className="w-full space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {players.slice(3).map((player, index) => (
                <ListItem key={player.id} player={player} rank={index + 4} />
              ))}
            </AnimatePresence>
          </div>

          {players.length === 0 && !loading && (
            <div className="text-center py-20 md:py-32 bg-white/2 border-2 border-dashed border-white/5 rounded-3xl md:rounded-[3rem] animate-pulse">
              <p className="text-white/10 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm">Synchronizing contributor global data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PodiumStep({ player, rank, color, isCenter = false }: { player: Player; rank: number; color: string; isCenter?: boolean }) {
  if (!player) return <div className="w-full h-20 bg-white/2 rounded-3xl animate-pulse" />;

  return (
    <motion.div layout className={`flex flex-col items-center justify-end w-full ${isCenter ? 'h-full z-10' : 'h-[85%] z-0'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6 md:mb-10 relative">
        {rank === 1 && (
          <motion.div animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-12 md:-top-16 text-yellow-400">
            <Crown className="w-10 h-10 md:w-14 md:h-14 fill-current drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          </motion.div>
        )}
        <div className={`relative p-1 rounded-full bg-linear-to-b ${color} shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/avatar`}>
          <div className={`border-2 md:border-4 border-[#050505] rounded-full overflow-hidden transition-transform duration-700 group-hover/avatar:scale-110 ${isCenter ? 'w-24 h-24 md:w-44 md:h-44' : 'w-16 h-16 md:w-32 md:h-32'}`}>
            <Avatar className="w-full h-full">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="bg-[#121825] text-lg font-bold">{player.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[8px] md:text-xs font-black bg-[#050505] border border-white/20 text-white shadow-2xl z-20 whitespace-nowrap">
            RANK #{rank}
          </div>
        </div>
        <div className="mt-8 md:mt-12 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <div className="relative w-4 h-3 md:w-5 md:h-3.5 opacity-100 shrink-0">
              <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
            </div>
            <p className={`font-black text-white truncate max-w-[100px] md:max-w-[180px] tracking-tight ${isCenter ? 'text-sm md:text-3xl' : 'text-xs md:text-xl'}`}>{player.name}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`w-full rounded-t-2xl md:rounded-t-[3rem] relative overflow-hidden bg-linear-to-b ${color} opacity-90 backdrop-blur-xl border-t border-white/20 shadow-3xl`}
        initial={{ height: 0 }}
        animate={{ height: isCenter ? (window?.innerWidth < 768 ? '180px' : '360px') : (window?.innerWidth < 768 ? (rank === 2 ? '150px' : '120px') : (rank === 2 ? '300px' : '240px')) }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
      >
        <div className="absolute top-4 md:top-10 w-full text-center px-2 md:px-4">
          <div className="text-3xl md:text-7xl font-black text-[#050505]/90 tracking-tighter leading-none">{player.score}</div>
          <p className="text-[7px] md:text-[10px] uppercase font-black text-[#050505]/40 tracking-[0.2em] mt-1 md:mt-2">Points</p>

          <div className="mt-4 md:mt-8 flex items-center justify-center gap-3 md:gap-6 border-t border-[#050505]/10 pt-4 md:pt-6">
            <div className="text-center">
              <p className="text-[6px] md:text-[10px] font-black text-[#050505]/50 uppercase tracking-widest mb-1">PRs</p>
              <p className="text-xs md:text-2xl font-black text-[#050505]/80 leading-none tabular-nums">{player.mergedPRs}</p>
            </div>
            <div className="text-center">
              <p className="text-[6px] md:text-[10px] font-black text-[#050505]/50 uppercase tracking-widest mb-1">PROJs</p>
              <p className="text-xs md:text-2xl font-black text-[#050505]/80 leading-none tabular-nums">{player.projectsCount}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

function ListItem({ player, rank }: { player: Player; rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between md:grid md:grid-cols-12 md:items-center px-4 py-4 md:px-10 md:py-8 rounded-2xl md:rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-[#00D6B2]/30 hover:bg-white/4 transition-all duration-500 group relative overflow-hidden gap-3"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D6B2]/2 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-[#00D6B2]/5 transition-colors" />

      {/* RANK (Mobile & Desktop) */}
      <div className="shrink-0 md:col-span-1">
        <div className={`w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center font-black text-xs md:text-lg border transition-all duration-500 ${rank === 4 ? 'bg-[#00D6B2]/10 border-[#00D6B2]/30 text-[#00D6B2] shadow-[0_0_20px_rgba(0,214,178,0.2)]' :
          rank === 5 ? 'bg-slate-400/10 border-slate-400/30 text-slate-300' :
            'bg-white/5 border-white/10 text-white/10 group-hover:text-white/40'
          }`}>
          {rank.toString().padStart(2, '0')}
        </div>
      </div>

      {/* USER INFO (Mobile Layout: Name + Stacked Stats | Desktop: Name only) */}
      <div className="flex-1 md:col-span-3 min-w-0 px-2 md:pl-4">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative w-4 h-3 md:w-5 md:h-3.5 opacity-100 shrink-0">
            <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm md:text-xl font-black text-white group-hover:text-[#00D6B2] transition-colors tracking-tight truncate max-w-[140px] md:max-w-none">
              {player.name}
            </span>
            {/* Mobile Only Stats Line */}
            <div className="flex items-center gap-2 md:hidden mt-0.5">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{player.mergedPRs} PRs</span>
              <span className="text-[10px] text-white/20">•</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{player.projectsCount} Projs</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP STATS GRID (Hidden on Mobile) */}
      <div className="hidden md:block col-span-3 text-center border-l border-white/3">
        <p className="text-[12px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.3em] mb-2">Merged PRs</p>
        <span className="text-3xl font-black text-[#00D6B2] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,214,178,0.1)]">{player.mergedPRs}</span>
      </div>

      <div className="hidden md:block col-span-2 text-center">
        <p className="text-[12px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.3em] mb-2">Projects</p>
        <span className="text-3xl font-black text-white/80 tracking-tighter tabular-nums transition-colors group-hover:text-white uppercase">{player.projectsCount}</span>
      </div>

      {/* TOTAL POINTS (Mobile & Desktop) */}
      <div className="shrink-0 md:col-span-3 text-right md:text-center border-l-0 md:border-l border-white/3 pl-2 md:pl-0">
        <p className="hidden md:block text-[12px] font-black text-[#00D6B2]/40 group-hover:text-[#00D6B2] transition-colors uppercase tracking-[0.3em] mb-2">Total Points</p>
        <span className="text-lg md:text-3xl font-black text-white tracking-tighter tabular-nums block">{player.score}</span>
        <span className="md:hidden text-[8px] font-bold text-[#00D6B2]/60 uppercase tracking-widest block mt-0.5">Points</span>
      </div>
    </motion.div>
  );
}
