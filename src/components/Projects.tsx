"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Cpu, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  glowColor: string;
  icon: React.ReactNode;
  image: string;
  orbitDuration: string;
  orbitSize: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "SMARTCLASS PORTAL",
    category: "Computer Vision // Face Recognition",
    description: "An AI-powered smart classroom platform that authenticates students using OpenCV facial recognition technology and restricts personalized subject access based on successful verification.",
    tags: ["Python", "OpenCV", "Streamlit", "Supabase"],
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    glowColor: "rgba(59, 130, 246, 0.2)",
    icon: <Shield className="w-4 h-4 text-blue-400" />,
    image: "/smartclass.png",
    orbitDuration: "24s",
    orbitSize: "w-[140px] h-[140px] sm:w-[220px] sm:h-[220px]",
    link: "https://smartclass-landing-page-7fhc.vercel.app/",
    github: "https://github.com/Student-ChinmayaMohanty/Smart_Class.git",
  },
  {
    id: "02",
    title: "AI REAL-TIME GYM COACH",
    category: "Generative AI // Pose Estimation",
    description: "A fitness coaching application that tracks body landmarks, counts repetitions, and analyzes workout posture in real-time, integrating Groq LLM for personalized coaching feedback.",
    tags: ["Python", "MediaPipe", "OpenCV", "Groq API", "Streamlit"],
    gradient: "from-pink-500 via-purple-600 to-indigo-600",
    glowColor: "rgba(236, 72, 153, 0.2)",
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    image: "/gym_coach.png",
    orbitDuration: "34s",
    orbitSize: "w-[210px] h-[210px] sm:w-[340px] sm:h-[340px]",
    link: "ai-gym-assistant.netlify.app",
    github: "https://github.com/Student-ChinmayaMohanty/Ai_gym_assistant.git",
  },
  {
    id: "03",
    title: "ANIMAL DETECTION SYSTEM",
    category: "Deep Learning // CNN",
    description: "An end-to-end Machine Learning pipeline utilizing CNNs for deep learning image classification and detection, complete with model training and validation phases.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
    gradient: "from-emerald-500 via-teal-600 to-indigo-600",
    glowColor: "rgba(16, 185, 129, 0.2)",
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    image: "/animal_detection.png",
    orbitDuration: "44s",
    orbitSize: "w-[280px] h-[280px] sm:w-[460px] sm:h-[460px]",
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="work" className="relative z-20 py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#121212] border-t border-white/5">

      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
              SELECTED WORKS
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Projects Universe
          </h2>
        </div>

        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xs md:text-right">
          Interactive orbiting systems of core implementations. Hover over any planet to inspect the source deployment.
        </p>
      </div>

      {/* Orbit Graphic and Details Section */}
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8 justify-between w-full relative min-h-[600px]">

        {/* Style tags for keyframe animations */}
        <style>{`
          @keyframes project-orbit-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes project-planet-unspin {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          
          .proj-orbit-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 9999px;
            border: 1px dashed rgba(255, 255, 255, 0.08);
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .proj-orbit-spin {
            animation-name: project-orbit-spin;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          
          .proj-planet-unspin {
            animation-name: project-planet-unspin;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .proj-animation-paused {
            animation-play-state: paused !important;
          }
        `}</style>

        {/* Orbit Graphics Column */}
        <div className="relative w-full max-w-[300px] sm:max-w-none sm:w-[500px] aspect-square flex items-center justify-center lg:w-1/2 shrink-0">

          {/* Core Sun Node */}
          <div
            className="absolute z-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#121212] border border-indigo-500/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.35)] select-none text-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/5 animate-pulse" />
            <span className="text-[9px] font-mono text-indigo-400 tracking-[0.25em] uppercase">SYSTEMS</span>
            <span className="text-[10px] font-display font-bold text-white tracking-widest mt-1">CORE</span>
          </div>

          {/* Concentric Project Planets */}
          {projects.map((proj) => {
            const isActive = activeProject.id === proj.id;

            return (
              <div
                key={proj.id}
                className={`proj-orbit-ring proj-orbit-spin ${proj.orbitSize} ${isPaused ? "proj-animation-paused" : ""}`}
                style={{
                  animationDuration: proj.orbitDuration,
                  border: isActive ? `1.5px solid ${proj.glowColor}` : "1px dashed rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? `0 0 40px ${proj.glowColor}` : "none",
                  transition: "border 0.3s, box-shadow 0.3s"
                }}
              >
                {/* Planet Wrapper */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                  onMouseEnter={() => {
                    setActiveProject(proj);
                    setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                  }}
                  onClick={() => {
                    setActiveProject(proj);
                  }}
                >
                  {/* Planet body displaying cropped visual image */}
                  <div
                    className={`proj-planet-unspin ${isPaused ? "proj-animation-paused" : ""} w-10 h-10 sm:w-16 sm:h-16 bg-[#151515] border-2 ${isActive ? "border-white scale-110 shadow-[0_0_25px_rgba(255,255,255,0.2)]" : "border-white/20"} rounded-full overflow-hidden cursor-pointer transition-all duration-300 relative`}
                    style={{
                      animationDuration: proj.orbitDuration,
                    }}
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 640px) 40px, 64px"
                      className="object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />

                    {/* Glowing outer color ring overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent z-10`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Details Card Column */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl flex flex-col gap-6"
            >
              {/* Glowing category indicator */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-12 translate-x-12 blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeProject.glowColor }}
              />

              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {activeProject.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-600 font-bold">
                  {activeProject.id}
                </span>
              </div>

              {/* Large Image Preview */}
              <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden border border-white/5 relative bg-neutral-900">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60 z-10" />
              </div>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {activeProject.description}
              </p>

              {/* Technology tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2.5 py-1 rounded border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-2">
                <div className="flex gap-4">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      className="p-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  )}
                  {activeProject.link && (
                    <a
                      href={activeProject.link}
                      className="p-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-indigo-400 transition-colors duration-300 font-medium cursor-pointer">
                  CASE STUDY
                  <ArrowUpRight size={14} className="translate-y-0.5" />
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
