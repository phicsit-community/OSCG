import React from "react";
import { Check, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type ProfileCardProps = {
  username: string;
};

export default function ProfileCard({ username }: ProfileCardProps) {
  const handleSocialClick = (platform: "github" | "linkedin", e: React.MouseEvent) => {
    if (platform === "github" && !username) {
      e.preventDefault();
      toast.warning("GitHub not linked", {
        description: "Please connect your GitHub in profile settings.",
      });
    } else if (platform === "linkedin") {
      e.preventDefault();
      toast.warning("LinkedIn not linked", {
        description: "Please connect your LinkedIn in profile settings.",
      });
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-8 w-full border border-white/10 h-full hover:border-[#00D6B2]/40 transition-all duration-300">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="p-1 rounded-full bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] shadow-[0_0_20px_rgba(0,214,178,0.3)]">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#0A0F15] flex items-center justify-center border-4 border-[#0A0F15]">
              <Image
                src={username ? `https://github.com/${username}.png` : "/default-avatar.png"}
                alt={`${username || "User"} avatar`}
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {username && (
            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 shadow-lg scale-90 sm:scale-100">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="15.6" fill="#00D6B2" />
                <path
                  d="M10.5 16.5L14.5 20.5L22.5 12.5"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <h1 className="text-white text-xl sm:text-2xl font-black mt-6 mb-1 tracking-tighter text-center break-all uppercase">
          {username || "Adventurer"}
        </h1>

        <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-center">
          {username ? `@${username}` : "Profile not linked"}
        </div>

        <div className="flex gap-4 mb-6">
          <a
            href={username ? `https://github.com/${username}` : "#"}
            target={username ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => handleSocialClick("github", e)}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-[#00D6B2] hover:border-[#00D6B2]/30 hover:bg-[#00D6B2]/5 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            onClick={(e) => handleSocialClick("linkedin", e)}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-[#00D6B2] hover:border-[#00D6B2]/30 hover:bg-[#00D6B2]/5 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-2 flex-wrap justify-center">
          <span className="bg-[#00D6B2]/10 text-[#00D6B2] text-[10px] sm:text-xs px-4 py-1.5 rounded-xl font-black uppercase tracking-widest border border-[#00D6B2]/20">
            Contributor
          </span>
          <span className="bg-white/5 text-white/70 text-[10px] sm:text-xs px-4 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10 font-bold uppercase tracking-wider">
            <Check className="w-3.5 h-3.5 text-[#00D6B2]" />
            Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 w-full">
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center border border-white/10 group/stat hover:bg-[#00D6B2]/5 hover:border-[#00D6B2]/30 transition-all">
            <div className="text-2xl sm:text-4xl font-black text-white mb-1 group-hover/stat:text-[#00D6B2] transition-colors tracking-tighter">0</div>
            <div className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Points</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 sm:p-6 text-center border border-white/10 group/stat hover:bg-[#4FD1D0]/5 hover:border-[#4FD1D0]/30 transition-all">
            <div className="text-2xl sm:text-4xl font-black text-white mb-1 group-hover/stat:text-[#4FD1D0] transition-colors tracking-tighter">0</div>
            <div className="text-white/40 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Merged</div>
          </div>
        </div>
      </div>
    </div>
  );
}
