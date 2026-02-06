"use client";

import {
    Github,
    Linkedin,
    ExternalLink
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="h-full group"
        >
            <div className="relative h-full rounded-2xl bg-[#090909] border border-white/5 p-6 flex flex-col shadow-md hover:border-white/10 transition-all overflow-hidden">

                <div className="flex items-center justify-between mb-5">
                    <div className="flex gap-2">
                        <Badge className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#00D6B2]/10 text-[#00D6B2] border border-[#00D6B2]/20">
                            {project.level}
                        </Badge>
                        <Badge className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10">
                            {project.category}
                        </Badge>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#00D6B2] transition-colors">
                    {project.title}
                </h3>

                <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/3 text-white/50 border border-white/5 transition-colors group-hover:border-[#00D6B2]/10"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="text-[10px] text-white/20 self-center">+{project.techStack.length - 3} more</span>
                    )}
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full h-11 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-[#00D6B2] hover:text-black hover:border-[#00D6B2] cursor-pointer transition-all font-bold text-xs uppercase tracking-tight">
                            View Details
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-w-xl p-0 bg-[#080808] border border-white/10 rounded-4xl text-white overflow-hidden max-h-[85vh] flex flex-col">
                        <div className="h-1 w-full bg-linear-to-r from-[#00D6B2] to-[#4FD1D0] shrink-0" />

                        <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-3">

                                    <DialogTitle className="text-3xl font-black tracking-tighter uppercase">
                                        {project.title}
                                    </DialogTitle>
                                </div>

                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h4 className="text-[15px] font-bold text-[#00D6B2]  opacity-60">Overview</h4>
                                    <p className="text-white/60 text-base leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-[15px] font-bold text-[#00D6B2]  opacity-60">Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge
                                                key={tech}
                                                className="bg-white/5 text-white/70 border border-white/5 px-3 py-1 rounded-lg text-[14px] font-medium"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute -inset-1 rounded-full bg-[#00D6B2]/30 blur opacity-40" />
                                            <Avatar className="relative h-14 w-14 border border-white/15">
                                                <AvatarImage src={project.admin.avatar} />
                                                <AvatarFallback className="bg-white/10 text-lg font-bold">
                                                    {project.admin.name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        <div className="leading-tight">
                                            <h5 className="text-lg font-semibold tracking-tight text-white">
                                                {project.admin.name}
                                            </h5>
                                            <p className="text-[11px] uppercase font-semibold tracking-wide text-[#00D6B2]/80">
                                                Project Owner
                                            </p>
                                        </div>
                                    </div>


                                    <div className="flex gap-3">
                                        <Button
                                            asChild
                                            className="h-11 w-11 rounded-xl bg-white/5 border border-white/10
               hover:bg-[#0077b5] hover:border-[#0077b5]
               transition-all duration-200 active:scale-95"
                                        >
                                            <a
                                                href={project.admin.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center"
                                            >
                                                <Linkedin className="w-5 h-5 text-white" />
                                            </a>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="p-8 pt-0 mt-auto">
                            <div className="flex gap-3">
                                <Button
                                    asChild
                                    className="flex-1 h-14 rounded-2xl
             bg-[#00D6B2] text-black
             font-bold uppercase tracking-wide text-[12px]
             hover:bg-[#00c5a3]
             transition-all duration-200
             shadow-lg shadow-[#00D6B2]/20
             active:scale-95"
                                >
                                    <a
                                        href={project.githubRepo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Github className="w-5 h-5" />
                                        Repository
                                    </a>
                                </Button>

                                {project.liveLink && (
                                    <Button
                                        asChild
                                        className="flex-1 h-14 rounded-2xl
             bg-white/5 text-white
             border border-white/10
             hover:bg-white/10
             font-semibold uppercase tracking-wide text-[12px]
             transition-all duration-200 active:scale-95"
                                    >
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-5 h-5 opacity-80" />
                                            Live Demo
                                        </a>
                                    </Button>

                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </motion.div>
    );
};
