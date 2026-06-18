"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Dynamically import ParticleCore (R3F WebGL Canvas) with SSR disabled
const ParticleCore = dynamic(() => import("./ParticleCore"), { ssr: false });

interface AIEngineerLoaderProps {
  progress: number;
  onComplete?: () => void;
}

// Terminal typewriter texts mapped to loading percentage ranges
const terminalLogs = [
  "Initializing quantum neural array...",        // Stage 0 -> 1
  "Attracting cosmic micro-dust particles...",    // Stage 1 -> 2
  "Establishing synapse vector connections...",  // Stage 2 -> 3
  "Brain cortex folds assembly in progress...",    // Stage 3 -> 4
  "Transforming into solar gravitational system...",// Stage 4 -> 4.8
  "System loaded. Activating consciousness..."    // Stage 4.8+
];

export default function AIEngineerLoader({ progress, onComplete }: AIEngineerLoaderProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [smoothPercent, setSmoothPercent] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [showNameReveal, setShowNameReveal] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [terminalIndex, setTerminalIndex] = useState(0);

  const stageValRef = useRef({ val: 0 });
  const textIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Types log statements based on loader progress
  useEffect(() => {
    let logIdx = 0;
    if (progress <= 15) logIdx = 0;
    else if (progress <= 35) logIdx = 1;
    else if (progress <= 55) logIdx = 2;
    else if (progress <= 75) logIdx = 3;
    else if (progress <= 95) logIdx = 4;
    else logIdx = 5;

    setTerminalIndex(logIdx);
  }, [progress]);

  // Terminal text typewriter speed effect
  useEffect(() => {
    const currentLog = terminalLogs[terminalIndex];
    let charIdx = 0;
    setDisplayText("");

    if (textIntervalRef.current) clearInterval(textIntervalRef.current);

    textIntervalRef.current = setInterval(() => {
      setDisplayText((prev) => prev + currentLog.charAt(charIdx));
      charIdx++;
      if (charIdx >= currentLog.length) {
        if (textIntervalRef.current) clearInterval(textIntervalRef.current);
      }
    }, 25);

    return () => {
      if (textIntervalRef.current) clearInterval(textIntervalRef.current);
    };
  }, [terminalIndex]);

  // 2. Smoothly ease preloading percentage using GSAP
  useEffect(() => {
    const percentObj = { val: smoothPercent };
    gsap.to(percentObj, {
      val: progress,
      duration: 1.0,
      ease: "power1.out",
      onUpdate: () => {
        setSmoothPercent(Math.floor(percentObj.val));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  // 3. Coordinate WebGL morphing stages using GSAP
  useEffect(() => {
    let targetStage = 0;
    
    // Map loading progress (0-100) to WebGL morph stages (0.0 - 4.8)
    if (progress <= 15) {
      targetStage = (progress / 15) * 1.0; // Scattered -> Attract
    } else if (progress <= 35) {
      targetStage = 1.0 + ((progress - 15) / 20) * 1.0; // Attract -> Orbit
    } else if (progress <= 55) {
      targetStage = 2.0 + ((progress - 35) / 20) * 1.0; // Orbit -> Connections
    } else if (progress <= 75) {
      targetStage = 3.0 + ((progress - 55) / 20) * 1.0; // Connections -> Brain
    } else if (progress <= 95) {
      targetStage = 4.0 + ((progress - 75) / 20) * 0.8; // Brain -> Solar System
    } else {
      targetStage = 4.8; // Wait for final transition at 100%
    }

    gsap.to(stageValRef.current, {
      val: targetStage,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setCurrentStage(stageValRef.current.val);
      }
    });
  }, [progress]);

  // 4. Choreograph final explosion, morph, zoom-through when progress hits 100%
  useEffect(() => {
    if (progress < 100) return;

    // Wait for smoothPercent to reach 100
    const checkComplete = setInterval(() => {
      if (smoothPercent >= 100) {
        clearInterval(checkComplete);
        initiateFinalReveal();
      }
    }, 100);

    return () => clearInterval(checkComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, smoothPercent]);

  const initiateFinalReveal = () => {
    // Stage 1: Trigger Name Morph (fade out 100% and fade in Name)
    setShowNameReveal(true);

    // Stage 2: Trigger Stardust Explosion & Wormhole Zoom (stage 4.8 -> 5.0)
    setIsZooming(true);
    
    // Animate stage variable into 5.0 (explodes stardust, pulls camera z close)
    gsap.to(stageValRef.current, {
      val: 5.0,
      duration: 1.8,
      ease: "power3.in",
      onUpdate: () => {
        setCurrentStage(stageValRef.current.val);
      },
      onComplete: () => {
        // Stage 3: Fade out entire loader panel to open portfolio
        if (onComplete) {
          onComplete();
        }
      }
    });
  };

  const designerName = "CHINMAYA MOHANTY";

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#050816] z-50 overflow-hidden flex flex-col items-center justify-center">
      
      {/* 3D WebGL Canvas Layer */}
      <ParticleCore stage={currentStage} />

      {/* Volumetric Radial Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.06)_0%,rgba(109,93,254,0.03)_50%,transparent_100%)]" />

      {/* Screen Frame Brackets (Tesla / Premium cyber feel) */}
      <div className="absolute inset-6 border border-white/5 pointer-events-none z-10 rounded-2xl">
        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/20 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-white/20 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/20 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/20 rounded-br-xl" />
      </div>

      {/* Loader UI Console Panel */}
      <AnimatePresence>
        {!isZooming && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="z-20 flex flex-col items-center justify-center gap-10 max-w-lg w-full text-center px-8"
          >
            
            {/* Center Loading Counter / Name Morph */}
            <div className="relative h-20 flex items-center justify-center">
              {!showNameReveal ? (
                // 100% Loading Counter
                <motion.div
                  key="counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="font-display text-7xl sm:text-8xl font-black tracking-tight text-white select-none text-glow"
                >
                  {smoothPercent.toString().padStart(3, "0")}
                  <span className="text-4xl text-cyan-400 font-light">%</span>
                </motion.div>
              ) : (
                // Awwwards Name Reveal
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[10px] uppercase font-mono tracking-[0.6em] text-cyan-400/90 mb-2">
                    COGNITIVE SPHERE LINKED
                  </span>
                  <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-[0.22em] text-white select-none leading-none flex overflow-hidden">
                    {designerName.split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 35, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className={letter === " " ? "w-3" : "inline-block"}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>
              )}
            </div>

            {/* Interactive Terminal status readouts */}
            <div className="glass-panel p-4 rounded-xl border border-white/5 w-64 sm:w-80 min-h-[64px] flex flex-col justify-center text-left bg-black/40 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                  SYNAPSE INITIALIZATION
                </span>
              </div>
              <p className="text-[10px] font-mono text-cyan-300/90 leading-normal select-none">
                {displayText}
                <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-[pulse_0.8s_infinite]" />
              </p>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Zoom HUD Portal Flash effect */}
      <AnimatePresence>
        {isZooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-white pointer-events-none z-30"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
