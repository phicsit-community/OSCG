"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Users, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase/client";

interface Player {
  id: string;
  name: string;
  handle: string;
  score: number;
  avatar: string;
  country: string;
  github?: string;
  linkedin?: string;
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
        .select("*", { count: "exact", head: true });

      setTotalContributors(count || 0);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, github, linkedin, score, email")
        .order("score", { ascending: false })
        .limit(100);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else if (data) {
        interface LeaderboardProfile {
          id: string;
          full_name: string | null;
          github: string | null;
          linkedin: string | null;
          score: number | null;
          email: string | null;
        }
        const dbPlayers = (data as LeaderboardProfile[]).map((user) => {
          const score = user.score || 0;
          return {
            id: user.id,
            name: user.full_name || "Anonymous",
            handle: user.github ? `@${user.github}` : "@participant",
            score: score,
            avatar: user.github
              ? `https://github.com/${user.github}.png`
              : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || user.id}`,
            country: "in",
            github: user.github || "",
            linkedin: user.linkedin || "",
            // Standardizing to 0 as requested since there is no real data yet
            mergedPRs: 0,
            projectsCount: 0,
          };
        });

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

        {/* IMPACT HEADER - COMPACT VERSION */}
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
        <div className="grid grid-cols-3 gap-6 md:gap-12 items-end mb-32 h-[450px] md:h-[550px]">
          <PodiumStep player={players[1]} rank={2} color="from-slate-300 to-slate-600" />
          <PodiumStep player={players[0]} rank={1} color="from-yellow-300 to-amber-600" isCenter={true} />
          <PodiumStep player={players[2]} rank={3} color="from-orange-300 to-amber-800" />
        </div>

        {/* LIST SECTION - NO REDUNDANT HEADERS */}
        <div className="space-y-6">
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

function PodiumStep({ player, rank, color, isCenter = false }: { player: Player; rank: number; color: string; isCenter?: boolean }) {
  if (!player) return <div className="w-full h-20 bg-white/2 rounded-3xl animate-pulse" />;

  return (
    <motion.div layout className={`flex flex-col items-center justify-end w-full ${isCenter ? 'h-full z-10' : 'h-[85%] z-0'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-10 relative">
        {rank === 1 && (
          <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-16 text-yellow-400">
            <Crown className="w-14 h-14 fill-current drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
          </motion.div>
        )}
        <div className={`relative p-1.5 rounded-full bg-linear-to-b ${color} shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/avatar`}>
          <div className={`border-4 border-[#050505] rounded-full overflow-hidden transition-transform duration-700 group-hover/avatar:scale-110 ${isCenter ? 'w-28 h-28 md:w-44 md:h-44' : 'w-20 h-20 md:w-32 md:h-32'}`}>
            <Avatar className="w-full h-full">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="bg-[#121825] text-xl font-bold">{player.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-black bg-[#050505] border border-white/20 text-white shadow-2xl z-20 whitespace-nowrap">
            RANK #{rank}
          </div>
        </div>
        <div className="mt-12 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-5 h-3.5 opacity-100 shrink-0">
              <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
            </div>
            <p className={`font-black text-white truncate max-w-[180px] tracking-tight ${isCenter ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{player.name}</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`w-full rounded-t-[3rem] relative overflow-hidden bg-linear-to-b ${color} opacity-90 backdrop-blur-xl border-t border-white/20 shadow-3xl`}
        initial={{ height: 0 }}
        animate={{ height: isCenter ? '280px' : rank === 2 ? '220px' : '160px' }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
      >
        <div className="absolute top-12 w-full text-center px-4">
          <div className="text-5xl md:text-7xl font-black text-[#050505]/90 tracking-tighter leading-none">{player.score}</div>
          <p className="text-xs uppercase font-black text-[#050505]/40 tracking-[0.3em] mt-2">Current Points</p>
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
      className="grid grid-cols-12 items-center px-10 py-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:border-[#00D6B2]/30 hover:bg-white/4 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D6B2]/2 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-[#00D6B2]/5 transition-colors" />

      {/* BIG RANK NUMBER */}
      <div className="col-span-1">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border-2 transition-all duration-500 ${rank === 4 ? 'bg-[#00D6B2]/10 border-[#00D6B2]/30 text-[#00D6B2] shadow-[0_0_20px_rgba(0,214,178,0.2)]' :
          rank === 5 ? 'bg-slate-400/10 border-slate-400/30 text-slate-300' :
            'bg-white/5 border-white/10 text-white/10 group-hover:text-white/40'
          }`}>
          {rank.toString().padStart(2, '0')}
        </div>
      </div>

      {/* USER INFO */}
      <div className="col-span-4 flex items-center gap-6 pl-4">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-3">
            <div className="relative w-5 h-3.5 opacity-100 shrink-0">
              <Image src={`https://flagcdn.com/w40/${player.country}.png`} alt="" fill className="object-cover rounded-sm" />
            </div>
            <span className="text-xl font-black text-white group-hover:text-[#00D6B2] transition-colors tracking-tight">{player.name}</span>
          </div>
          <div className="flex items-center gap-4 pt-2">
            {player.github && <a href={`https://github.com/${player.github}`} target="_blank" rel="noreferrer" className="text-white/10 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>}
            {player.linkedin && <a href={`https://linkedin.com/in/${player.linkedin}`} target="_blank" rel="noreferrer" className="text-white/10 hover:text-[#00D6B2] transition-colors"><Linkedin className="w-4 h-4" /></a>}
          </div>
        </div>
      </div>

      {/* STATS GRID - REMOVED REDUNDANT HEADERS, LABELS ARE BIG AND CLEAR */}
      <div className="col-span-2 text-center border-l border-white/3">
        <p className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-2">Merged PRs</p>
        <span className="text-3xl font-black text-[#00D6B2] tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,214,178,0.1)]">{player.mergedPRs}</span>
      </div>



      <div className="col-span-2 text-center">
        <p className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-2">Projects</p>
        <span className="text-3xl font-black text-white/80 tracking-tighter tabular-nums transition-colors group-hover:text-white uppercase">{player.projectsCount}</span>
      </div>

      <div className="col-span-2 text-center border-r border-white/3">
        <p className="text-[12px] font-black text-white uppercase tracking-[0.3em] mb-2">Total Points</p>
        <span className="text-3xl font-black text-white tracking-tighter tabular-nums">{player.score}</span>
      </div>
    </motion.div>
  );
}
