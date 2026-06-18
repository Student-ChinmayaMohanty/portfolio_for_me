"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleCoreProps {
  stage: number; // 0.0 (Scattered) -> 1.0 (Attracted Core) -> 2.0 (Orbiting) -> 3.0 (Brain) -> 4.0 (Solar System) -> 5.0 (Explosion)
}

// Custom hook to create a radial glowing circle texture programmatically
function useCircleTexture() {
  return useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Radial glow gradient matching Visual Design (white -> electric blue -> indigo -> transparent)
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.25, "rgba(0, 212, 255, 0.9)"); // Electric blue
      gradient.addColorStop(0.6, "rgba(109, 93, 254, 0.4)");  // Indigo
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);
}

// Inner component running inside the Three.js Context
function WebGLParticles({ stage }: { stage: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const texture = useCircleTexture();
  const { camera, pointer } = useThree();

  const particleCount = 3000;
  const lineCount = 180; // Limit connecting lines to a subset of particles for performance

  // Generate targets for all stages
  const { stage0, stage1, stage2, stage3, stage4, stage5 } = useMemo(() => {
    const stage0 = new Float32Array(particleCount * 3); // Scattered
    const stage1 = new Float32Array(particleCount * 3); // Luminous Core Sphere
    const stage2 = new Float32Array(particleCount * 3); // Orbiting Core
    const stage3 = new Float32Array(particleCount * 3); // AI Brain Structure
    const stage4 = new Float32Array(particleCount * 3); // Solar System
    const stage5 = new Float32Array(particleCount * 3); // Exploded Stardust

    // Setup random seed math
    const randomInSphere = (radius: number) => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random());
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    };

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      // 0. Scattered
      stage0[idx] = (Math.random() - 0.5) * 20;
      stage0[idx + 1] = (Math.random() - 0.5) * 20;
      stage0[idx + 2] = (Math.random() - 0.5) * 20;

      // 1. Attracted Core (dense sphere)
      const p1 = randomInSphere(0.3);
      stage1[idx] = p1.x;
      stage1[idx + 1] = p1.y;
      stage1[idx + 2] = p1.z;

      // 2. Orbiting Core (medium sphere)
      const p2 = randomInSphere(1.4);
      stage2[idx] = p2.x;
      stage2[idx + 1] = p2.y;
      stage2[idx + 2] = p2.z;

      // 3. AI Brain Structure
      const lobe = Math.random() > 0.5 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      // Brain math folds (squashed sphere with lobe separation & noise)
      let r = 1.6;
      r += Math.sin(theta * 2) * Math.cos(phi * 4) * 0.35;
      r += Math.cos(phi * 8) * 0.15;
      
      const bx = r * Math.sin(phi) * Math.cos(theta) + lobe * 0.45;
      const by = r * Math.sin(phi) * Math.sin(theta) * 0.72; // Squashed Y
      const bz = r * Math.cos(phi) * 1.05; // Slightly elongated Z

      stage3[idx] = bx;
      stage3[idx + 1] = by;
      stage3[idx + 2] = bz;

      // 4. Solar System (Sun, Planets & concentric rings)
      const rVal = Math.random();
      if (rVal < 0.22) {
        // Sun Core
        const ps = randomInSphere(0.4);
        stage4[idx] = ps.x;
        stage4[idx + 1] = ps.y;
        stage4[idx + 2] = ps.z;
      } else if (rVal < 0.38) {
        // 4 Orbiting Planets (clusters at varying distances)
        const planetIdx = Math.floor(Math.random() * 4);
        const planetDistances = [1.6, 2.7, 3.8, 5.0];
        const pDist = planetDistances[planetIdx];
        const pAngle = Math.random() * Math.PI * 2;
        
        // Minor scatter around planet center
        const pScatter = randomInSphere(0.12);
        stage4[idx] = Math.cos(pAngle) * pDist + pScatter.x;
        stage4[idx + 1] = pScatter.y * 0.3; // Flat plane
        stage4[idx + 2] = Math.sin(pAngle) * pDist + pScatter.z;
      } else {
        // Flat Orbiting dust rings
        const ringRadius = 1.2 + Math.random() * 4.2;
        const ringAngle = Math.random() * Math.PI * 2;
        const thicknessY = (Math.random() - 0.5) * 0.08;
        
        stage4[idx] = Math.cos(ringAngle) * ringRadius;
        stage4[idx + 1] = thicknessY;
        stage4[idx + 2] = Math.sin(ringAngle) * ringRadius;
      }

      // 5. Exploded Stardust (pushed out radially from stage 4)
      const radialX = stage4[idx];
      const radialY = stage4[idx + 1];
      const radialZ = stage4[idx + 2];
      const mag = Math.sqrt(radialX * radialX + radialY * radialY + radialZ * radialZ) || 1;
      
      // Explosion vector
      stage5[idx] = (radialX / mag) * (18 + Math.random() * 14);
      stage5[idx + 1] = (radialY / mag) * (18 + Math.random() * 14);
      stage5[idx + 2] = (radialZ / mag) * (18 + Math.random() * 14);
    }

    return { stage0, stage1, stage2, stage3, stage4, stage5 };
  }, []);

  // Set initial points positions attribute
  const initPositions = useMemo(() => new Float32Array(particleCount * 3), []);

  // Track initial state and connect
  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    const geo = points.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array as Float32Array;
    const time = clock.getElapsedTime();

    // 1. Morph coordinates based on current stage value (0.0 to 5.0)
    const activeStage = Math.max(0, Math.min(5, stage));
    const floorStage = Math.floor(activeStage);
    const fraction = activeStage - floorStage;

    const getStageArray = (s: number) => {
      switch (s) {
        case 0: return stage0;
        case 1: return stage1;
        case 2: return stage2;
        case 3: return stage3;
        case 4: return stage4;
        case 5: return stage5;
        default: return stage5;
      }
    };

    const fromArr = getStageArray(floorStage);
    const toArr = getStageArray(Math.min(5, floorStage + 1));

    // Linear interpolation between the active stages
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      const fx = fromArr[idx];
      const fy = fromArr[idx + 1];
      const fz = fromArr[idx + 2];
      
      const tx = toArr[idx];
      const ty = toArr[idx + 1];
      const tz = toArr[idx + 2];

      // Base target position
      let x = fx + (tx - fx) * fraction;
      let y = fy + (ty - fy) * fraction;
      let z = fz + (tz - fz) * fraction;

      // 2. Add subtle motion depending on stage
      if (floorStage === 2 || floorStage === 4) {
        // Orbiting stages: Apply rotational drift around Y axis
        const orbitSpeed = 0.12 * (1 + (i % 5) * 0.1) * (floorStage === 4 ? 1.5 : 0.8);
        const radius = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x) + time * orbitSpeed;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
      } else if (floorStage === 3) {
        // Brain stage: Apply breathing pulse & electric noise
        const pulse = Math.sin(time * 1.5 + (i % 20) * 0.25) * 0.035;
        x += x * pulse;
        y += y * pulse;
        z += z * pulse;
      }

      // 3. Mouse Interaction: Push particles slightly in screen projection plane
      const dx = x - pointer.x * 2.5;
      const dy = y - pointer.y * 2.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.0 && floorStage < 5) {
        const force = (1.0 - dist) * 0.15;
        x += (dx / dist) * force;
        y += (dy / dist) * force;
      }

      arr[idx] = x;
      arr[idx + 1] = y;
      arr[idx + 2] = z;
    }

    posAttr.needsUpdate = true;

    // 4. Update Neural Connection Lines (Only active around Stage 3: Brain)
    const lines = linesRef.current;
    if (lines) {
      const lineGeo = lines.geometry;
      const linePosAttr = lineGeo.attributes.position;
      const lineArr = linePosAttr.array as Float32Array;
      
      let lineIdx = 0;
      const maxConnectDist = 0.55;

      // Check distance for a subset of nodes and draw connection lines
      for (let i = 0; i < lineCount; i++) {
        if (lineIdx >= lineArr.length) break;

        const idxA = i * 3;
        const ax = arr[idxA];
        const ay = arr[idxA + 1];
        const az = arr[idxA + 2];

        // Find a close neighbor
        for (let j = i + 1; j < lineCount; j++) {
          if (lineIdx >= lineArr.length) break;

          const idxB = j * 3;
          const bx = arr[idxB];
          const by = arr[idxB + 1];
          const bz = arr[idxB + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < maxConnectDist) {
            // Draw line segment
            lineArr[lineIdx++] = ax;
            lineArr[lineIdx++] = ay;
            lineArr[lineIdx++] = az;
            lineArr[lineIdx++] = bx;
            lineArr[lineIdx++] = by;
            lineArr[lineIdx++] = bz;
          }
        }
      }

      // Fill remaining line coordinates with 0 to hide them
      while (lineIdx < lineArr.length) {
        lineArr[lineIdx++] = 0;
      }

      linePosAttr.needsUpdate = true;
    }

    // 5. Cinematic Camera Parallax & Zoom
    // If we are in the explosion stage (stage >= 4.5), zoom in camera rapidly (wormhole effect)
    if (stage >= 4.8) {
      const zoomFactor = (stage - 4.8) / 0.2; // 0 to 1
      camera.position.z = THREE.MathUtils.lerp(6.5, 0.05, zoomFactor);
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);
    } else {
      // Ambient rotation & subtle mouse camera parallax
      const targetCamX = Math.sin(time * 0.12) * 1.5 + pointer.x * 0.8;
      const targetCamY = Math.cos(time * 0.12) * 0.6 + pointer.y * 0.8;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.04);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.5, 0.05);
    }
    camera.lookAt(0, 0, 0);
  });

  // Setup connection line indices/vertices buffer
  const linePositions = useMemo(() => {
    // 3 vertices per segment, segments max = lineCount * 5
    return new Float32Array(lineCount * 6 * 2);
  }, []);

  return (
    <group>
      {/* 3D Points Particles Mesh */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initPositions, 3]}
          />
        </bufferGeometry>
        {texture && (
          <pointsMaterial
            size={0.075}
            map={texture}
            transparent={true}
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
          />
        )}
      </points>

      {/* Connection Lines Mesh (fades in and out depending on loading stage) */}
      {stage > 2.2 && stage < 4.5 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00D4FF"
            transparent={true}
            opacity={Math.max(0, Math.min(0.28, (stage - 2.2) * 0.3))}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      )}
    </group>
  );
}

// Wrapper component to handle the Canvas mounting
export default function ParticleCore({ stage }: ParticleCoreProps) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-2, -2, -2]} intensity={1.0} color="#6D5DFE" />
        
        <WebGLParticles stage={stage} />
      </Canvas>
    </div>
  );
}
