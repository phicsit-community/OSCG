"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Menu, User as UserIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Timeline", href: "/timeline" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user || null;

      setUser(currentUser);
      const seed = currentUser?.email || "user";
      const dicebearUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
      setAvatar(dicebearUrl);

      setLoading(false);
    };

    loadUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user || null;

        setUser(currentUser);
        const seed = currentUser?.email || "user";
        const dicebearUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}`;
        setAvatar(dicebearUrl);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAvatar("");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main navbar container */}
      <div
        className={`transition-all duration-500 ease-out ${isScrolled
          ? "mx-3 sm:mx-4 mt-3 md:mx-auto md:max-w-4xl lg:max-w-5xl"
          : "mx-0"
          }`}
      >
        <div
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 transition-all duration-500 ease-out ${isScrolled
            ? "h-14 sm:h-16 bg-[#0A0F15]/80 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "h-16 sm:h-20 bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="sm:w-[38px] sm:h-[38px] rounded-lg"
            />
            <span className="text-white font-semibold text-lg sm:text-xl">
              OSC<span className="text-[#6FE7C1]">G</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 lg:px-4 py-2 text-sm lg:text-base text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {!loading && !user && (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-white/60 cursor-pointer hover:text-white hover:bg-white/5 text-sm lg:text-base font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-[#6FE7C1] cursor-pointer hover:bg-[#5ad4af] text-[#0B0F17] text-sm lg:text-base font-semibold rounded-xl px-4 lg:px-6 py-2 lg:py-2.5">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {!loading && user && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative cursor-pointer group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FE7C1] to-[#5ad4af] rounded-full blur opacity-20 group-hover:opacity-40 transition items-center justify-center"></div>
                      <Avatar className="relative w-8 h-8 lg:w-9 lg:h-9 border border-white/10 transition-all">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <AvatarFallback className="bg-[#1a1f25] text-white text-xs lg:text-sm">
                          {user.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={12}
                    className="w-64 bg-[#0A0F15]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-2 outline-none"
                  >
                    <div className="px-3 py-4 mb-2 flex items-center gap-3 border-b border-white/5">
                      <div className="relative">
                        <Avatar className="w-10 h-10 border border-white/10">
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#6FE7C1] border-2 border-[#0A0F15] rounded-full" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-semibold text-white truncate leading-none mb-1">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || "User"}
                        </p>
                        <p className="text-[11px] text-white/40 truncate font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link href="/dashboard">
                        <DropdownMenuItem className="group cursor-pointer flex items-center gap-3 text-white/60 px-3 py-2.5 rounded-xl outline-none focus:bg-transparent focus:text-white/60">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 transition-colors group-hover:bg-[#6FE7C1]/10">
                            <LayoutDashboard className="w-4 h-4 text-white/60 transition-colors group-hover:text-[#6FE7C1]" />
                          </div>
                          <span className="text-[14px] font-medium transition-colors group-hover:text-[#6FE7C1]">
                            Dashboard
                          </span>
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/profile">
                        <DropdownMenuItem className="group cursor-pointer flex items-center gap-3 text-white/60 px-3 py-2.5 rounded-xl outline-none focus:bg-transparent focus:text-white/60">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 transition-colors group-hover:bg-[#6FE7C1]/10">
                            <UserIcon className="w-4 h-4 text-white/60 transition-colors group-hover:text-[#6FE7C1]" />
                          </div>
                          <span className="text-[14px] font-medium transition-colors group-hover:text-[#6FE7C1]">
                            Profile
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    </div>

                    <div className="my-2 h-[1px] bg-white/5 mx-1" />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="group cursor-pointer flex items-center gap-3 text-red-400/70 px-3 py-2.5 rounded-xl outline-none focus:bg-transparent focus:text-red-400/70"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-400/5 transition-colors group-hover:bg-red-400/10">
                            <LogOut className="w-4 h-4 transition-colors group-hover:text-red-400" />
                          </div>
                          <span className="text-[14px] font-medium transition-colors group-hover:text-red-400">Sign Out</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-[#0A0F15] border border-white/10 rounded-xl p-6 max-w-[440px] outline-none shadow-2xl">
                        <AlertDialogHeader className="space-y-3">
                          <AlertDialogTitle className="text-lg font-semibold text-white tracking-tight">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-[13px] text-white/50 leading-normal">
                            This action will sign you out of your current session. You will need to provide your credentials again to access your personalized contributor dashboard.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="flex items-center justify-end gap-3 mt-6">
                          <AlertDialogCancel className="h-9 px-4 rounded-lg bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all text-xs font-semibold border py-0 cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleLogout}
                            className="h-9 px-4 rounded-lg bg-white text-black hover:bg-white/90 transition-all text-xs font-bold border-0 py-0 cursor-pointer"
                          >
                            Sign Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/5 h-9 w-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-3 sm:inset-x-4 top-[4.5rem] sm:top-20 bg-[#0A0F15]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 sm:p-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white/70 hover:text-white hover:bg-white/5 rounded-lg sm:rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/5 space-y-2">
                {!loading && !user && (
                  <>
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-center text-sm sm:text-base text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full text-sm sm:text-base bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] font-semibold rounded-xl cursor-pointer">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}

                {!loading && user && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#6FE7C1] to-[#5ad4af] rounded-full blur opacity-25" />
                          <Avatar className="relative w-14 h-14 border border-white/10">
                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            <AvatarFallback className="bg-[#1a1f25] text-white">
                              {user.email?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#6FE7C1] border-2 border-[#0A0F15] rounded-full shadow-lg" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-white text-base font-semibold truncate leading-none mb-1.5">
                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                          </span>
                          <span className="text-white/40 text-xs truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                          <LayoutDashboard className="w-4 h-4 text-[#6FE7C1]" />
                          <span className="text-white/80 font-medium text-[13px]">Dashboard</span>
                        </Link>
                        <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                          <UserIcon className="w-4 h-4 text-[#6FE7C1]" />
                          <span className="text-white/80 font-medium text-[13px]">Profile</span>
                        </Link>
                      </div>

                      <Button
                        onClick={handleLogout}
                        className="w-full justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 bg-red-400/5 border border-red-400/10 rounded-xl h-12 font-semibold transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
