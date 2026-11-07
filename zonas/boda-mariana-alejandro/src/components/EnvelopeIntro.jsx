import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1150);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="triptych-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient Candlelight Glow behind Triptych */}
        <div className="triptych-ambient-glow" aria-hidden="true" />

        <motion.div
          className="triptych-stage"
          initial={{ y: 20, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          {/* Top Sacramental Header */}
          <div className="triptych-eyebrow">
            <span className="triptych-cross">✝</span>
            <span>SOLEMNE PARTICIPACIÓN NUPCIAL • {quinceanera.dateDisplay}</span>
            <span className="triptych-cross">✝</span>
          </div>

          {/* CATHEDRAL TRIPTYCH GATEFOLD CONTAINER */}
          <div className={`cathedral-triptych ${isOpening ? "is-opening" : ""}`}>
            {/* INTERIOR REVEAL CARD (Center Panel behind the two folding doors) */}
            <motion.div
              className="triptych-inner-sanctuary"
              animate={
                isOpening
                  ? { scale: 1.03, opacity: 1 }
                  : { scale: 0.97, opacity: 0.92 }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="sanctuary-double-frame">
                <span className="sanctuary-latin">AD MAIOREM DEI GLORIAM</span>
                <div className="sanctuary-cross-emblem">✝</div>
                <p className="sanctuary-kicker">Sagrado Matrimonio</p>
                <h1 className="sanctuary-couple-names">{quinceanera.name}</h1>
                <div className="sanctuary-rule" />
                <p className="sanctuary-date">{quinceanera.dateFullText}</p>
              </div>
            </motion.div>

            {/* LEFT GATEFOLD WING (Slides & folds left) */}
            <motion.div
              className="triptych-wing triptych-wing-left"
              animate={
                isOpening
                  ? { x: "-104%", rotateY: -28, opacity: 0.35 }
                  : { x: "0%", rotateY: 0, opacity: 1 }
              }
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wing-gold-engraving">
                <svg
                  className="wing-corner-flourish top"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M4 76V18C4 10.268 10.268 4 18 4H76"
                    stroke="#c89d54"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 68V22C12 16.477 16.477 12 22 12H68"
                    stroke="#c89d54"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <circle cx="18" cy="18" r="3" fill="#631628" />
                </svg>

                <div className="wing-monogram-half left-half">
                  <span className="wing-roman-label">MISA DE</span>
                  <span className="wing-initial">M</span>
                  <span className="wing-place-label">ATLIXCO</span>
                </div>

                <svg
                  className="wing-corner-flourish bottom"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M4 4V62C4 69.732 10.268 76 18 76H76"
                    stroke="#c89d54"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M12 12V58C12 63.523 16.477 68 22 68H68"
                    stroke="#c89d54"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <circle cx="18" cy="62" r="3" fill="#631628" />
                </svg>
              </div>
            </motion.div>

            {/* RIGHT GATEFOLD WING (Slides & folds right) */}
            <motion.div
              className="triptych-wing triptych-wing-right"
              animate={
                isOpening
                  ? { x: "104%", rotateY: 28, opacity: 0.35 }
                  : { x: "0%", rotateY: 0, opacity: 1 }
              }
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wing-gold-engraving">
                <svg
                  className="wing-corner-flourish top-right"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M76 76V18C76 10.268 69.732 4 62 4H4"
                    stroke="#c89d54"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M68 68V22C68 16.477 63.523 12 58 12H12"
                    stroke="#c89d54"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <circle cx="62" cy="18" r="3" fill="#631628" />
                </svg>

                <div className="wing-monogram-half right-half">
                  <span className="wing-roman-label">ESPONSALES</span>
                  <span className="wing-initial">A</span>
                  <span className="wing-place-label">PUEBLA</span>
                </div>

                <svg
                  className="wing-corner-flourish bottom-right"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M76 4V62C76 69.732 69.732 76 62 76H4"
                    stroke="#c89d54"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M68 12V58C68 63.523 63.523 68 58 68H12"
                    stroke="#c89d54"
                    strokeWidth="0.9"
                    strokeDasharray="3 3"
                  />
                  <circle cx="62" cy="62" r="3" fill="#631628" />
                </svg>
              </div>
            </motion.div>

            {/* CENTRAL ROYAL BURGUNDY & GOLD WAX SEAL */}
            <motion.button
              type="button"
              onClick={handleSealClick}
              className="cathedral-wax-seal"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              animate={
                isOpening
                  ? { scale: 0, rotate: 25, opacity: 0 }
                  : {
                      scale: [1, 1.04, 1],
                      boxShadow: [
                        "0 14px 36px rgba(99, 22, 40, 0.45), 0 0 0 4px rgba(200, 157, 84, 0.35)",
                        "0 18px 46px rgba(99, 22, 40, 0.65), 0 0 0 7px rgba(200, 157, 84, 0.55)",
                        "0 14px 36px rgba(99, 22, 40, 0.45), 0 0 0 4px rgba(200, 157, 84, 0.35)",
                      ],
                    }
              }
              transition={{
                duration: isOpening ? 0.45 : 2.6,
                repeat: isOpening ? 0 : Infinity,
                ease: "easeInOut",
              }}
              aria-label="Abrir tríptico nupcial de Mariana y Alejandro"
            >
              <div className="wax-seal-bevel">
                <span className="wax-seal-cross">✝</span>
                <span className="wax-seal-monogram">M &amp; A</span>
                <span className="wax-seal-cta">ABRIR</span>
              </div>
            </motion.button>
          </div>

          {/* Bottom Call to Action */}
          <motion.div
            className="triptych-hint"
            animate={{ opacity: [0.7, 1, 0.7], y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span>Toca el lacre borgoña para abrir el tríptico con música sacra</span>
            <Volume2 size={15} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
