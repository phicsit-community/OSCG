"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Flame,
  Target,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle2,
  Layout,
  Download,
  Eye,
  Zap,
  TrendingUp,
  BarChart3,
  Loader2,
  Code2
} from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileData) {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getGitHubUrl = (input: string | null) => {
    if (!input) return null;
    const clean = input.replace(/^(https?:\/\/)?(www\.)?github\.com\//, "").replace(/\/$/, "");
    return `https://github.com/${clean}`;
  };

  const getGitHubUsername = (input: string | null) => {
    if (!input) return "N/A";
    return input.replace(/^(https?:\/\/)?(www\.)?github\.com\//, "").replace(/\/$/, "");
  };

  const handleSocialClick = (url: string | null, platform: string) => {
    if (!url || url.trim() === "" || url === "N/A") {
      toast.warning(`Please add your ${platform} in profile settings first!`, {
        description: "Go to Profile > Edit to update your details.",
        style: {
          background: "#0B0F17",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white"
        }
      });
      return;
    }

    const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(absoluteUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-[#11D392] animate-spin" />
        <p className="text-white/40 font-medium animate-pulse uppercase tracking-[0.2em] text-xs">Loading Command Center...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 sm:px-10 ">
      <div className="max-w-[1400px] mx-auto">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11D392]/10 border border-[#11D392]/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#11D392] animate-pulse" />
            <span className="text-[10px] font-black text-[#11D392] uppercase tracking-wider">Dashboard Active</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Command <span className="text-[#11D392]">Center</span>
          </h1>
          <p className="text-white/40 font-medium">Your open source journey at a glance</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >

          <div className="lg:col-span-4 space-y-6">

            <motion.div variants={itemVariants}>
              <Card className="bg-[#0B0F17]/50 border-white/5 backdrop-blur-xl overflow-hidden group w-full">
                <CardContent className="p-8 pb-4 flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute -inset-6 bg-linear-to-tr from-[#11D392] to-[#6FE7C1] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition duration-500" />
                    <div className="relative w-24 h-24">
                      <Avatar className="w-full h-full shadow-xl transition-transform duration-500 group-hover:scale-105">
                        <AvatarImage src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email}`} />
                        <AvatarFallback className="bg-slate-800 text-white font-black text-lg">
                          {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-[#11D392] rounded-full border-2 border-[#0B0F17] flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-3 h-3 text-[#0B0F17] stroke-3" />
                      </div>
                    </div>

                  </div>

                  <h2 className="text-3xl font-black text-white mb-1.5 tracking-tight">
                    {profile?.full_name || "Open Source Dev"}
                  </h2>
                  <p
                    onClick={() => handleSocialClick(getGitHubUrl(profile?.github), "GitHub")}
                    className="text-white/40 text-sm font-bold mb-8 flex items-center gap-1.5 group/link cursor-pointer hover:text-[#11D392] transition-colors tracking-wide"
                  >
                    @{getGitHubUsername(profile?.github)}
                    <ExternalLink className="w-3.5 h-3.5 transition-transform opacity-40 group-hover/link:opacity-100" />
                  </p>

                  <div className="flex gap-4 mb-10">
                    <button
                      onClick={() => handleSocialClick(getGitHubUrl(profile?.github), "GitHub")}
                      className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer text-white/80 shadow-md hover:shadow-lg hover:bg-[#11D392]/15 hover:border-[#11D392]/50 hover:text-[#11D392] transition-all duration-300 active:scale-90"
                    >
                      <Github className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSocialClick(profile?.linkedin, "LinkedIn")}
                      className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer text-white/80 shadow-md hover:shadow-lg hover:bg-[#0077b5]/15 hover:border-[#0077b5]/50 hover:text-[#0077b5] transition-all duration-300 active:scale-90"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-3 w-full">
                    <Badge className="flex-1 justify-center py-3 bg-[#11D392]/10 text-[#11D392] border-[#11D392]/20 hover:bg-[#11D392]/20 rounded-2xl font-black uppercase text-[12px] tracking-widest transition-all">
                      Contributor
                    </Badge>
                    <Badge className="flex-1 justify-center py-3 bg-[#11D392] text-[#0B0F17] hover:bg-[#0eb87f] rounded-2xl gap-2 font-black uppercase text-[12px] tracking-widest shadow-[0_0_20px_rgba(17,211,146,0.2)] transition-all">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Card className="bg-[#0B0F17]/50 border-white/5 backdrop-blur-xl overflow-hidden p-1">
                <div className="bg-linear-to-br from-[#11D392]/10 to-transparent p-6 rounded-[calc(1.5rem-2px)] border border-white/5 border-dashed">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#11D392] to-[#6FE7C1] flex items-center justify-center shadow-[0_0_20px_rgba(17,211,146,0.2)]">
                      <Zap className="w-6 h-6 text-[#0B0F17]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold leading-none mb-1 text-lg">You&apos;re Selected! 🎉</h3>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Since December 22, 2025</p>
                    </div>
                  </div>

                  <div className="bg-[#06090F]/80 rounded-2xl p-5 border border-white/5 mb-4">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Layout className="w-5 h-5 text-[#11D392]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm mb-0.5 truncate uppercase tracking-tight">OSCG 2026 ID Card</h4>
                        <p className="text-white/30 text-[10px] uppercase font-bold tracking-[0.1em]">Your digital credential</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-10 border-white/5 bg-white/[0.02] hover:bg-white/5 text-white/60 text-xs font-black rounded-xl gap-2 active:scale-95 transition-all">
                        <Eye className="w-3.5 h-3.5" /> View
                      </Button>
                      <Button className="h-10 bg-[#11D392] hover:bg-[#0eb87f] text-[#090E1A] text-xs font-black rounded-xl gap-2 active:scale-95 transition-all shadow-[0_0_15px_rgba(17,211,146,0.3)]">
                        <Download className="w-3.5 h-3.5" /> Download
                      </Button>
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full h-10 text-white/30 hover:text-white hover:bg-white/5 text-xs font-black rounded-xl gap-2 group transition-all">
                    Explore Projects <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>


          <div className="lg:col-span-8 space-y-6">

            <motion.div variants={itemVariants}>
              <Card className="bg-[#0B0F17]/50 border-white/5 backdrop-blur-xl p-8 lg:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#11D392]/5 blur-3xl rounded-full" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#11D392]/10 flex items-center justify-center border border-[#11D392]/20 shadow-[0_0_20px_rgba(17,211,146,0.1)]">
                      <Trophy className="w-6 h-6 text-[#11D392]" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Rank</p>
                      <div className="flex items-baseline gap-3">
                        <h2 className="text-5xl font-black text-white leading-none tracking-tighter">#50</h2>
                        <span className="px-2 py-0.5 rounded-md bg-[#11D392]/10 border border-[#11D392]/20 text-[#11D392] text-[10px] font-black italic tracking-widest">TOP 100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 group/streak cursor-pointer hover:bg-white/10 transition-all">
                    <div className="flex-1 text-right">
                      <p className="text-5xl font-black text-white leading-none tracking-tighter">0</p>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Day Streak</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)] group-hover/streak:scale-110 transition-transform">
                      <Flame className="w-7 h-7 text-orange-500 group-hover:animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#11D392]" />
                      <span className="text-white/60 text-xs font-black uppercase tracking-widest">Progress to next rank</span>
                    </div>
                    <p className="text-white/60 text-xs font-black">
                      <span className="text-white">0</span> / 200 pts
                    </p>
                  </div>
                  <Progress value={0} className="h-3 bg-white/5 border border-white/5 rounded-full overflow-hidden" />
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[#11D392]">0.0% Complete</span>
                    <span className="text-white/40 group-hover:text-[#11D392] transition-colors cursor-pointer">200 pts to go &gt;</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 pt-10 border-t border-white/5">
                  {[
                    { label: "Weekly", value: "+0", icon: TrendingUp, color: "text-[#11D392]" },
                    { label: "Active Days", value: "0", icon: Zap, color: "text-orange-400" },
                    { label: "Goals Hit", value: "0/5", icon: Target, color: "text-[#11D392]" }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-default group/stat">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/stat:rotate-6 transition-transform">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className={`text-lg font-black leading-none mb-1 text-white`}>{stat.value}</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <motion.div variants={itemVariants}>
                <Card className="bg-[#0B0F17]/50 border-white/5 backdrop-blur-xl p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Tech <span className="text-[#11D392]">Stack</span></h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {["HTML", "CSS", "JavaScript", "React", "TypeScript", "Python", "Node.js", "Supabase", "Git", "C++"].map((tech) => (
                      <div key={tech} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-black hover:border-[#11D392]/30 hover:bg-white/[0.08] hover:text-[#11D392] transition-all cursor-default">
                        {tech}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 flex items-center gap-2 group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#11D392]" />
                    <span className="text-white/30 text-xs font-bold uppercase tracking-widest group-hover:text-white/60 transition-colors">Updating automatically from GitHub</span>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-[#0B0F17]/50 border-white/5 backdrop-blur-xl p-8 h-full flex flex-col group/pr">
                  <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#11D392]/10 border border-[#11D392]/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-[#11D392]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight leading-none mb-1">PR Distribution</h3>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">By difficulty level</p>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-white/60 text-xs font-black uppercase tracking-tight">0 total</span>
                    </div>
                  </div>

                  <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                    {[
                      { label: "Easy", color: "bg-[#11D392]", val: 8, pts: "0 pts" },
                      { label: "Medium", color: "bg-teal-400", val: 8, pts: "0 pts" },
                      { label: "Hard", color: "bg-orange-500", val: 8, pts: "0 pts" },
                      { label: "Expert", color: "bg-red-500", val: 8, pts: "0 pts" }
                    ].map((level, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center group/bar">
                        <div className="w-full relative h-[140px] flex items-end mb-4">
                          <div className="absolute inset-0 bg-white/[0.02] rounded-t-lg border-x border-t border-white/5" />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${level.val}px` }}
                            className={`w-full ${level.color} rounded-t-lg relative group-hover/bar:brightness-110 transition-all`}
                          >
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#0B0F17] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                        <div className={`w-2 h-2 rounded-full mb-1 ${level.color}`} />
                        <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">{level.label}</span>
                        <span className="text-white font-black text-xs leading-none">0</span>
                        <span className="text-white/20 text-[8px] font-bold mt-1">{level.pts}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default DashboardPage;
