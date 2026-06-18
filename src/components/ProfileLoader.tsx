"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileLoader() {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer spinning square frames for tech/creative aesthetic */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
        
        {/* Outer Square Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-indigo-500/20 rounded-2xl"
        />

        {/* Outer Square Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 border border-indigo-500/10 rounded-xl"
        />

        {/* Outer corner crosshairs / brackets (Sleek tech framing) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-indigo-400/80" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-indigo-400/80" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-indigo-400/80" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-indigo-400/80" />
        </div>

        {/* Image Container */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-[#16161a] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
          {/* Profile Photo */}
          <Image
            src="/profile.png"
            alt="Chinmaya Mohanty"
            fill
            priority
            sizes="(max-width: 640px) 160px, 192px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
