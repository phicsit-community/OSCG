/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, Variants } from "framer-motion";
import { speakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/SpeakerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

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
  const displaySpeakers = speakers.slice(0, 4);

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

        {/* Desktop View: Grid (Only 4) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid grid-cols-4 gap-6"
        >
          {displaySpeakers.map((item, index) => (
            <SpeakerCard key={index} item={item} />
          ))}
        </motion.div>

        {/* Mobile View: Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:hidden w-full relative group/carousel [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: 1.5,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full flex justify-center"
          >
            <CarouselContent className="-ml-2 py-10">
              {displaySpeakers.map((item: any, index: number) => (
                <CarouselItem key={index} className="pl-2 basis-full sm:basis-1/2 md:basis-1/3">
                  <SpeakerCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;
