"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import {
  signInWithGoogle,
  signInWithGitHub,
  signUpWithEmail,
} from "@/lib/supabase/auth";
import { toast } from "sonner";
import { GlobeVibrant } from "@/components/ui/GlobeVibrant";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);

    if (!formData.name.trim()) {
      toast.error("Full name is required");
      setEmailLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      setEmailLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setEmailLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setEmailLoading(false);
      return;
    }

    try {
      const { user, error } = await signUpWithEmail({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
      } else if (user) {
        toast.success("Check your email for the verification link!");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);
      await new Promise((r) => setTimeout(r, 50));

      const { data, error } = await signInWithGoogle();

      if (error) {
        toast.error(error.message);
        setGoogleLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Something went wrong");
      setGoogleLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    try {
      setGithubLoading(true);
      await new Promise((r) => setTimeout(r, 50));

      const { data, error } = await signInWithGitHub();

      if (error) {
        toast.error(error.message);
        setGithubLoading(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch {
      toast.error("Something went wrong");
      setGithubLoading(false);
    }
  };

  const isLoading = emailLoading || googleLoading || githubLoading;

  return (
    <div className="h-screen bg-[#090E1A] overflow-hidden flex flex-row-reverse">
      {/* Right Side - Globe Panel */}
      <div className="hidden lg:flex w-1/2 h-screen relative overflow-hidden">
        {/* Globe */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[65%] h-[65%]">
            <GlobeVibrant className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Left Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-6 bg-[#0B0F17]">
        <div className="w-full max-w-[380px]">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-[22px] font-bold text-[#F8FAFC] mb-1">
              Join the Community
            </h1>
            <p className="text-[13px] text-[#94A3B8]">
              Create your account and start contributing
            </p>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              className="flex-1 h-10 flex items-center justify-center gap-2 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg cursor-pointer transition-all hover:bg-[#1D1F26] hover:border-[#11D392]/30 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {googleLoading ? "..." : "Google"}
            </button>
            <button
              type="button"
              onClick={handleGitHubSignup}
              disabled={isLoading}
              className="flex-1 h-10 flex items-center justify-center gap-2 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg cursor-pointer transition-all hover:bg-[#1D1F26] hover:border-[#11D392]/30 disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              {githubLoading ? "..." : "GitHub"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#2C313C]" />
            <span className="text-[11px] text-[#94A3B8] uppercase">or</span>
            <div className="flex-1 h-px bg-[#2C313C]" />
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleEmailSignup}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="block text-[13px] font-medium text-[#F8FAFC] mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full h-10 pl-9 pr-3 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_2px_rgba(17,211,146,0.15)]"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block text-[13px] font-medium text-[#F8FAFC] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full h-10 pl-9 pr-3 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_2px_rgba(17,211,146,0.15)]"
                />
              </div>
            </div>

            {/* Password Row - Side by Side */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block text-[13px] font-medium text-[#F8FAFC] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min. 6 chars"
                    autoComplete="new-password"
                    className="w-full h-10 pl-9 pr-9 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_2px_rgba(17,211,146,0.15)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-medium text-[#F8FAFC] mb-1.5">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm"
                    autoComplete="new-password"
                    className="w-full h-10 pl-9 pr-9 text-[13px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_2px_rgba(17,211,146,0.15)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] rounded cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 text-[14px] font-semibold text-[#090E1A] bg-linear-to-br from-[#11D392] to-[#2AAE6F] rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,211,146,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {emailLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Terms + Sign In */}
          <div className="mt-4 text-center space-y-2">
            <p className="text-[11px] text-[#64748B]">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-[#11D392] hover:underline">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy-policy" className="text-[#11D392] hover:underline">Privacy</Link>
            </p>
            <p className="text-[13px] text-[#94A3B8]">
              Have an account?{" "}
              <Link href="/sign-in" className="text-[#11EB8C] font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
