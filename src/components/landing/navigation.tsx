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
      setAvatar(
        currentUser?.user_metadata?.avatar_url || "/default-avatar.png"
      );

      setLoading(false);
    };

    loadUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => {
        const currentUser = session?.user || null;

        setUser(currentUser);
        setAvatar(
          currentUser?.user_metadata?.avatar_url || "/default-avatar.png"
        );
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
            ? "h-14 sm:h-16 bg-[#111827]/80 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-[#6FE7C1]/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
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
                <Link href="/badge">
                  <Button
                    className="
      relative overflow-hidden
      rounded-xl
      px-5 lg:px-7 py-2.5 lg:py-3
      text-sm lg:text-base font-semibold
      text-[#0B0F17]
      bg-gradient-to-r from-[#6FE7C1] to-[#4fd1b5]
      shadow-[0_0_0_0_rgba(111,231,193,0.0)]
      transition-all duration-300 ease-out
      hover:shadow-[0_0_30px_rgba(111,231,193,0.35)]
      hover:scale-[1.02]
      active:scale-[0.98] cursor-pointer
    "
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Create your own badge
                    </span>

                    <span
                      className="
        absolute inset-0
        bg-white/10
        opacity-0
        hover:opacity-100
        transition-opacity duration-300
      "
                    />
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer w-8 h-8 lg:w-9 lg:h-9 border-2 border-transparent hover:border-[#6FE7C1]/50 transition-all">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="bg-[#1a1f25] text-white text-xs lg:text-sm">
                        {user.email?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    sideOffset={12}
                    className="w-64 bg-[#111827]/95 backdrop-blur-xl text-white rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2.5"
                  >
                    <div className="space-y-1">
                      <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-3.5 text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-[20px] transition-all group outline-none">
                          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#6FE7C1]/10 group-hover:text-[#6FE7C1] transition-all duration-300">
                            <LayoutDashboard className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-[15px]">Dashboard</span>
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-3.5 text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-[20px] transition-all group outline-none">
                          <div className="p-2 rounded-xl bg-white/5 group-hover:bg-[#6FE7C1]/10 group-hover:text-[#6FE7C1] transition-all duration-300">
                            <UserIcon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-[15px]">Profile</span>
                        </DropdownMenuItem>
                      </Link>
                    </div>

                    <div className="my-2.5 h-[1px] bg-white/5 mx-2" />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="cursor-pointer flex items-center gap-3.5 text-red-400/80 hover:text-red-400 hover:bg-red-400/5 px-4 py-3 rounded-[20px] transition-all group outline-none"
                        >
                          <div className="p-2 rounded-xl bg-red-400/5 group-hover:bg-red-400/10 transition-all duration-300">
                            <LogOut className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-[15px]">Sign Out</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="bg-[#111827] border border-white/10 rounded-3xl p-8 max-w-[400px]">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-2xl bg-red-400/10 flex items-center justify-center mb-2">
                            <LogOut className="w-8 h-8 text-red-400" />
                          </div>

                          <AlertDialogHeader className="space-y-2">
                            <AlertDialogTitle className="text-2xl font-bold text-white tracking-tight">
                              Sign Out?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-base text-white/50 leading-relaxed">
                              Are you sure you want to sign out? You&apos;ll need to sign back in to access your dashboard.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 w-full mt-6">
                            <AlertDialogCancel className="w-full cursor-pointer sm:flex-1 h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all font-semibold text-base py-0">
                              No, stay here
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleLogout}
                              className="w-full cursor-pointer sm:flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white border-0 transition-all font-semibold text-base shadow-[0_4px_20px_rgba(239,68,68,0.25)] py-0"
                            >
                              Yes, sign out
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
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
            className="md:hidden fixed inset-x-3 sm:inset-x-4 top-[4.5rem] sm:top-20 bg-[#111827]/95 backdrop-blur-2xl border border-white/5 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
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
                    <div className="flex items-center gap-3 px-3">
                      <Avatar className="w-12 h-12 border-2 border-[#6FE7C1]/30">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-[#1a1f25] text-white text-lg">
                          {user.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-white font-semibold truncate">
                          {user.email?.split('@')[0]}
                        </span>
                        <span className="text-white/40 text-xs truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-1">
                      <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                        <LayoutDashboard className="w-5 h-5 text-[#6FE7C1]" />
                        <span className="text-white/70 font-medium text-sm">Dashboard</span>
                      </Link>
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                        <UserIcon className="w-5 h-5 text-[#6FE7C1]" />
                        <span className="text-white/70 font-medium text-sm">Profile</span>
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 px-1">
                      <Link href="/badge" onClick={() => setIsMenuOpen(false)} className="flex-1">
                        <Button
                          className="w-full bg-[#6FE7C1] text-[#0B0F17] hover:bg-[#5ad4af] rounded-xl font-bold h-11 transition-all active:scale-95"
                        >
                          Create Badge
                        </Button>
                      </Link>

                      <Button
                        onClick={handleLogout}
                        className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl h-11 px-4 transition-all active:scale-95"
                      >
                        <LogOut className="w-5 h-5" />
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
