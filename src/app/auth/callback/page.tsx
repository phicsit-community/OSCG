"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const process = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        router.replace("/sign-in");
        return;
      }

      router.replace("/badge");
    };

    process();
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050b12] text-white">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-8 px-12 py-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,255,0.12)]">
          <div className="relative flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-2 border-cyan-400/30 animate-spin" />
            <div className="absolute h-10 w-10 rounded-full border-2 border-t-cyan-400 border-transparent animate-spin-slow" />
            <div className="absolute h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xl font-semibold tracking-wide">
              Finalizing Login
            </p>
            <p className="text-sm text-cyan-200/70">
              Establishing secure session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
