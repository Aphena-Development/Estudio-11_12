import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";

export default function EnvelopeIntro({ onOpen, quinceanera }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenDoors = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1150);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="hacienda-intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Luz cálida de hacienda y textura de papel algodón */}
        <div className="hacienda-intro-ambient" aria-hidden="true">
          <div className="sunbeam-ray ray-1" />
          <div className="sunbeam-ray ray-2" />
          <div className="cotton-grain-layer" />
        </div>

        <motion.div
          className="hacienda-portal-stage"
          initial={{ y: 24, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        >
          {/* Eyebrow superior arquitectónico */}
          <div className="hacienda-portal-kicker">
            <span className="kicker-line" />
            <span>HACIENDA SANTO CRISTO • ATLIXCO, PUEBLA</span>
            <span className="kicker-line" />
          </div>

          {/* Marco de Doble Puerta en Arco de Hacienda */}
          <div
            className={`hacienda-arch-portal ${
              isOpening ? "doors-opening" : ""
            }`}
          >
            {/* Moldura exterior de piedra y latón antiguo */}
            <div className="arch-stone-trim" />

            {/* Tarjeta interior de Papel Algodón revelada al abrir las puertas */}
            <motion.div
              className="inner-cotton-card"
              animate={
                isOpening
                  ? { scale: 1.03, opacity: 1, y: -6 }
                  : { scale: 0.95, opacity: 0.88, y: 0 }
              }
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inner-card-eyebrow">
                CELEBRACIÓN NUPCIAL • {quinceanera.dateDisplay}
              </span>
              <div className="inner-card-monogram">V &amp; S</div>
              <h2 className="inner-card-couple">{quinceanera.name}</h2>
              <p className="inner-card-date">{quinceanera.dateFullText}</p>
              <div className="inner-card-divider" />
              <p className="inner-card-quote">
                &ldquo;{quinceanera.welcomeQuote}&rdquo;
              </p>
            </motion.div>

            {/* Hoja Izquierda de la Puerta de Hacienda */}
            <div className="arch-door arch-door-left">
              <div className="door-panel-molding top-arch-panel" />
              <div className="door-panel-molding bottom-rect-panel" />
              <div className="door-brass-handle left-handle" />
            </div>

            {/* Hoja Derecha de la Puerta de Hacienda */}
            <div className="arch-door arch-door-right">
              <div className="door-panel-molding top-arch-panel" />
              <div className="door-panel-molding bottom-rect-panel" />
              <div className="door-brass-handle right-handle" />
            </div>

            {/* Medallón Botánico Central sobre las Puertas (Monograma V & S + Ramas de Olivo) */}
            <motion.div
              className="portal-center-placard"
              animate={
                isOpening
                  ? { opacity: 0, scale: 0.86, y: -18 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              {/* Ornamento SVG de Rama de Olivo Mediterránea */}
              <svg
                className="olive-crest-svg"
                viewBox="0 0 220 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Rama izquierda */}
                <path
                  d="M18 54 C48 48, 76 34, 104 20"
                  stroke="#8A7346"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="42"
                  cy="41"
                  rx="11"
                  ry="4.5"
                  transform="rotate(-28 42 41)"
                  fill="#647456"
                  fillOpacity="0.85"
                />
                <ellipse
                  cx="66"
                  cy="31"
                  rx="11"
                  ry="4.2"
                  transform="rotate(-24 66 31)"
                  fill="#788968"
                  fillOpacity="0.85"
                />
                <ellipse
                  cx="88"
                  cy="22"
                  rx="9.5"
                  ry="3.8"
                  transform="rotate(-18 88 22)"
                  fill="#556448"
                  fillOpacity="0.9"
                />
                <ellipse
                  cx="56"
                  cy="48"
                  rx="10"
                  ry="4"
                  transform="rotate(14 56 48)"
                  fill="#788968"
                  fillOpacity="0.75"
                />
                <circle cx="74" cy="39" r="3" fill="#B8965A" />
                <circle cx="48" cy="49" r="2.5" fill="#C7A96E" />

                {/* Rama derecha */}
                <path
                  d="M202 54 C172 48, 144 34, 116 20"
                  stroke="#8A7346"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="178"
                  cy="41"
                  rx="11"
                  ry="4.5"
                  transform="rotate(28 178 41)"
                  fill="#647456"
                  fillOpacity="0.85"
                />
                <ellipse
                  cx="154"
                  cy="31"
                  rx="11"
                  ry="4.2"
                  transform="rotate(24 154 31)"
                  fill="#788968"
                  fillOpacity="0.85"
                />
                <ellipse
                  cx="132"
                  cy="22"
                  rx="9.5"
                  ry="3.8"
                  transform="rotate(18 132 22)"
                  fill="#556448"
                  fillOpacity="0.9"
                />
                <ellipse
                  cx="164"
                  cy="48"
                  rx="10"
                  ry="4"
                  transform="rotate(-14 164 48)"
                  fill="#788968"
                  fillOpacity="0.75"
                />
                <circle cx="146" cy="39" r="3" fill="#B8965A" />
                <circle cx="172" cy="49" r="2.5" fill="#C7A96E" />

                {/* Rombo central dorado */}
                <polygon
                  points="110,10 116,18 110,26 104,18"
                  fill="#B8965A"
                  fillOpacity="0.9"
                />
              </svg>

              {/* Monograma entrelazado V & S */}
              <div className="intertwined-monogram-seal">
                <span className="mono-letter mono-v">V</span>
                <span className="mono-amp">&amp;</span>
                <span className="mono-letter mono-s">S</span>
              </div>

              <span className="placard-edition">
                INVITACIÓN NUPCIAL • PAPEL ALGODÓN
              </span>

              <h1 className="placard-couple-names">{quinceanera.name}</h1>

              <p className="placard-date-line">{quinceanera.dateDisplay}</p>

              {/* Botón Verde Salvia & Oro Antiguo */}
              <motion.button
                type="button"
                onClick={handleOpenDoors}
                className="btn-open-nuptial-arch"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Abrir invitación nupcial"
              >
                <Sparkles size={15} className="btn-Nu-icon" />
                <span>ABRIR INVITACIÓN NUPCIAL</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Nota de audio al pie del pórtico */}
          <motion.div
            className="hacienda-audio-hint"
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          >
            <Volume2 size={15} />
            <span>
              Toca para abrir las puertas de la hacienda con música en vivo
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
