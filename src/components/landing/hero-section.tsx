"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

// Shader background hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const rendererRef = useRef<any>(null);
  const pointersRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    // Dynamic import to avoid SSR issues
    import('@/lib/shader-renderer').then(({ WebGLRenderer, PointerHandler, defaultShaderSource }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

      rendererRef.current = new WebGLRenderer(canvas, dpr);
      pointersRef.current = new PointerHandler(canvas, dpr);

      rendererRef.current.setup();
      rendererRef.current.init();

      const resize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        if (rendererRef.current) {
          rendererRef.current.updateScale(dpr);
        }
      };

      resize();

      if (rendererRef.current.test(defaultShaderSource) === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      }

      const loop = (now: number) => {
        if (!rendererRef.current || !pointersRef.current) return;

        rendererRef.current.updateMouse(pointersRef.current.first);
        rendererRef.current.updatePointerCount(pointersRef.current.count);
        rendererRef.current.updatePointerCoords(pointersRef.current.coords);
        rendererRef.current.updateMove(pointersRef.current.move);
        rendererRef.current.render(now);
        animationFrameRef.current = requestAnimationFrame(loop);
      };

      loop(0);

      window.addEventListener('resize', resize);

      return () => {
        window.removeEventListener('resize', resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (rendererRef.current) {
          rendererRef.current.reset();
        }
      };
    }).catch(err => {
      console.error('Failed to load shader:', err);
    });
  }, []);

  return canvasRef;
};

const HeroSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const canvasRef = useShaderBackground();

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
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Animated Shader Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none opacity-60 mix-blend-screen"
        style={{ background: 'transparent' }}
      />

      {/* Gradient fade to next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bg-dark) 100%)'
        }}
      />

      <div className="relative container pt-16 z-20 mx-auto px-6 sm:px-8 lg:px-16 text-center max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur-md"
          >
            <Github className="h-4 w-4 text-[var(--accent-secondary)]" />
            <span className="text-white/90 font-medium">Global Edition • 2026</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="mb-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Connecting the World Through{" "}
            <span className="text-accent-gradient">
              Open Source
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-12 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
            Join thousands of developers, innovators, and open source
            enthusiasts celebrating global collaboration and technological
            excellence.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[var(--accent-primary)] hover:bg-[#00c4a3] text-black border-0 cursor-pointer h-14 px-10 text-base font-semibold rounded-2xl shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all"
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-[var(--accent-primary)] hover:bg-[#00c4a3] text-black border-0 cursor-pointer h-14 px-10 text-base font-semibold rounded-2xl shadow-[0_0_30px_var(--accent-glow)] hover:shadow-[0_0_50px_var(--accent-glow)] transition-all"
                >
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5  cursor-pointer text-white backdrop-blur-sm h-14 px-10 text-base font-semibold rounded-2xl transition-all hidden min-[500px]:block"
              >
                Explore Projects
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-20 grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          >
            {[
              ["25,000+", "Participants"],
              ["60+", "Speakers"],
              ["100+", "Projects"],
              ["Global", "Community"],
            ].map(([value, label], i) => (
              <div
                key={i}
                className="flex flex-col items-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5"
              >
                <div className="mb-1 font-bold text-2xl sm:text-3xl text-[var(--accent-secondary)]">
                  {value}
                </div>
                <div className="text-sm text-white/60">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
