"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { updateUserPassword } from "@/lib/supabase/auth";
import { toast } from "sonner";
import AnimatedSidePanel from "@/components/ui/AnimatedSidePanel";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await updateUserPassword(newPassword);
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Password updated successfully!");
                router.push("/login");
            }
        } catch {
            toast.error("Failed to update password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090E1A] flex">
            {/* Side Panel */}
            <AnimatedSidePanel />

            {/* Form Side */}
            <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-10 py-32 bg-[#0B0F17]">
                <div className="w-full max-w-[400px]">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-[#11D392]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(17,211,146,0.1)]">
                            <ShieldCheck className="w-8 h-8 text-[#11D392]" />
                        </div>
                        <h1 className="text-[32px] font-bold text-[#F8FAFC] mb-3 tracking-tight">
                            Create New Password
                        </h1>
                        <p className="text-[15px] text-[#94A3B8] leading-relaxed">
                            Almost there! Choose a strong password to secure your account.
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[14px] font-semibold text-[#F8FAFC]">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] group-focus-within:text-[#11D392] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    required
                                    className="w-full h-14 pl-11 pr-11 text-[15px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-xl outline-none transition-all placeholder:text-[#94A3B8]/60 focus:border-[#11D392] focus:shadow-[0_0_0_4px_rgba(17,211,146,0.1)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[14px] font-semibold text-[#F8FAFC]">
                                Confirm New Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8] group-focus-within:text-[#11D392] transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat new password"
                                    required
                                    className="w-full h-14 pl-11 pr-11 text-[15px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-xl outline-none transition-all placeholder:text-[#94A3B8]/60 focus:border-[#11D392] focus:shadow-[0_0_0_4px_rgba(17,211,146,0.1)]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 text-[16px] font-bold text-[#090E1A] bg-gradient-to-br from-[#11D392] to-[#2AAE6F] rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,211,146,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                "Updating..."
                            ) : (
                                <>
                                    Update Password
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#3A3C43]/20">
                        <div className="bg-[#11D392]/5 rounded-xl p-4 border border-[#11D392]/10">
                            <p className="text-[13px] text-[#94A3B8] text-center leading-relaxed">
                                Security Tip: Ensure your password is unique and contains a mix of letters, numbers, and symbols.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
