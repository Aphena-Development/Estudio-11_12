import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function FloatingButterflies() {
  // Warm flickering candlelight bokeh orbs
  const candleOrbs = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: `${(i * 17 + 6) % 92}%`,
        left: `${(i * 23 + 5) % 94}%`,
        size: (i % 4) * 38 + 52,
        duration: 6 + (i % 5) * 1.8,
        delay: (i * 0.55) % 4,
        isBurgundy: i % 4 === 0,
      })),
    []
  );

  // Subtle ascending antique gold dust / incense light motes
  const goldMotes = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 3) % 96}%`,
        size: (i % 3) * 3 + 4,
        duration: 15 + (i % 6) * 3,
        delay: (i * 0.9) % 9,
        drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 3) * 10),
      })),
    []
  );

  // Four-point antique gold filigree stars
  const filigreeStars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: `${(i * 19 + 9) % 90}%`,
        left: `${(i * 29 + 7) % 92}%`,
        size: (i % 3) * 4 + 8,
        delay: (i * 0.7) % 4.5,
      })),
    []
  );

  return (
    <div className="cathedral-theme-background" aria-hidden="true">
      {/* 1. Warm Pearl Parchment & Candlelight Ambient Illumination */}
      <div className="parchment-illumination-stage">
        <div className="candle-halo halo-gold-top" />
        <div className="candle-halo halo-burgundy-left" />
        <div className="candle-halo halo-amber-right" />
        <div className="candle-halo halo-pearl-center" />
        <div className="filigree-grain-overlay" />
      </div>

      {/* 2. Cathedral Engraved Gold Filigree Arch Corners (SVG) */}
      <svg
        className="cathedral-corner-filigree top-left"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.42">
          <path
            d="M12 240V52C12 29.909 29.909 12 52 12H240"
            stroke="url(#antiqueGoldGrad)"
            strokeWidth="2"
          />
          <path
            d="M22 220V60C22 39.013 39.013 22 60 22H220"
            stroke="url(#antiqueGoldGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M12 95C52 95 95 52 95 12"
            stroke="#c89d54"
            strokeWidth="1.2"
          />
          <path
            d="M12 135C75 135 135 75 135 12"
            stroke="#631628"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />
          <circle cx="42" cy="42" r="5" fill="#c89d54" />
          <circle cx="42" cy="42" r="11" stroke="#c89d54" strokeWidth="1" />
        </g>
        <defs>
          <linearGradient id="antiqueGoldGrad" x1="0" y1="0" x2="240" y2="240">
            <stop stopColor="#c89d54" />
            <stop offset="0.6" stopColor="#a67832" />
            <stop offset="1" stopColor="#c89d54" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="cathedral-corner-filigree bottom-right"
        viewBox="0 0 260 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.42">
          <path
            d="M12 240V52C12 29.909 29.909 12 52 12H240"
            stroke="url(#antiqueGoldGrad)"
            strokeWidth="2"
          />
          <path
            d="M22 220V60C22 39.013 39.013 22 60 22H220"
            stroke="url(#antiqueGoldGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <path
            d="M12 95C52 95 95 52 95 12"
            stroke="#c89d54"
            strokeWidth="1.2"
          />
          <circle cx="42" cy="42" r="5" fill="#c89d54" />
          <circle cx="42" cy="42" r="11" stroke="#c89d54" strokeWidth="1" />
        </g>
      </svg>

      {/* 3. Warm Votive Candlelight Bokeh Orbs */}
      {candleOrbs.map((orb) => (
        <motion.div
          key={`candle-orb-${orb.id}`}
          className={`candlelight-bokeh-orb ${
            orb.isBurgundy ? "burgundy-tint" : "gold-tint"
          }`}
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 10, 0],
            scale: [0.92, 1.14, 0.95, 1.08, 0.92],
            opacity: [0.18, 0.46, 0.28, 0.5, 0.18],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 4. Subtle Filigree Gold Shimmer Cross-Stars */}
      {filigreeStars.map((st) => (
        <motion.div
          key={`filigree-star-${st.id}`}
          className="filigree-shimmer-star"
          style={{
            top: st.top,
            left: st.left,
            width: st.size,
            height: st.size,
          }}
          animate={{
            opacity: [0.12, 0.82, 0.12],
            scale: [0.7, 1.25, 0.7],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            delay: st.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 5. Ascending Gold Leaf / Candlelight Dust Motes */}
      {goldMotes.map((mote) => (
        <motion.div
          key={`gold-mote-${mote.id}`}
          className="ascending-gold-mote"
          style={{
            left: mote.left,
            width: mote.size,
            height: mote.size,
          }}
          initial={{ y: "105vh", x: 0, opacity: 0 }}
          animate={{
            y: "-8vh",
            x: [0, mote.drift, -mote.drift * 0.5, 0],
            opacity: [0, 0.7, 0.85, 0],
          }}
          transition={{
            duration: mote.duration,
            repeat: Infinity,
            delay: mote.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
