"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import CertificatesSection from "@/components/CertificatesSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import HowIWorkSection from "@/components/HowIWorkSection";

import { LanguageProvider } from "@/context/LanguageContext";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SeaCreatures = dynamic(() => import("@/components/SeaCreatures"), { ssr: false });
const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="relative isolate min-h-screen overflow-hidden text-slate-100">
        {/* Loading Screen */}
        <LoadingScreen />

        {/* Fixed Background — deep ocean gradient */}
        <div className="fixed inset-0 -z-20 deep-ocean" />

        {/* Flow Field Particle Layer — scroll parallax + cursor repulsion */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <NeuralBackground
            color="#22d3ee"
            trailOpacity={0.038}
            particleCount={520}
            speed={0.22}
            bgColor="#031226"
            className="opacity-45"
          />
        </div>

        {/* Ambient Sea Creatures Layer */}
        <SeaCreatures />

        {/* Custom Cursor (desktop only) */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Content Sections */}
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <HowIWorkSection />
        <FeaturedProjects />
        <CertificatesSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
