"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { ArrowRight, Globe, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import LumaEmbed from "./lumaEmbed";
import { createPortal } from "react-dom";

// Shader background hook
// const useShaderBackground = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationFrameRef = useRef<number | undefined>(undefined);
//   const rendererRef = useRef<any>(null);
//   const pointersRef = useRef<any>(null);

//   useEffect(() => {
//     if (typeof window === "undefined" || !canvasRef.current) return;

//     // Dynamic import to avoid SSR issues
//     import("@/lib/shader-renderer")
//       .then(({ WebGLRenderer, PointerHandler, defaultShaderSource }) => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

//         rendererRef.current = new WebGLRenderer(canvas, dpr);
//         pointersRef.current = new PointerHandler(canvas, dpr);

//         rendererRef.current.setup();
//         rendererRef.current.init();

//         const resize = () => {
//           if (!canvas) return;
//           canvas.width = window.innerWidth * dpr;
//           canvas.height = window.innerHeight * dpr;
//           if (rendererRef.current) {
//             rendererRef.current.updateScale(dpr);
//           }
//         };

//         resize();

//         if (rendererRef.current.test(defaultShaderSource) === null) {
//           rendererRef.current.updateShader(defaultShaderSource);
//         }

//         const loop = (now: number) => {
//           if (!rendererRef.current || !pointersRef.current) return;

//           rendererRef.current.updateMouse(pointersRef.current.first);
//           rendererRef.current.updatePointerCount(pointersRef.current.count);
//           rendererRef.current.updatePointerCoords(pointersRef.current.coords);
//           rendererRef.current.updateMove(pointersRef.current.move);
//           rendererRef.current.render(now);
//           animationFrameRef.current = requestAnimationFrame(loop);
//         };

//         loop(0);

//         window.addEventListener("resize", resize);

//         return () => {
//           window.removeEventListener("resize", resize);
//           if (animationFrameRef.current) {
//             cancelAnimationFrame(animationFrameRef.current);
//           }
//           if (rendererRef.current) {
//             rendererRef.current.reset();
//           }
//         };
//       })
//       .catch((err) => {
//         console.error("Failed to load shader:", err);
//       });
//   }, []);

//   return canvasRef;
// };

const HeroSection = () => {
  const [user, setUser] = useState<User | null>(null);
  // const canvasRef = useShaderBackground();
  const [open, setOpen] = useState(false);

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

  const modal =
    open && true
      ? createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur bg-black/50">
            <div className="relative w-full max-w-4xl rounded-2xl bg-black p-4 flex items-center justify-center pt-6">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-8 top-6 text-white cursor-pointer z-10"
              >
                <X />
              </button>
              <LumaEmbed />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
        {/* Animated Shader Background
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none opacity-60 mix-blend-screen"
        style={{ background: "transparent" }}
      /> */}

        <div className="relative container pt-16 sm:pt-20 lg:pt-24 z-20 mx-auto px-6 sm:px-8 lg:px-16 text-center max-w-6xl">
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
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm backdrop-blur-md"
            >
              <Globe className="h-4 w-4 text-[var(--accent-secondary)]" />
              <span className="text-white/90 font-medium">
                Global Edition • 2026
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="mb-4 max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Connecting the World Through{" "}
              <span className="text-accent-gradient">Open Source</span>
            </h1>

            {/* Subheading */}
            <p className="mb-10 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
              Open Source Connect Global is a global open-source platform and
              annual event that connects developers, and organizations to collaborate,
              learn, and build real-world projects together.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full px-4 sm:px-0"
            >
              {user ? (
                <Link href="/badge" className="w-full sm:w-auto">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 rounded-2xl border-2 border-[var(--accent-primary)]/60 group-hover:border-[var(--accent-primary)] transition-colors" />

                    <div className="absolute -inset-2 rounded-2xl bg-[var(--accent-primary)]/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

                    <Button
                      size="lg"
                      className="relative h-16 px-12 w-full rounded-2xl 
        bg-linear-to-r from-[var(--accent-primary)] to-[#4FD1D0]
        text-black text-lg font-extrabold tracking-tight
        shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer
        overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Create Your Badge
                      </span>

                      <div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent 
        -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                      />
                    </Button>
                  </motion.div>
                </Link>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full sm:w-auto group cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <div className="absolute -inset-1 rounded-2xl border-2 border-[var(--accent-primary)]/60 group-hover:border-[var(--accent-primary)] transition-colors" />

                  <div className="absolute -inset-2 rounded-2xl bg-[var(--accent-primary)]/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

                  <Button
                    size="lg"
                    className="relative h-16 px-12 w-full rounded-2xl 
      bg-linear-to-r from-[var(--accent-primary)] to-[#4FD1D0]
      text-black text-lg font-extrabold tracking-tight
      shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer
      overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Register Now
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent 
      -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                  </Button>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
            >
              {[
                ["25,000+", "Participants"],
                ["60+", "Projects"],
                ["100+", "Mentors"],
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
      {modal}
    </>
  );
};

export default HeroSection;
