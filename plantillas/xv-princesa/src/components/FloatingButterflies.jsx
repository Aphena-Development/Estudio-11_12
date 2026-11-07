import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FloatingButterflies() {
  const butterflies = useMemo(
    () => [
      { id: 1, left: "8%", size: 28, duration: 19, delay: 0, drift: 50 },
      { id: 2, left: "24%", size: 20, duration: 23, delay: 3.5, drift: -40 },
      { id: 3, left: "46%", size: 24, duration: 21, delay: 6, drift: 35 },
      { id: 4, left: "72%", size: 30, duration: 26, delay: 1.5, drift: -45 },
      { id: 5, left: "88%", size: 22, duration: 18, delay: 4.5, drift: -30 },
      { id: 6, left: "60%", size: 18, duration: 17, delay: 8.5, drift: 28 },
    ],
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 4) % 96}%`,
        size: (i % 4) * 5 + 12,
        duration: 14 + (i % 5) * 3,
        delay: (i * 1.1) % 10,
        sway: (i % 2 === 0 ? 1 : -1) * (25 + (i % 3) * 15),
      })),
    []
  );

  const bokehOrbs = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: `${(i * 15 + 8) % 90}%`,
        left: `${(i * 27 + 6) % 92}%`,
        size: (i % 4) * 35 + 45,
        duration: 7 + (i % 4) * 2,
        delay: (i * 0.6) % 4,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        top: `${(i * 17 + 7) % 92}%`,
        left: `${(i * 23 + 5) % 94}%`,
        size: (i % 3) * 4 + 7,
        delay: (i * 0.65) % 4,
      })),
    []
  );

  return (
    <div className="animated-theme-background" aria-hidden="true">
      {/* 1. Capas de Seda y Acuarela Animada (Aurora Rose & Champagne Gold) */}
      <div className="aurora-mesh-stage">
        <div className="aurora-blob blob-rose-1" />
        <div className="aurora-blob blob-gold-2" />
        <div className="aurora-blob blob-blush-3" />
        <div className="aurora-blob blob-pearl-4" />
        <div className="silk-shimmer-wave" />
      </div>

      {/* 2. Ramas Florales Botánicas Animadas en las Esquinas (SVG Vectorial) */}
      <svg
        className="floral-corner-svg top-left"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.45">
          <path
            d="M-10,190 C50,150 110,95 195,-10"
            stroke="url(#goldBranch)"
            strokeWidth="2.2"
          />
          <path
            d="M-10,115 C45,95 95,60 135,-10"
            stroke="url(#roseBranch)"
            strokeWidth="1.6"
          />
          <circle cx="72" cy="72" r="28" fill="url(#peonyGrad)" />
          <circle cx="65" cy="66" r="16" fill="#fff5f8" fillOpacity="0.6" />
          <circle cx="132" cy="42" r="20" fill="url(#peonyGrad)" />
          <circle cx="38" cy="128" r="22" fill="url(#peonyGrad)" />
          <path
            d="M95,95 C115,85 130,98 112,115 C94,132 82,108 95,95 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M42,162 C62,152 77,165 59,182 C41,199 29,175 42,162 Z"
            fill="url(#leafGrad)"
          />
        </g>
        <defs>
          <linearGradient id="goldBranch" x1="0" y1="0" x2="200" y2="200">
            <stop stopColor="#d9a76a" />
            <stop offset="1" stopColor="#cf5681" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roseBranch" x1="0" y1="0" x2="150" y2="150">
            <stop stopColor="#e583a5" />
            <stop offset="1" stopColor="#f4b2c8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="peonyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cf5681" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#f4b2c8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff7fa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d9a76a" stopOpacity="0.45" />
            <stop offset="1" stopColor="#e583a5" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="floral-corner-svg bottom-right"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.45">
          <path
            d="M-10,190 C50,150 110,95 195,-10"
            stroke="url(#goldBranch)"
            strokeWidth="2.2"
          />
          <circle cx="72" cy="72" r="28" fill="url(#peonyGrad)" />
          <circle cx="132" cy="42" r="20" fill="url(#peonyGrad)" />
          <circle cx="38" cy="128" r="22" fill="url(#peonyGrad)" />
        </g>
      </svg>

      {/* 3. Bokeh Dorado y Rosa Flotante */}
      {bokehOrbs.map((orb) => (
        <motion.div
          key={`bokeh-${orb.id}`}
          className="bokeh-light-orb"
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 14, 0],
            scale: [0.9, 1.15, 0.9],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 4. Destellos de Estrellas de 4 Puntas */}
      {sparkles.map((sp) => (
        <motion.div
          key={`sp-${sp.id}`}
          className="sparkle-star"
          style={{
            top: sp.top,
            left: sp.left,
            width: sp.size,
            height: sp.size,
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.65, 1.3, 0.65],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            delay: sp.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 5. Pétalos de Rosa Cayendo Suavemente */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="falling-rose-petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.25,
          }}
          initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "108vh",
            x: [0, p.sway, -p.sway * 0.7, p.sway * 0.5, 0],
            rotate: [0, 140, 260, 360],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* 6. Mariposas de Acuarela y Oro Rosa */}
      {butterflies.map((b) => (
        <motion.div
          key={`bf-${b.id}`}
          className="floating-butterfly"
          style={{ left: b.left, width: b.size, height: b.size }}
          initial={{ y: "105vh", x: 0, opacity: 0, rotate: -10 }}
          animate={{
            y: "-12vh",
            x: [0, b.drift, -b.drift * 0.6, b.drift * 0.4, 0],
            opacity: [0, 0.8, 0.9, 0.8, 0],
            rotate: [-12, 10, -8, 14, -10],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="butterfly-svg"
          >
            <path
              d="M31 30C23 14 6 8 4 21C2 31 15 36 28 35C16 39 9 49 16 55C22 60 29 50 31 38"
              fill="url(#wingGrad)"
              fillOpacity="0.88"
            />
            <path
              d="M33 30C41 14 58 8 60 21C62 31 49 36 36 35C48 39 55 49 48 55C42 60 35 50 33 38"
              fill="url(#wingGrad)"
              fillOpacity="0.88"
            />
            <rect
              x="31"
              y="22"
              width="2"
              height="20"
              rx="1"
              fill="#a84267"
              fillOpacity="0.7"
            />
            <defs>
              <linearGradient
                id="wingGrad"
                x1="4"
                y1="12"
                x2="60"
                y2="56"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff5f8" />
                <stop offset="0.55" stopColor="#f3a6c0" />
                <stop offset="1" stopColor="#d16087" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
