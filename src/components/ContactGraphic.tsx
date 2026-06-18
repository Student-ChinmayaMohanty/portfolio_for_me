"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, User, MessageSquare, Heart } from "lucide-react";

type FaceStatus = "idle" | "name" | "email" | "message" | "submitting" | "success" | "wink" | "call";

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export default function ContactGraphic() {
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<FaceStatus>("idle");
  const [blink, setBlink] = useState(false);
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [isEnvelopeFlying, setIsEnvelopeFlying] = useState(false);

  // Click Animation Canvas manager
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = document.getElementById("contact");
    if (!parent) return;

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
      decay: number;
    }

    let ripples: Ripple[] = [];
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleParentClick = (e: MouseEvent) => {
      // Ignore clicks on input fields and buttons to allow natural form usage
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a")
      ) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn expanding ripples
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 80 + Math.random() * 40,
        opacity: 0.85,
      });

      // Spawn particle constellation points
      const count = 12 + Math.floor(Math.random() * 6);
      const colors = [
        "rgba(99, 102, 241, ", // Indigo
        "rgba(168, 85, 247, ", // Purple
        "rgba(236, 72, 153, ", // Pink
        "rgba(6, 182, 212, "   // Cyan
      ];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8 + Math.random() * 2.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.2 + Math.random() * 1.8,
          color,
          opacity: 1,
          decay: 0.012 + Math.random() * 0.016,
        });
      }
    };
    parent.addEventListener("click", handleParentClick);

    // Main Canvas animation render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update and Draw ripples
      ripples = ripples.filter((ripple) => {
        ripple.radius += (ripple.maxRadius - ripple.radius) * 0.08;
        ripple.opacity -= 0.018;

        if (ripple.opacity <= 0) return false;

        // Outer ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner secondary ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();

        return true;
      });

      // 2. Update and Draw particles
      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // Faint downward gravity drift
        p.opacity -= p.decay;

        if (p.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();

        return true;
      });

      // 3. Connect particles with faint lines (Constellation node mesh)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${Math.min(p1.opacity, p2.opacity) * 0.15 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("click", handleParentClick);
    };
  }, []);

  // Periodic blinking eyes simulation when idle
  useEffect(() => {
    if (status !== "idle" && status !== "wink") return;

    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);

    return () => clearInterval(blinkInterval);
  }, [status]);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");
    setIsEnvelopeFlying(true);

    // After envelope reaches the robot face, trigger success
    setTimeout(() => {
      setIsEnvelopeFlying(false);
      setStatus("success");
      
      // Spawn heart particles
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 160,
        y: -30 - Math.random() * 80,
        scale: 0.6 + Math.random() * 0.7,
      }));
      setParticles(newParticles);

      // Reset form fields after visual confirmation
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setStatus("idle");
        setParticles([]);
      }, 4000);
    }, 1200);
  };

  // Get Dynamic dialogue based on field state and typed values
  const getSpeechBubbleText = () => {
    if (status === "success") {
      return `Awesome! I've zipped your message straight to Chinmaya's inbox. Thank you, ${name}! 🚀✨`;
    }
    if (status === "submitting") {
      return "Transmitting packets... powering up antenna relays... 🛰️💥";
    }
    if (status === "name") {
      if (!name) return "Hello there! What's your beautiful name? 🤖";
      return `Nice to meet you, ${name}! Writing that down... 📝`;
    }
    if (status === "email") {
      if (!email) return "Got a secure email so Chinmaya can get back to you? 📬";
      const isValid = email.includes("@") && email.includes(".");
      return isValid 
        ? "Perfect! Email look pristine. Connecting to terminal... 🔍💡" 
        : "Type in your email so I can establish a reply frequency... 📡";
    }
    if (status === "message") {
      if (!message) return "Awesome! What project or idea do you have in mind? 💡";
      if (message.length < 15) return "Interesting... a new prompt is building! Tell me more! 🧠";
      if (message.length < 50) return "Fascinating details! Chinmaya will love reading this! 🚀";
      return "Wow, that's a detailed layout! Transmitting power levels at 100%! 🌟";
    }
    if (status === "wink") {
      return "Psst! You can also click the quick links below to chat with Chinmaya instantly! 😉";
    }
    if (status === "call") {
      return "Ring, ring! Establishing direct voice link channel... 📞✨";
    }
    return "Hi, I'm Chinmaya's AI liaison! Type a message and I'll send it! 🤖⚡";
  };

  // Render SVG Robot Eyes dynamically based on active state
  const renderEyes = () => {
    if (status === "success") {
      // Pink heart eyes
      return (
        <>
          <path 
            d="M 38 48 C 32 43, 34 37, 38 40 C 42 37, 44 43, 38 48" 
            fill="#ec4899" 
            className="drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
          />
          <path 
            d="M 62 48 C 56 43, 58 37, 62 40 C 66 37, 68 43, 62 48" 
            fill="#ec4899" 
            className="drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
          />
        </>
      );
    }

    if (status === "submitting") {
      // Horizontal charging/loading lines
      return (
        <>
          <line x1="32" y1="42" x2="44" y2="42" stroke="#6366f1" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="56" y1="42" x2="68" y2="42" stroke="#6366f1" strokeWidth="4.5" strokeLinecap="round" />
        </>
      );
    }

    if (blink && (status === "idle" || status === "wink")) {
      // Standard blinking line state
      return (
        <>
          <line x1="32" y1="42" x2="44" y2="42" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
          <line x1="56" y1="42" x2="68" y2="42" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    }

    switch (status) {
      case "name":
        // Peeking down at the input fields
        return (
          <>
            <circle cx="38" cy="46" r="5" fill="#6366f1" className="drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]" />
            <circle cx="62" cy="46" r="5" fill="#6366f1" className="drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]" />
          </>
        );
      case "email":
        // Concentric scanning/spectacles rings
        return (
          <>
            <g>
              <circle cx="38" cy="42" r="5.5" fill="#6366f1" />
              <circle cx="38" cy="42" r="9.5" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" className="animate-[spin_4s_linear_infinite]" />
            </g>
            <g>
              <circle cx="62" cy="42" r="5.5" fill="#6366f1" />
              <circle cx="62" cy="42" r="9.5" stroke="#6366f1" strokeWidth="1.5" fill="none" strokeDasharray="3 3" className="animate-[spin_4s_linear_infinite]" />
            </g>
          </>
        );
      case "message":
        // Excited arch curves
        return (
          <>
            <path d="M 32 44 Q 38 36 44 44" stroke="#6366f1" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M 56 44 Q 62 36 68 44" stroke="#6366f1" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          </>
        );
      case "call":
        // Surprised round eyes
        return (
          <>
            <circle cx="38" cy="42" r="6" fill="#6366f1" className="drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
            <circle cx="62" cy="42" r="6" fill="#6366f1" className="drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
          </>
        );
      case "wink":
        // Wink configuration
        return (
          <>
            <circle cx="38" cy="42" r="5.5" fill="#6366f1" />
            <path d="M 56 44 Q 62 38 68 44" stroke="#6366f1" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        );
      case "idle":
      default:
        // Normal eyes
        return (
          <>
            <circle cx="38" cy="42" r="5.5" fill="#6366f1" />
            <circle cx="62" cy="42" r="5.5" fill="#6366f1" />
          </>
        );
    }
  };

  // Render SVG Robot Mouth dynamically
  const renderMouth = () => {
    switch (status) {
      case "success":
        // Massive heart-shaped open happy smile
        return (
          <path 
            d="M 36 54 Q 50 68 64 54 Z" 
            fill="#ec4899" 
            className="drop-shadow-[0_0_6px_rgba(236,72,153,0.8)]"
          />
        );
      case "submitting":
        // Concentrated small O mouth
        return <circle cx="50" cy="58" r="4" fill="#6366f1" />;
      case "name":
        // Small focused smile
        return (
          <path d="M 44 57 Q 50 61 56 57" stroke="#6366f1" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        );
      case "email":
        // Curious open circle
        return <circle cx="50" cy="58" r="4.5" fill="#6366f1" />;
      case "message":
        // Excited open smile
        return (
          <path d="M 42 56 Q 50 66 58 56 Z" fill="#6366f1" />
        );
      case "call":
        // Surprised circle
        return <circle cx="50" cy="58" r="5.5" fill="#6366f1" />;
      case "wink":
        // Playful curvy smile
        return (
          <path d="M 42 56 Q 50 64 58 56" stroke="#6366f1" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        );
      case "idle":
      default:
        // Normal smile
        return (
          <path d="M 43 56 Q 50 62 57 56" stroke="#6366f1" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        );
    }
  };

  // Determine antenna light color
  const getAntennaColor = () => {
    if (status === "success") return "bg-pink-500 shadow-[0_0_15px_#ec4899]";
    if (status === "submitting") return "bg-amber-500 shadow-[0_0_12px_#f59e0b] animate-ping";
    if (status === "email") return "bg-cyan-400 shadow-[0_0_12px_#22d3ee]";
    if (status === "message") return "bg-emerald-400 shadow-[0_0_12px_#34d399]";
    return "bg-indigo-500 shadow-[0_0_10px_#6366f1]";
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left relative pointer-events-auto">
      {/* Click Animation Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute -top-32 -bottom-16 -left-6 md:-left-12 -right-6 md:-right-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] h-[calc(100%+12rem)] pointer-events-none -z-10 bg-transparent" 
      />
      
      {/* 1. Left Column: Interactive Contact Form (7 cols) */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div>
          <span className="text-xs font-mono text-purple-400 tracking-widest uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight uppercase mb-4">
            Let&apos;s build <br className="hidden md:inline" />
            something <span className="accent-gradient">intelligent.</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
            Have an internship role, project collaboration opportunity, or a simple question? Type a message below, and my cute AI companion will dispatch it directly to my terminal.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-xl">
          {/* Name Field */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-mono text-neutral-500 tracking-wider uppercase">Your Name</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                value={name}
                disabled={status === "submitting" || status === "success"}
                onFocus={() => setStatus("name")}
                onBlur={() => setStatus("idle")}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should I call you?"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#141419]/90 border border-white/5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-mono text-neutral-500 tracking-wider uppercase">Email Address</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                disabled={status === "submitting" || status === "success"}
                onFocus={() => setStatus("email")}
                onBlur={() => setStatus("idle")}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#141419]/90 border border-white/5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-[11px] font-mono text-neutral-500 tracking-wider uppercase">Your Message</label>
            <div className="relative">
              <span className="absolute left-4 top-5 text-neutral-600">
                <MessageSquare className="w-4 h-4" />
              </span>
              <textarea
                required
                rows={5}
                value={message}
                disabled={status === "submitting" || status === "success"}
                onFocus={() => setStatus("message")}
                onBlur={() => setStatus("idle")}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What details can you share about your requirements?"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#141419]/90 border border-white/5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name || !email || !message || status === "submitting" || status === "success"}
            className="text-xs md:text-sm font-mono tracking-widest uppercase bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:shadow-none text-white px-8 py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(99,102,241,0.4)] font-semibold flex items-center justify-center gap-2 group mt-2"
          >
            {status === "submitting" ? (
              <>Transmitting...</>
            ) : status === "success" ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Dispatched!
              </>
            ) : (
              <>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                Transmit Message
              </>
            )}
          </button>
        </form>
      </div>

      {/* 2. Right Column: Animated AI Assistant Companion (5 cols) */}
      <div className="lg:col-span-5 flex flex-col items-center lg:items-center justify-center pt-8 lg:pt-0">
        
        {/* Dynamic Speech Bubble */}
        <div className="relative mb-6 w-full max-w-[280px] sm:max-w-[320px]">
          <div className="glass-panel px-5 py-4 rounded-2xl border border-white/10 text-xs text-neutral-200 leading-relaxed text-center relative shadow-xl shadow-black/30">
            <AnimatePresence mode="wait">
              <motion.p
                key={status + (status === "name" ? (name ? "typed" : "empty") : "")}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="font-medium text-neutral-300"
              >
                {getSpeechBubbleText()}
              </motion.p>
            </AnimatePresence>
            {/* Bubble pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/10" />
          </div>
        </div>

        {/* Floating Robot Avatar Wrapper */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
          
          {/* Confetti / heart particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: p.scale, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute text-pink-500 pointer-events-none"
            >
              <Heart className="w-5 h-5 fill-pink-500" />
            </motion.div>
          ))}

          {/* Envelope Flying Animation */}
          <AnimatePresence>
            {isEnvelopeFlying && (
              <motion.div
                initial={{ left: "-20%", bottom: "0%", scale: 1.2, rotate: -25, opacity: 0 }}
                animate={{
                  left: ["-20%", "15%", "50%"],
                  bottom: ["0%", "40%", "50%"],
                  scale: [1.2, 1.4, 0.1],
                  rotate: [-25, 10, 90],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute z-20 pointer-events-none text-indigo-400"
              >
                <Mail className="w-10 h-10 fill-indigo-600/30 stroke-indigo-400 filter drop-shadow-[0_0_15px_#6366f1]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Robot mascot container */}
          <motion.div
            animate={{
              y: status === "submitting" ? [0, -3, 3, -3, 3, 0] : [0, -8, 0],
              rotate: status === "success" ? [0, 360] : (status === "message" ? [0, 4, -4, 0] : [0, 0]),
            }}
            transition={{
              y: {
                duration: status === "submitting" ? 0.25 : 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: status === "success" ? 1.5 : 2,
                repeat: status === "success" ? 0 : Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative w-28 h-28 sm:w-32 sm:h-32 filter drop-shadow-[0_0_20px_rgba(99,102,241,0.25)] z-10"
          >
            {/* Antenna LED & Stem */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[12px] flex flex-col items-center">
              <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${getAntennaColor()}`} />
              <div className="w-0.5 h-3.5 bg-neutral-600" />
            </div>

            {/* Head container */}
            <div className="w-full h-full rounded-[28px] border border-white/10 bg-[#141419]/90 backdrop-blur-md flex items-center justify-center p-3 relative">
              <div className="absolute inset-1.5 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px] rounded-[22px] pointer-events-none" />
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {renderEyes()}
                {renderMouth()}
              </svg>
            </div>
          </motion.div>
          
          {/* Subtle base shadow */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-2 bg-black/40 blur-sm rounded-full -z-10" />
        </div>

        {/* 3. Communication Direct Links */}
        <div className="flex flex-col gap-4 mt-6 w-full max-w-[280px]">
          <span className="text-[10px] font-mono text-neutral-500 tracking-widest uppercase text-center block">
            Direct Contacts
          </span>
          <div className="grid grid-cols-2 gap-3 w-full">
            <a 
              href="mailto:chinmayamohanty.work@gmail.com"
              onMouseEnter={() => setStatus("email")}
              onMouseLeave={() => setStatus("idle")}
              className="text-[10px] font-mono tracking-widest uppercase bg-white/5 hover:bg-indigo-600/10 border border-white/5 hover:border-indigo-500/20 text-neutral-300 hover:text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 font-semibold"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Email
            </a>
            <a 
              href="tel:+918144119073"
              onMouseEnter={() => setStatus("call")}
              onMouseLeave={() => setStatus("idle")}
              className="text-[10px] font-mono tracking-widest uppercase bg-white/5 hover:bg-indigo-600/10 border border-white/5 hover:border-indigo-500/20 text-neutral-300 hover:text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              Call
            </a>
          </div>
        </div>

        {/* 4. Social Links Row */}
        <div className="flex gap-6 font-mono text-[10px] text-neutral-500 pt-6 border-t border-white/5 w-full justify-center mt-6">
          <a 
            href="mailto:chinmayamohanty.work@gmail.com" 
            onMouseEnter={() => setStatus("wink")} 
            onMouseLeave={() => setStatus("idle")}
            className="hover:text-white transition-colors"
          >
            EMAIL
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={() => setStatus("wink")} 
            onMouseLeave={() => setStatus("idle")}
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a 
            href="https://linkedin.com/in/chinmaya-mohanty" 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={() => setStatus("wink")} 
            onMouseLeave={() => setStatus("idle")}
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
        </div>

      </div>
    </div>
  );
}
