import React, { useState, useEffect, useMemo } from "react";
import { Sparkles, Lock, Zap, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import ReadyToContribute from "./contribute";

const ALL_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "Node.js",
  "TailwindCSS", "PostgreSQL", "MongoDB", "Prisma", "Docker", "AWS",
  "GraphQL", "Rust", "Go", "C++", "Java", "Spring", "Vue", "Angular",
  "Svelte", "Redux", "Figma", "Firebase", "Supabase", "Git", "Kotlin",
  "Swift", "Flutter", "PHP", "Laravel", "Django", "Flask", "Solidity"
];

const QUICK_ADD = ["React", "Python", "Node.js", "TypeScript", "Next.js"];

export default function Achievements({
  mergedPRs = 0,
  projectsCount = 0
}: {
  mergedPRs?: number;
  projectsCount?: number;
}) {
  // Tech Stack State
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initial Fetch for Tech Stack
  useEffect(() => {
    async function fetchTechStack() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("tech_stack")
            .eq("id", user.id)
            .single();

          if (error) throw error;
          if (data?.tech_stack) setSelectedTechs(data.tech_stack);
        }
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      }
    }
    fetchTechStack();
  }, []);

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    if (!input.trim()) return [];
    return ALL_SUGGESTIONS.filter(
      s => s.toLowerCase().includes(input.toLowerCase()) &&
        !selectedTechs.some(t => t.toLowerCase() === s.toLowerCase())
    ).slice(0, 3);
  }, [input, selectedTechs]);

  // Tech Stack Handlers
  const saveTechStack = async (newStack: string[]) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ tech_stack: newStack })
        .eq("id", user.id);

      if (error) throw error;
    } catch {
      toast.error("Failed to save tech stack");
    } finally {
      setIsSaving(false);
    }
  };

  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !selectedTechs.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      const newStack = [...selectedTechs, trimmed];
      setSelectedTechs(newStack);
      setInput("");
      setShowSuggestions(false);
      saveTechStack(newStack);
    }
  };

  const removeTech = (tech: string) => {
    const newStack = selectedTechs.filter(t => t !== tech);
    setSelectedTechs(newStack);
    saveTechStack(newStack);
  };

  // Achievement Logic
  const achievements = useMemo(() => {
    return [
      { id: 1, name: "First Merge", unlocked: mergedPRs >= 1, description: "Merged your first PR" },
      { id: 2, name: "Project Pioneer", unlocked: projectsCount >= 1, description: "Contributed to a project" },
      { id: 3, name: "Triple Threat", unlocked: mergedPRs >= 3, description: "3 merged PRs" },
      { id: 4, name: "Multitasker", unlocked: projectsCount >= 3, description: "3 different projects" },
      { id: 5, name: "Power Contributor", unlocked: mergedPRs >= 10, description: "10 merged PRs" },
      { id: 6, name: "Community Legend", unlocked: projectsCount >= 10, description: "10 different projects" },
    ];
  }, [mergedPRs, projectsCount]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="w-full">
      <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 md:p-8 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300 shadow-xl group">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* LEFT: ACHIEVEMENTS */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 text-xl text-white font-bold tracking-tight">
                  <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
                  Achievements
                </div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
                  Unlock badges as you contribute
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#00D6B2] bg-[#00D6B2]/10 px-4 py-1.5 rounded-full border border-[#00D6B2]/10 uppercase tracking-wider">
                {unlockedCount}/6 Unlocked
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  title={ach.description}
                  className={`group/ach aspect-square rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center
                    ${ach.unlocked
                      ? 'bg-[#00D6B2]/10 border-[#00D6B2]/40 shadow-[0_0_20px_rgba(0,214,178,0.1)]'
                      : 'bg-white/5 border-white/10 opacity-40'}`}
                >
                  <div className={`p-3 rounded-full mb-2 transition-colors ${ach.unlocked ? 'bg-[#00D6B2]/20' : 'bg-white/5'}`}>
                    {ach.unlocked ? (
                      <Zap className="w-5 h-5 text-[#00D6B2] fill-[#00D6B2]/20" />
                    ) : (
                      <Lock className="w-4 h-4 text-white/20" />
                    )}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest text-center px-2 leading-tight ${ach.unlocked ? 'text-[#00D6B2]' : 'text-white/20'}`}>
                    {ach.unlocked ? ach.name : "Locked"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-px bg-white/5 self-stretch mx-4"></div>

          {/* RIGHT: TECH STACK */}
          <div className="flex-1 w-full flex flex-col h-full justify-start pt-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-[#00D6B2]" />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Skills & Tools</h3>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-none">
                  Your Tech Arsenal
                </p>
              </div>
              {isSaving && <Loader2 className="w-3.5 h-3.5 text-[#00D6B2] animate-spin ml-auto" />}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 bg-white/5 rounded-2xl p-4 border border-white/5 min-h-[120px] content-start relative">
              <AnimatePresence mode="popLayout">
                {selectedTechs.map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="group/tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0F17] hover:bg-[#00D6B2]/10 border border-white/10 hover:border-[#00D6B2]/20 rounded-lg transition-all duration-300 cursor-default"
                  >
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-wide">{tech}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeTech(tech); }}
                      className="opacity-0 group-hover/tag:opacity-100 hover:text-rose-400 transition-all -mr-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="relative group/input inline-flex items-center grow min-w-[60px]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTech(input);
                    }
                  }}
                  placeholder="+ Add Skill"
                  className="w-full bg-transparent border-none focus:outline-none text-[10px] font-bold text-white/60 focus:text-white placeholder:text-white/20 uppercase tracking-wide h-full py-1.5"
                />
                <AnimatePresence>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-[#0B0F17] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                    >
                      {filteredSuggestions.map((s) => (
                        <button
                          key={s}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addTech(s);
                          }}
                          className="w-full px-4 py-3 text-left text-[10px] font-bold text-white/60 hover:text-[#00D6B2] hover:bg-white/5 transition-colors uppercase tracking-wider block border-b border-white/5 last:border-0"
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {QUICK_ADD.filter(t => !selectedTechs.includes(t)).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto mb-6">
                {QUICK_ADD.filter(t => !selectedTechs.includes(t)).map(tech => (
                  <button
                    key={tech}
                    onClick={() => addTech(tech)}
                    className="px-3 py-1.5 rounded-lg bg-white/2 border border-white/5 text-[9px] font-bold text-white/30 hover:text-[#00D6B2] hover:border-[#00D6B2]/30 transition-all uppercase tracking-wider"
                  >
                    + {tech}
                  </button>
                ))}
              </div>
            )}

            <ReadyToContribute />
          </div>
        </div>
      </div>
    </div>
  );
}
