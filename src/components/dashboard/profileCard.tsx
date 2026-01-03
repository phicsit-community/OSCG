import React from "react";
import { Github, Linkedin, ExternalLink, Eye, Check } from "lucide-react";
import Image from "next/image";

type ProfileCardProps = {
  username: string;
};

export default function ProfileCard({ username }: ProfileCardProps) {
  return (
    <div className="bg-[#151b2d] rounded-3xl p-6 w-full shadow-2xl border border-[#1e293b] h-full">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="border-4 rounded-full border-[#00D6B2]">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white flex items-center justify-center border-4 border-[#151b2d]">
              <Image
                src={`https://github.com/${username}.png`}
                alt={`${username} avatar`}
                width={96}
                height={96}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute bottom-1 right-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 15.6C0 6.98436 6.98436 0 15.6 0C24.2156 0 31.2 6.98436 31.2 15.6C31.2 24.2156 24.2156 31.2 15.6 31.2C6.98436 31.2 0 24.2156 0 15.6Z"
                fill="#00D6B2"
              />
              <path
                d="M10.1664 13.3467C10.0691 12.9084 10.084 12.4526 10.2098 12.0216C10.3356 11.5906 10.5682 11.1983 10.8861 10.8811C11.2039 10.564 11.5966 10.3322 12.0279 10.2073C12.4591 10.0824 12.915 10.0684 13.3531 10.1667C13.5942 9.78953 13.9264 9.47917 14.319 9.26419C14.7117 9.04921 15.1521 8.93652 15.5997 8.93652C16.0474 8.93652 16.4878 9.04921 16.8804 9.26419C17.2731 9.47917 17.6053 9.78953 17.8464 10.1667C18.2852 10.068 18.7418 10.0819 19.1737 10.2071C19.6057 10.3323 19.999 10.5648 20.317 10.8828C20.635 11.2008 20.8674 11.594 20.9926 12.026C21.1178 12.458 21.1317 12.9146 21.0331 13.3533C21.4102 13.5945 21.7206 13.9267 21.9355 14.3193C22.1505 14.7119 22.2632 15.1524 22.2632 15.6C22.2632 16.0476 22.1505 16.4881 21.9355 16.8807C21.7206 17.2733 21.4102 17.6055 21.0331 17.8467C21.1313 18.2848 21.1173 18.7406 20.9924 19.1719C20.8675 19.6031 20.6357 19.9959 20.3186 20.3137C20.0014 20.6315 19.6092 20.8641 19.1782 20.9899C18.7472 21.1157 18.2914 21.1306 17.8531 21.0333C17.6122 21.4119 17.2798 21.7236 16.8865 21.9395C16.4932 22.1555 16.0518 22.2687 15.6031 22.2687C15.1544 22.2687 14.713 22.1555 14.3197 21.9395C13.9264 21.7236 13.5939 21.4119 13.3531 21.0333C12.915 21.1316 12.4591 21.1176 12.0279 20.9927C11.5966 20.8678 11.2039 20.636 10.8861 20.3189C10.5682 20.0017 10.3356 19.6094 10.2098 19.1784C10.084 18.7474 10.0691 18.2916 10.1664 17.8533C9.78638 17.6128 9.47335 17.2801 9.25644 16.8861C9.03953 16.4922 8.92578 16.0497 8.92578 15.6C8.92578 15.1503 9.03953 14.7078 9.25644 14.3139C9.47335 13.9199 9.78638 13.5872 10.1664 13.3467Z"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5996 15.5999L14.9329 16.9333L17.5996 14.2666"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-white text-xl font-bold mt-4 mb-1">{username}</h1>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 text-xs flex items-center gap-1 hover:text-[#4ade80]"
        >
          @{username}
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Badges */}
        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          <span className="bg-[#3b82f6] text-white text-xs px-3 py-1.5 rounded-full font-medium">
            Contributor
          </span>
          <span className="bg-[#1e293b] text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 border border-[#2d3748]">
            <Check className="w-3 h-3" />
            Verified
          </span>
        </div>

        {/* Socials */}
        <div className="flex gap-3 mt-4">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            className="bg-[#1e293b] p-2.5 rounded-xl hover:bg-[#2d3748] border border-[#2d3748]"
          >
            <Github className="w-4 h-4 text-gray-300" />
          </a>
          <a
            href="#"
            className="bg-[#1e293b] p-2.5 rounded-xl hover:bg-[#2d3748] border border-[#2d3748]"
          >
            <Linkedin className="w-4 h-4 text-gray-300" />
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-4 w-full">
          <div className="flex-1 bg-[#1e293b] rounded-xl p-4 text-center border border-[#2d3748]">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-gray-400 text-xs">Points</div>
          </div>
          <div className="flex-1 bg-[#1e293b] rounded-xl p-4 text-center border border-[#2d3748]">
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-gray-400 text-xs">PRs Merged</div>
          </div>
        </div>
      </div>
    </div>
  );
}
