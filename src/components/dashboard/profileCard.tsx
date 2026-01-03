import React from "react";
import { Check, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type ProfileCardProps = {
  username: string;
  fullName?: string;
  linkedin?: string;
};

export default function ProfileCard({ username, fullName, linkedin }: ProfileCardProps) {
  // Extract handle if user pasted a full URL
  const cleanUsername = React.useMemo(() => {
    if (!username) return "";
    if (username.includes("github.com")) {
      return username.split('/').filter(Boolean).pop() || "";
    }
    return username;
  }, [username]);

  const handleSocialClick = (platform: "github" | "linkedin", e: React.MouseEvent) => {
    if (platform === "github" && !cleanUsername) {
      e.preventDefault();
      toast.warning("GitHub not linked", {
        description: "Please connect your GitHub in profile settings.",
      });
    } else if (platform === "linkedin" && !linkedin) {
      e.preventDefault();
      toast.warning("LinkedIn not linked", {
        description: "Please connect your LinkedIn in profile settings.",
      });
    }
  };

  return (
    <div className="bg-white/5  backdrop-blur-xl rounded-[2.5rem] p-8 w-full border border-white/5 h-full hover:border-[#00D6B2]/20 transition-all duration-500 shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative p-1 rounded-full bg-linear-to-br from-white/10 to-transparent">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#0A0F15] flex items-center justify-center border-2 border-white/5">
              <Image
                src={cleanUsername ? `https://github.com/${cleanUsername}.png` : "/default-avatar.png"}
                alt={`${cleanUsername || "User"} avatar`}
                width={112}
                height={112}
                className="object-cover transition duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {cleanUsername && (
            <div className="absolute bottom-1 right-1 sm:bottom-1 sm:right-1 shadow-lg scale-90">
              <div className="bg-[#00D6B2] p-1.5 rounded-full border-4 border-[#0B0F17]">
                <Check className="w-3 h-3 text-white stroke-4" />
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-white text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight">
            {fullName || cleanUsername || "Adventurer"}
          </h1>

          <div className="flex items-center justify-center gap-1.5 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 w-fit mx-auto">
            <Github className="w-3 h-3 text-[#00D6B2]" />
            <span className="text-white/40 text-[11px] font-bold tracking-wider lowercase">
              {cleanUsername ? `@${cleanUsername}` : "unlinked"}
            </span>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <a
            href={cleanUsername ? `https://github.com/${cleanUsername}` : "#"}
            target={cleanUsername ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => handleSocialClick("github", e)}
            className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-[#00D6B2] hover:border-[#00D6B2]/20 hover:bg-[#00D6B2]/5 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={linkedin || "#"}
            target={linkedin ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={(e) => handleSocialClick("linkedin", e)}
            className="p-3.5 rounded-2xl cursor-pointer bg-white/5 border border-white/10 text-white/40 hover:text-[#00D6B2] hover:border-[#00D6B2]/20 hover:bg-[#00D6B2]/5 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-8">
          <span className="bg-[#00D6B2]/10 text-[#00D6B2] text-[10px] px-4 py-1.5 rounded-xl font-black uppercase tracking-widest border border-[#00D6B2]/10">
            Contributor
          </span>
          <span className="bg-white/5 text-white/40 text-[10px] px-4 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/10 font-bold uppercase tracking-widest">
            Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 w-full">
          <div className="bg-white/2 rounded-3xl p-6 text-center border border-white/5 group/stat hover:bg-[#00D6B2]/5 hover:border-[#00D6B2]/20 transition-all">
            <div className="text-3xl font-black text-white mb-1 tracking-tighter">0</div>
            <div className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">Points</div>
          </div>
          <div className="bg-white/2 rounded-3xl p-6 text-center border border-white/5 group/stat hover:bg-[#4FD1D0]/5 hover:border-[#4FD1D0]/20 transition-all">
            <div className="text-3xl font-black text-white mb-1 tracking-tighter">0</div>
            <div className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">Merged</div>
          </div>
        </div>
      </div>
    </div>
  );
}
