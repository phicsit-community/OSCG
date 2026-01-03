import React from "react";
import { Zap } from "lucide-react";

const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
];

export default function TechStack() {
  return (
    <div
      className="bg-gradient-to-br from-[#0f172a] via-[#0b1222] to-[#020617]
                    border border-[#1e293b]
                    rounded-2xl p-5 w-full h-full
                    shadow-[0_0_40px_rgba(56,189,248,0.08)]"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Tech Stack
        </h3>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1.5 text-xs font-medium text-gray-200
                       rounded-full border border-[#1e293b]
                       bg-[#0b1220]/80
                       hover:bg-[#1e293b]
                       transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
