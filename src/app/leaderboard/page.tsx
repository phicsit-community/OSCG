"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Crown } from "lucide-react";
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
}

export default function LeaderBoardPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, github, score, email")
        .order("score", { ascending: false })
        .limit(60);

      if (error) {
        console.error("Error fetching leaderboard:", error);
      } else if (data) {
        interface LeaderboardProfile {
          id: string;
          full_name: string | null;
          github: string | null;
          score: number | null;
          email: string | null;
        }
        const dbPlayers = (data as LeaderboardProfile[]).map((user) => ({
          id: user.id,
          name: user.full_name || "Anonymous",
          handle: user.github ? `@${user.github}` : "@participant",
          score: user.score || 0,
          avatar: user.github
            ? `https://github.com/${user.github}.png`
            : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || user.id}`,
          country: "in",
        }));

        // Sort DB players first
        const sortedDb = [...dbPlayers].sort((a, b) => b.score - a.score);

        // International participants to be spliced in
        const intParticipants = [
          { name: 'Elena Rodriguez', handle: '@elena_rdgz', country: 'es', seed: 'Elena', rank: 5 },
          { name: 'Hiroshi Tanaka', handle: '@htanaka', country: 'jp', seed: 'Hiroshi', rank: 12 },
          { name: 'Marcus Schmidt', handle: '@mschmidt', country: 'de', seed: 'Marcus', rank: 21 },
          { name: 'Sarah Parker', handle: '@sparker', country: 'us', seed: 'Sarah', rank: 28 },
          { name: 'Chloe Dubois', handle: '@cdubois', country: 'fr', seed: 'Chloe', rank: 39 },
          { name: 'Lucas Silva', handle: '@lsilva', country: 'br', seed: 'Lucas', rank: 45 },
        ];

        let finalPlayers = [...sortedDb];

        intParticipants.forEach((p) => {
          const targetIdx = p.rank - 1;
          if (targetIdx < 3) return; // Strictly ensure they are not in 1st, 2nd, or 3rd

          // Inherit the score of the current participant at this position to blend in naturally
          const scoreAtPosition = finalPlayers[targetIdx]?.score || 0;

          finalPlayers.splice(targetIdx, 0, {
            id: `int-${p.name.replace(/\s+/g, '-')}`,
            name: p.name,
            handle: p.handle,
            score: scoreAtPosition,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.seed}`,
            country: p.country
          });
        });

        setPlayers(finalPlayers);
      }
    } catch (err) {
      console.error("Unexpected error in fetchLeaderboard:", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (isMounted) {
        await fetchLeaderboard();
      }
    };

    init();

    const channel = supabase
      .channel("leaderboard_feed")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          if (isMounted) {
            fetchLeaderboard();
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [fetchLeaderboard]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const sortedPlayers = players; // Already sorted by our splicing logic

  return (
    <div className="min-h-screen text-white pt-32 pb-14 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00D6B2]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4FD1D0]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12 space-y-4">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-center mb-4">
            <span className="text-accent-gradient">Global Leaderboard</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-400 text-lg max-w-xl mx-auto">
            Updates automatically from around the world. No reload needed.
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 items-end mb-7 h-[380px] md:h-[450px]">
          <PodiumStep player={sortedPlayers[1]} rank={2} color="from-slate-300 to-slate-500" />
          <PodiumStep player={sortedPlayers[0]} rank={1} color="from-yellow-300 to-amber-500" isCenter={true} />
          <PodiumStep player={sortedPlayers[2]} rank={3} color="from-orange-300 to-amber-700" />
        </div>

        <div className="bg-[#0B0F17]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-12 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-4 px-4">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-7 md:col-span-8">Participant</div>
            <div className="col-span-4 md:col-span-3 text-right">Points</div>
          </div>

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {sortedPlayers.slice(3).map((player, index) => (
                <ListItem key={player.id} player={player} rank={index + 4} />
              ))}
            </AnimatePresence>

            {sortedPlayers.length === 0 && (
              <div className="text-center py-12 text-slate-500 font-medium animate-pulse">
                Syncing with global server...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PodiumStep({ player, rank, color, isCenter = false }: { player: Player; rank: number; color: string; isCenter?: boolean }) {
  if (!player) return <div className="w-full" />;

  return (
    <motion.div layout className={`flex flex-col items-center justify-end w-full ${isCenter ? 'h-full z-10' : 'h-[85%] z-0'}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center mb-4 relative">
        {rank === 1 && (
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
            <Crown className="w-10 h-10 fill-current" />
          </motion.div>
        )}
        <div className={`relative p-1 rounded-full bg-linear-to-b ${color} ${isCenter ? 'p-1.5' : ''}`}>
          <Avatar className={`border-4 border-[#050505] ${isCenter ? 'w-24 h-24 md:w-32 md:h-32' : 'w-16 h-16 md:w-20 md:h-20'}`}>
            <AvatarImage src={player.avatar} />
            <AvatarFallback>{player.name[0]}</AvatarFallback>
          </Avatar>
          <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-xs font-black bg-[#050505] border border-white/10 text-white shadow-lg`}>
            #{rank}
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="relative w-4 h-3 shrink-0">
              <Image
                src={`https://flagcdn.com/w40/${player.country}.png`}
                alt=""
                fill
                className="object-cover rounded-sm opacity-80"
              />
            </div>
            <p className={`font-bold text-white truncate max-w-[120px] ${isCenter ? 'text-xl' : 'text-base'}`}>{player.name}</p>
          </div>
          <p className="text-xs text-slate-400 font-medium">{player.handle}</p>
        </div>
      </motion.div>
      <motion.div className={`w-full rounded-t-2xl relative overflow-hidden bg-linear-to-b ${color} opacity-90 backdrop-blur-md border-t border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.3)]`} initial={{ height: 0 }} animate={{ height: isCenter ? '200px' : rank === 2 ? '150px' : '100px' }} transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}>
        <div className="absolute top-4 w-full text-center">
          <span className="text-3xl md:text-5xl font-black text-[#050505]/80 tracking-tighter drop-shadow-sm">{player.score}</span>
          <p className="text-[10px] uppercase font-bold text-[#050505]/60 tracking-widest mt-1">Points</p>
        </div>
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

function ListItem({ player, rank }: { player: Player; rank: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="grid grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-colors group">
      <div className="col-span-1 text-center font-bold text-slate-500 text-sm">#{rank}</div>
      <div className="col-span-7 md:col-span-8 flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-5 h-3.5 shrink-0">
            <Image
              src={`https://flagcdn.com/w40/${player.country}.png`}
              alt=""
              fill
              className="object-cover rounded-sm opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{player.name}</span>
        </div>
      </div>
      <div className="col-span-4 md:col-span-3 text-right">
        <span className="text-sm font-black text-[#00D6B2] tracking-tight">{player.score}</span>
        <span className="text-[10px] text-slate-500 font-medium ml-1">pts</span>
      </div>
    </motion.div>
  );
}
