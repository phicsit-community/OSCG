"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Leaderboard", href: "/leaderboard" },
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
            ? "mx-4 mt-3 md:mx-auto md:max-w-4xl"
            : "mx-0"
          }`}
      >
        <div
          className={`flex items-center justify-between px-8 transition-all duration-500 ease-out ${isScrolled
              ? "h-16 bg-[#111827]/80 backdrop-blur-2xl rounded-2xl border border-[#6FE7C1]/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              : "h-20 bg-transparent border border-transparent"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={38}
              height={38}
              className="rounded-lg"
            />
            <span className="text-white font-semibold text-xl">
              OSC<span className="text-[#6FE7C1]">G</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-base text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!loading && !user && (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-white hover:bg-white/5 text-base font-medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] text-base font-semibold rounded-xl px-6 py-2.5">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer w-9 h-9 border-2 border-transparent hover:border-[#6FE7C1]/50 transition-all">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-[#1a1f25] text-white text-sm">
                      {user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-[#1a1f25] text-white rounded-xl border border-white/10 shadow-xl"
                >
                  <DropdownMenuLabel className="text-white/50 text-xs font-medium px-3 py-2">
                    Account
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-white/5 px-3 py-2 mx-1 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-[#1a1f25] border border-white/10">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Log out?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/60">
                          You will be signed out from your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                          Log out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-x-4 top-20 bg-[#111827]/95 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                {!loading && !user && (
                  <>
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-center text-white/70 hover:text-white hover:bg-white/5"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] font-semibold rounded-xl">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}

                {!loading && user && (
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-[#6FE7C1]/30">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-[#1a1f25] text-white">
                          {user.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white/70 text-sm truncate max-w-[120px]">
                        {user.email}
                      </span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      size="sm"
                      className="bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg"
                    >
                      Logout
                    </Button>
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
