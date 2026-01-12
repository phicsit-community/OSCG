"use client";

import { useState, useMemo, useDeferredValue } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { updateUserRole } from "@/lib/actions/admin";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  badges_created: number;
  is_admin: boolean;
  role: string;
  created_at: string;
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
  const [prevSearchTerm, setPrevSearchTerm] = useState(deferredSearchTerm);
  if (deferredSearchTerm !== prevSearchTerm) {
    setPrevSearchTerm(deferredSearchTerm);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const downloadCSV = () => {
    const headers = ["S.No", "Name", "Email", "Badges Created", "Joined Date"];
    const csvData = filteredUsers.map((user: Profile, index: number) => [
      index + 1,
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

  const handleRoleChange = async (userId: string, newRole: string) => {
    const loadingToast = toast.loading("Updating role...");
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.success) {
        toast.success("Role updated successfully", { id: loadingToast });
      } else {
        toast.error(result.error || "Failed to update role", { id: loadingToast });
      }
    } catch (error) {
      console.error("Role update error:", error);
      toast.error("An unexpected error occurred", { id: loadingToast });
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
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-7 bg-transparent border-none text-[11px] font-black text-slate-400 uppercase tracking-tighter cursor-pointer focus:ring-0 focus:ring-offset-0 hover:text-white transition-colors gap-1.5 p-0">
                  <SelectValue placeholder={`${itemsPerPage} rows`} />
                </SelectTrigger>
                <SelectContent className="bg-[#0B0F17] border-white/10 text-slate-400 min-w-[100px]">
                  <SelectItem value="10" className="text-[11px] font-black uppercase tracking-tighter hover:bg-white/5 focus:bg-white/5 focus:text-[#11D392] cursor-pointer">10 rows</SelectItem>
                  <SelectItem value="30" className="text-[11px] font-black uppercase tracking-tighter hover:bg-white/5 focus:bg-white/5 focus:text-[#11D392] cursor-pointer">30 rows</SelectItem>
                  <SelectItem value="50" className="text-[11px] font-black uppercase tracking-tighter hover:bg-white/5 focus:bg-white/5 focus:text-[#11D392] cursor-pointer">50 rows</SelectItem>
                  <SelectItem value="100" className="text-[11px] font-black uppercase tracking-tighter hover:bg-white/5 focus:bg-white/5 focus:text-[#11D392] cursor-pointer">100 rows</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead className="text-slate-500 font-bold h-14 pl-6 w-12 text-center">#</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 w-48">Participant</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 w-64">Email Address</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 w-40 text-center">Role</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 text-center w-24">Badges</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 text-center w-32">Joined Date</TableHead>
                <TableHead className="text-slate-500 font-bold h-14 text-right pr-6 w-20">Actions</TableHead>
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
                      <TableCell className="pl-6 py-4 text-center">
                        <span className="text-xs font-bold text-slate-500">
                          {(currentPage - 1) * itemsPerPage + paginatedUsers.indexOf(user) + 1}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 border border-white/10 shrink-0">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                            <AvatarFallback className="bg-slate-800 text-[10px]">{user.full_name?.[0] || 'U'}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-slate-200 text-sm truncate max-w-[140px]">{user.full_name || "Anonymous"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm text-slate-400 font-medium truncate inline-block max-w-[200px]">{user.email || "No Email"}</span>
                      </TableCell>
                      <TableCell className="py-4 text-center px-2">
                        <Select
                          defaultValue={user.role || "contributor"}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                        >
                          <SelectTrigger className="h-8 w-32 bg-white/5 border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer mx-auto">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0B0F17] border-white/10 text-slate-300">
                            <SelectItem value="contributor" className="text-[10px] font-bold uppercase tracking-wider focus:bg-[#11D392]/10 focus:text-[#11D392] cursor-pointer">Contributor</SelectItem>
                            <SelectItem value="project-admin" className="text-[10px] font-bold uppercase tracking-wider focus:bg-[#11D392]/10 focus:text-[#11D392] cursor-pointer">Project Admin</SelectItem>
                            <SelectItem value="mentor" className="text-[10px] font-bold uppercase tracking-wider focus:bg-[#11D392]/10 focus:text-[#11D392] cursor-pointer">Mentor</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="py-4 text-center p-2">
                        <Badge variant="outline" className="border-[#11D392]/30 text-[#11D392] bg-[#11D392]/5 text-[10px] px-2 py-0 h-5">
                          {user.badges_created}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-center px-2">
                        <span className="text-[10px] text-slate-500 uppercase font-bold whitespace-nowrap">
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
                        <div className="flex justify-end pr-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#11D392] cursor-pointer  hover:bg-transparent hover:text-green-400 rounded-lg border border-[#11D392]/20"
                            onClick={() => window.location.href = `mailto:${user.email}`}
                          >
                            <Mail className="h-4 w-4" />
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
