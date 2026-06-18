"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Code2 } from "lucide-react";
import ProfileLoader from "./ProfileLoader";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export default function InteractiveAbout() {
  const [activeTab, setActiveTab] = useState<string>("story");

  const tabs: TabItem[] = [
    {
      id: "story",
      label: "Who I Am",
      icon: <User className="w-4 h-4 text-indigo-400" />,
      title: "Designing algorithms that see, learn, and act",
      content: (
        <div className="flex flex-col gap-4 text-neutral-400 text-sm md:text-base leading-relaxed">
          <p>
            I am <strong className="text-white font-medium">Chinmaya Mohanty</strong>, an AI/ML Engineer and Python Developer. My work focuses on designing intelligent applications utilizing Django, Streamlit, Supabase, OpenCV, MediaPipe, and LLM technologies to solve real-world problems.
          </p>
          <p>
            Driven by continuous learning, I bridge backend software engineering and deep learning models to build high-performance web systems.
          </p>
        </div>
      )
    },
    {
      id: "approach",
      label: "My Approach",
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      title: "Engineered Neural Pipelines",
      content: (
        <div className="flex flex-col gap-4 text-neutral-400 text-sm md:text-base leading-relaxed">
          <p>
            I view artificial intelligence not as an isolated module, but as part of a larger, robust application ecosystem. My pipelines start with extensive preprocessing and model training, and culminate in high-performance hosting.
          </p>
          <p>
            By designing backends using <strong className="text-white font-medium">Django</strong> and building frontends using <strong className="text-white font-medium">Streamlit</strong> and interactive web dashboards, I ensure users get fast, latency-free inference.
          </p>
        </div>
      )
    }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full relative">

      {/* Left Column: Visual Heading & Ambient Globe */}
      <div className="w-full lg:w-[45%] flex flex-col gap-6 lg:sticky lg:top-28">
        <div>
          <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase block mb-4">
            ABOUT ME
          </span>
        </div>

        {/* Animated Profile Photo Replacing previous badge */}
        <div className="mt-8 flex flex-col items-start gap-4">
          <ProfileLoader />

          <div className="flex flex-col pl-2">
            <h3 className="text-white text-lg font-display font-semibold tracking-wide leading-none">
              Chinmaya Mohanty
            </h3>
            <span className="text-indigo-400 text-xs font-mono tracking-wider uppercase mt-2">
              AI / ML Engineer &bull; Python Developer
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Tabbed Narrative Panel */}
      <div className="w-full lg:w-[55%] flex flex-col gap-8">

        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1.5 rounded-full glass-panel border border-white/5 w-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${isActive
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="min-h-[200px] flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                {currentTab.title}
              </h3>

              {currentTab.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Quote block */}
        <div className="border-l-2 border-indigo-500 pl-6 py-1 italic text-xs md:text-sm text-neutral-400 leading-relaxed bg-gradient-to-r from-indigo-500/5 to-transparent pr-4 rounded-r-xl">
          &ldquo;Artificial intelligence isn&apos;t just about complex algorithms; it&apos;s about translating that cognition into scalable, reliable tools that users can trust.&rdquo;
        </div>
      </div>

    </div>
  );
}
