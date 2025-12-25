"use client";

import { useState, useRef } from "react";
import { motion} from "framer-motion";
import {
  Camera,
  Download,
  Upload,
  User as UserIcon,
  Shield,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function BadgePage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="min-h-screen bg-[#050810] text-white selection:bg-[#00D6B2]/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#00D6B2]/5 blur-[150px] rounded-full opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4FD1D0]/5 blur-[150px] rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 max-w-7xl">
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#00D6B2]/5 border border-[#00D6B2]/10 mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#00D6B2] shadow-[0_0_10px_#00D6B2] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest text-[#00D6B2] uppercase">Contributor Recognition</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className=" origin --text-4xl md:text-6xl font-bold mb-8"
          >
            <span className="text-accent-gradient">Contributor</span><br />
            <span className="text-white">Badge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light"
          >
            Create your personalized OSCG badge to celebrate your contribution to open <br /> source.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="w-full max-w-105">
              <div className="flex items-center justify-center gap-6 mb-8">

                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />


                <span className="text-[15px] font-semibold tracking-[0.35em] text-[#92A4B9] uppercase">
                  Live Preview
                </span>


                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />
              </div>

              <motion.div
                layoutId="badge-card"
                className="relative aspect-[3/4.2] rounded-[2.5rem] p-px overflow-hidden group"
              >
                <div className="absolute -inset-2 bg-[#00D6B2]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-white/10" />

                <div className="relative h-full w-full rounded-[2.5rem] bg-[#0B1220] overflow-hidden flex flex-col p-10 bg-[radial-gradient(circle_at_top_right,rgba(0,214,178,0.08),transparent_50%)]">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                  <div className="relative z-10 w-full mb-6 px-2 flex justify-center items-center">
                    <Image
                      src="/logo1.png"
                      alt="OSCG Logo"
                      width={90}
                      height={40}
                      className="opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    />
                    <div className="text-white font-bold text-3xl">
                      <h1>Open Source</h1>
                      <h1>Connect <span className="text-[#00D4AA]">Global</span></h1>
                    </div>
                  </div>


                  <div className="relative z-10 flex flex-col items-center mb-6">
                    <div className="relative group/photo">
                      <div className="absolute -inset-3.75 bg-[#00D6B2]/10 blur-[30px] rounded-full opacity-50 group-hover/photo:opacity-100 transition-opacity" />

                      <div className="relative w-48 h-48 rounded-full p-1 bg-linear-to-tr from-[#00D6B2] via-[#4FD1D0] to-[#00D6B2]/20 shadow-[0_0_50px_rgba(0,214,178,0.3)] shrink-0">
                        <div className="w-full h-full rounded-full bg-[#0B1220] overflow-hidden flex items-center justify-center ring-4 ring-black/50">
                          {image ? (
                            <motion.img
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-20 h-20 text-white/3 drop-shadow-sm" />
                          )}
                        </div>
                      </div>


                      <div className="absolute -inset-1.5 border border-[#00D6B2]/20 rounded-full scale-105 animate-[spin_10s_linear_infinite]" />
                    </div>

                    <div className="mt-6 text-center space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-10 bg-linear-to-l from-[#00D6B2] via-[#00D6B2]/50 to-[#00D6B2]/0" />
                        <Sparkles className="w-4 h-4 text-[#00D6B2]" />
                        <div className="h-px w-10 bg-linear-to-r from-[#00D6B2] via-[#00D6B2]/50 to-[#00D6B2]/0" />
                      </div>

                      <h2 className="text-4xl font-bold text-white tracking-tight h-10 truncate max-w-[320px] mx-auto drop-shadow-md">
                        {name || "Your Name"}
                      </h2>

                      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00D6B2]/10 border border-[#00D6B2]/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00D6B2] shadow-[0_0_8px_#1AD5BD]" />
                        <span className="text-[11px] font-bold tracking-widest text-[#00D6B2] uppercase">Open Source Contributor</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8] font-bold mb-2">Open Source Connect Global</div>
                      <div className="flex items-center justify-center gap-3">
                      <div className="h-px w-20 bg-linear-to-r to-[#1F2B47] from-[#1F2B47]/0" />
                      <p className="text-[11px] tracking-[0.4em] text-white/40 font-medium">2026</p>
                      <div className="h-px w-20 bg-linear-to-r from-[#1F2B47] to-[#1F2B47]/0" />
                    </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-10 flex items-center justify-center gap-3 text-white/30 group">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D6B2] shadow-[0_0_8px_#1AD5BD] group-hover:scale-125 transition-transform" />
                <span className="text-[11px] font-semibold tracking-wide">Your badge updates in real-time</span>
              </div>
            </div>
          </div>


          <div className="order-1 lg:order-2 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full max-w-xl"
            >
              <h2 className="text-4xl font-bold mb-3 tracking-tight">
                Create Your <span className="text-[#00D6B2]">Badge</span>
              </h2>
              <p className="text-[#94A3B8] text-lg mb-5 leading-relaxed">
                Personalize your badge with your name and photo. Download and share your achievement.
              </p>


              <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[#0A1B24] border border-white/5 mb-14 hover:bg-[#0A1B24]/80 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-[#00D6B2]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-[#00D6B2]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5 tracking-tight">Privacy First</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    We don&apos;t store your image. Your privacy is our priority.
                  </p>
                </div>
              </div>


              <div className="space-y-6">

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <UserIcon className="w-5 h-5 text-[#00D6B2]" />
                      <Label htmlFor="name" className="text-[14px] font-bold uppercase tracking-[0.2em] text-white">Your Name <span className="text-red-500 ml-0.5">*</span></Label>
                    </div>
                    <div className="text-[12px] font-bold text-white/20 uppercase tracking-widest">
                      {name.length}/30 characters
                    </div>
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 30))}
                    className="h-14 border-white/5 rounded-2xl px-4 focus:border-[#00D6B2]/30 focus:ring-0 text-lg font-medium transition-all placeholder:text-white/70 bg-[#0E1726]"
                  />
                </div>


                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-5 h-5 text-[#00D6B2]" />
                    <Label className="text-[14px] font-bold uppercase tracking-[0.2em] text-white">Your Photo <span className="text-red-500 ml-0.5">*</span></Label>
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={cn(
                      "relative h-64 rounded-4xl border-2 border-dashed border-white/5 bg-white/2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-white/4 hover:border-[#00D6B2]/20 group overflow-hidden",
                      image && "border-[#00D6B2]/30 bg-[#00D6B2]/1"
                    )}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />

                    {image ? (
                      <>
                        <motion.img
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          src={image}
                          alt="Uploaded"
                          className="absolute inset-0 w-full h-full object-cover blur-sm"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-[#00D6B2] flex items-center justify-center shadow-[0_0_30px_rgba(0,214,178,0.4)] group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-8 h-8 text-black" />
                          </div>
                          <div className="text-center">
                            <span className="block text-sm font-bold text-white mb-1 uppercase tracking-widest">Image Uploaded</span>
                            <span className="text-[11px] font-bold text-[#00D6B2]/70 uppercase tracking-widest">Click to change</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00D6B2]/10 transition-all duration-500">
                          <Upload className="w-8 h-8 text-white/10 group-hover:text-[#00D6B2] transition-colors" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                            Drop your photo here or <span className="text-[#00D6B2]">browse</span>
                          </p>
                          <p className="text-xs font-bold text-[#64748B] uppercase tracking-[0.2em]">
                            JPG or PNG • Auto-cropped to square
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-16 rounded-2xl border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 text-sm font-bold cursor-pointer hover:text-white uppercase tracking-[0.2em] transition-all group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-3 group-hover:-translate-y-1 transition-transform text-[#00D6B2]" />
                    {image? "Change IMG" : "Upload IMG"}
                  </Button>
                  <Button
                    className="flex-1 h-16 rounded-2xl bg-[#00D6B2] hover:bg-[#00c4a3] text-black border-0 text-sm font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_-15px_rgba(0,214,178,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,214,178,0.5)] transition-all group disabled:opacity-20 disabled:grayscale cursor-pointer"
                    disabled={!name}
                  >
                    <Download className="w-4 h-4 mr-3 group-hover:translate-y-1 transition-transform" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}