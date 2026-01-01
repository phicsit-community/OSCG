"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  LogOut,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },

];

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <>

      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-60 p-2 bg-[#11D392] text-[#090E1A] rounded-lg shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>


      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 left-0 z-55 h-screen w-[240px]  border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl overflow-hidden",
          !isMobileOpen && "max-lg:-translate-x-full",
          isMobileOpen && "max-lg:translate-x-0"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5 ">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#11D392] flex items-center justify-center shadow-[0_0_15px_rgba(17,211,146,0.3)] shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#090E1A] fill-current" />
            </div>
            <span className="font-bold text-base tracking-tight text-white whitespace-nowrap">
              OSCG <span className="text-[#11D392]">Admin</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-[#11D392]/10 text-[#11D392]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-all duration-200",
                    isActive ? "text-[#11D392]" : "group-hover:scale-110"
                  )}
                />
                <span className="font-bold text-sm whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute left-0 w-1 h-5 bg-[#11D392] rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group"
          >
            <div className="p-1.5 rounded-lg border border-white/10 group-hover:border-red-400/20 bg-white/5 transition-all">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold">Exit Board</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
