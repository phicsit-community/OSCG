/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useDeferredValue, useEffect } from "react";
import {
  Search,
  Download,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  badges_created: number;
  is_admin: boolean;
  updated_at: string;
}

export default function UserManagement({ initialUsers }: { initialUsers: Profile[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user: Profile) => {
      const search = deferredSearchTerm.toLowerCase();
      return (
        (user.full_name || "").toLowerCase().includes(search) ||
        (user.email || "").toLowerCase().includes(search)
      );
    });
  }, [initialUsers, deferredSearchTerm]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [deferredSearchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Badges Created", "Joined Date"];
    const csvData = filteredUsers.map((user: Profile) => [
      `"${(user.full_name || "N/A").replace(/"/g, '""')}"`,
      `"${(user.email || "N/A").replace(/"/g, '""')}"`,
      user.badges_created,
      `"${new Date(user.updated_at).toISOString().split('T')[0]}"`
    ]);

    const csvContent = [headers.map(h => `"${h}"`), ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `oscg_participants_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported successfully!");
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Pagination Header */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        <div className="flex flex-col lg:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Search Box */}
          <div className="relative w-full lg:w-80 group shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#11D392] transition-colors" />
            <Input
              placeholder="Search participants..."
              className="h-11 pl-11 bg-[#0B0F17] border-white/5 rounded-xl focus:border-[#11D392]/30 text-white transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Compact Pagination Controls */}
          <div className="flex items-center gap-3 bg-[#0B0F17] h-11 px-3 border border-white/5 rounded-xl self-start lg:self-auto">
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-slate-400 hover:text-[#11D392] hover:bg-[#11D392]/10 disabled:opacity-20 cursor-pointer transition-all"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2 px-1">
                <span className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">Page</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) handlePageChange(val);
                  }}
                  className="w-10 h-7 bg-white/5 border border-white/10 rounded-md text-center text-xs font-black text-[#11D392] focus:border-[#11D392]/50 outline-none transition-all"
                />
                <span className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">of {totalPages || 1}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-slate-400 hover:text-[#11D392] hover:bg-[#11D392]/10 disabled:opacity-20 cursor-pointer transition-all"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <div className="flex items-center gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[11px] font-black text-slate-400 uppercase tracking-tighter cursor-pointer outline-none hover:text-white transition-colors"
              >
                <option value={10}>10 rows</option>
                <option value={30}>30 rows</option>
                <option value={50}>50 rows</option>
                <option value={100}>100 rows</option>
              </select>
            </div>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <div className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
              <span className="text-[#11D392]">{filteredUsers.length}</span> RECORDS
            </div>
          </div>
        </div>

        <Button
          onClick={downloadCSV}
          className="h-11 bg-[#11D392] hover:bg-[#0eb87f] text-[#090E1A] font-black px-6 rounded-xl gap-2 transition-all cursor-pointer w-full xl:w-auto shadow-[0_0_20px_rgba(17,211,146,0.2)]"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </Button>
      </div>

      <div className="bg-[#0B0F17] rounded-2xl border border-white/5 overflow-hidden shadow-xl flex flex-col">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/2">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-500 font-bold h-14 pl-6">Participant</TableHead>
                <TableHead className="text-slate-500 font-bold h-14">Email Address</TableHead>
                <TableHead className="text-slate-500 font-bold h-14">Badges</TableHead>
                <TableHead className="text-slate-500 font-bold h-14">Joined Date</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout" initial={false}>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user: Profile) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      key={user.id}
                      className="border-white/5 hover:bg-white/2 transition-colors group"
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-white/10">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                            <AvatarFallback className="bg-slate-800 text-xs">{user.full_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-slate-200">{user.full_name || "Anonymous"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm text-slate-400 font-medium">{user.email || "No Email"}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="border-[#11D392]/30 text-[#11D392] bg-[#11D392]/5">
                          {user.badges_created}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-xs text-slate-500 uppercase font-bold">
                          {(() => {
                            const date = new Date(user.updated_at);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            return `${day}/${month}/${year}`;
                          })()}
                        </span>
                      </TableCell>
                      <TableCell className="pr-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 cursor-pointer hover:text-white hover:bg-white/5"
                            onClick={() => window.location.href = `mailto:${user.email}`}
                          >
                            <Mail className="h-6 w-6" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center text-slate-500">
                      No participants found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
