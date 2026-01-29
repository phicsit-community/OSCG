"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partnersRow1 = [
  { name: "Cloud Loop", logo: "/partners/cloudloop.jpg" },
  { name: "Orbiton", logo: "/partners/orbiton.jpg" },
  { name: "DevPath Community", logo: "/partners/devpathcommunity.jpg" },
  { name: "Asura Legion", logo: "/partners/asuralegion.jpg" },
  { name: "LearnHub", logo: "/partners/learnhub.jpg" },
  { name: "Future Minds United", logo: "/partners/FMU.jpeg" },
  { name: "SCIT CLUB", logo: "/partners/scitclub.jpg" },
  { name: "PICT OSS Community", logo: "/partners/pictoss.png" },
  { name: "Ignite Room", logo: "/partners/igniteroom.jpeg" },
  { name: "GDG Amity University", logo: "/partners/googledevgroup.jpg" },
];

const partnersRow2 = [
  { name: "Vibe X Community", logo: "/partners/vibex.png" },
  { name: "Code kutumb", logo: "/partners/codekutumb.jpg" },
  { name: "Digital Dominators", logo: "/partners/digitaldom.png" },
  { name: "GDGoc ITM SLS BARODA UNIVERSITY", logo: "/partners/gdgg.jpeg" },
  { name: "NEXGEN", logo: "/partners/nexgen.jpg" },
  { name: "Cluster Neuron", logo: "/partners/clusterneuron.jpg" },
  { name: "XoR", logo: "/partners/xor.png" },
  { name: "GDG on Campus Techno Main Saltlake", logo: "/partners/gd.png" },
  { name: "Codasauras Community", logo: "/partners/codesaurus.png" },
  { name: "GDG Amity University", logo: "/partners/googledevgroup.jpg" },
];

interface Partner {
  name: string;
  logo: string;
}

const platinumSponsors = [
  { name: "Nexfellow", logo: "/sponsors/nex.png", url: "https://www.nexfellow.com/" },
  // { name: "Google", logo: "/google.png" },
  // { name: "Azure", logo: "/azure.png" },
];

const silverSponsors = [
  { name: "TruScholar", logo: "/sponsors/TruScholar.jpg", url: "https://www.truscholar.io/" },
  { name: "CodeCrafters", logo: "/sponsors/codecraflight.png", url: "https://codecrafters.io/" },
  { name: "Zulip", logo: "/sponsors/zulip.svg", url: "https://zulip.com/" },
  // { name: "GitHub", logo: "https://www.vectorlogo.zone/logos/github/github-tile.svg" },
  // { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_(container_engine)_logo.svg" },
];

const SponsorsSection = () => {
  const speedFactor = 8;

  const marqueeVariantsLeft = {
    animate: {
      x: [0, -(partnersRow1.length * (120 + 16))],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: partnersRow1.length * speedFactor,
          ease: "linear" as const,
        },
      },
    },
  };

  const marqueeVariantsRight = {
    animate: {
      x: [-(partnersRow2.length * (120 + 16)), 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: partnersRow2.length * speedFactor,
          ease: "linear" as const,
        },
      },
    },
  };

  const duplicatedRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1, ...partnersRow1];
  const duplicatedRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2, ...partnersRow2];

  const PartnerCard = ({ partner, index }: { partner: Partner; index: number }) => (
    <div
      key={`${partner.name}-${index}`}
      className="relative group shrink-0 cursor-pointer transition-all duration-500 scale-[0.98] hover:scale-100"
    >
      <div className="relative w-[120px] h-[120px] rounded-2xl bg-white/2 backdrop-blur-md overflow-hidden flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:border-[#00D6B2]/40 group-hover:bg-[#00D6B2]/5 group-hover:shadow-[0_0_20px_rgba(0,214,178,0.15)]">
        <Image
          src={partner.logo}
          alt={partner.name}
          width={120}
          height={120}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 text-center pointer-events-none bg-linear-to-t from-black/90 via-black/70 to-transparent">
          <p className="text-white text-[10px] font-bold tracking-wider uppercase whitespace-normal line-clamp-2 px-1 leading-tight drop-shadow-md">
            {partner.name}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 overflow-hidden" id="sponsors">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />


      <div className="max-w-7xl mx-auto px-4 text-center relative z-10 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Our <span className="text-accent-gradient">Sponsors</span>
          </h2>
          <p className="text-(--text-secondary) text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Leading the way in open-source innovation through powerful global collaborations.
          </p>
        </motion.div>

        <div className="space-y-24">

          <div className="space-y-12">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-linear-to-r from-transparent to-[#00D6B2]" />
              <h3 className="text-[#00D6B2] text-sm font-bold tracking-[0.3em] uppercase">
                Platinum Sponsors
              </h3>
              <div className="h-px w-12 bg-linear-to-l from-transparent to-[#00D6B2]" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {platinumSponsors.map((sponsor) => {
                const Wrapper = sponsor.url ? motion.a : motion.div;
                return (
                  <Wrapper
                    key={sponsor.name}
                    href={sponsor.url}
                    target={sponsor.url ? "_blank" : undefined}
                    rel={sponsor.url ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.05 }}
                    className="relative group w-72 md:w-80 h-40 md:h-48 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center p-8 transition-all duration-500 hover:border-[#00D6B2]/50 hover:bg-[#00D6B2]/10 hover:shadow-[0_0_40px_rgba(0,214,178,0.2)]"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="w-full h-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                  </Wrapper>
                );
              })}
            </div>
          </div>


          <div className="space-y-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-linear-to-r from-transparent to-white/40" />
              <h3 className="text-white/40 text-sm font-bold tracking-[0.3em] uppercase">
                Silver Sponsors
              </h3>
              <div className="h-px w-10 bg-linear-to-l from-transparent to-white/40" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {silverSponsors.map((sponsor) => {
                const Wrapper = sponsor.url ? motion.a : motion.div;
                return (
                  <Wrapper
                    key={sponsor.name}
                    href={sponsor.url}
                    target={sponsor.url ? "_blank" : undefined}
                    rel={sponsor.url ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.05 }}
                    className="relative group w-56 md:w-64 h-32 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center p-6 transition-all duration-500 hover:border-white/30 hover:bg-white/10"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={150}
                      height={75}
                      className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-500"
                    />
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <p className="text-(--text-secondary) mb-8 text-lg font-medium">
            Interested in sponsoring? Join the global open source community.
          </p>
          <a
            href="mailto:hello@osconnect.org"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#00D6B2] text-black font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,214,178,0.4)] active:scale-95"
          >
            Become a Sponsor
          </a>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10 pt-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Network <span className="text-accent-gradient">Partners</span>
          </h2>
          <p className="text-(--text-secondary) text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Leading the way in open-source innovation through powerful global collaborations.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 space-y-4">
        <div
          className="relative w-full overflow-hidden py-4"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex gap-4 whitespace-nowrap will-change-transform"
            variants={marqueeVariantsLeft}
            animate="animate"
          >
            {duplicatedRow1.map((partner, index) => (
              <PartnerCard key={`row1-${index}`} partner={partner} index={index} />
            ))}
          </motion.div>
        </div>

        <div
          className="relative w-full overflow-hidden py-4"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex gap-4 whitespace-nowrap will-change-transform"
            variants={marqueeVariantsRight}
            animate="animate"
          >
            {duplicatedRow2.map((partner, index) => (
              <PartnerCard key={`row2-${index}`} partner={partner} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
