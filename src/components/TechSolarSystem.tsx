"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillNodes = [
  {
    name: "Python",
    x: 250,
    y: 250,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 1a4.9 4.9 0 0 0-4.8 4.3v1h4.8a1 1 0 0 1 1 1v4.8h3.8a3.9 3.9 0 0 0 3.8-3.8V4.8A3.9 3.9 0 0 0 16.7 1H11.9z" fill="#3776AB" />
        <path d="M12.1 23a4.9 4.9 0 0 0 4.8-4.3v-1h-4.8a1 1 0 0 1-1-1v-4.8H7.3a3.9 3.9 0 0 0-3.8 3.8v3.5A3.9 3.9 0 0 0 7.3 23h4.8z" fill="#FFD343" />
        <circle cx="9.5" cy="4.5" r="0.75" fill="#fff" />
        <circle cx="14.5" cy="19.5" r="0.75" fill="#111" />
      </svg>
    ),
    level: 96,
    category: "Programming Languages",
    desc: "Primary backend language used across all pipelines, machine learning models, OOP web architectures, and analytical scripts.",
    skills: ["Python core", "Object-Oriented Programming (OOP)", "Backend scripts", "Data modeling"],
    projects: ["SmartClass Portal", "AI Gym Coach", "Facebook Clone", "Animal Detection"],
    colorClass: "border-blue-500/30 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/60",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    name: "Machine Learning",
    x: 120,
    y: 250,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FF9E0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
        <path d="M12 5v14"/>
      </svg>
    ),
    level: 95,
    category: "AI & Machine Learning",
    desc: "Building, training, and optimizing supervised and unsupervised machine learning algorithms, mathematical frameworks, and predictive modeling pipelines.",
    skills: ["Scikit-learn", "Neural Networks", "Mathematical Computation", "NumPy & Pandas", "Regression & Classification"],
    projects: ["Animal Detection System", "AI Gym Coach"],
    colorClass: "border-orange-500/30 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-500/60",
    glowColor: "rgba(249, 115, 22, 0.4)"
  },
  {
    name: "Deep Learning",
    x: 100,
    y: 390,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-10 5L12 13l10-5-10-5Z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    level: 92,
    category: "AI & Machine Learning",
    desc: "Designing and tuning deep neural network architectures, Convolutional Neural Networks (CNNs), and vision-based AI trackers using Keras, TensorFlow, and PyTorch.",
    skills: ["Deep Neural Networks", "Convolutional Neural Networks (CNN)", "Computer Vision", "Natural Language Processing (NLP)"],
    projects: ["Animal Detection System", "AI Gym Coach"],
    colorClass: "border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60",
    glowColor: "rgba(239, 68, 68, 0.4)"
  },
  {
    name: "Django & REST",
    x: 380,
    y: 250,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="#092E20" />
        <path d="M8 17h2v-3.5c0-1.4.6-2 1.5-2 .9 0 1.3.5 1.3 1.5V17h2v-4.5c0-2.2-1-3.2-2.8-3.2-1.2 0-2 .5-2.5 1.3V5H8v12z" fill="#fff" />
      </svg>
    ),
    level: 88,
    category: "Frameworks & Libraries",
    desc: "Building production-grade RESTful backends, designing relational API endpoints, and implementing user authorization.",
    skills: ["Django framework", "Django REST Framework", "RESTful Web APIs", "Backend Systems"],
    projects: ["Facebook Clone", "SmartClass Portal"],
    colorClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-500/60",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    name: "MySQL",
    x: 350,
    y: 110,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3a9 9 0 0 0-9 9c0 2 .7 4 2 5.5l1.5-1.5c-1-1-1.5-2.2-1.5-3.5 0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.3-.5 2.5-1.5 3.5l1.5 1.5a9 9 0 0 0 2-5.5c0-5-4-9-9-9z" fill="#00758F" />
        <path d="M10.5 9.5c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-.4-.4-1-1z" fill="#F29111" />
        <path d="M6 14.5c2 1 4 1 5.5 0l2 2c-2.5 1.5-5.5 1.5-7.5 0l0-2z" fill="#00758F" />
      </svg>
    ),
    level: 85,
    category: "Databases",
    desc: "Structuring schemas, relational tables, indexing indexes, and writing optimized SQL queries.",
    skills: ["Relational Database Schemas", "MySQL Database", "SQL queries", "Database optimization"],
    projects: ["SmartClass Portal", "Facebook Clone"],
    colorClass: "border-[#00758F]/30 text-[#00758F] bg-[#00758F]/10 hover:bg-[#00758F]/20 hover:border-[#00758F]/60",
    glowColor: "rgba(0, 117, 143, 0.4)"
  },
  {
    name: "Supabase",
    x: 400,
    y: 390,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 11L5 21v-8h10L5 3v8h14z" fill="#3ECF8E" />
      </svg>
    ),
    level: 90,
    category: "Databases",
    desc: "Implementing real-time cloud data streams, Supabase Edge triggers, database storage, and secure authentication.",
    skills: ["Supabase Cloud Services", "User authentication", "Row Level Security (RLS)", "Real-time tables"],
    projects: ["SmartClass Portal", "Facebook Clone"],
    colorClass: "border-[#3ECF8E]/30 text-[#3ECF8E] bg-[#3ECF8E]/10 hover:bg-[#3ECF8E]/20 hover:border-[#3ECF8E]/60",
    glowColor: "rgba(62, 207, 142, 0.4)"
  },
  {
    name: "Git & GitHub",
    x: 150,
    y: 110,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v2c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V9" />
        <path d="M12 13v2" />
      </svg>
    ),
    level: 90,
    category: "Developer Tools",
    desc: "Version control system tracking codebase differences, hosting repositories, managing branches, and handling pull requests.",
    skills: ["Git version control", "GitHub Hosting", "Branch management", "Collaborative development"],
    projects: ["All Project Pipeline Repositories"],
    colorClass: "border-purple-500/30 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/60",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    name: "Jupyter & Tools",
    x: 250,
    y: 390,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="6" fill="#F37626" />
        <ellipse cx="12" cy="12" rx="11" ry="3" stroke="#F37626" strokeWidth="1.5" transform="rotate(-30 12 12)" />
        <circle cx="6" cy="8" r="1.5" fill="#fff" />
      </svg>
    ),
    level: 92,
    category: "Developer Tools",
    desc: "Used for model testing, scientific dataset research, plotting metrics, and script development inside VS Code.",
    skills: ["Jupyter Notebooks", "VS Code IDE", "Interactive computing", "Data visualization"],
    projects: ["Analytical Research pipelines"],
    colorClass: "border-orange-500/30 text-[#F37626] bg-[#F37626]/10 hover:bg-[#F37626]/20 hover:border-[#F37626]/60",
    glowColor: "rgba(243, 118, 38, 0.4)"
  }
];

