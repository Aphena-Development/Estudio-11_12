import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Crown } from "lucide-react";

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 950);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="envelope-aurora-backdrop">
          <div className="aurora-blob blob-rose-1" />
          <div className="aurora-blob blob-gold-2" />
          <div className="aurora-blob blob-blush-3" />
        </div>

        <motion.div
          className="envelope-stage"
          initial={{ y: 24, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="envelope-preheader">
            <Crown size={18} className="crown-icon-gold" />
            <span>INVITACIÓN EXCLUSIVA • {quinceanera.dateDisplay}</span>
          </div>

          <div className={`luxury-envelope ${isOpening ? "opening" : ""}`}>
            <div className="envelope-flap-top" />
            <div className="envelope-pocket" />

            <motion.div
              className="envelope-letter-preview"
              animate={
                isOpening
                  ? { y: -90, scale: 1.03, opacity: 1 }
                  : { y: 0, scale: 1, opacity: 0.96 }
              }
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="letter-edition">The Quinceañera Post</span>
              <h1 className="letter-script-name">{quinceanera.name}</h1>
              <p className="letter-subtitle">{quinceanera.title}</p>
            </motion.div>

            <motion.button
              type="button"
              onClick={handleSealClick}
              className="wax-seal-btn"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              animate={
                isOpening
                  ? { scale: 0, rotate: 45, opacity: 0 }
                  : {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 10px 30px rgba(169, 49, 89, 0.38)",
                        "0 14px 42px rgba(212, 163, 115, 0.65)",
                        "0 10px 30px rgba(169, 49, 89, 0.38)",
                      ],
                    }
              }
              transition={{
                duration: isOpening ? 0.45 : 2.4,
                repeat: isOpening ? 0 : Infinity,
                ease: "easeInOut",
              }}
              aria-label="Abrir invitación de XV Años de Ximena"
            >
              <div className="wax-seal-inner">
                <Crown size={18} className="seal-crown" />
                <span className="seal-xv">XV</span>
                <span className="seal-tap">ABRIR</span>
              </div>
            </motion.button>
          </div>

          <motion.div
            className="envelope-hint"
            animate={{ opacity: [0.65, 1, 0.65], y: [0, -4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <Sparkles size={15} />
            <span>Toca el sello dorado para abrir tu invitación con música</span>
            <Volume2 size={15} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
