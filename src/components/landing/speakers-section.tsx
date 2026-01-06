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
    {
      name: "Aisha Khan",
      title: "Principal Engineer",
      expertise: "Open Source Strategy",
      image: "/default-avatar.png"
    },
    { ...speakers[0] },
    { ...speakers[3] },
    {
      name: "Aisha Khan",
      title: "Developer Advocate",
      expertise: "Infrastructure & Scalability",
      image: "/default-avatar.png"
    },
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
            className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl"
          >
            <CarouselContent className="-ml-4 py-10">
              {displaySpeakers.map((item: any, index: number) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="border-(--accent-primary)/30 hover:bg-(--accent-primary) hover:text-black text-(--accent-primary)" />
              <CarouselNext className="border-(--accent-primary)/30 hover:bg-(--accent-primary) hover:text-black text-(--accent-primary)" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
