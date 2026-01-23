"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Zap, X, Plus, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const ALL_SUGGESTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "Node.js",
  "TailwindCSS", "PostgreSQL", "MongoDB", "Prisma", "Docker", "AWS",
  "GraphQL", "Rust", "Go", "C++", "Java", "Spring", "Vue", "Angular",
  "Svelte", "Redux", "Figma", "Firebase", "Supabase", "Git", "Kotlin",
  "Swift", "Flutter", "PHP", "Laravel", "Django", "Flask", "Solidity"
];

const QUICK_ADD = ["React", "Python", "Node.js", "TypeScript", "Next.js"];

export default function TechStack() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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
      } finally {
        setIsLoading(false);
      }
    }
    fetchTechStack();
  }, []);

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
    } catch (error) {
      toast.error("Cloud sync failed");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSuggestions = useMemo(() => {
    if (!input.trim()) return [];
    return ALL_SUGGESTIONS.filter(
      s => s.toLowerCase().includes(input.toLowerCase()) &&
        !selectedTechs.some(t => t.toLowerCase() === s.toLowerCase())
    ).slice(0, 4);
  }, [input, selectedTechs]);

  const addTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !selectedTechs.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      const newStack = [...selectedTechs, trimmed];
      setSelectedTechs(newStack);
      setInput("");
      saveTechStack(newStack);
    }
  };

  const removeTech = (tech: string) => {
    const newStack = selectedTechs.filter(t => t !== tech);
    setSelectedTechs(newStack);
    saveTechStack(newStack);
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-[420px] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00D6B2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 w-full border border-white/5 min-h-[480px] h-full hover:border-[#00D6B2]/20 transition-all duration-500 flex flex-col cursor-pointer shadow-2xl relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00D6B2]/10 blur-[100px] rounded-full group-hover:bg-[#00D6B2]/20 transition-colors duration-700" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
          </div>
          <div>
            <h3 className="text-white text-xl font-black tracking-tight">Tech Stack</h3>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] leading-none mt-1">Tools & Skills</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSaving && <Loader2 className="w-3.5 h-3.5 text-[#00D6B2] animate-spin" />}
          <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-[#00D6B2] uppercase tracking-widest shadow-inner">
            {selectedTechs.length} Tools
          </div>
        </div>
      </div>

      <div className={`relative mb-8 transition-all duration-300 ${isFocused ? 'z-30' : 'z-20'}`}>
        <div className={`group/input relative flex items-center transition-all duration-500 rounded-2xl border ${isFocused ? 'border-[#00D6B2]/50 bg-[#0D141C] shadow-[0_0_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,214,178,0.1)]' : 'border-white/5 bg-white/2'}`}>
          <Search className={`ml-5 w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-[#00D6B2]' : 'text-white/20'}`} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTech(input);
              }
            }}
            placeholder="Add technology..."
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white text-sm py-4 px-4 placeholder:text-white/10 font-bold tracking-tight"
          />
          <AnimatePresence>
            {input && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => addTech(input)}
                className="mr-3 p-2 rounded-xl bg-[#00D6B2] text-[#0A0F15] hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,214,178,0.4)]"
              >
                <Plus className="w-4 h-4 stroke-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isFocused && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-100 w-full mt-3 bg-[#0D141C] border border-[#00D6B2]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(0,214,178,0.1)] overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-2">
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      addTech(s);
                    }}
                    className="w-full px-6 py-5 text-left text-white/70 hover:bg-[#00D6B2]/10 hover:text-[#00D6B2] rounded-xl transition-all flex items-center justify-between group/item cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-white/10 group-hover/item:bg-[#00D6B2] transition-colors shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
                      <span className="text-base font-black tracking-tight uppercase">{s}</span>
                    </div>
                    <Plus className="w-5 h-5 opacity-0 group-hover/item:opacity-100 transition-all transform group-hover/item:rotate-90 group-hover/item:scale-110" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap content-start gap-4 overflow-y-auto flex-1 mb-10 pr-2 custom-scrollbar relative z-10">
        <AnimatePresence mode="popLayout">
          {selectedTechs.map((tech) => (
            <motion.div
              layout
              key={tech}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="group/tag inline-flex items-center gap-3 px-4 py-3 bg-white/2 border border-white/5 hover:border-[#00D6B2]/30 hover:bg-[#00D6B2]/5 rounded-2xl transition-all duration-300"
            >
              <span className="text-xs font-black text-white/80 tracking-tight uppercase">{tech}</span>
              <button
                onClick={(e) => { e.stopPropagation(); removeTech(tech); }}
                className="opacity-20 hover:opacity-100 hover:text-rose-400 transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedTechs.length === 0 && !input && (
          <div className="w-full flex-1 min-h-[120px] py-12 text-center border-2 border-dashed border-white/5 rounded-4xl flex flex-col items-center justify-center gap-4 group-hover:border-white/10 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/2 flex items-center justify-center border border-white/5">
              <Search className="w-6 h-6 text-white/10" />
            </div>
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Build your arsenal</p>
          </div>
        )}
      </div>

      {!input && (
        <div className="mt-auto relative z-10 bg-[#0B0F17]/30 p-6 rounded-4xl border border-white/5">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="w-3 h-3 text-[#00D6B2]" />
            <p className="text-[10px] font-black text-[#00D6B2] uppercase tracking-[0.3em]">Quick Add Suggestions</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {QUICK_ADD.filter(p => !selectedTechs.some(t => t.toLowerCase() === p.toLowerCase())).map(p => (
              <button
                key={p}
                onClick={(e) => { e.stopPropagation(); addTech(p); }}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-black text-white/40 hover:text-white hover:bg-[#00D6B2] hover:border-[#00D6B2] transition-all duration-300 cursor-pointer uppercase tracking-widest shadow-lg active:scale-95"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
