"use client";

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
  const animationFrameRef = useRef<number>();
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
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Shader Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: 'black' }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative container z-20 mt-24 mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white backdrop-blur-md font-medium tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors"
          >
            <Github className="h-4 w-4 text-[#B8FFF9]" />
            <span className="truncate">Global Edition • 2026</span>
          </motion.div>

          <h1 className="mb-6 max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
            Connecting the World Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#57D2D7] to-[#B8FFF9]">
              Open Source
            </span>
          </h1>

          <p className="mb-12 max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed drop-shadow-md">
            Join thousands of developers, innovators, and open source
            enthusiasts celebrating global collaboration and technological
            excellence.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-20 flex flex-wrap items-center justify-center gap-4"
          >
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#00D6B2] hover:bg-[#00d6b2da] text-black border-0 cursor-pointer h-12 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(0,214,178,0.3)] hover:shadow-[0_0_30px_rgba(0,214,178,0.5)] transition-all"
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="bg-[#00D6B2] hover:bg-[#00d6b2da] text-black border-0 cursor-pointer h-12 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(0,214,178,0.3)] hover:shadow-[0_0_30px_rgba(0,214,178,0.5)] transition-all"
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
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm h-12 px-8 text-lg font-semibold transition-all"
              >
                Explore Projects
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid w-full max-w-4xl grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4"
          >
            {[
              ["25,000+", "Participants", "#57D2D7"],
              ["60+", "Speakers", "#89CFEB"],
              ["100+", "Projects", "#57D2D7"],
              ["Global", "Community", "#89CFEB"],
            ].map(([value, label, color], i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:bg-white/10 transition-colors">
                <div
                  className="mb-2 font-bold md:text-4xl text-3xl"
                  style={{ color }}
                >
                  {value}
                </div>
                <div className="text-sm text-gray-300 font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
