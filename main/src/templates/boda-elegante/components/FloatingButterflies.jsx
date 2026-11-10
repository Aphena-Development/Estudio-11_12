"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FloatingButterflies() {
  // Hojas de olivo mediterráneas flotando suavemente en la brisa
  const oliveLeaves = useMemo(
    () => [
      { id: 1, left: "7%", size: 28, duration: 24, delay: 0, sway: 42, tone: "#5e7050" },
      { id: 2, left: "21%", size: 22, duration: 28, delay: 4, sway: -36, tone: "#788a68" },
      { id: 3, left: "38%", size: 26, duration: 26, delay: 8, sway: 30, tone: "#697b59" },
      { id: 4, left: "57%", size: 24, duration: 30, delay: 2, sway: -40, tone: "#546547" },
      { id: 5, left: "74%", size: 30, duration: 25, delay: 6, sway: 35, tone: "#738564" },
      { id: 6, left: "89%", size: 21, duration: 27, delay: 10, sway: -28, tone: "#647656" },
      { id: 7, left: "14%", size: 20, duration: 29, delay: 13, sway: 25, tone: "#829372" },
      { id: 8, left: "66%", size: 23, duration: 23, delay: 15, sway: -32, tone: "#5e7050" },
    ],
    []
  );

  // Pétalos blancos de azahar y almendro
  const botanicalPetals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 6) % 94}%`,
        size: (i % 3) * 4 + 11,
        duration: 18 + (i % 5) * 3,
        delay: (i * 1.4) % 12,
        sway: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 12),
      })),
    []
  );

  // Destellos cálidos de atardecer en hacienda (Golden Hour Motes)
  const sunMotes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: `${(i * 13 + 9) % 88}%`,
        left: `${(i * 23 + 7) % 92}%`,
        size: (i % 4) * 32 + 48,
        duration: 8 + (i % 4) * 2.5,
        delay: (i * 0.7) % 5,
      })),
    []
  );

  return (
    <div className="botanical-hacienda-background" aria-hidden="true">
      {/* 1. Rayos de Sol de Atardecer & Textura Papel Algodón (#fbfaf6) */}
      <div className="hacienda-sunbeams-stage">
        <div className="sunbeam-wash wash-warm-ivory" />
        <div className="sunbeam-wash wash-olive-mist" />
        <div className="sunbeam-wash wash-antique-gold" />
        <div className="diagonal-sunray ray-left" />
        <div className="diagonal-sunray ray-center" />
        <div className="diagonal-sunray ray-right" />
      </div>

      {/* 2. Líneas Arquitectónicas de Arco de Hacienda en Filigrana */}
      <svg
        className="architectural-arch-watermark"
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 900 V380 C180 200, 420 200, 420 380 V900"
          stroke="rgba(184, 150, 90, 0.11)"
          strokeWidth="1.2"
        />
        <path
          d="M480 900 V340 C480 140, 720 140, 720 340 V900"
          stroke="rgba(100, 116, 86, 0.09)"
          strokeWidth="1.2"
        />
        <path
          d="M780 900 V380 C780 200, 1020 200, 1020 380 V900"
          stroke="rgba(184, 150, 90, 0.11)"
          strokeWidth="1.2"
        />
      </svg>

      {/* 3. Ramas de Olivo Botánicas en las Esquinas (SVG Vectorial) */}
      <svg
        className="olive-corner-svg top-left"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.48">
          <path
            d="M-10,180 C65,145 140,85 230,-10"
            stroke="#8A7346"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M35,145 C85,135 135,120 185,90"
            stroke="#647456"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Hojas de olivo */}
          <ellipse
            cx="58"
            cy="115"
            rx="22"
            ry="7.5"
            transform="rotate(-35 58 115)"
            fill="#5E7050"
            fillOpacity="0.65"
          />
          <ellipse
            cx="105"
            cy="78"
            rx="24"
            ry="8"
            transform="rotate(-38 105 78)"
            fill="#788A68"
            fillOpacity="0.6"
          />
          <ellipse
            cx="155"
            cy="42"
            rx="20"
            ry="7"
            transform="rotate(-42 155 42)"
            fill="#556647"
            fillOpacity="0.65"
          />
          <ellipse
            cx="88"
            cy="132"
            rx="21"
            ry="7.5"
            transform="rotate(12 88 132)"
            fill="#6C7E5C"
            fillOpacity="0.55"
          />
          <ellipse
            cx="140"
            cy="108"
            rx="19"
            ry="6.5"
            transform="rotate(-15 140 108)"
            fill="#788A68"
            fillOpacity="0.55"
          />
          {/* Aceitunas doradas */}
          <circle cx="82" cy="108" r="5" fill="#B8965A" fillOpacity="0.75" />
          <circle cx="128" cy="86" r="4.5" fill="#C8A971" fillOpacity="0.75" />
        </g>
      </svg>

      <svg
        className="olive-corner-svg bottom-right"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.45">
          <path
            d="M-10,180 C65,145 140,85 230,-10"
            stroke="#8A7346"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse
            cx="58"
            cy="115"
            rx="22"
            ry="7.5"
            transform="rotate(-35 58 115)"
            fill="#5E7050"
            fillOpacity="0.65"
          />
          <ellipse
            cx="105"
            cy="78"
            rx="24"
            ry="8"
            transform="rotate(-38 105 78)"
            fill="#788A68"
            fillOpacity="0.6"
          />
          <ellipse
            cx="88"
            cy="132"
            rx="21"
            ry="7.5"
            transform="rotate(12 88 132)"
            fill="#6C7E5C"
            fillOpacity="0.55"
          />
          <circle cx="82" cy="108" r="5" fill="#B8965A" fillOpacity="0.75" />
        </g>
      </svg>

      {/* 4. Esferas de Luz Cálida de Atardecer */}
      {sunMotes.map((mote) => (
        <motion.div
          key={`mote-${mote.id}`}
          className="hacienda-sun-mote"
          style={{
            top: mote.top,
            left: mote.left,
            width: mote.size,
            height: mote.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 12, 0],
            scale: [0.92, 1.12, 0.92],
            opacity: [0.18, 0.42, 0.18],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            delay: mote.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 5. Pétalos Botánicos de Azahar / Marfil */}
      {botanicalPetals.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          className="floating-ivory-petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.35,
          }}
          initial={{ y: "-8vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "106vh",
            x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.4, 0],
            rotate: [0, 120, 240, 360],
            opacity: [0, 0.65, 0.65, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* 6. Hojas de Olivo Mediterráneas Flotando */}
      {oliveLeaves.map((leaf) => (
        <motion.div
          key={`olive-${leaf.id}`}
          className="floating-olive-leaf"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size * 1.6,
          }}
          initial={{ y: "-12vh", x: 0, opacity: 0, rotate: -15 }}
          animate={{
            y: "108vh",
            x: [0, leaf.sway, -leaf.sway * 0.7, leaf.sway * 0.45, 0],
            opacity: [0, 0.72, 0.78, 0.68, 0],
            rotate: [-20, 25, -12, 32, -18],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 36 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="olive-leaf-svg"
          >
            {/* Hoja alargada de olivo */}
            <path
              d="M18 4 C29 16, 31 38, 18 58 C5 38, 7 16, 18 4 Z"
              fill={leaf.tone}
              fillOpacity="0.78"
            />
            {/* Nervadura central dorada/salvia */}
            <path
              d="M18 6 L18 61"
              stroke="#D8C398"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

