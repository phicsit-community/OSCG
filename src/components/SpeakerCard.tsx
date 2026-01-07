"use client";

import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SpeakerCard = ({ item }: { item: any }) => (
    <div className="group unified-card text-center h-[420px] flex flex-col justify-center items-center py-8 relative overflow-visible transition-all duration-300 hover:border-(--accent-primary)/50">
        <div className="relative z-10 w-full px-4">
            <div className="mb-6 flex justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full overflow-hidden bg-linear-to-br from-(--accent-secondary) to-(--accent-primary) shadow-lg group-hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={true}
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                </div>
            </div>

            <div className="flex flex-col justify-center gap-2 mb-6 min-h-20">
                <h3 className="text-xl text-white font-bold group-hover:text-(--accent-secondary) transition-colors">
                    {item.name}
                </h3>
                <p className="text-sm text-(--accent-secondary) font-medium tracking-wide">
                    {item.title}
                </p>
                <p className="text-xs text-(--text-muted) group-hover:text-(--text-secondary) transition-colors uppercase tracking-wider mt-1">
                    {item.expertise}
                </p>
            </div>

            <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.linkedin && (
                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-(--accent-primary) hover:border-(--accent-primary) hover:text-black transition-all duration-300 cursor-pointer"
                        >
                            <Linkedin className="h-4 w-4" />
                        </Button>
                    </a>
                )}
                {item.twitter && (
                    <a href={item.twitter} target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-(--accent-primary) hover:border-(--accent-primary) hover:text-black transition-all duration-300 cursor-pointer"
                        >
                            <Twitter className="h-4 w-4" />
                        </Button>
                    </a>
                )}
            </div>
        </div>
    </div>
);
