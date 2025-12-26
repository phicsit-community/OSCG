"use client";

import { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Download,
  Upload,
  User as UserIcon,
  Shield,
  Sparkles,
  Check,
  Move,
  Undo2,
  Redo2,
  Search,
  RotateCcw,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageAdjustment {
  scale: number;
  rotation: number;
}

export default function BadgePage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState<ImageAdjustment[]>([
    { scale: 1, rotation: 0 },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [adjustmentsDone, setAdjustmentsDone] = useState<boolean>(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (badgeRef.current === null) {
      return;
    }

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(badgeRef.current, {
        cacheBust: true,
        backgroundColor: "#0B1220",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      const fileName = `oscg-contributor-${name.toLowerCase().replace(/\s+/g, "-") || "user"}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Oops, something went wrong!", err);
    } finally {
      setIsDownloading(false);
    }
  }, [badgeRef, name]);

  const saveToHistory = (newScale: number, newRotation: number) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ scale: newScale, rotation: newRotation });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setScale(history[newIndex].scale);
      setRotation(history[newIndex].rotation);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setScale(history[newIndex].scale);
      setRotation(history[newIndex].rotation);
    }
  };

  const handleScaleChange = (newScale: number) => {
    setScale(newScale);
  };

  const handleScaleCommit = (newScale: number) => {
    saveToHistory(newScale, rotation);
  };

  const handleRotationChange = (newRotation: number) => {
    setRotation(newRotation);
  };

  const handleRotationCommit = (newRotation: number) => {
    saveToHistory(scale, newRotation);
  };

  const resetScale = () => {
    setScale(1);
    saveToHistory(1, rotation);
  };

  const resetRotation = () => {
    setRotation(0);
    saveToHistory(scale, 0);
  };

  const resetAll = () => {
    setScale(1);
    setRotation(0);
    saveToHistory(1, 0);
  };

  const setQuickRotation = (deg: number) => {
    setRotation(deg);
    saveToHistory(scale, deg);
  };

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
            <span className="text-[11px] font-bold tracking-widest text-[#00D6B2] uppercase">
              Contributor Recognition
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className=" origin text-4xl md:text-6xl font-bold mb-8"
          >
            <span className="text-accent-gradient">Contributor</span>
            <br />
            <span className="text-white">Badge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-[#94A3B8] text-lg md:text-xl max-w-175 mx-auto leading-relaxed font-light"
          >
            Create your personalized OSCG badge to celebrate your contribution
            to open source.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          <div className="flex flex-col items-center order-2 lg:order-1">
            <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-105">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />

                <span className="text-[11px] sm:text-[13px] md:text-[15px] font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#92A4B9] uppercase whitespace-nowrap">
                  Live Preview
                </span>

                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />
              </div>

              <motion.div
                ref={badgeRef}
                layoutId="badge-card"
                className="
        relative aspect-[3/4.2]
        rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem]
        overflow-hidden isolate group
      "
              >
                <div className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-[#00D6B2]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-br from-white/20 via-white/5 to-white/10" />
                </div>
                <div
                  className="
          relative w-full h-full rounded-inherit
          bg-[#0B1220] overflow-hidden
          flex flex-col
          p-4 sm:p-6 md:p-8 lg:p-10
          bg-[radial-gradient(circle_at_top_right,rgba(0,214,178,0.08),transparent_50%)]
        "
                >
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150 pointer-events-none" />
                  <div className="relative z-10 w-full mb-4 sm:mb-6 flex justify-center items-center gap-3">
                    <Image
                      src="/logo1.png"
                      alt="OSCG Logo"
                      width={90}
                      height={40}
                      className="opacity-90 w-12 sm:w-16 md:w-20 lg:w-[90px] h-auto"
                    />
                    <div className="text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
                      <h1>Open Source</h1>
                      <h1>
                        Connect <span className="text-[#00D4AA]">Global</span>
                      </h1>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative group/photo">
                      <div className="absolute inset-[-12%] bg-[#00D6B2]/10 blur-[30px] rounded-full opacity-60 group-hover/photo:opacity-100 transition-opacity" />
                      <div
                        className="
                relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48
                rounded-full p-1
                bg-linear-to-tr from-[#00D6B2] via-[#4FD1D0] to-[#00D6B2]/20
                shadow-[0_0_40px_rgba(0,214,178,0.35)]
              "
                      >
                        <div className="w-full h-full rounded-full bg-[#0B1220] overflow-hidden flex items-center justify-center ring-2 ring-black/50">
                          {image ? (
                            <motion.img
                              src={image}
                              alt="Preview"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale, rotate: rotation }}
                              transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                              }}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-14 h-14 text-white/30" />
                          )}
                        </div>
                      </div>
                      <div className="absolute inset-[-4%] border border-[#00D6B2]/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div className="mt-5 sm:mt-6 text-center space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-10 bg-linear-to-l from-[#00D6B2] via-[#00D6B2]/50 to-transparent" />
                        <Sparkles className="w-4 h-4 text-[#00D6B2]" />
                        <div className="h-px w-10 bg-linear-to-r from-[#00D6B2] via-[#00D6B2]/50 to-transparent" />
                      </div>

                      <h2 className="text-lg sm:text-3xl md:text-4xl font-bold text-white truncate max-w-[300px] mx-auto">
                        {name || "Your Name"}
                      </h2>

                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D6B2]/10 border border-[#00D6B2]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D6B2]" />
                        <span className="text-[10px] font-bold tracking-widest text-[#00D6B2] uppercase">
                          Open Source Contributor
                        </span>
                      </div>

                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#94A3B8] font-bold">
                        Open Source Connect Global
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-16 bg-linear-to-r from-transparent to-[#1F2B47]" />
                        <span className="text-xs tracking-widest text-white/40">
                          2026
                        </span>
                        <div className="h-px w-16 bg-linear-to-r from-[#1F2B47] to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-6 sm:mt-8 md:mt-10 flex items-center justify-center gap-2 sm:gap-3 text-white/30 group">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#00D6B2] shadow-[0_0_8px_#1AD5BD] group-hover:scale-125 transition-transform" />
                <span className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-wide">
                  Your badge updates in real-time
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-full max-w-xl"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">
                Create Your <span className="text-[#00D6B2]">Badge</span>
              </h2>
              <p className="text-[#94A3B8] text-lg mb-5 leading-relaxed">
                Personalize your badge with your name and photo. Download and
                share your achievement.
              </p>

              <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[#0A1B24] border border-white/5 mb-14 hover:bg-[#0A1B24]/80 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-[#00D6B2]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-[#00D6B2]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5 tracking-tight">
                    Privacy First
                  </h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    We don&apos;t store your image. Your privacy is our
                    priority.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <UserIcon className="w-5 h-5 text-[#00D6B2]" />
                      <Label
                        htmlFor="name"
                        className="text-[14px] font-bold uppercase tracking-[0.2em] text-white"
                      >
                        Your Name <span className="text-red-500 ml-0.5">*</span>
                      </Label>
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
                    <Label className="text-[14px] font-bold uppercase tracking-[0.2em] text-white">
                      Your Photo <span className="text-red-500 ml-0.5">*</span>
                    </Label>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />

                  {image ? (
                    <div
                      className="relative rounded-xl border-2 border-dashed border-[#00D6B2]/30 bg-[#00D6B2]/1 flex gap-4 cursor-pointer transition-all hover:bg-white/4 hover:border-[#00D6B2]/20 group overflow-hidden py-4 px-7"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-14 h-14 rounded-full p-1 shadow-[0_0_50px_rgba(0,214,178,0.3)] shrink-0">
                          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#00D6B2_70%,#89CFEB_30%)] z-0 blur-sm" />
                          <div className="w-full h-full rounded-full bg-[#0B1220] overflow-hidden flex items-center justify-center ring-2 ring-black/50 relative">
                            <motion.img
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              src={image}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="text-[#00D6B2] flex gap-1 text-lg justify-center items-center">
                            <Check className="w-4" />
                            <span className="font-bold">Photo uploaded</span>
                          </div>
                          <div className="text-[#94A3B8]">
                            Click to change photo
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      className={cn(
                        "relative h-64 rounded-4xl border-2 border-dashed border-white/5 bg-white/2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-white/4 hover:border-[#00D6B2]/20 group overflow-hidden",
                        image && "border-[#00D6B2]/30 bg-[#00D6B2]/1"
                      )}
                    >
                      <div className="flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/3 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00D6B2]/10 transition-all duration-500">
                          <Upload className="w-8 h-8 text-white/10 group-hover:text-[#00D6B2] transition-colors" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-md sm:text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                            Drop your photo here or{" "}
                            <span className="text-[#00D6B2]">browse</span>
                          </p>
                          <p className="text-xs font-bold text-[#64748B] uppercase sm:tracking-[0.2em]">
                            JPG or PNG • Auto-cropped to square
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {image && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-[#0B1220] border border-white/5 p-6 overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        adjustmentsDone && "cursor-pointer"
                      )}
                      onClick={() =>
                        adjustmentsDone && setAdjustmentsDone(false)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#00D6B2]/10 flex items-center justify-center">
                          <Move className="w-5 h-5 text-[#00D6B2]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            Adjust Your Image
                          </h3>
                          <p className="text-sm text-[#64748B]">
                            Fine-tune position and size
                          </p>
                        </div>
                      </div>
                      {adjustmentsDone ? (
                        <button
                          onClick={() => setAdjustmentsDone(false)}
                          className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <ChevronDown className="w-5 h-5 text-[#00D6B2] transition-transform" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={undo}
                            disabled={historyIndex <= 0}
                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Undo2 className="w-4 h-4 text-[#00D6B2]" />
                          </button>
                          <button
                            onClick={redo}
                            disabled={historyIndex >= history.length - 1}
                            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Redo2 className="w-4 h-4 text-[#00D6B2]" />
                          </button>
                        </div>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {!adjustmentsDone && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 pt-5">
                            {/* Scale Control */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Search className="w-4 h-4 text-[#00D6B2]" />
                                  <span className="text-sm font-medium text-white">
                                    Scale
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#00D6B2] bg-[#00D6B2]/10 px-2 py-1 rounded-md min-w-12.5 text-center">
                                    {scale.toFixed(2)}x
                                  </span>
                                  <button
                                    onClick={resetScale}
                                    className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-[#00D6B2]" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Search className="w-4 h-4 text-[#64748B]" />
                                <input
                                  type="range"
                                  min="0.5"
                                  max="2"
                                  step="0.01"
                                  value={scale}
                                  onChange={(e) =>
                                    handleScaleChange(
                                      parseFloat(e.target.value)
                                    )
                                  }
                                  onMouseUp={(e) =>
                                    handleScaleCommit(
                                      parseFloat(
                                        (e.target as HTMLInputElement).value
                                      )
                                    )
                                  }
                                  onTouchEnd={(e) =>
                                    handleScaleCommit(
                                      parseFloat(
                                        (e.target as HTMLInputElement).value
                                      )
                                    )
                                  }
                                  className="flex-1 h-2 bg-[#1a2535] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D6B2] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,214,178,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B1220]"
                                  style={{
                                    background: `linear-gradient(to right, #00D6B2 0%, #00D6B2 ${((scale - 0.5) / 1.5) * 100
                                      }%, #1a2535 ${((scale - 0.5) / 1.5) * 100
                                      }%, #1a2535 100%)`,
                                  }}
                                />
                                <Search className="w-5 h-5 text-[#64748B]" />
                              </div>
                            </div>

                            {/* Rotation Control */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <RotateCcw className="w-4 h-4 text-[#00D6B2]" />
                                  <span className="text-sm font-medium text-white">
                                    Rotation
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#00D6B2] bg-[#00D6B2]/10 px-2 py-1 rounded-md min-w-12.5 text-center">
                                    {rotation}°
                                  </span>
                                  <button
                                    onClick={resetRotation}
                                    className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5 text-[#00D6B2]" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <RotateCcw className="w-4 h-4 text-[#64748B]" />
                                <input
                                  type="range"
                                  min="0"
                                  max="360"
                                  step="1"
                                  value={rotation}
                                  onChange={(e) =>
                                    handleRotationChange(
                                      parseInt(e.target.value)
                                    )
                                  }
                                  onMouseUp={(e) =>
                                    handleRotationCommit(
                                      parseInt(
                                        (e.target as HTMLInputElement).value
                                      )
                                    )
                                  }
                                  onTouchEnd={(e) =>
                                    handleRotationCommit(
                                      parseInt(
                                        (e.target as HTMLInputElement).value
                                      )
                                    )
                                  }
                                  className="flex-1 h-2 bg-[#1a2535] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00D6B2] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,214,178,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0B1220]"
                                  style={{
                                    background: `linear-gradient(to right, #00D6B2 0%, #00D6B2 ${(rotation / 360) * 100
                                      }%, #1a2535 ${(rotation / 360) * 100
                                      }%, #1a2535 100%)`,
                                  }}
                                />
                                <RefreshCw className="w-4 h-4 text-[#64748B]" />
                              </div>


                              <div className="flex items-center gap-2 pt-1">
                                {[0, 90, 180, 270].map((deg) => (
                                  <button
                                    key={deg}
                                    onClick={() => setQuickRotation(deg)}
                                    className={cn(
                                      "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                                      rotation === deg
                                        ? "bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] text-black"
                                        : "bg-[#1a2535] text-[#64748B] hover:bg-[#1a2535]/80 hover:text-white"
                                    )}
                                  >
                                    {deg}°
                                  </button>
                                ))}
                              </div>
                            </div>


                            <div className="flex items-center gap-3 pt-2">
                              <Button
                                variant="outline"
                                onClick={resetAll}
                                className="flex-1 h-12 rounded-xl border-white/5 bg-[#1a2535] hover:bg-[#1a2535]/80 text-sm font-medium text-white hover:text-white transition-all cursor-pointer"
                              >
                                <RefreshCw className="w-4 h-4 mr-2 text-[#00D6B2]" />
                                Reset All
                              </Button>
                              <Button
                                className="flex-1 h-12 rounded-xl bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] hover:from-[#00c4a3] hover:to-[#3fc1c0] text-black text-sm font-medium transition-all cursor-pointer"
                                onClick={() => setAdjustmentsDone(true)}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Done
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-16 rounded-2xl border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 text-sm font-bold cursor-pointer hover:text-white uppercase tracking-[0.2em] transition-all group"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-3  transition-transform text-[#00D6B2]" />
                    {image ? "Change IMG" : "Upload IMG"}
                  </Button>
                  <Button
                    className="flex-1 h-16 rounded-2xl bg-[#00D6B2] hover:bg-[#00c4a3] text-black border-0 text-sm font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_-15px_rgba(0,214,178,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,214,178,0.5)] transition-all group disabled:opacity-20 disabled:grayscale cursor-pointer"
                    disabled={!name || !image || isDownloading}
                    onClick={handleDownload}
                  >
                    <Download
                      className={cn(
                        "w-4 h-4 mr-3 transition-transform",
                        isDownloading && "animate-spin"
                      )}
                    />
                    {isDownloading ? "Generating..." : "Download"}
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
