"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Three.js
const Globe = dynamic(() => import("../ui/Globe"), { ssr: false });

const HeroSection = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#090E1A] pt-20">
      {/* Content */}
      <div className="relative z-10 w-full h-full min-h-dvh flex items-center justify-center px-4 md:px-8 py-8">
        <div className="flex flex-col items-center w-full">
          {/* Acrylic Glass Card - full page size */}
          <div className="relative backdrop-blur-md bg-transparent border border-white/10 rounded-3xl p-12 md:p-20 lg:p-28 shadow-2xl w-full max-w-6xl min-h-[75vh] flex flex-col justify-center overflow-hidden mt-4">
            {/* Globe inside the glass pane */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full opacity-50">
                <Globe />
              </div>
            </div>

            {/* Glass overlay for better text readability */}
            <div className="absolute inset-0 bg-[#090E1A]/20 rounded-3xl pointer-events-none" />

            {/* Content on top of globe */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#6FE7C1]/30 bg-[#6FE7C1]/10 px-5 py-2.5 text-sm text-[#6FE7C1] font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-[#6FE7C1] rounded-full animate-pulse" />
                Open Source Connect Global • 2026
              </div>

              {/* Heading */}
              <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Build the Future,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6FE7C1] to-[#00D4AA]">
                  Together
                </span>
              </h1>

              {/* Subtext */}
              <p className="mb-12 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Join developers worldwide in celebrating open source collaboration.
                Contribute, learn, and connect with the global community.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-5">
                {user ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] font-semibold rounded-full px-10 py-6 text-lg cursor-pointer"
                    >
                      Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
              ) : (
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] font-semibold rounded-full px-10 py-6 text-lg cursor-pointer"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}

              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white hover:text-white rounded-full px-10 py-6 text-lg cursor-pointer"
                >
                  Explore Projects
                </Button>
              </Link>
            </div>
            </div>
          </div>

          {/* Stats - moved inside the glass pane area */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            {[
              ["25K+", "Contributors"],
              ["100+", "Projects"],
              ["50+", "Countries"],
              ["∞", "Possibilities"],
            ].map(([value, label], i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-[#6FE7C1] mb-2">
                  {value}
                </div>
                <div className="text-base text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
