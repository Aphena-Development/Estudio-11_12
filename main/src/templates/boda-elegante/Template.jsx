"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Church,
  Clock,
  CalendarPlus,
  Music,
  Pause,
  Play,
  Sparkles,
  Utensils,
  Gift,
  Heart,
  Instagram,
  Facebook,
  Phone,
  Expand,
  ChevronLeft,
  ChevronRight,
  X,
  Navigation,
  Compass,
} from "lucide-react";
import FloatingButterflies from "./components/FloatingButterflies";
import EnvelopeIntro from "./components/EnvelopeIntro";
import {
  useCountdown,
  useAudioPlayer,
  openGoogleCalendar,
  AccessControlSection,
} from "../../components/invitation-core";
import "./theme.css";

function getItineraryIcon(iconName) {
  switch (iconName) {
    case "church":
      return <Church size={20} strokeWidth={1.6} />;
    case "utensils":
      return <Utensils size={20} strokeWidth={1.6} />;
    case "sparkles":
      return <Sparkles size={20} strokeWidth={1.6} />;
    case "music":
      return <Music size={20} strokeWidth={1.6} />;
    default:
      return <Sparkles size={20} strokeWidth={1.6} />;
  }
}

function BotanicalDivider() {
  return (
    <div className="botanical-svg-divider" aria-hidden="true">
      <span className="div-hairline" />
      <svg
        width="88"
        height="24"
        viewBox="0 0 88 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 12 C26 12, 34 6, 44 12 C54 18, 62 12, 80 12"
          stroke="#9A8252"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse
          cx="28"
          cy="8"
          rx="7"
          ry="2.8"
          transform="rotate(-22 28 8)"
          fill="#677858"
        />
        <ellipse
          cx="60"
          cy="16"
          rx="7"
          ry="2.8"
          transform="rotate(-22 60 16)"
          fill="#677858"
        />
        <circle cx="44" cy="12" r="3" fill="#B8965A" />
      </svg>
      <span className="div-hairline" />
    </div>
  );
}