const connections = [
  { from: "Python", to: "Machine Learning" },
  { from: "Python", to: "Django & REST" },
  { from: "Python", to: "Jupyter & Tools" },
  { from: "Python", to: "Git & GitHub" },
  { from: "Machine Learning", to: "Deep Learning" },
  { from: "Machine Learning", to: "Jupyter & Tools" },
  { from: "Django & REST", to: "MySQL" },
  { from: "Django & REST", to: "Supabase" },
  { from: "MySQL", to: "Supabase" },
  { from: "Git & GitHub", to: "Jupyter & Tools" },
];

export default function TechSolarSystem() {
  const [activeNode, setActiveNode] = useState<typeof skillNodes[0]>(skillNodes[0]);
  const [hoveredNode, setHoveredNode] = useState<typeof skillNodes[0] | null>(null);
  const [bgParticles, setBgParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    setBgParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 460 + 20,
        y: Math.random() * 460 + 20,
        size: Math.random() * 2 + 1,
        duration: 3 + Math.random() * 4
      }))
    );
  }, []);

  const getNodeCoords = (name: string) => {
    const node = skillNodes.find((n) => n.name === name);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const currentDisplayNode = hoveredNode || activeNode;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 justify-between w-full relative py-4 min-h-[550px]">
      
      {/* Ambient background glow matching the active node's color */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: currentDisplayNode.glowColor }}
      />

      {/* 1. Left Column: Constellation Map */}
      <div className="w-full lg:w-[48%] flex items-center justify-center shrink-0">
        <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none">
          
          {/* Constellation background grid & connection lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 500 500">
            <defs>
              <filter id="glow-line" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Micro background grid stars */}
            {bgParticles.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#ffffff"
                initial={{ opacity: 0.1 }}
                animate={{
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Minimalist Tech Ring lines */}
            <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="6,8" />
            <circle cx="250" cy="250" r="100" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="4,6" />
            
            {/* Draw Constellation Connection Lines */}
            {connections.map((conn, idx) => {
              const fromCoords = getNodeCoords(conn.from);
              const toCoords = getNodeCoords(conn.to);
              
              // A line is highlighted if either end is the active or hovered node
              const isActive = (conn.from === currentDisplayNode.name || conn.to === currentDisplayNode.name);

              return (
                <g key={idx}>
                  {/* Glowing layer */}
                  {isActive && (
                    <motion.line
                      x1={fromCoords.x}
                      y1={fromCoords.y}
                      x2={toCoords.x}
                      y2={toCoords.y}
                      stroke={currentDisplayNode.glowColor}
                      strokeWidth="2.5"
                      filter="url(#glow-line)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Base connection line */}
                  <line
                    x1={fromCoords.x}
                    y1={fromCoords.y}
                    x2={toCoords.x}
                    y2={toCoords.y}
                    stroke={isActive ? currentDisplayNode.glowColor : "rgba(255, 255, 255, 0.05)"}
                    strokeWidth={isActive ? "1.5" : "1"}
                    className="transition-colors duration-500"
                  />
                  {/* Animated dash effect for highlighted connections */}
                  {isActive && (
                    <motion.line
                      x1={fromCoords.x}
                      y1={fromCoords.y}
                      x2={toCoords.x}
                      y2={toCoords.y}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeDasharray="10, 30"
                      animate={{ strokeDashoffset: [-80, 0] }}
                      transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                      opacity={0.5}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Render Skills Nodes */}
          {skillNodes.map((node) => {
            const isSelected = activeNode.name === node.name;
            const isHovered = hoveredNode?.name === node.name;
            const isActiveOrHovered = isSelected || isHovered;
            
            // Subtly dim nodes that are not active/hovered when a node is highlighted
            const isDimmed = hoveredNode && hoveredNode.name !== node.name;

            return (
              <div
                key={node.name}
                className="absolute z-20 flex flex-col items-center cursor-pointer select-none transition-all duration-500"
                style={{
                  left: `${(node.x / 500) * 100}%`,
                  top: `${(node.y / 500) * 100}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: isDimmed ? 0.35 : 1,
                  filter: isDimmed ? "grayscale(40%)" : "none",
                }}
                onClick={() => setActiveNode(node)}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Capsule Wrapper */}
                <motion.div
                  animate={isActiveOrHovered ? {
                    scale: 1.15,
                    boxShadow: `0 0 25px ${node.glowColor}`,
                  } : {
                    scale: 1.0,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-12 h-12 rounded-full border bg-[#111115]/95 flex items-center justify-center transition-colors duration-300 ${
                    isActiveOrHovered ? "border-white/40" : "border-white/10"
                  }`}
                  style={{
                    borderColor: isActiveOrHovered ? node.glowColor : undefined
                  }}
                >
                  {node.icon}
                </motion.div>

                {/* Node Label (Visible under the icon) */}
                <span 
                  className={`text-[9px] font-mono tracking-wider uppercase mt-2.5 transition-colors duration-300 ${
                    isActiveOrHovered ? "text-white font-medium" : "text-neutral-500"
                  }`}
                >
                  {node.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Right Column: Sleek Spec Card */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDisplayNode.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl flex flex-col gap-6"
          >
            {/* Ambient subtle glow within card */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-12 translate-x-12 blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: currentDisplayNode.glowColor }}
            />
            
            {/* Header info */}
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                  {currentDisplayNode.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
                    {currentDisplayNode.category}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                    {currentDisplayNode.name}
                  </h3>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-2xl font-mono font-bold text-white leading-none">
                  {currentDisplayNode.level}%
                </span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">Efficiency</span>
              </div>
            </div>

            {/* Glowing Progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(90deg, #6366f1, ${currentDisplayNode.glowColor || '#a855f7'})`,
                  boxShadow: `0 0 10px ${currentDisplayNode.glowColor}`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${currentDisplayNode.level}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Description */}
            <div>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {currentDisplayNode.desc}
              </p>
            </div>

            {/* Competencies */}
            <div>
              <h4 className="text-neutral-500 font-mono text-[9px] tracking-widest uppercase mb-2.5">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentDisplayNode.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-white/5 text-neutral-300 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-default flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentDisplayNode.glowColor || "#6366f1" }} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects / Use cases */}
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-neutral-500 font-mono text-[9px] tracking-widest uppercase mb-2.5">
                Applied In Pipelines
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentDisplayNode.projects.map((project) => (
                  <span
                    key={project}
                    className="text-xs font-mono text-indigo-300 bg-indigo-500/5 px-3 py-1.5 rounded-lg border border-indigo-500/10"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
