import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Crown, Star } from "lucide-react";

const SPARKLE_BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = 68 + (i % 3) * 26;
  return {
    id: i,
    tx: Math.cos(angle) * distance,
    ty: Math.sin(angle) * distance,
    size: 6 + (i % 3) * 3,
    delay: (i % 4) * 0.03,
  };
});

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [stage, setStage] = useState(0); // 0: closed, 1: ribbon+seal, 2: 3D flap+wings, 3: gazette card rise
  const isOpening = stage > 0;
  const initialLetter = (quinceanera?.name || "X").charAt(0).toUpperCase();

  const handleSealClick = () => {
    if (isOpening) return;
    // Stage 1 (0 - 450ms): Ribbon unties & slides apart, Wax seal spins/cracks with sparkle burst
    setStage(1);

    // Stage 2 (300 - 950ms): Top 3D Envelope Flap flips open + Left/Right French Filigree Gatefold Wings swing open
    setTimeout(() => {
      setStage(2);
    }, 300);

    // Stage 3 (750 - 1550ms): Inner Front-Page Card of "The Quinceañera Post" rises & zooms toward viewer
    setTimeout(() => {
      setStage(3);
    }, 750);

    // Complete sequence (~1550ms)
    setTimeout(() => {
      onOpen();
    }, 1550);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`royal-gatefold-overlay ${isOpening ? "is-opening" : ""} stage-${stage}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Warm Royal Palace Aurora & Silk Shimmer Backdrop */}
        <div className="envelope-aurora-backdrop" aria-hidden="true">
          <div className="aurora-blob blob-rose-1" />
          <div className="aurora-blob blob-gold-2" />
          <div className="aurora-blob blob-blush-3" />
          <div className="palace-chandelier-rays" />
        </div>

        <motion.div
          className="royal-envelope-stage"
          initial={{ y: 24, opacity: 0, scale: 0.95 }}
          animate={
            stage >= 3
              ? { y: -12, opacity: 0, scale: 1.06, filter: "blur(6px)" }
              : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{
            duration: stage >= 3 ? 0.78 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Top Royal Crown & Newspaper Masthead Badge */}
          <motion.div
            className="royal-envelope-masthead-badge"
            animate={
              isOpening
                ? { y: -14, opacity: 0 }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.45 }}
          >
            <Crown size={15} className="crown-icon-gold" />
            <span>THE QUINCEAÑERA POST • EDICIÓN REAL • {quinceanera.dateDisplay}</span>
            <Star size={12} className="crown-icon-gold" />
          </motion.div>

          {/* 3D PERSPECTIVE ROYAL GATEFOLD & SILK ENVELOPE */}
          <div className="royal-3d-perspective-box">
            <div className={`royal-gatefold-envelope stage-${stage}`}>
              {/* Warm Rose-Gold Inner Palace Glow revealed when wings open */}
              <div className="royal-inner-light-aura" aria-hidden="true" />

              {/* INNER FRONT-PAGE PREVIEW CARD OF "THE QUINCEAÑERA POST" */}
              <motion.div
                className="gazette-frontpage-preview-card"
                animate={
                  stage >= 3
                    ? { y: -28, scale: 1.08, opacity: 1, rotateX: 0 }
                    : stage >= 2
                    ? { y: -10, scale: 1.02, opacity: 1, rotateX: 0 }
                    : { y: 8, scale: 0.94, opacity: 0.92, rotateX: 2 }
                }
                transition={{
                  duration: stage >= 3 ? 0.78 : 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="gazette-preview-frame">
                  <div className="gazette-preview-topbar">
                    <span>VOL. XV • NO. 2026</span>
                    <span className="gazette-preview-dot">•</span>
                    <span>EDICIÓN REAL DE PALACIO</span>
                  </div>

                  <div className="gazette-preview-masthead">
                    The Quinceañera Post
                  </div>

                  <div className="gazette-preview-headline">
                    <span>“UN SUEÑO REAL HECHO REALIDAD”</span>
                  </div>

                  <div className="gazette-preview-body">
                    <div className="gazette-preview-portrait-arch">
                      <img
                        src={quinceanera.heroImage}
                        alt={quinceanera.name}
                        className="gazette-preview-img"
                      />
                    </div>

                    <div className="gazette-preview-copy">
                      <span className="gazette-preview-kicker">
                        {quinceanera.title}
                      </span>
                      <h1 className="gazette-preview-script-name">
                        {quinceanera.name}
                      </h1>
                      <div className="gazette-preview-rule" />
                      <span className="gazette-preview-date">
                        {quinceanera.dateDisplay}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LOWER SILK POCKET (Holds the Gazette Card) */}
              <div className="royal-envelope-bottom-pocket" aria-hidden="true">
                <div className="pocket-gold-trim-line" />
              </div>

              {/* LEFT FRENCH FILIGREE GATEFOLD WING */}
              <motion.div
                className="royal-gatefold-wing wing-left"
                animate={
                  stage >= 2
                    ? { rotateY: -112, x: "-6%", opacity: 0.28 }
                    : { rotateY: 0, x: "0%", opacity: 1 }
                }
                transition={{
                  duration: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="wing-filigree-border">
                  <svg
                    className="wing-svg-flourish top-left"
                    viewBox="0 0 84 84"
                    fill="none"
                  >
                    <path
                      d="M4 80V20C4 11.163 11.163 4 20 4H80"
                      stroke="#c98a6b"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 72V24C12 17.373 17.373 12 24 12H72"
                      stroke="#d8a47f"
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx="20" cy="20" r="3.2" fill="#b06d53" />
                  </svg>

                  <div className="wing-royal-watermark left-mark">
                    <span className="wing-edition-tag">EDICIÓN</span>
                    <span className="wing-monogram-letter">{initialLetter}</span>
                    <span className="wing-location-tag">PUEBLA</span>
                  </div>

                  <svg
                    className="wing-svg-flourish bottom-left"
                    viewBox="0 0 84 84"
                    fill="none"
                  >
                    <path
                      d="M4 4V64C4 72.837 11.163 80 20 80H80"
                      stroke="#c98a6b"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 12V60C12 66.627 17.373 72 24 72H72"
                      stroke="#d8a47f"
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx="20" cy="64" r="3.2" fill="#b06d53" />
                  </svg>
                </div>
              </motion.div>

              {/* RIGHT FRENCH FILIGREE GATEFOLD WING */}
              <motion.div
                className="royal-gatefold-wing wing-right"
                animate={
                  stage >= 2
                    ? { rotateY: 112, x: "6%", opacity: 0.28 }
                    : { rotateY: 0, x: "0%", opacity: 1 }
                }
                transition={{
                  duration: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="wing-filigree-border">
                  <svg
                    className="wing-svg-flourish top-right"
                    viewBox="0 0 84 84"
                    fill="none"
                  >
                    <path
                      d="M80 80V20C80 11.163 72.837 4 64 4H4"
                      stroke="#c98a6b"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M72 72V24C72 17.373 66.627 12 60 12H12"
                      stroke="#d8a47f"
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx="64" cy="20" r="3.2" fill="#b06d53" />
                  </svg>

                  <div className="wing-royal-watermark right-mark">
                    <span className="wing-edition-tag">REAL</span>
                    <span className="wing-monogram-letter">XV</span>
                    <span className="wing-location-tag">26.12.26</span>
                  </div>

                  <svg
                    className="wing-svg-flourish bottom-right"
                    viewBox="0 0 84 84"
                    fill="none"
                  >
                    <path
                      d="M80 4V64C80 72.837 72.837 80 64 80H4"
                      stroke="#c98a6b"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M72 12V60C72 66.627 66.627 72 60 72H12"
                      stroke="#d8a47f"
                      strokeWidth="0.9"
                      strokeDasharray="3 3"
                    />
                    <circle cx="64" cy="64" r="3.2" fill="#b06d53" />
                  </svg>
                </div>
              </motion.div>

              {/* TOP 3D ENVELOPE FLAP */}
              <motion.div
                className="royal-envelope-flap-3d"
                animate={
                  stage >= 2
                    ? { rotateX: 175, opacity: 0.35 }
                    : { rotateX: 0, opacity: 1 }
                }
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flap-inner-filigree" />
                <div className="flap-crown-emblem">
                  <Crown size={14} />
                </div>
              </motion.div>

              {/* HORIZONTAL SILK SATIN RIBBON TYING THE WINGS TOGETHER */}
              <div className="royal-satin-ribbon-wrap" aria-hidden="true">
                <motion.div
                  className="satin-ribbon-half ribbon-left"
                  animate={
                    stage >= 1
                      ? { scaleX: 0, x: "-45%", opacity: 0 }
                      : { scaleX: 1, x: "0%", opacity: 1 }
                  }
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.div
                  className="satin-ribbon-half ribbon-right"
                  animate={
                    stage >= 1
                      ? { scaleX: 0, x: "45%", opacity: 0 }
                      : { scaleX: 1, x: "0%", opacity: 1 }
                  }
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>

              {/* GOLDEN SPARKLE BURST PARTICLES ON SEAL CLICK (STAGE 1) */}
              {stage >= 1 && (
                <div className="seal-sparkle-burst-layer" aria-hidden="true">
                  {SPARKLE_BURST.map((sp) => (
                    <motion.span
                      key={sp.id}
                      className="seal-sparkle-particle"
                      style={{ width: sp.size, height: sp.size }}
                      initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                      animate={{
                        x: sp.tx,
                        y: sp.ty,
                        scale: [0.4, 1.35, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{
                        duration: 0.55,
                        delay: sp.delay,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* CENTER 3D ROSE-GOLD & BLUSH WAX SEAL BUTTON [ X • XV ] */}
              <motion.button
                type="button"
                onClick={handleSealClick}
                className="royal-wax-seal-btn"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                animate={
                  stage >= 1
                    ? { scale: [1, 1.18, 0], rotate: [0, -18, 55], opacity: [1, 0.9, 0] }
                    : {
                        scale: [1, 1.045, 1],
                        boxShadow: [
                          "0 14px 36px rgba(94, 37, 56, 0.42), 0 0 0 5px rgba(216, 164, 127, 0.32)",
                          "0 18px 48px rgba(94, 37, 56, 0.58), 0 0 0 9px rgba(232, 197, 158, 0.52)",
                          "0 14px 36px rgba(94, 37, 56, 0.42), 0 0 0 5px rgba(216, 164, 127, 0.32)",
                        ],
                      }
                }
                transition={{
                  duration: stage >= 1 ? 0.44 : 2.5,
                  repeat: stage >= 1 ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                aria-label={`Abrir invitación real de XV Años de ${quinceanera.name}`}
              >
                <div className="wax-seal-metallic-rim">
                  <div className="wax-seal-inner-coin">
                    <Crown size={17} className="seal-crown" />
                    <span className="seal-monogram-code">
                      {initialLetter} • XV
                    </span>
                    <span className="seal-tap-label">ABRIR</span>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Interactive CTA Pill Button below the Envelope */}
          <motion.button
            type="button"
            onClick={handleSealClick}
            className="royal-envelope-cta-pill"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={
              isOpening
                ? { opacity: 0, y: 10 }
                : { opacity: [0.85, 1, 0.85], y: [0, -3, 0] }
            }
            transition={{
              duration: isOpening ? 0.3 : 2.4,
              repeat: isOpening ? 0 : Infinity,
            }}
          >
            <Sparkles size={15} />
            <span>Toca el sello real para abrir tu edición con música</span>
            <Volume2 size={15} />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
