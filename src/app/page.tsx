import LatestInsights from "@/components/landing/blog-section";
import CoreValues from "@/components/landing/core-values";
import FAQ from "@/components/landing/faq-section";
import Footer from "@/components/landing/footer-section";
import HeroSection from "@/components/landing/hero-section";
import IndustrySection from "@/components/landing/industry-section";
import Navigation from "@/components/landing/navigation";
import ProjectsSection from "@/components/landing/projects-section";
import SpeakersSection from "@/components/landing/speakers-section";
import SponsersSection from "@/components/landing/sponsors-section";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <CoreValues />
      <ProjectsSection />
      <SpeakersSection />
      <IndustrySection />
      <SponsersSection />
      <LatestInsights />
      <FAQ />
      <Footer />

    </div>
  );
}
