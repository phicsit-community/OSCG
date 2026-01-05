"use client";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import { speakers } from "@/data/speakers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const SpeakersSection = () => {

  const displaySpeakers = [
    { type: "dummy", id: "dummy-1" },
    { type: "speaker", data: speakers[0] },
    { type: "speaker", data: speakers[3] },
    { type: "dummy", id: "dummy-2" },
  ];

  return (
    <section className="section-container bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <motion.div
          className="section-header mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-center mb-4">
            Our <span className="text-accent-gradient">Speakers</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-center text-(--text-muted) max-w-2xl mx-auto text-lg">
            Learn from industry leaders and open source pioneers who are driving
            innovation forward
          </motion.p>
        </motion.div>


        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl"
          >
            <CarouselContent className="-ml-4 py-10">
              {displaySpeakers.map((item, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <div className="group unified-card text-center h-[420px] flex flex-col justify-center items-center py-8 relative overflow-visible transition-all duration-300 hover:border-[var(--accent-primary)]/50">
                    <div className="relative z-10 w-full px-4">

                      <div className="mb-6 flex justify-center">
                        <div className="relative flex h-40 w-40 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] shadow-lg group-hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-500 border-2 border-[#00D6B2]">
                          {item.type === "speaker" && item.data ? (
                            <>
                              <Image
                                src={item.data.image}
                                alt={item.data.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                priority={true}
                              />
                              <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                            </>
                          ) : (
                            <div className="w-full h-full bg-[var(--card-bg)]/50 backdrop-blur-sm" />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col justify-center gap-2 mb-6 min-h-[5rem]">
                        {/* Name */}
                        <h3 className="text-xl text-white font-bold group-hover:text-[var(--accent-secondary)] transition-colors">
                          {item.type === "speaker" && item.data ? item.data.name : "Dummy"}
                        </h3>
                        {/* Title */}
                        <p className="text-sm text-[var(--accent-secondary)] font-medium tracking-wide">
                          {item.type === "speaker" && item.data ? item.data.title : "Dummy"}
                        </p>
                        {/* Expertise */}
                        <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors uppercase tracking-wider mt-1">
                          {item.type === "speaker" && item.data ? item.data.expertise : "Dummy"}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className={`flex justify-center gap-3 transition-opacity ${item.type === "dummy" ? "opacity-0 invisible" : "opacity-80 group-hover:opacity-100"}`}>
                        {item.type === "speaker" && item.data?.linkedin && (
                          <a href={item.data.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                            >
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </a>
                        )}

                        {item.type === "speaker" && item.data?.twitter && (
                          <a href={item.data.twitter} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:text-black transition-all duration-300 cursor-pointer"
                            >
                              <Twitter className="h-4 w-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)] hover:text-black text-[var(--accent-primary)]" />
              <CarouselNext className="border-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)] hover:text-black text-[var(--accent-primary)]" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
