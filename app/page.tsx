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
import FloatingBubbles from "@/components/FloatingBubbles";
import LoadingScreen from "@/components/LoadingScreen";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SeaCreatures = dynamic(() => import("@/components/SeaCreatures"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden text-slate-100">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Fixed Background */}
      <div className="fixed inset-0 -z-20 deep-ocean" />

      {/* Ambient Layers */}
      <SeaCreatures />
      <FloatingBubbles />

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Content Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <CertificatesSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
