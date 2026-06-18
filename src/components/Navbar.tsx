"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
];

export default function Navbar() {
  const { lenis } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll and pause Lenis smooth scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Monitor scrolling to highlight navbar background and run ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      // Background glassmorphism opacity trigger
      setIsScrolled(window.scrollY > 50);

      // Simple, robust scrollspy
      const scrollPosition = window.scrollY + 200; // Offset for viewport checking

      // Check if near top
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Check sections
      const sections = ["about", "work", "experience", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // If contact is active, we don't change the main navbar active tab unless desired.
            // But we can fallback to experience or keep activeSection as is.
            if (sectionId === "contact") {
              // Optionally highlight nothing or keep experience
              continue;
            }
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (!lenis) return;

    if (id === "home") {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        // Scroll with a slight offset so section header isn't cut off by sticky navbar
        lenis.scrollTo(el, { offset: -90, duration: 1.2 });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 px-6 md:px-12 flex justify-between items-center transition-all duration-300 pointer-events-none ${isScrolled
        ? "bg-[#121212]/20 backdrop-blur-md py-4"
        : "bg-transparent py-6"
        }`}>
        {/* Subtle glowing bottom divider line */}
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent transition-opacity duration-300 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"
          }`} />

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("home");
          }}
          className="font-mono font-semibold text-sm tracking-wider text-white hover:opacity-80 transition-opacity pointer-events-auto z-50 relative"
        >
          &lt;CHINMAYA&gt;
        </a>

        {/* Right controls (Desktop Navigation + Connect Button) */}
        <div className="flex items-center gap-6 md:gap-8 pointer-events-auto z-50 relative">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-transparent pointer-events-auto relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.id);
                  }}
                  className={`relative text-[11px] font-mono tracking-widest uppercase transition-colors px-4 py-2 rounded-full duration-300 ${isActive ? "text-white font-medium" : "text-neutral-400 hover:text-indigo-300"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/40 rounded-full -z-0 shadow-[0_0_10px_rgba(99,102,241,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Connect Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("contact");
            }}
            className="hidden sm:inline-block text-xs font-mono tracking-widest uppercase border border-indigo-500/40 text-neutral-200 hover:text-white px-5 py-2.5 rounded-full hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 bg-[#161616]/60 backdrop-blur-sm"
          >
            CONNECT
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-neutral-300 focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#121212]/95 backdrop-blur-lg z-50 flex flex-col justify-center items-center gap-8 md:hidden pointer-events-auto"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    handleScrollTo(item.id);
                  }}
                  className={`text-lg font-mono tracking-widest uppercase transition-colors duration-200 ${isActive ? "text-white font-medium" : "text-neutral-400 hover:text-indigo-400"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                handleScrollTo("contact");
              }}
              className="text-sm font-mono tracking-widest uppercase border border-indigo-500/40 text-neutral-200 hover:text-white px-6 py-3 rounded-full hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all duration-300 mt-4 bg-[#161616]/60 backdrop-blur-sm"
            >
              CONNECT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

