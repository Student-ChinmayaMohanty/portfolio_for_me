"use client";

import React, { useState, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  const [isRevealed, setIsRevealed] = useState(false);
  const [isFaded, setIsFaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Automatically reveal if the user scrolls down
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.015 && !isRevealed) {
      setIsRevealed(true);
    }
  });

  // Once revealed, auto-fade after 4.5 seconds to reveal the background face/canvas
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsFaded(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const handleReveal = () => {
    setIsRevealed(true);
    setIsFaded(false);
  };

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Tapping or clicking the text toggles the faded/unfaded state
    setIsFaded((prev) => !prev);
  };

  // Scroll animations for Section 1: "CHINMAYA MOHANTY" (0% - 25% scroll progress)
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.18], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);

  // Scroll animations for Section 2: "I build digital experiences." (30% - 55% scroll progress)
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.45, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.50], [60, -60]);

  // Scroll animations for Section 3: "Bridging design and engineering." (60% - 85% scroll progress)
  const opacity3 = useTransform(scrollYProgress, [0.54, 0.60, 0.76, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.54, 0.82], [60, -60]);

  // Scroll down indicator opacity (fades out quickly at start of scroll)
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      
      {/* Background radial gradient overlay to improve text contrast slightly */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(18,18,18,0.4)_100%)] pointer-events-none" />

      {/* Full-screen click catcher if not revealed yet */}
      {!isRevealed && (
        <div 
          onClick={handleReveal}
          className="absolute inset-0 z-30 pointer-events-auto cursor-pointer"
        />
      )}

      {/* Section 1: Hero Centered Title */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-16">
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="text-center max-w-4xl px-4 w-full"
        >
          <motion.div
            animate={{
              opacity: isRevealed ? (isHovered ? 1.0 : (isFaded ? 0.08 : 1.0)) : 0.0,
              filter: isRevealed ? (isHovered ? "blur(0px)" : (isFaded ? "blur(3.5px)" : "blur(0px)")) : "blur(12px)",
              scale: isRevealed ? 1.0 : 0.95
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleTextClick}
            className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer select-none"
          >
            {/* Masked reveal for sub-header */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: isRevealed ? 0 : "100%" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-neutral-400 font-mono block"
              >
                AI / ML Engineer &copy; 2026
              </motion.span>
            </div>

            {/* Masked reveal for name */}
            <div className="overflow-hidden py-1 sm:py-2">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: isRevealed ? 0 : "100%" }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight text-white leading-none"
              >
                CHINMAYA MOHANTY
              </motion.h1>
            </div>

            {/* Masked reveal for tagline */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: isRevealed ? 0 : "100%" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] sm:text-sm md:text-lg font-light tracking-[0.12em] sm:tracking-[0.25em] accent-gradient font-sans uppercase block"
              >
                Python Developer &bull; Generative AI Enthusiast
              </motion.h2>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Section 2: Narrative Left-Aligned Block (Vertically Centered in Screen) */}
      <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-8 md:p-24">
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="max-w-xl text-left"
        >
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
              01 // INTELLIGENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Engineering intelligent systems.
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mt-2">
              Designing real-world computer vision, deep learning, and generative AI solutions using TensorFlow, OpenCV, and LLM orchestration.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Narrative Right-Aligned Block (Vertically Centered in Screen) */}
      <div className="absolute inset-0 flex items-center justify-end p-6 sm:p-8 md:p-24">
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="max-w-xl text-right flex flex-col items-end"
        >
          <div className="flex flex-col gap-4 items-end">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              02 // EXPERTISE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Bridging code and cognition.
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mt-2">
              Translating complex neural network pipelines into clean web interfaces, utilizing robust backend frameworks like Django and Supabase.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] font-mono text-neutral-500 uppercase">
          Scroll Down
        </span>
        <div className="h-10 w-[18px] border border-neutral-600 rounded-full flex justify-center p-[4px]">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
