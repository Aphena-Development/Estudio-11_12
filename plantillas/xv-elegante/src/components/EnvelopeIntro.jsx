import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Crown, Star } from "lucide-react";

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [isOpening, setIsOpening] = useState(false);

  const initialLetter = (quinceanera?.name || "C").charAt(0).toUpperCase();

  const handleEnterGala = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1150);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`gala-curtain-overlay ${isOpening ? "is-opening" : ""}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Left Velvet Stage Curtain */}
        <motion.div
          className="velvet-curtain-panel curtain-left"
          animate={
            isOpening
              ? { x: "-104%", skewX: -4, opacity: 0.95 }
              : { x: "0%", skewX: 0, opacity: 1 }
          }
          transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="curtain-drape-folds" />
          <div className="curtain-gold-trim-edge" />
        </motion.div>

        {/* Right Velvet Stage Curtain */}
        <motion.div
          className="velvet-curtain-panel curtain-right"
          animate={
            isOpening
              ? { x: "104%", skewX: 4, opacity: 0.95 }
              : { x: "0%", skewX: 0, opacity: 1 }
          }
          transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
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
            isOpening
              ? { y: -40, opacity: 0, scale: 1.08, filter: "blur(8px)" }
              : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{
            duration: isOpening ? 0.75 : 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="vip-pass-card">
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
              <div className="monogram-inner-shield">
                <Crown size={16} className="monogram-crown" />
                <span className="monogram-code">
                  [ {initialLetter} • XV ]
                </span>
              </div>
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

            {/* Ticket Metadata Stub */}
            <div className="vip-stub-grid">
              <div className="vip-stub-cell">
                <span className="stub-label">FECHA</span>
                <strong className="stub-value">{quinceanera.dateDisplay}</strong>
              </div>
              <div className="vip-stub-cell">
                <span className="stub-label">DRESS CODE</span>
                <strong className="stub-value">GALA NOCTURNA</strong>
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
              <Sparkles size={17} />
              <span>ENTRAR A LA GALA CON MÚSICA</span>
              <Volume2 size={17} />
            </motion.button>

            <div className="vip-serial-footer">
              <Star size={10} />
              <span>NO. 0015 — RED CARPET EDITION • {quinceanera.dateFullText}</span>
              <Star size={10} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
