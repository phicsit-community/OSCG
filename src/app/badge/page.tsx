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
        pixelRatio: 3,
        style: {
          borderRadius: "2.5rem",
        },
      });
      const link = document.createElement("a");
      const fileName = `oscg-contributor-${
        name.toLowerCase().replace(/\s+/g, "-") || "user"
      }.png`;
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
            <div className="w-full max-w-[260px] min-[400px]:max-w-[280px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-105">
              <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />

                <span className="text-[11px] sm:text-[13px] md:text-[15px] font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#92A4B9] uppercase whitespace-nowrap">
                  Live Preview
                </span>

                <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#0C4C4B] to-transparent" />
              </div>

              <motion.div
                ref={badgeRef}
                layoutId="badge-card"
                className="relative aspect-[3/4.2] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group bg-[#081517] border border-white/5 shadow-2xl"
              >
                {/* Background base layers */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Subtle glows to match the image */}
                  <div className="absolute top-[10%] left-[10%] w-[80%] h-[30%] bg-[#00D6B2]/10 blur-[60px] rounded-full" />
                  <div className="absolute bottom-[10%] right-[10%] w-[80%] h-[30%] bg-[#00D6B2]/5 blur-[60px] rounded-full" />
                  <div className="absolute inset-0 bg-linear-to-b from-[#0d1f23] via-[#091619] to-[#081416]" />
                </div>

                <div className="relative z-10 w-full h-full flex flex-col items-center lg:p-5">
                  {/* Header: Globe + Text */}
                  <div className="w-full flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-5 mt-4">
                    <Image
                      src="/logo1.png"
                      alt="OSCG Globe"
                      width={54}
                      height={54}
                      className="w-10 min-[400px]:w-12 sm:w-16 h-auto"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-white font-bold text-sm min-[400px]:text-md sm:text-xl leading-none">
                        Open Source
                      </span>
                      <span className="text-white font-bold text-sm min-[400px]:text-md sm:text-xl leading-none">
                        Connect <span className="text-[#00D6B2]">Global</span>
                      </span>
                    </div>
                  </div>

                  {/* Avatar Area */}
                  <div className="relative mb-1 sm:mb-4">
                    {/* Glowing ring */}
                    <div className="absolute inset-[-12%] rounded-full bg-[#00D6B2]/20 blur-2xl animate-pulse" />
                    <div className="relative w-36 h-36 min-[400px]:w-40 min-[400px]:h-40 sm:w-42 sm:h-42 md:w-48 md:h-48 rounded-full p-[2px] sm:p-[3px] bg-linear-to-tr from-[#00D6B2] via-[#00D6B2]/50 to-[#00D6B2] shadow-[0_0_30px_rgba(0,214,178,0.4)]">
                      <div className="w-full h-full rounded-full bg-[#081416] overflow-hidden flex items-center justify-center">
                        {image ? (
                          <motion.img
                            src={image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            animate={{ scale, rotate: rotation }}
                            transition={{
                              type: "spring",
                              stiffness: 120,
                              damping: 20,
                            }}
                          />
                        ) : (
                          <UserIcon className="w-16 h-16 text-white/20" />
                        )}
                      </div>
                    </div>

                    {/* Verified Tick Icon */}
                    <div className="absolute bottom-[8%] right-[8%] sm:bottom-[4%] sm:right-[4%] w-5 h-5 min-[400px]:w-7 min-[400px]:h-7 sm:w-10 sm:h-10 flex items-center justify-center">
                      <div className="relative w-full h-full text-[#00D6B2] drop-shadow-[0_0_12px_rgba(0,214,178,0.6)]">
                        {/* <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z" />
                         </svg> */}
                        <Image
                          src="/badgeCheck.png"
                          alt=""
                          width={36}
                          height={36}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Main content area that pushes NexFellow to bottom */}
                  <div className="flex-1 w-full flex flex-col items-center justify-between">
                    <div className="flex flex-col items-center w-full">
                      {/* Sparkle "glowing thing" with lines on side */}
                      <div className="flex items-center gap-2 sm:gap-4 w-full mb-2 sm:mb-4">
                        <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#00D6B2]/30 to-transparent" />
                        <Sparkles className="w-3 h-3 sm:w-5 sm:h-5 text-[#00D6B2] drop-shadow-[0_0_8px_rgba(0,214,178,0.8)]" />
                        <div className="h-px flex-1 bg-linear-to-l from-transparent via-[#00D6B2]/30 to-transparent" />
                      </div>

                      <h2 className="text-xl min-[400px]:text-lg sm:text-2xl md:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-6 tracking-tight text-center px-1 break-words max-w-full overflow-hidden">
                        {name || "Your Name"}
                      </h2>

                      {/* Contributor Pill */}
                      <div className="inline-flex items-center gap-1 sm:gap-2.5 px-2 sm:px-6 py-1 sm:py-2 rounded-full bg-[#00D6B2]/10 border border-[#00D6B2]/20 mb-2 md:mb-4 lg:mb-8">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00D6B2] shadow-[0_0_10px_rgba(0,214,178,0.8)]" />
                        <span className="text-[8px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.25em] text-[#00D6B2] uppercase">
                          Contributor
                        </span>
                      </div>

                      {/* 2026 Section with dots and lines */}
                      <div className="flex items-center justify-center gap-2 sm:gap-4 w-full opacity-60">
                        <div className="h-[1px] flex-1 bg-linear-to-r from-transparent to-white/20" />
                        <div className="flex items-center gap-1 sm:gap-2 text-white">
                          <span className="text-xs sm:text-lg leading-none">
                            •
                          </span>
                          <span className="text-[10px] sm:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em]">
                            2026
                          </span>
                          <span className="text-xs sm:text-lg leading-none">
                            •
                          </span>
                        </div>
                        <div className="h-[1px] flex-1 bg-linear-to-l from-transparent to-white/20" />
                      </div>
                    </div>

                    {/* NexFellow Logo at bottom */}
                    <div className="w-full flex justify-center my-auto pb-1 sm:pb-4 lg:pb-0">
                      <Image
                        src="/nex1.png"
                        alt="NexFellow"
                        width={180}
                        height={50}
                        className="w-[35%] sm:w-[50%] h-auto"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 flex items-center justify-center gap-3 text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D6B2] shadow-[0_0_8px_#00D6B2]" />
                <span className="text-xs font-semibold tracking-wide">
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
                    className="h-14 border-white/15 rounded-2xl px-4 focus:border-[#00D6B2]/30 focus:ring-0 text-lg font-medium transition-all placeholder:text-white/70 bg-[#0E1726]"
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
                        "relative h-64 rounded-4xl border-2 border-dashed border-white/15 bg-white/2 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-white/4 hover:border-[#00D6B2]/20 group overflow-hidden",
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
                                    background: `linear-gradient(to right, #00D6B2 0%, #00D6B2 ${
                                      ((scale - 0.5) / 1.5) * 100
                                    }%, #1a2535 ${
                                      ((scale - 0.5) / 1.5) * 100
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
                                    background: `linear-gradient(to right, #00D6B2 0%, #00D6B2 ${
                                      (rotation / 360) * 100
                                    }%, #1a2535 ${
                                      (rotation / 360) * 100
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
                    className="flex-1 h-16 rounded-2xl border-white/15 bg-white/2 hover:bg-white/5 hover:border-white/10 text-sm font-bold cursor-pointer hover:text-white uppercase tracking-[0.2em] transition-all group"
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
