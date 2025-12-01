"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
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
  { label: "About us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Speakers", href: "/speakers" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Team", href: "/team" },
  { label: "Timeline", href: "/timeline" },
  { label: "Blog", href: "/blog" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(true);

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
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/5 bg-black/20 transition-all duration-300"
    >
      <div className="container px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="hidden sm:inline text-lg font-semibold text-white tracking-wide">
                Open Source Connect{" "}
                <span className="text-[#00D4AA]">Global</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-white font-medium transition-all group px-3 py-2"
              >
                <span className="group-hover:text-[#6FE7C1] transition">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6FE7C1] group-hover:w-full transition-all" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!loading && !user && (
              <Link href="/sign-in">
                <Button className="border-2 border-[#6FE7C1] text-white bg-transparent rounded-xl px-6 py-2 font-semibold hover:bg-[#1a2e31] cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}

            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer border border-[#6FE7C1]">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="bg-[#1a1f25] text-white">
                      {user.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white text-[#0B0F17] rounded-xl shadow-lg border border-gray-200"
                >
                  <DropdownMenuLabel className="text-gray-600 text-sm font-semibold px-2 py-1">
                    Account
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-600 px-2 py-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </DropdownMenuItem>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Log out?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will be signed out from your account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          Log out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-200 hover:text-[#6FE7C1]"
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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden fixed left-4 right-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
              style={{ top: "5rem" }}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
            >
              <div className="py-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-6 py-3 text-white hover:text-[#6FE7C1] hover:bg-[#6FE7C1]/10 rounded-md mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {user && (
                  <>
                    <div className="border-t border-[#6FE7C1]/20 my-3 mx-4" />
                    <div className="px-6 py-3 flex justify-between items-center">
                      <Avatar className="cursor-pointer border border-[#6FE7C1]">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-[#1a1f25] text-white">
                          {user.email?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <Button
                        onClick={handleLogout}
                        className="bg-[#6FE7C1] text-[#0B0F17] px-5 rounded-md font-semibold hover:bg-[#4fd5ae]"
                      >
                        Log Out
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
