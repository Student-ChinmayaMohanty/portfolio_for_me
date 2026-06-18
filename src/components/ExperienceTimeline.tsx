"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import Image from "next/image";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Gentle 3D tilt (maximum 6 degrees rotation)
    setRotateX(-y / (box.height / 10));
    setRotateY(x / (box.width / 10));

    // Spotlight cursor tracking
    setSpotlight({
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: spotlight.opacity ? 1.015 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`glass-panel rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-indigo-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.3)] ${className}`}
    >
      {/* Moving cursor spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 160px at ${spotlight.x}px ${spotlight.y}px, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.04) 60%, transparent 100%)`,
        }}
      />
      
      {/* Parallax depth element */}
      <div style={{ transform: spotlight.opacity ? "translateZ(12px)" : "translateZ(0px)", transition: "transform 0.25s ease-out" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const internships = [
    {
      role: "AI & Machine Learning Intern",
      company: "Central Tool Room & Training Centre, Bhubaneswar",
      duration: "Jul 2025 – Aug 2025",
      bullets: [
        "Designed end-to-end Machine Learning pipelines including data preprocessing, feature engineering, model training, and evaluation.",
        "Developed an Animal Detection System using CNNs, TensorFlow, and Keras for image classification and detection tasks."
      ],
      certificate: "/cert_ai_ml.png"
    },
    {
      role: "Python Developer Intern",
      company: "Central Tool Room & Training Centre, Bhubaneswar",
      duration: "Jul 2024",
      bullets: [
        "Developed web applications using Python and Django, applying Object-Oriented Programming (OOP) principles.",
        "Built a Facebook Clone featuring user authentication, photo sharing, likes, and comments.",
        "Strengthened skills in backend development, database management, and REST-based web applications."
      ],
      certificate: "/cert_python.png"
    }
  ];

  const education = {
    degree: "B.Tech in Computer Science & Engineering (AI)",
    school: "GIFT Autonomous College, Bhubaneswar (BPUT)",
    duration: "2023 – Present"
  };

  const certifications = [
    { 
      title: "The Privacy security in online social media", 
      issuer: "NPTEL (IIT Hyderabad)",
      certificate: "/cert_nptel_privacy.png"
    },
    { 
      title: "The Joy of Computing Using Python", 
      issuer: "NPTEL (IIT Ropar)",
      certificate: "/cert_nptel_python.png"
    },
    { 
      title: "Introduction to Industry 4.0 and IoT", 
      issuer: "NPTEL (IIT Kharagpur)",
      certificate: "/cert_nptel_iot.png"
    }
  ];

  return (
    <div className="flex flex-col gap-12 w-full">
      
      {/* 1. Internships Group */}
      <div className="flex flex-col gap-6">
        <h3 className="text-white font-mono text-xs tracking-wider uppercase border-b border-white/10 pb-2 text-indigo-400">
          Internship Experience
        </h3>
        
        <div className="flex flex-col gap-6">
          {internships.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
            >
              <InteractiveCard className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg group-hover:text-indigo-300 transition-colors duration-300">
                        {job.role}
                      </h4>
                      <span className="text-sm text-neutral-400 block mt-0.5">{job.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Calendar className="w-3 h-3" />
                      {job.duration}
                    </span>
                    {job.certificate && (
                      <button
                        onClick={() => setSelectedCertificate(job.certificate)}
                        title="View Certificate"
                        className="flex items-center justify-center p-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                      >
                        <Award className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-2.5 pl-9">
                  {job.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="list-disc text-neutral-400 text-xs sm:text-sm leading-relaxed marker:text-indigo-500/40">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Education Group */}
      <div className="flex flex-col gap-6">
        <h3 className="text-white font-mono text-xs tracking-wider uppercase border-b border-white/10 pb-2 text-indigo-400">
          Education
        </h3>
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <InteractiveCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-500/5 border border-purple-500/10 text-purple-400 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors duration-300">
                    {education.degree}
                  </h4>
                  <span className="text-sm text-neutral-400 block mt-0.5">{education.school}</span>
                </div>
              </div>
              <span className="text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm shrink-0">
                <Calendar className="w-3 h-3" />
                {education.duration}
              </span>
            </div>
          </InteractiveCard>
        </motion.div>
      </div>

      {/* 3. Certifications Group */}
      <div className="flex flex-col gap-6">
        <h3 className="text-white font-mono text-xs tracking-wider uppercase border-b border-white/10 pb-2 text-indigo-400">
          Certifications & Achievements
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
            >
              <InteractiveCard className="p-5 flex flex-col justify-between gap-5 h-full">
                <div className="flex justify-between items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500/40 animate-pulse" />
                  {cert.certificate ? (
                    <button
                      onClick={() => setSelectedCertificate(cert.certificate)}
                      title="View Certificate"
                      className="flex items-center justify-center p-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  ) : (
                    <Award className="w-4.5 h-4.5 text-indigo-400" />
                  )}
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium leading-snug group-hover:text-indigo-200 transition-colors duration-300">
                    {cert.title}
                  </h4>
                  <span className="text-xs text-neutral-500 font-mono mt-1.5 block">
                    {cert.issuer}
                  </span>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#16161a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 md:p-3 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Certificate Image */}
              <div className="relative w-full h-[60vh] bg-black rounded-lg overflow-hidden">
                <Image
                  src={selectedCertificate}
                  alt="Internship Certificate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
              
              {/* Info and download row */}
              <div className="flex justify-between items-center mt-3 px-1 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                <span>Awarded to Chinmaya Mohanty</span>
                <a
                  href={selectedCertificate}
                  download
                  className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Download PDF
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
