"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Bed, LayoutDashboard, LogOut, Menu, User as UserIcon, X } from "lucide-react";
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
import { toast } from "sonner";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Speakers", href: "/speakers" },
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

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset scroll state on route change
  useEffect(() => {
    setIsScrolled(false);
  }, [pathname]);

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
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main navbar container */}
      <div
        className={`transition-all duration-500 ease-out ${isScrolled
          ? "mx-3 sm:mx-4 mt-3 md:mx-auto md:max-w-5xl lg:max-w-6xl xl:max-w-[1400px]"
          : "mx-0"
          }`}
      >
        <div
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 transition-all duration-500 ease-out ${isScrolled
            ? "h-14 sm:h-16 bg-[#0A0F15]/80 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "h-16 sm:h-20 bg-transparent border border-transparent"
            }`}
        >

          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0"
          >
            <Image
              src="/logo1.png"
              alt="Logo"
              width={40}
              height={40}
              className="sm:w-[42px] sm:h-[42px] rounded-lg"
            />
            <span className="text-white font-semibold text-xl sm:text-2xl">
              <span className="hover:text-[#6FE7C1] transition-colors duration-300">OSCG</span><span className="text-[#6FE7C1]"> ’26</span>
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
                <Link href="/sign-up" className="relative group">
               

                  <Button className="relative bg-[#6FE7C1] hover:bg-[#6FE7C1] cursor-pointer text-[#0B0F17] text-sm lg:text-base font-black rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 transition-all overflow-hidden cursor-pointer">
                    <span className="relative z-10">Sign Up</span>
                    {/* Interior Light Streak */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
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
                      <Avatar className="relative w-8 h-8 lg:w-9 lg:h-9  transition-all">
                        <img
                          src={avatar}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {

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
                    className="w-[300px] bg-[#0A0F15]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-[1.75rem] p-1.5 outline-none"
                  >
                    <div className="px-3.5 py-3 mb-1 flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-9 h-9 ">
                          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </Avatar>

                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-[14px] font-bold text-white truncate leading-none mb-1">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || "User"}
                        </p>
                        <p className="text-[12px] text-white/40 truncate font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/5 mx-2 mb-1" />

                    <div className="space-y-0.5">
                      <Link href="/profile">
                        <DropdownMenuItem className="group cursor-pointer flex items-center gap-2.5 text-white/70 px-2.5 py-1.25 rounded-xl outline-none focus:bg-white/5 focus:text-white transition-all">
                          <div className="flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-white/5 transition-colors group-hover:bg-[#6FE7C1]/10">
                            <UserIcon className="w-3.5 h-3.5 text-white/60 transition-colors group-hover:text-[#6FE7C1]" />
                          </div>
                          <span className="text-[13px] font-medium transition-colors group-hover:text-white">
                            Profile
                          </span>
                        </DropdownMenuItem>
                      </Link>



                      <Link href="/dashboard">
                        <DropdownMenuItem className="group cursor-pointer flex items-center gap-2.5 text-white/70 px-2.5 py-1.25 rounded-xl outline-none focus:bg-white/5 focus:text-white transition-all">
                          <div className="flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-white/5 transition-colors group-hover:bg-[#6FE7C1]/10">
                            <LayoutDashboard className="w-3.5 h-3.5 text-white/60 transition-colors group-hover:text-[#6FE7C1]" />
                          </div>
                          <span className="text-[13px] font-medium transition-colors group-hover:text-white">
                            Dashboard
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    </div>

                    <div className="h-[1px] bg-white/5 mx-2 my-1" />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="group cursor-pointer flex items-center gap-2.5 text-red-500/90 px-2.5 py-1.25 rounded-xl outline-none focus:bg-red-500/5 transition-all"
                        >
                          <div className="flex items-center justify-center w-6.5 h-6.5 rounded-lg bg-red-400/5 transition-colors group-hover:bg-red-400/10">
                            <LogOut className="w-3.5 h-3.5 transition-colors group-hover:text-red-500" />
                          </div>
                          <span className="text-[13px] font-bold transition-colors group-hover:text-red-500">Logout</span>
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
                            className="h-9 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-xs font-bold border-0 py-0 cursor-pointer"
                          >
                            Logout
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-x-3 sm:inset-x-4 top-[4.5rem] sm:top-20 bg-[#0A0F15]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-3 space-y-0.5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    href={item.href}
                    className="block w-full py-2.5 text-center text-[15px] font-medium text-white/60 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-3 pb-3 space-y-4">
              {!loading && !user && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 w-full"
                >
                  <Link href="/sign-in" onClick={() => setIsMenuOpen(false)} className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full h-14 justify-center text-base text-white/70 hover:text-white hover:bg-white/5 cursor-pointer rounded-2xl"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsMenuOpen(false)} className="w-full relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-[#6FE7C1] to-[#4FD1D0] rounded-2xl blur-md opacity-30 animate-pulse" />
                    <Button className="relative w-full h-14 text-base bg-[#6FE7C1] hover:bg-[#5ad4af] text-[#0B0F17] font-bold rounded-2xl cursor-pointer shadow-lg overflow-hidden group">
                      <span className="relative z-10">Sign Up</span>
                      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    </Button>
                  </Link>
                </motion.div>
              )}
            </div>

            {!loading && user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-3 pb-5"
              >
                <div className="flex flex-col gap-3.5 p-3.5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#6FE7C1] to-[#5ad4af] rounded-full blur opacity-25" />
                      <Avatar className="relative w-12 h-12">
                        <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                        <AvatarFallback className="bg-[#1a1f25] text-white">
                          {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white text-[15px] font-bold truncate leading-none mb-1.5">
                        {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                      </span>
                      <span className="text-white/40 text-[10px] truncate font-medium tracking-tight">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                      <LayoutDashboard className="w-4 h-4 text-[#6FE7C1]" />
                      <span className="text-white/80 font-medium text-[13px]">Dashboard</span>
                    </Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                      <UserIcon className="w-4 h-4 text-[#6FE7C1]" />
                      <span className="text-white/80 font-medium text-[13px]">Profile</span>
                    </Link>
                  </div>

                  <Button
                    onClick={handleLogout}
                    className="w-full h-10 justify-center gap-2 text-red-500 hover:text-red-400 hover:bg-red-500/5 bg-transparent border border-red-500/10 rounded-xl font-bold transition-all active:scale-[0.98] text-[13px]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
