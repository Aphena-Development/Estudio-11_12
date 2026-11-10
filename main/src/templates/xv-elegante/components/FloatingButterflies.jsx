"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FloatingButterflies() {
  // 1. Rising Champagne Bubbles (Effervescent golden pearls rising upward)
  const champagneBubbles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 3) % 96}%`,
        size: (i % 5) * 3.5 + 4,
        duration: 11 + (i % 6) * 2.8,
        delay: (i * 0.85) % 11,
        sway: (i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 8),
      })),
    []
  );

  // 2. Golden Starlight Dust (Floating ambient gold foil motes)
  const starlightDust = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: `${(i * 19 + 5) % 94}%`,
        left: `${(i * 23 + 7) % 94}%`,
        size: (i % 3) * 2 + 2.5,
        duration: 6 + (i % 5) * 1.8,
        delay: (i * 0.5) % 5,
      })),
    []
  );

  // 3. Constellation Diamond Sparks (Twinkling 4-point gold flares)
  const constellationSparks = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        top: `${(i * 15 + 6) % 90}%`,
        left: `${(i * 29 + 4) % 95}%`,
        size: (i % 4) * 4 + 8,
        delay: (i * 0.6) % 4.5,
        duration: 3.2 + (i % 3) * 1.1,
      })),
    []
  );

  return (
    <div className="midnight-gala-background" aria-hidden="true">
      {/* 1. Deep Obsidian Sky & Red Carpet Golden Stage Spotlights */}
      <div className="midnight-sky-stage">
        <div className="gala-spotlight-beam beam-left" />
        <div className="gala-spotlight-beam beam-right" />
        <div className="midnight-nebula nebula-gold-top" />
        <div className="midnight-nebula nebula-amber-center" />
        <div className="midnight-nebula nebula-velvet-bottom" />
        <div className="art-deco-grid-overlay" />
      </div>

      {/* 2. Constellation & Art-Deco Architectural Gold SVG Corners */}
      <svg
        className="constellation-corner-svg top-left"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.42">
          {/* Art Deco Geometric Double Frame */}
          <path
            d="M16 240 V16 H240"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
          />
          <path
            d="M28 200 V28 H200"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
          <path
            d="M16 80 L80 16"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.9"
          />
          {/* Constellation Line & Stars */}
          <polyline
            points="44,155 88,112 142,126 196,74 252,48"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.85"
            strokeDasharray="2 3"
          />
          <circle cx="44" cy="155" r="2.5" fill="#f5db8c" />
          <circle cx="88" cy="112" r="3.2" fill="#e5c158" />
          <circle cx="142" cy="126" r="2.2" fill="#f5db8c" />
          <circle cx="196" cy="74" r="3.5" fill="#fff6d6" />
          <circle cx="252" cy="48" r="2" fill="#d4af37" />
        </g>
        <defs>
          <linearGradient id="goldLineGrad" x1="0" y1="0" x2="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5db8c" />
            <stop offset="0.55" stopColor="#d4af37" stopOpacity="0.65" />
            <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="constellation-corner-svg bottom-right"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.42">
          <path
            d="M16 240 V16 H240"
            stroke="url(#goldLineGrad)"
            strokeWidth="1.2"
          />
          <path
            d="M28 200 V28 H200"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
          />
          <polyline
            points="52,168 105,118 164,132 218,66"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.85"
            strokeDasharray="2 3"
          />
          <circle cx="52" cy="168" r="2.5" fill="#f5db8c" />
          <circle cx="105" cy="118" r="3" fill="#e5c158" />
          <circle cx="164" cy="132" r="2.2" fill="#f5db8c" />
          <circle cx="218" cy="66" r="3.4" fill="#fff6d6" />
        </g>
      </svg>

      {/* 3. Ambient Starlight Dust Motes */}
      {starlightDust.map((mote) => (
        <motion.div
          key={`dust-${mote.id}`}
          className="starlight-dust-mote"
          style={{
            top: mote.top,
            left: mote.left,
            width: mote.size,
            height: mote.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 10, -8, 0],
            opacity: [0.15, 0.75, 0.15],
            scale: [0.85, 1.25, 0.85],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            delay: mote.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 4. Constellation Diamond Sparks */}
      {constellationSparks.map((spark) => (
        <motion.div
          key={`spark-${spark.id}`}
          className="constellation-diamond-spark"
          style={{
            top: spark.top,
            left: spark.left,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            opacity: [0.1, 0.95, 0.1],
            scale: [0.55, 1.25, 0.55],
            rotate: [0, 45, 90],
          }}
          transition={{
            duration: spark.duration,
            repeat: Infinity,
            delay: spark.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 5. Rising Champagne Bubbles */}
      {champagneBubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="champagne-bubble"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ y: "106vh", x: 0, opacity: 0 }}
          animate={{
            y: "-8vh",
            x: [0, bubble.sway, -bubble.sway * 0.65, bubble.sway * 0.35, 0],
            opacity: [0, 0.72, 0.85, 0.65, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

