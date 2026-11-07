import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Crown, Star, Check } from "lucide-react";

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [stage, setStage] = useState("idle"); // "idle" | "tearing" | "curtains"

  const initialLetter = (quinceanera?.name || "C").charAt(0).toUpperCase();

  const handleEnterGala = () => {
    if (stage !== "idle") return;
    setStage("tearing");
    setTimeout(() => {
      setStage("curtains");
    }, 480);
    setTimeout(() => {
      onOpen();
    }, 1550);
  };

  const isOpening = stage !== "idle";
  const isCurtainsOpening = stage === "curtains";

  return (
    <AnimatePresence>
      <motion.div
        className={`gala-curtain-overlay ${isOpening ? "is-opening" : ""}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Red Carpet Paparazzi / Spotlight Flash on Ticket Tear */}
        <motion.div
          className="gala-opening-flash"
          initial={{ opacity: 0 }}
          animate={
            stage === "tearing"
              ? { opacity: [0, 0.55, 0.15] }
              : stage === "curtains"
              ? { opacity: 0 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.65, ease: "easeOut" }}
          aria-hidden="true"
        />

        {/* Left Velvet Stage Curtain */}
        <motion.div
          className="velvet-curtain-panel curtain-left"
          animate={
            isCurtainsOpening
              ? { x: "-106%", skewX: -5, scaleX: 0.88, opacity: 0.96 }
              : isOpening
              ? { x: "-4%", scaleX: 0.98 }
              : { x: "0%", skewX: 0, scaleX: 1, opacity: 1 }
          }
          transition={{
            duration: isCurtainsOpening ? 1.05 : 0.45,
            ease: [0.7, 0, 0.2, 1],
          }}
        >
          <div className="curtain-drape-folds" />
          <div className="curtain-gold-trim-edge" />
        </motion.div>

        {/* Right Velvet Stage Curtain */}
        <motion.div
          className="velvet-curtain-panel curtain-right"
          animate={
            isCurtainsOpening
              ? { x: "106%", skewX: 5, scaleX: 0.88, opacity: 0.96 }
              : isOpening
              ? { x: "4%", scaleX: 0.98 }
              : { x: "0%", skewX: 0, scaleX: 1, opacity: 1 }
          }
          transition={{
            duration: isCurtainsOpening ? 1.05 : 0.45,
            ease: [0.7, 0, 0.2, 1],
          }}
        >
          <div className="curtain-drape-folds" />
          <div className="curtain-gold-trim-edge" />
        </motion.div>

        {/* Ambient Starlight Particles */}
        <div className="intro-starlight-field" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              className="intro-star-dot"
              style={{
                top: `${(i * 19 + 7) % 92}%`,
                left: `${(i * 29 + 5) % 94}%`,
                animationDelay: `${(i * 0.35) % 3}s`,
              }}
            />
          ))}
        </div>

        {/* Center VIP Golden Gala Ticket / Pass */}
        <motion.div
          className="vip-ticket-stage"
          initial={{ y: 28, opacity: 0, scale: 0.94 }}
          animate={
            isCurtainsOpening
              ? { y: -56, opacity: 0, scale: 1.12, filter: "blur(10px)" }
              : stage === "tearing"
              ? { y: -8, opacity: 1, scale: 1.03, filter: "blur(0px)" }
              : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{
            duration: isCurtainsOpening ? 0.78 : 0.48,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="vip-pass-card">
            {/* Gold Foil Shimmer Wave */}
            <motion.div
              className="vip-foil-shimmer"
              initial={{ x: "-130%" }}
              animate={isOpening ? { x: "220%" } : { x: "-130%" }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              aria-hidden="true"
            />

            {/* Architectural Corner Accents */}
            <span className="pass-corner tl" />
            <span className="pass-corner tr" />
            <span className="pass-corner bl" />
            <span className="pass-corner br" />

            {/* Top Editorial Issue Strip */}
            <div className="vip-pass-top-bar">
              <span>VOGUE MIDNIGHT GALA</span>
              <span className="dot-sep">•</span>
              <span>PASE VIP EXCLUSIVO</span>
            </div>

            {/* Shimmering Gold Foil Monogram [ C • XV ] */}
            <div className="vip-monogram-medallion">
              <div className="monogram-orbit-ring" />
              <motion.div
                className="monogram-inner-shield"
                animate={
                  isOpening
                    ? { rotateY: 180, scale: 1.1 }
                    : { rotateY: 0, scale: 1 }
                }
                transition={{ duration: 0.55 }}
              >
                <Crown size={16} className="monogram-crown" />
                <span className="monogram-code">[ {initialLetter} • XV ]</span>
              </motion.div>
            </div>

            <p className="vip-edition-kicker">
              {quinceanera.subtitle || "Velada de Gala — Edición Especial"}
            </p>

            <h1 className="vip-gala-name">{quinceanera.name}</h1>

            <div className="vip-title-banner">
              <span className="hairline" />
              <span className="vip-title-text">{quinceanera.title}</span>
              <span className="hairline" />
            </div>

            {/* Perforated Gold Ticket Divider with Side Notches */}
            <div className="vip-perforation-line" aria-hidden="true">
              <span className="perforation-notch left" />
              <span className="perforation-dashes" />
              <span className="perforation-notch right" />
            </div>

            {/* Detachable Ticket Stub that tears off when clicked */}
            <motion.div
              className="vip-stub-detachable"
              animate={
                isOpening
                  ? { y: 42, rotate: -4.5, opacity: 0, scale: 0.94 }
                  : { y: 0, rotate: 0, opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.48, ease: [0.32, 0, 0.67, 0] }}
            >
              {/* Ticket Metadata Stub */}
              <div className="vip-stub-grid">
                <div className="vip-stub-cell">
                  <span className="stub-label">FECHA</span>
                  <strong className="stub-value">
                    {quinceanera.dateDisplay}
                  </strong>
                </div>
                <div className="vip-stub-cell">
                  <span className="stub-label">EDICIÓN</span>
                  <strong className="stub-value">GALA XV</strong>
                </div>
                <div className="vip-stub-cell">
                  <span className="stub-label">ACCESO</span>
                  <strong className="stub-value">ALL ACCESS</strong>
                </div>
              </div>

              {/* CTA Gold Button */}
              <motion.button
                type="button"
                onClick={handleEnterGala}
                className="btn-enter-gala-gold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`Entrar a la gala de XV años de ${quinceanera.name}`}
              >
                {isOpening ? <Check size={17} /> : <Sparkles size={17} />}
                <span>
                  {isOpening
                    ? "ACCESO VIP AUTORIZADO..."
                    : "ENTRAR A LA GALA CON MÚSICA"}
                </span>
                <Volume2 size={17} />
              </motion.button>

              <div className="vip-serial-footer">
                <Star size={10} />
                <span>
                  NO. 0015 — RED CARPET EDITION • {quinceanera.dateFullText}
                </span>
                <Star size={10} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
