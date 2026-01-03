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
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("tech_stack")
            .eq("id", session.user.id)
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ tech_stack: newStack })
        .eq("id", session.user.id);

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
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 w-full border border-white/10 h-[420px] hover:border-[#00D6B2]/40 transition-all duration-500 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
          </div>
          <div>
            <h3 className="text-white text-xl font-bold tracking-tight">Tech Stack</h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] leading-none mt-1">Tools & Skills</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSaving && <Loader2 className="w-3.5 h-3.5 text-[#00D6B2] animate-spin" />}
          <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-[#00D6B2] uppercase tracking-widest">
            {selectedTechs.length}
          </div>
        </div>
      </div>

      <div className="relative mb-8">
        <div className={`group relative flex items-center transition-all duration-300 rounded-2xl border ${isFocused ? 'border-[#00D6B2] bg-white/10 ring-4 ring-[#00D6B2]/5' : 'border-white/10 bg-white/5'}`}>
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
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white text-base py-4 px-4 placeholder:text-white/10 font-medium"
          />
          <AnimatePresence>
            {input && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => addTech(input)}
                className="mr-3 p-2 rounded-xl bg-[#00D6B2] text-[#0A0F15] hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isFocused && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 5 }}
              className="absolute z-50 w-full mt-3 bg-[#0D141C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
            >
              <div className="p-2">
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      addTech(s);
                    }}
                    className="w-full px-5 py-4 text-left text-base text-white/70 hover:bg-[#00D6B2]/10 hover:text-[#00D6B2] rounded-xl transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="font-bold tracking-tight">{s}</span>
                    <Plus className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:rotate-90" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-3 overflow-y-auto max-h-[140px] pb-4 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {selectedTechs.map((tech) => (
            <motion.div
              layout
              key={tech}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="group px-5 py-2.5 text-sm font-black text-white/90 tracking-tight
                         rounded-2xl border border-white/10 bg-white/5
                         hover:border-[#00D6B2]/40 hover:bg-[#00D6B2]/5 hover:text-[#00D6B2]
                         transition-all duration-300 flex items-center gap-3 cursor-default shadow-sm"
            >
              {tech}
              <button
                onClick={() => removeTech(tech)}
                className="p-1 hover:bg-white/10 rounded-lg transition-all cursor-pointer opacity-40 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {selectedTechs.length === 0 && !input && (
          <div className="w-full py-12 text-center border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center gap-4">
            <Search className="w-6 h-6 text-white/10" />
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">Start adding your tools</p>
          </div>
        )}
      </div>

      {!input && (
        <div className="mt-auto pt-6 border-t border-white/5">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Quick Add</p>
          <div className="flex flex-wrap gap-4">
            {QUICK_ADD.filter(p => !selectedTechs.includes(p)).map(p => (
              <button
                key={p}
                onClick={() => addTech(p)}
                className="text-xs font-bold text-white/40 hover:text-[#00D6B2] transition-all hover:-translate-y-px cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
