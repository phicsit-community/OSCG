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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "contributor");

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

      // 2. Fetch potential contributors (up to 100 to filter and sort)
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, github, score, email, merged_prs, projects_count")
        .eq("role", "contributor")
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

            // SECURITY LOCK: Filter out known admins to keep leaderboard pure
            if (adminHandles.has(handle) || name.includes("gopichand")) return false;

            if (handle === "" || seenGithub.has(handle)) return false;
            seenGithub.add(handle);
            return true;
          })
          .map((user) => {
            const rawScore = user.score || 0;
            // Only show score if they have at least one contribution or were assigned points
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
                <div className="text-7xl font-black tracking-tightest text-white drop-shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                  {totalContributors}
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-[#00D6B2]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* PODIUM SECTION */}
        <div className="grid grid-cols-3 gap-2 md:gap-12 items-end mb-8 md:mb-32 h-[280px] md:h-[550px]">
          <PodiumStep player={players[1]} rank={2} color="from-slate-300 to-slate-600" isMounted={mounted} />
          <PodiumStep player={players[0]} rank={1} color="from-yellow-300 to-amber-600" isCenter={true} isMounted={mounted} />
          <PodiumStep player={players[2]} rank={3} color="from-orange-300 to-amber-800" isMounted={mounted} />
        </div>

        {/* LIST SECTION - NO REDUNDANT HEADERS */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {players.slice(3).map((player, index) => (
              <ListItem key={player.id} player={player} rank={index + 4} />
            ))}
          </AnimatePresence>

          {players.length === 0 && !loading && (
            <div className="text-center py-32 bg-white/2 border-2 border-dashed border-white/5 rounded-[3rem] animate-pulse">
              <p className="text-white/10 font-black uppercase tracking-[0.4em] text-sm">Synchronizing contributor global data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PodiumStep({ player, rank, color, isCenter = false, isMounted = false }: { player: Player; rank: number; color: string; isCenter?: boolean; isMounted?: boolean }) {
  if (!player) return <div className="w-full h-20 bg-white/2 rounded-3xl animate-pulse" />;

  const getHeight = () => {
    if (!isMounted) return '0px';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      return isCenter ? '100px' : rank === 2 ? '80px' : '65px';
    }
    return isCenter ? '360px' : rank === 2 ? '300px' : '240px';
  };

  return (
    <motion.div layout className={`flex flex-col items-center justify-end w-full ${isCenter ? 'h-full z-10' : 'h-[85%] z-0'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-2 md:mb-10 relative">
        {rank === 1 && (
          <motion.div animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-8 md:-top-16 text-yellow-400">
            <Crown className="w-6 h-6 md:w-14 md:h-14 fill-current drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          </motion.div>
        )}
        <div className={`relative p-0.5 md:p-1 rounded-full bg-linear-to-b ${color} shadow-[0_10px_30px_rgba(0,0,0,0.5)] group/avatar`}>
          <div className={`border md:border-4 border-[#050505] rounded-full overflow-hidden transition-transform duration-700 group-hover/avatar:scale-110 ${isCenter ? 'w-16 h-16 md:w-44 md:h-44' : 'w-12 h-12 md:w-32 md:h-32'}`}>
            <Avatar className="w-full h-full">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="bg-[#121825] text-xs md:text-lg font-bold">{player.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 md:px-2.5 md:py-1 text-[5px] md:text-xs font-black bg-[#050505] border border-white/20 text-white shadow-2xl z-20 whitespace-nowrap">
            RANK #{rank}
          </div>
        </div>
        <div className="mt-3 md:mt-12 text-center space-y-0.5 px-0.5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5">
            <div className="relative w-2.5 h-1.5 md:w-5 md:h-3.5 opacity-100 shrink-0">
              <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
            </div>
            <p className={`font-black text-white truncate max-w-[50px] md:max-w-[180px] tracking-tight ${isCenter ? 'text-[8px] md:text-3xl' : 'text-[7px] md:text-xl'}`}>{player.name}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`w-full rounded-t-lg md:rounded-t-[3rem] relative overflow-hidden bg-linear-to-b ${color} opacity-90 backdrop-blur-xl border-t border-white/20 shadow-3xl`}
        initial={{ height: 0 }}
        animate={{ height: getHeight() }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
      >
        <div className="absolute top-1 md:top-10 w-full text-center px-0.5 md:px-4">
          <div className="text-lg md:text-7xl font-black text-[#050505]/90 tracking-tighter leading-none">{player.score}</div>
          <p className="text-[5px] md:text-[10px] uppercase font-black text-[#050505]/40 tracking-[0.2em] mt-0.5 md:mt-2">Pts</p>

          <div className="mt-1 md:mt-8 flex items-center justify-center gap-1.5 md:gap-6 border-t border-[#050505]/10 pt-1 md:pt-6">
            <div className="text-center">
              <p className="text-[4px] md:text-[10px] font-black text-[#050505]/50 uppercase tracking-widest">PRs</p>
              <p className="text-[8px] md:text-2xl font-black text-[#050505]/80 leading-none tabular-nums">{player.mergedPRs}</p>
            </div>
            <div className="text-center">
              <p className="text-[4px] md:text-[10px] font-black text-[#050505]/50 uppercase tracking-widest">PROJ</p>
              <p className="text-[8px] md:text-2xl font-black text-[#050505]/80 leading-none tabular-nums">{player.projectsCount}</p>
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
      className="flex items-center gap-3 md:grid md:grid-cols-12 px-3 md:px-10 py-3 md:py-8 rounded-lg md:rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-[#00D6B2]/30 hover:bg-white/4 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D6B2]/2 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-[#00D6B2]/5 transition-colors" />

      {/* RANK */}
      <div className="flex-none md:col-span-1">
        <div className={`w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center font-black text-xs md:text-lg border transition-all duration-500 ${rank === 4 ? 'bg-[#00D6B2]/10 border-[#00D6B2]/30 text-[#00D6B2]' :
          rank === 5 ? 'bg-slate-400/10 border-slate-400/30 text-slate-300' :
            'bg-white/5 border-white/10 text-white/20'
          }`}>
          {rank.toString().padStart(2, '0')}
        </div>
      </div>

      {/* USER */}
      <div className="grow md:col-span-4 flex items-center gap-2 md:gap-6">
        <div className="relative w-4 h-3 md:w-6 md:h-4 opacity-100 shrink-0">
          <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
        </div>
        <span className="text-xs md:text-xl font-black text-white group-hover:text-[#00D6B2] transition-colors tracking-tight truncate max-w-[80px] md:max-w-none">{player.name}</span>
      </div>

      {/* STATS - FLEX ON MOBILE FOR TIGHTER GAPS */}
      <div className="flex-none flex items-center gap-4 md:grid md:grid-cols-7 md:col-span-7">
        <div className="md:col-span-2 text-center md:border-l md:border-white/3">
          <p className="hidden md:block text-[12px] font-black text-white/20 uppercase tracking-widest mb-1">PRs</p>
          <div className="flex md:block items-baseline gap-1">
            <span className="text-sm md:text-3xl font-black text-[#00D6B2] tabular-nums">{player.mergedPRs}</span>
            <span className="md:hidden text-[8px] font-black text-white/10 uppercase">PRs</span>
          </div>
        </div>

        <div className="md:col-span-2 text-center">
          <p className="hidden md:block text-[12px] font-black text-white/20 uppercase tracking-widest mb-1">Projs</p>
          <div className="flex md:block items-baseline gap-1">
            <span className="text-sm md:text-3xl font-black text-white/80 tabular-nums">{player.projectsCount}</span>
            <span className="md:hidden text-[8px] font-black text-white/10 uppercase">PJ</span>
          </div>
        </div>

        <div className="md:col-span-3 text-center md:border-l md:border-white/3">
          <p className="hidden md:block text-[12px] font-black text-[#00D6B2]/40 uppercase tracking-widest mb-1">Score</p>
          <span className="text-sm md:text-3xl font-black text-white tabular-nums">{player.score}</span>
        </div>
      </div>
    </motion.div>
  );
}
