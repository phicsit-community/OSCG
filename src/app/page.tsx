import dynamic from "next/dynamic";
import CoreValues from "@/components/landing/core-values";
import HeroSection from "@/components/landing/hero-section";
import Navigation from "@/components/landing/navigation";
import { LazySection } from "@/components/ui/LazySection";

const ProjectsSection = dynamic(() => import("@/components/landing/projects-section"), { ssr: true });
const SpeakersSection = dynamic(() => import("@/components/landing/speakers-section"), { ssr: true });
const SponsorsSection = dynamic(() => import("@/components/landing/sponsors-section"), { ssr: true });
const LatestInsights = dynamic(() => import("@/components/landing/blog-section"), { ssr: true });
const FAQ = dynamic(() => import("@/components/landing/faq-section"), { ssr: true });
const Footer = dynamic(() => import("@/components/landing/footer-section"), { ssr: true });

export default function Home() {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <CoreValues />

      <LazySection height="600px">
        <ProjectsSection />
      </LazySection>

      <LazySection height="600px">
        <SpeakersSection />
      </LazySection>

      <LazySection height="600px">
        <SponsorsSection />
      </LazySection>

      <LazySection height="800px">
        <LatestInsights />
      </LazySection>

      <LazySection height="600px">
        <FAQ />
      </LazySection>

      <LazySection height="400px">
        <Footer />
      </LazySection>
    </div>
  );
}

