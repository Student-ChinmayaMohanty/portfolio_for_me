"use client";

import React from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TechSolarSystem from "@/components/TechSolarSystem";
import InteractiveAbout from "@/components/InteractiveAbout";
import ContactGraphic from "@/components/ContactGraphic";
import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function Home() {
  
  return (
    <SmoothScrollProvider>
      <main className="bg-[#121212] min-h-screen relative font-sans text-foreground">
        
        {/* Navigation Header */}
        <Navbar />

        {/* Section 1: Hero Canvas Scrollytelling */}
        <section className="relative z-10 w-full">
          <ScrollyCanvas>
            <Overlay />
          </ScrollyCanvas>
        </section>

        {/* Section 2: About Section (Interactive & Unified) */}
        <section id="about" className="relative z-20 py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#121212] border-t border-white/5">
          <InteractiveAbout />
        </section>

        {/* Section 3: Projects Grid */}
        <Projects />

        {/* Section 4: Technical Skills Stack (Integrated with TechSolarSystem) */}
        <section className="relative z-20 py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#121212] border-t border-white/5">
          <div className="flex flex-col gap-12">
            <div>
              <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase block mb-4">
                SKILLS & CAPABILITIES
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
                Technical Stack
              </h2>
            </div>
            
            <TechSolarSystem />
          </div>
        </section>

        {/* Section 5: Experience, Education & Certifications Timeline */}
        <section id="experience" className="relative z-20 py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[#121212] border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase block mb-4">
                TIMELINE
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                Journey & Education
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Highlighting academic milestones, hands-on internships at professional training centers, and national-level certifications.
              </p>
              <div className="text-xs font-mono text-neutral-500 border-l border-white/10 pl-4 py-1 flex flex-col gap-1">
                <span>📍 Bhubaneswar, India</span>
                <span>🎓 CSE (Artificial Intelligence)</span>
              </div>
            </div>
            
            <div className="lg:col-span-8 flex flex-col gap-16">
              <ExperienceTimeline />
            </div>
          </div>
        </section>

        {/* Section 6: Contact Footer */}
        <footer id="contact" className="relative z-20 bg-[#121212] pt-32 pb-16 border-t border-white/5">
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 rounded-full bg-gradient-to-t from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
            <ContactGraphic />
            
            {/* Bottom Copyright Row */}
            <div className="flex justify-center items-center pt-8 border-t border-white/5 gap-6 text-neutral-500 text-xs font-mono">
              <div>
                &copy; {new Date().getFullYear()} CHINMAYA MOHANTY. ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
        </footer>



      </main>
    </SmoothScrollProvider>
  );
}
