"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
const AIEngineerLoader = dynamic(() => import("./AIEngineerLoader"), { ssr: false });

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  // Ref to hold images for access inside scroll change event listeners without re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const totalFrames = 96;

  // useScroll tracks the progress of scrolling through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map the scroll progress (0 to 1) to the frame index (0 to 95)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Preload all frames on mount
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    const preloadImages = async () => {
      const promises = Array.from({ length: totalFrames }).map((_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const frameNum = String(i).padStart(2, "0");
          img.src = `/sequence/frame_${frameNum}_delay-0.041s.png`;
          
          img.onload = () => {
            loadedCount++;
            if (isMounted) {
              setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
            }
            resolve(img);
          };

          img.onerror = () => {
            console.error(`Failed to load frame ${i} at: ${img.src}`);
            // Resolve anyway to avoid blocking the loader on a single failed image
            resolve(img);
          };
        });
      });

      const imgs = await Promise.all(promises);
      
      if (isMounted) {
        imagesRef.current = imgs;
        setLoadedImages(imgs);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Function to draw a specific frame onto the canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    // Canvas layout dimensions
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

    const imgWidth = img.width;
    const imgHeight = img.height;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Emulate "object-fit: cover"
    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    currentFrameRef.current = index;
  }, []);

  // Canvas Resize Handler to handle High-DPI screens
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Bind resize handler and draw the initial frame
  useEffect(() => {
    if (isLoading) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial draw
    drawFrame(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isLoading, loadedImages, drawFrame, resizeCanvas]);

  // Redraw the canvas on scroll progress change
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoading) return;
    const index = Math.min(totalFrames - 1, Math.max(0, Math.floor(latest)));
    
    // Request animation frame to keep drawings performant
    requestAnimationFrame(() => {
      drawFrame(index);
    });
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121212]"
          >
            <AIEngineerLoader 
              progress={loadingProgress} 
              onComplete={() => setIsLoading(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block object-cover bg-[#121212]"
          style={{ width: "100%", height: "100%" }}
        />
        
        {/* Overlay Content */}
        {!isLoading && children}
      </div>
    </div>
  );
}