export default function BodaEleganteTemplate({ data }) {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } = data;
  const hasAccessControl =
    data?.accessControl?.mode && data.accessControl.mode !== "none";

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [giftBoxOpen, setGiftBoxOpen] = useState(false);

  const countdown = useCountdown(quinceanera.dateISO);
  const { audioRef, isPlaying, playAudio, toggleAudio } = useAudioPlayer();

  const fireBotanicalConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#5e7050", "#b8965a", "#e6dec8", "#7e906d", "#c8a971"],
    });
  };

  const handleOpenInvitation = () => {
    setEnvelopeOpen(true);
    fireBotanicalConfetti();
    playAudio();
  };

  const handleAddToCalendar = () => {
    openGoogleCalendar({
      title: `${quinceanera.title || "Nuestra Boda"} — ${quinceanera.name}`,
      dateISO: quinceanera.dateISO,
      locations,
    });
  };

  const nameParts = quinceanera.name.includes("&")
    ? quinceanera.name.split("&").map((s) => s.trim())
    : [quinceanera.name, ""];

  const monogramInitials = nameParts[1]
    ? `${nameParts[0].charAt(0)}&${nameParts[1].charAt(0)}`
    : nameParts[0].slice(0, 2).toUpperCase();

  const loveStoryMoments = data.loveStory || [
    {
      roman: "I",
      stage: "EL ENCUENTRO",
      title: "Dos Caminos",
      text: "Lo que comenzó como una coincidencia se transformó en nuestra certeza favorita de todos los días.",
    },
    {
      roman: "II",
      stage: "LA PROMESA",
      title: "Un Mismo Hogar",
      text: "Entre risas, viajes y sueños compartidos descubrimos que el mejor lugar del mundo es estar juntos.",
    },
    {
      roman: "III",
      stage: "EL GRAN DÍA",
      title: quinceanera.dateDisplay,
      text: "Bajo los olivos sellaremos nuestra promesa rodeados de las personas que más amamos.",
    },
  ];

  return (
    <div className="hacienda-wedding-shell">
      <audio ref={audioRef} src={quinceanera.audioUrl} loop preload="auto" />

      <FloatingButterflies />

      {!envelopeOpen && (
        <EnvelopeIntro
          onOpen={handleOpenInvitation}
          quinceanera={quinceanera}
        />
      )}

      <motion.button
        type="button"
        onClick={toggleAudio}
        className={`hacienda-music-fab ${isPlaying ? "playing" : ""}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <div className="fab-olive-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span className="fab-text">
          {isPlaying ? quinceanera.songTitle : "Escuchar Canción"}
        </span>
      </motion.button>

      <main className="hacienda-main-content">
        {/* ================= 1. ASYMMETRIC TWO-COLUMN EDITORIAL HERO ================= */}
        <section id="hero" className="editorial-hero-section">
          <div className="hacienda-container">
            <div className="editorial-hero-grid">
              <motion.div
                className="hero-editorial-left"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className="hero-kicker-badge">
                  <span className="kicker-dot" />
                  <span>
                    {(quinceanera.title || "NUESTRA BODA").toUpperCase()} •{" "}
                    {quinceanera.dateDisplay}
                  </span>
                </div>

                <h1 className="hero-couple-display">
                  {nameParts[1] ? (
                    <>
                      <span className="bride-name">{nameParts[0]}</span>
                      <span className="editorial-ampersand">&amp;</span>
                      <span className="groom-name">{nameParts[1]}</span>
                    </>
                  ) : (
                    <span>{quinceanera.name}</span>
                  )}
                </h1>

                <p className="hero-location-subline">
                  {quinceanera.dateFullText} •{" "}
                  {locations[0]?.place || "Atlixco, Puebla"}
                </p>

                <blockquote className="hero-editorial-quote">
                  <p>&ldquo;{quinceanera.welcomeQuote}&rdquo;</p>
                </blockquote>

                <p className="hero-parents-blessing">
                  {quinceanera.invitationText}
                </p>

                <div className="hero-actions-row">
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`editorial-audio-pill ${
                      isPlaying ? "active" : ""
                    }`}
                  >
                    <span className="audio-icon-circle">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </span>
                    <span className="audio-meta">
                      <small>BANDA SONORA NUPCIAL</small>
                      <strong>{quinceanera.songTitle}</strong>
                    </span>
                    <span
                      className={`audio-wave-mini ${isPlaying ? "on" : ""}`}
                    >
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                  </button>

                  <a
                    href={hasAccessControl ? "#rsvp" : "#locations"}
                    className="btn-hero-rsvp-link"
                  >
                    <span>
                      {hasAccessControl
                        ? "Confirmar Asistencia"
                        : "Ver Ubicaciones"}
                    </span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="hero-arch-right"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
              >
                <div className="mediterranean-tall-arch">
                  <div className="arch-brass-double-line" />
                  <img
                    src={quinceanera.heroImage}
                    alt={`${quinceanera.name} — Save the Date`}
                    className="arch-hero-photo"
                  />
                  <div className="arch-inner-vignette" />
                </div>

                <motion.div
                  className="floating-arch-date-badge"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="badge-eyebrow">SAVE THE DATE</span>
                  <strong className="badge-numerals">
                    {quinceanera.dateDisplay}
                  </strong>
                  <span className="badge-place">Atlixco, Puebla</span>
                </motion.div>

                <div className="arch-corner-monogram" aria-hidden="true">
                  <span>{monogramInitials}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= 2. MINIMALIST BOTANICAL COUNTDOWN STRIP ================= */}
        <section id="countdown" className="botanical-countdown-section">
          <div className="hacienda-container">
            <motion.div
              className="architectural-countdown-strip"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75 }}
            >
              <div className="countdown-strip-header">
                <span className="editorial-index">CUENTA REGRESIVA</span>
                <h2 className="countdown-strip-title">
                  Rumbo al Sí, Acepto • {quinceanera.dateFullText}
                </h2>
              </div>

              <div className="countdown-4col-grid">
                {[
                  {
                    label: "DÍAS",
                    sub: "Para el gran día",
                    value: countdown.days,
                  },
                  {
                    label: "HORAS",
                    sub: "De ilusión",
                    value: countdown.hours,
                  },
                  {
                    label: "MINUTOS",
                    sub: "Por compartir",
                    value: countdown.minutes,
                  },
                  {
                    label: "SEGUNDOS",
                    sub: "Latidos",
                    value: countdown.seconds,
                  },
                ].map((unit) => (
                  <div key={unit.label} className="countdown-arch-cell">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.value}
                        className="countdown-serif-number"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="countdown-cell-label">{unit.label}</span>
                    <small className="countdown-cell-sub">{unit.sub}</small>
                  </div>
                ))}
              </div>

              <div className="countdown-strip-footer">
                <BotanicalDivider />
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="btn-olive-calendar"
                >
                  <CalendarPlus size={17} />
                  <span>Agendar en Google Calendar</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 3. ARCHITECTURAL ARCH VENUE CARDS ================= */}
        <section id="locations" className="hacienda-venues-section">
          <div className="hacienda-container">
            <div className="editorial-section-heading">
              <span className="editorial-index">01 / ARQUITECTURA &amp; SEDE</span>
              <h2 className="editorial-serif-title">Dónde &amp; Cuándo</h2>
              <p className="editorial-subtitle">
                {locations[0]?.place || "Hacienda Santo Cristo"} •{" "}
                {locations[0]?.address || "Atlixco, Puebla"}
              </p>
              <BotanicalDivider />
            </div>

            <div className="arch-venues-grid">
              {locations.map((loc, idx) => (
                <motion.article
                  key={loc.id}
                  className="hacienda-arch-venue-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.15, duration: 0.75 }}
                >
                  <div className="venue-arch-top">
                    <span className="venue-roman-numeral">
                      {idx === 0 ? "ARCO I • CEREMONIA" : "ARCO II • BANQUETE"}
                    </span>
                    <div className="venue-arch-emblem">
                      {loc.icon === "church" ? (
                        <Church size={26} strokeWidth={1.5} />
                      ) : (
                        <Compass size={26} strokeWidth={1.5} />
                      )}
                    </div>
                    <span className="venue-event-type">{loc.type}</span>
                    <h3 className="venue-arch-name">{loc.title}</h3>
                  </div>

                  <div className="venue-arch-body">
                    <div className="venue-time-banner">
                      <Clock size={15} />
                      <span>CITA: {loc.time}</span>
                    </div>

                    <div className="venue-address-block">
                      <strong>{loc.place}</strong>
                      <span>{loc.address}</span>
                    </div>

                    <p className="venue-narrative">{loc.description}</p>

                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-arch-map"
                    >
                      <Navigation size={15} />
                      <span>Abrir Ubicación en Google Maps</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. HORIZONTAL / EDITORIAL LOVE STORY & PROGRAM ================= */}
        <section id="itinerary" className="editorial-program-section">
          <div className="hacienda-container">
            <div className="editorial-section-heading">
              <span className="editorial-index">
                02 / NUESTRA HISTORIA &amp; PROGRAMA NUPCIAL
              </span>
              <h2 className="editorial-serif-title">
                Crónica de Nuestro Gran Día
              </h2>
              <p className="editorial-subtitle">
                Tres capítulos de amor y cuatro momentos diseñados para celebrar
                juntos
              </p>
              <BotanicalDivider />
            </div>

            <div className="love-story-horizontal-strip">
              {loveStoryMoments.map((item, idx) => (
                <motion.div
                  key={item.roman}
                  className="love-chapter-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.65 }}
                >
                  <div className="chapter-top-line">
                    <span className="chapter-roman">{item.roman}</span>
                    <span className="chapter-stage">{item.stage}</span>
                  </div>
                  <h3 className="chapter-title">{item.title}</h3>
                  <p className="chapter-text">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="wedding-program-horizontal">
              {itinerary.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="program-step-column"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                >
                  <div className="program-step-header">
                    <span className="program-step-number">0{index + 1}</span>
                    <div className="program-step-icon">
                      {getItineraryIcon(step.icon)}
                    </div>
                    <span className="program-step-connector" />
                  </div>

                  <div className="program-step-time">{step.time}</div>
                  <span className="program-step-badge">{step.badge}</span>
                  <h3 className="program-step-title">{step.title}</h3>
                  <p className="program-step-desc">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. POLAROID / EDITORIAL MAGAZINE GALLERY ================= */}
        <section id="gallery" className="polaroid-gallery-section">
          <div className="hacienda-container">
            <div className="editorial-section-heading">
              <span className="editorial-index">
                03 / EDICIÓN IMPRESA • RETRATOS EN LA HACIENDA
              </span>
              <h2 className="editorial-serif-title">Galería Editorial</h2>
              <p className="editorial-subtitle">
                Toca cada polaroid de algodón para ampliar la fotografía
              </p>
              <BotanicalDivider />
            </div>

            <div className="polaroid-magazine-grid">
              {gallery.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  className={`cotton-polaroid-card tilt-${(index % 4) + 1}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.12, duration: 0.7 }}
                  whileHover={{ y: -8, rotate: 0, scale: 1.01 }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="polaroid-washi-tape" aria-hidden="true" />

                  <div className="polaroid-issue-row">
                    <span>ARCHIVO NUPCIAL • N° 0{index + 1}</span>
                    <span>{photo.tag}</span>
                  </div>

                  <div className="polaroid-photo-frame">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="polaroid-img"
                    />
                    <div className="polaroid-expand-overlay">
                      <span className="expand-circle">
                        <Expand size={17} />
                      </span>
                    </div>
                  </div>

                  <figcaption className="polaroid-caption-box">
                    <strong className="polaroid-title">{photo.title}</strong>
                    <span className="polaroid-sub">{photo.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. HONEYMOON GIFT BOX (MESA DE REGALOS) ================= */}
        <section id="gifts" className="protocol-gifts-section">
          <div className="hacienda-container">
            <div className="editorial-section-heading">
              <span className="editorial-index">
                04 / OBSEQUIOS &amp; LUNA DE MIEL
              </span>
              <h2 className="editorial-serif-title">
                Mesa de Regalos &amp; Lluvia de Sobres
              </h2>
              <BotanicalDivider />
            </div>

            <div className="protocol-single-col-wrap">
              <motion.div
                className="honeymoon-giftbox-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="giftbox-seal-icon">
                  <Gift size={26} strokeWidth={1.5} />
                </div>
                <span className="card-kicker">{gifts.title.toUpperCase()}</span>
                <h3 className="card-serif-heading">{gifts.subtitle}</h3>
                <p className="giftbox-message">{gifts.message}</p>

                <motion.div
                  className={`interactive-honeymoon-box ${
                    giftBoxOpen ? "open" : ""
                  }`}
                  onClick={() => setGiftBoxOpen(!giftBoxOpen)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="honeymoon-box-header">
                    <Heart size={16} />
                    <span>
                      {giftBoxOpen
                        ? "BUZÓN NUPCIAL EN RECEPCIÓN • GRACIAS POR SU CARIÑO"
                        : "TOCA PARA VER DETALLE DE BUZÓN DE LUNA DE MIEL"}
                    </span>
                  </div>
                  <p className="honeymoon-box-detail">
                    {giftBoxOpen
                      ? gifts.note ||
                        "En la entrada del salón contaremos con un cofre especial para quienes deseen contribuir a nuestra luna de miel."
                      : "Su presencia en este día tan especial es el mejor regalo que podemos recibir."}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <AccessControlSection
          data={data}
          onConfetti={fireBotanicalConfetti}
          themeVariant="hacienda"
        />
      </main>

      {/* ================= FOOTER DE ESTUDIO ================= */}
      <footer className="hacienda-studio-footer">
        <div className="hacienda-container">
          <div className="footer-architectural-inner">
            <div className="footer-couple-signoff">
              <span className="signoff-monogram">{monogramInitials}</span>
              <p>
                {quinceanera.name} • {quinceanera.dateDisplay}
              </p>
            </div>

            <div className="footer-studio-credits">
              <p className="crafted-by-line">
                Diseño de Invitación Digital por <strong>{studio.name}</strong>
              </p>
              <div className="studio-links-row">
                <a
                  href={studio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-link-pill"
                >
                  <Instagram size={15} />
                  <span>{studio.instagram}</span>
                </a>
                <a
                  href={studio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-link-pill"
                >
                  <Facebook size={15} />
                  <span>{studio.facebook}</span>
                </a>
                <a
                  href={studio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-link-pill brass"
                >
                  <Phone size={15} />
                  <span>{studio.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= LIGHTBOX DE GALERÍA ================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="hacienda-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar galería"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="lightbox-arrow-btn prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + gallery.length) % gallery.length
                );
              }}
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="lightbox-polaroid-modal"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].title}
              />
              <div className="lightbox-modal-caption">
                <span>{gallery[lightboxIndex].tag}</span>
                <strong>{gallery[lightboxIndex].title}</strong>
                <p>{gallery[lightboxIndex].caption}</p>
              </div>
            </motion.div>

            <button
              type="button"
              className="lightbox-arrow-btn next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % gallery.length);
              }}
              aria-label="Siguiente fotografía"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
