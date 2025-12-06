"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signInWithEmail, signInWithGoogle, signInWithGitHub } from "@/lib/supabase/auth";
import { toast } from "sonner";
import AnimatedSidePanel from "@/components/ui/AnimatedSidePanel";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields");
      setEmailLoading(false);
      return;
    }

    try {
      const { user, error } = await signInWithEmail({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast.error(error.message);
      } else if (user) {
        toast.success("Signed in successfully");
        window.location.href = "/";
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setGoogleLoading(true);
      await new Promise(r => setTimeout(r, 50));

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

  const handleGitHubSignin = async () => {
    try {
      setGithubLoading(true);
      await new Promise(r => setTimeout(r, 50));

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
    <div className="min-h-screen bg-[#090E1A] flex">
      {/* Animated Side Panel */}
      <AnimatedSidePanel />

      {/* Login Form Side */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-10 py-32 bg-[#0B0F17]">
        <div className="w-full max-w-[380px]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-bold text-[#F8FAFC] mb-2">
              Welcome back,<br />Contributor!
            </h1>
            <p className="text-[14px] text-[#94A3B8]">
              Sign in to explore projects and connect with the community
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleEmailSignin}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-[14px] font-medium text-[#F8FAFC] mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full h-12 pl-11 pr-4 text-[14px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_3px_rgba(17,211,146,0.2)]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[14px] font-medium text-[#F8FAFC]">
                  Password
                </label>
                <Link href="#" className="text-[13px] text-[#11D392] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#94A3B8]" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-11 pr-11 text-[14px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg outline-none transition-all placeholder:text-[#94A3B8] focus:border-[#11D392] focus:shadow-[0_0_0_3px_rgba(17,211,146,0.2)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1D1F26] rounded cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-[18px] h-[18px] accent-[#11D392] cursor-pointer"
              />
              <label htmlFor="remember" className="text-[14px] text-[#94A3B8] cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-[15px] font-semibold text-[#090E1A] bg-gradient-to-br from-[#11D392] to-[#2AAE6F] rounded-lg cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,211,146,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {emailLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#2C313C]" />
            <span className="text-[12px] text-[#94A3B8] uppercase">or</span>
            <div className="flex-1 h-px bg-[#2C313C]" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGoogleSignin}
              disabled={isLoading}
              className="flex-1 h-11 flex items-center justify-center gap-2 text-[14px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg cursor-pointer transition-all hover:bg-[#1D1F26] disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Loading..." : "Google"}
            </button>
            <button
              type="button"
              onClick={handleGitHubSignin}
              disabled={isLoading}
              className="flex-1 h-11 flex items-center justify-center gap-2 text-[14px] text-[#F8FAFC] bg-[#101318] border border-[#3A3C43] rounded-lg cursor-pointer transition-all hover:bg-[#1D1F26] disabled:opacity-50"
            >
              <Github className="w-[18px] h-[18px]" />
              {githubLoading ? "Loading..." : "GitHub"}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-[14px] text-[#94A3B8]">
            New to open source?{" "}
            <Link href="/sign-up" className="text-[#11D392] font-medium hover:underline">
              Join the community
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
