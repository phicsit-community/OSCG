"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

const HeroSection = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ||null);
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Group 1.svg')",
        }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative container mt-24 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 text-center">
        <div className="flex flex-col items-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm text-white backdrop-blur-md font-medium tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.15),0_0_30px_rgba(184,255,249,0.2)] animate-[pulseGlow_2.5s_ease-in-out_infinite]">
            <Github className="h-4 w-4 text-[#B8FFF9]" />
            <span className="truncate">Global Edition • 2026</span>
          </div>

          <h1 className="mb-6 max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
            Connecting the World Through{" "}
            <span className="text-[#57D2D7]">Open Source</span>
          </h1>

          <p className="mb-12 max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Join thousands of developers, innovators, and open source
            enthusiasts celebrating global collaboration and technological
            excellence.
          </p>

          <div className="mb-20 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#00D6B2] hover:bg-[#00d6b2da] text-black border-0 cursor-pointer"
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-[#00D6B2] hover:bg-[#00d6b2da] text-black border-0 cursor-pointer"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}

            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-green-400 cursor-pointer bg-transparent hover:bg-white/10 text-white hover:text-white"
              >
                Explore Projects
              </Button>
            </Link>
          </div>

          <div className="grid w-full max-w-4xl grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4">
            {[
              ["25,000+", "Participants", "#57D2D7"],
              ["60+", "Speakers", "#89CFEB"],
              ["100+", "Projects", "#57D2D7"],
              ["Global", "Community", "#89CFEB"],
            ].map(([value, label, color], i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className="mb-2 font-bold md:text-4xl text-3xl"
                  style={{ color }}
                >
                  {value}
                </div>
                <div className="text-sm text-gray-300">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
