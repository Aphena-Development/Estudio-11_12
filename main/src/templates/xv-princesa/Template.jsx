"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Crown,
  Church,
  MapPin,
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
  Disc3,
  Star,
  MailOpen,
  Mail,
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

const ROMAN_NUMERALS = ["I", "II", "III", "IV"];

function getItineraryIcon(iconName) {
  switch (iconName) {
    case "church":
      return <Church size={22} />;
    case "utensils":
      return <Utensils size={22} />;
    case "sparkles":
      return <Sparkles size={22} />;
    case "music":
      return <Music size={22} />;
    default:
      return <Sparkles size={22} />;
  }
}

export default function XvPrincesaTemplate({ data }) {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } = data;
  const hasAccessControl =
    data?.accessControl?.mode && data.accessControl.mode !== "none";

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  const countdown = useCountdown(quinceanera.dateISO);
  const { audioRef, isPlaying, playAudio, toggleAudio } = useAudioPlayer();

  const monogramLetter = (quinceanera?.name || "X").charAt(0).toUpperCase();
  const quoteText = quinceanera.welcomeQuote || "";
  const firstQuoteChar = quoteText.charAt(0);
  const restQuoteText = quoteText.slice(1);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, gallery.length]);

  const fireRoyalRoseConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.62 },
      colors: ["#c98a6b", "#e6a4b4", "#e8c59e", "#5e2538", "#fdf8f5"],
    });
  };

  const handleOpenInvitation = () => {
    setEnvelopeOpen(true);
    fireRoyalRoseConfetti();
    playAudio();
  };

  const handleAddToCalendar = () => {
    openGoogleCalendar({
      title: `${quinceanera.title} — ${quinceanera.name}`,
      dateISO: quinceanera.dateISO,
      locations,
    });
  };

  return (
    <div className="royal-palace-app-shell">
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
        className={`royal-floating-music-fab ${isPlaying ? "playing" : ""}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
      >
        <div className="masthead-eq-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        <span className="masthead-audio-label">
          {isPlaying ? "Música Activa" : "Escuchar Canción"}
        </span>
      </motion.button>

      <main className="royal-invitation-main">
        {/* ================= 1. HERO SECTION ================= */}
        <section id="hero" className="royal-hero-section">
          <div className="royal-container">
            <motion.div
              className="gazette-frontpage-sheet"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <div className="gazette-edition-header-bar">
                <div className="gazette-edition-item">
                  <Crown size={13} />
                  <span>THE QUINCEAÑERA POST • EDICIÓN REAL DE PALACIO</span>
                </div>
                <div className="gazette-edition-divider" />
                <div className="gazette-edition-item">
                  <span>{quinceanera.dateFullText}</span>
                </div>
                <div className="gazette-edition-divider" />
                <div className="gazette-edition-item">
                  <MapPin size={13} />
                  <span>
                    {locations[0]?.address || "Escape de Lagunillas, Puebla"}
                  </span>
                </div>
              </div>

              <div className="gazette-hero-two-col">
                <div className="gazette-hero-left-col">
                  <div className="royal-kicker-badge">
                    <Crown size={15} />
                    <span>{quinceanera.title} • EJEMPLAR DE COLECCIÓN</span>
                  </div>

                  <div className="gazette-headline-banner">
                    <span>CRÓNICA DE UN SUEÑO REAL HECHO REALIDAD</span>
                  </div>

                  <div className="hero-royal-name-lockup">
                    <span className="hero-watermark-xv" aria-hidden="true">
                      XV
                    </span>
                    <motion.h1
                      className="hero-quince-script-title"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15, duration: 0.75 }}
                    >
                      {quinceanera.name}
                    </motion.h1>
                    <div className="hero-subtitle-ornament">
                      <span className="ornament-line" />
                      <Sparkles size={15} />
                      <span className="ornament-subtitle-text">
                        {quinceanera.subtitle}
                      </span>
                      <Sparkles size={15} />
                      <span className="ornament-line" />
                    </div>
                  </div>

                  <blockquote className="gazette-editorial-pullquote">
                    <span className="editorial-dropcap">{firstQuoteChar}</span>
                    <span className="editorial-quote-body">
                      {restQuoteText}
                    </span>
                  </blockquote>

                  <div className="royal-gramophone-player">
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={`gramophone-vinyl-disc ${
                        isPlaying ? "spinning" : ""
                      }`}
                      aria-label={
                        isPlaying
                          ? "Pausar canción oficial"
                          : "Reproducir canción oficial"
                      }
                    >
                      <div className="vinyl-grooves" />
                      <div className="vinyl-center-label">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </div>
                    </button>

                    <div className="gramophone-meta-col">
                      <div className="gramophone-status-row">
                        <Disc3
                          size={14}
                          className={isPlaying ? "icon-spin" : ""}
                        />
                        <span className="gramophone-kicker">
                          {isPlaying
                            ? "SONANDO EN PALACIO • BANDA SONORA"
                            : "TOCA EL DISCO PARA ESCUCHAR MI CANCIÓN"}
                        </span>
                      </div>

                      <strong className="gramophone-song-title">
                        {quinceanera.songTitle}
                      </strong>

                      <div
                        className={`gramophone-equalizer-16 ${
                          isPlaying ? "active" : ""
                        }`}
                        aria-hidden="true"
                      >
                        {Array.from({ length: 16 }, (_, i) => (
                          <i
                            key={i}
                            style={{
                              animationDelay: `${(i * 0.09) % 0.6}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="gramophone-play-pill"
                    >
                      {isPlaying ? "Pausar" : "Escuchar"}
                    </button>
                  </div>
                </div>

                <div className="gazette-hero-right-col">
                  <motion.div
                    className="versailles-arch-portrait-stage"
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div
                      className="versailles-celestial-halo"
                      aria-hidden="true"
                    />

                    <svg
                      className="arch-corner-filigree top-left"
                      viewBox="0 0 64 64"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 60V18C4 10.268 10.268 4 18 4H60"
                        stroke="#c98a6b"
                        strokeWidth="1.8"
                      />
                      <circle cx="16" cy="16" r="3" fill="#c98a6b" />
                    </svg>
                    <svg
                      className="arch-corner-filigree top-right"
                      viewBox="0 0 64 64"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M60 60V18C60 10.268 53.732 4 46 4H4"
                        stroke="#c98a6b"
                        strokeWidth="1.8"
                      />
                      <circle cx="48" cy="16" r="3" fill="#c98a6b" />
                    </svg>

                    <div className="versailles-arch-outer-frame">
                      <div className="versailles-arch-inner-frame">
                        <img
                          src={quinceanera.heroImage}
                          alt={`${quinceanera.name} — Save The Date ${quinceanera.dateDisplay}`}
                          className="versailles-portrait-img"
                        />
                        <div className="versailles-portrait-shimmer" />
                      </div>
                    </div>

                    <div className="versailles-floating-medallion">
                      <Crown size={14} className="medallion-crown" />
                      <span>SAVE THE DATE • {quinceanera.dateDisplay}</span>
                      <Star size={12} className="medallion-crown" />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div id="countdown" className="royal-horology-countdown-strip">
                <div className="horology-strip-header">
                  <div className="horology-title-group">
                    <span className="horology-eyebrow">
                      RELOJERÍA REAL DE PALACIO • CUENTA REGRESIVA
                    </span>
                    <h2 className="horology-heading">
                      Rumbo al {quinceanera.dateFullText}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCalendar}
                    className="btn-royal-calendar"
                  >
                    <CalendarPlus size={17} />
                    <span>Agendar en Google Calendar</span>
                  </button>
                </div>

                <div className="horology-arched-grid">
                  {[
                    { label: "Días", value: countdown.days, roman: "I" },
                    { label: "Horas", value: countdown.hours, roman: "II" },
                    { label: "Minutos", value: countdown.minutes, roman: "III" },
                    {
                      label: "Segundos",
                      value: countdown.seconds,
                      roman: "IV",
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      className="horology-arch-cell"
                      whileHover={{ y: -4 }}
                    >
                      <span className="horology-roman-index">
                        {item.roman}
                      </span>
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          className="horology-flip-number"
                          initial={{ y: -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 12, opacity: 0 }}
                          transition={{ duration: 0.24 }}
                        >
                          {String(item.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                      <span className="horology-unit-label">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. BENDICIÓN DE MIS PADRES & CORTE DE HONOR ================= */}
        <section id="honor" className="royal-honor-section">
          <div className="royal-container">
            <motion.div
              className="royal-decree-parchment-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75 }}
            >
              <div className="decree-wax-crest-header">
                <span className="decree-hairline" />
                <div className="decree-wax-medallion">
                  <Crown size={16} />
                  <span>{monogramLetter} • XV</span>
                </div>
                <span className="decree-hairline" />
              </div>

              <span className="royal-section-eyebrow">
                DECRETO REAL DE INVITACIÓN • CORTE DE HONOR
              </span>

              <p className="decree-formal-invitation-lead">
                {quinceanera.invitationText}
              </p>

              <div className="decree-monumental-xv-emblem">
                <span className="emblem-side-word">Mis</span>
                <div className="emblem-center-shield">
                  <Crown size={24} className="shield-crown" />
                  <strong>XV</strong>
                </div>
                <span className="emblem-side-word">Años</span>
              </div>

              <div className="royal-honor-pillars-grid">
                <div className="honor-pillar-card">
                  <div className="pillar-top-tag">
                    <Heart size={15} />
                    <span>CON EL AMOR DE MI FAMILIA</span>
                  </div>
                  <h3 className="pillar-heading">
                    La Bendición de Mis Padres y Familia
                  </h3>
                  <p className="pillar-text">
                    Agradezco a Dios y a mi familia por guiar cada uno de mis
                    pasos con amor, fe e ilusión, haciendo posible que este
                    sueño de infancia se convierta hoy en una realidad
                    inolvidable.
                  </p>
                </div>

                <div className="honor-pillar-card">
                  <div className="pillar-top-tag">
                    <Sparkles size={15} />
                    <span>CORTE DE HONOR &amp; PADRINOS</span>
                  </div>
                  <h3 className="pillar-heading">
                    Quienes Me Acompañan en Este Sueño
                  </h3>
                  <p className="pillar-text">
                    Un agradecimiento especial a quienes me acompañan en este
                    sueño y comparten conmigo la dicha de encender la luz de
                    esta nueva etapa rodeada de música, cariño y alegría.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 3. SEDES REALES ================= */}
        <section id="locations" className="royal-locations-section">
          <div className="royal-container">
            <div className="royal-section-header">
              <span className="royal-section-eyebrow">
                COORDENADAS REALES • DÓNDE &amp; CUÁNDO
              </span>
              <h2 className="royal-section-script-title">
                Sedes de la Celebración
              </h2>
              <p className="royal-section-subtitle">
                {locations[0]?.address || "Escape de Lagunillas, Puebla"} •{" "}
                {quinceanera.dateFullText}
              </p>
            </div>

            <div className="royal-venue-passes-grid">
              {locations.map((loc, idx) => (
                <motion.article
                  key={loc.id}
                  className="royal-arch-venue-pass"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.14, duration: 0.7 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="venue-pass-roman-banner">
                    <span>
                      ACTO {ROMAN_NUMERALS[idx] || idx + 1} •{" "}
                      {loc.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="venue-pass-embossed-icon">
                    {loc.icon === "church" ? (
                      <Church size={28} />
                    ) : (
                      <MapPin size={28} />
                    )}
                  </div>

                  <h3 className="venue-pass-title">{loc.title}</h3>

                  <div className="venue-pass-time-ribbon">
                    <Clock size={15} />
                    <span>CITA: {loc.time}</span>
                  </div>

                  <div className="venue-pass-place-block">
                    <strong className="venue-place-name">{loc.place}</strong>
                    <span className="venue-place-address">{loc.address}</span>
                  </div>

                  <p className="venue-pass-description">{loc.description}</p>

                  <div
                    className="venue-pass-perforation"
                    aria-hidden="true"
                  >
                    <span className="perf-notch left" />
                    <span className="perf-dashed-line" />
                    <span className="perf-notch right" />
                  </div>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-royal-gps-map"
                  >
                    <Navigation size={16} />
                    <span>Abrir Ubicación en Google Maps</span>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 4. ITINERARIO ================= */}
        <section id="itinerary" className="royal-itinerary-section">
          <div className="royal-container">
            <div className="royal-section-header">
              <span className="royal-section-eyebrow">
                PROGRAMA OFICIAL • ORDEN DE LA CORTE
              </span>
              <h2 className="royal-section-script-title">
                Crónica de una Noche Mágica
              </h2>
              <p className="royal-section-subtitle">
                Cada capítulo ha sido preparado con ilusión para vivirlo junto a
                ti
              </p>
            </div>

            <div className="royal-itinerary-editorial-grid">
              {itinerary.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                return (
                  <motion.article
                    key={step.id}
                    className="royal-itinerary-chapter-card"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <span
                      className="itinerary-giant-watermark"
                      aria-hidden="true"
                    >
                      {stepNumber}
                    </span>

                    <div className="itinerary-card-top-row">
                      <div className="itinerary-rose-icon-medallion">
                        {getItineraryIcon(step.icon)}
                      </div>
                      <div className="itinerary-meta-badges">
                        <span className="itinerary-chapter-tag">
                          CAPÍTULO {ROMAN_NUMERALS[index] || index + 1}
                        </span>
                        <span className="itinerary-time-pill">{step.time}</span>
                      </div>
                    </div>

                    <h3 className="itinerary-chapter-title">{step.title}</h3>
                    <p className="itinerary-chapter-desc">{step.description}</p>

                    <div className="itinerary-chapter-footer">
                      <Sparkles size={13} />
                      <span>{step.badge}</span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 5. GALERÍA ================= */}
        <section id="gallery" className="royal-gallery-section">
          <div className="royal-container">
            <div className="royal-section-header">
              <span className="royal-section-eyebrow">
                THE QUINCEAÑERA POST • SUPLEMENTO EDITORIAL
              </span>
              <h2 className="royal-section-script-title">
                Retratos de una Princesa
              </h2>
              <p className="royal-section-subtitle">
                Toca cualquier edición fotográfica para abrir el visor de
                pantalla completa
              </p>
            </div>

            <div className="gazette-magazine-gallery-grid">
              {gallery.map((photo, index) => {
                const issueNum = String(index + 1).padStart(2, "0");
                return (
                  <motion.figure
                    key={photo.id}
                    className={`gazette-photo-spread-card ${
                      index === 0 ? "featured-edition" : ""
                    }`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: index * 0.1, duration: 0.65 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="gazette-photo-header-strip">
                      <span className="photo-issue-code">
                        EDICIÓN {issueNum}
                      </span>
                      <span className="photo-issue-tag">{photo.tag}</span>
                    </div>

                    <div className="gazette-photo-arch-viewport">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="gazette-photo-img"
                      />
                      <div className="gazette-photo-hover-veil">
                        <span className="veil-edition-pill">
                          Ampliar Retrato
                        </span>
                        <div className="veil-zoom-circle">
                          <Expand size={17} />
                        </div>
                      </div>
                    </div>

                    <figcaption className="gazette-photo-caption-plate">
                      <strong>{photo.title}</strong>
                      <span>{photo.caption}</span>
                    </figcaption>
                  </motion.figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 6. LLUVIA DE SOBRES ================= */}
        <section id="gifts" className="royal-salon-rsvp-section">
          <div className="royal-container">
            <div className="royal-section-header">
              <span className="royal-section-eyebrow">
                DETALLE ESPECIAL • {gifts.subtitle.toUpperCase()}
              </span>
              <h2 className="royal-section-script-title">{gifts.title}</h2>
              <p className="royal-section-subtitle">
                Tu presencia es el mayor honor en esta celebración real
              </p>
            </div>

            <div
              className="royal-salon-two-col-grid"
              style={
                !hasAccessControl
                  ? {
                      gridTemplateColumns: "minmax(0, 680px)",
                      justifyContent: "center",
                    }
                  : undefined
              }
            >
              <div className="royal-protocol-left-stack">
                <motion.div
                  className="royal-gifts-envelope-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                >
                  <div className="protocol-card-kicker">
                    <Gift size={15} />
                    <span>{gifts.title.toUpperCase()} • DETALLE ESPECIAL</span>
                  </div>

                  <h3 className="protocol-card-title">{gifts.subtitle}</h3>
                  <p className="protocol-card-desc">{gifts.message}</p>

                  <motion.div
                    className={`royal-3d-cash-pocket ${
                      envelopeFlipped ? "is-open" : ""
                    }`}
                    onClick={() => setEnvelopeFlipped(!envelopeFlipped)}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setEnvelopeFlipped(!envelopeFlipped);
                      }
                    }}
                  >
                    <div className="cash-pocket-header">
                      <div className="cash-pocket-seal-icon">
                        {envelopeFlipped ? (
                          <MailOpen size={18} />
                        ) : (
                          <Mail size={18} />
                        )}
                      </div>
                      <div className="cash-pocket-title-col">
                        <strong>
                          {envelopeFlipped
                            ? "Buzón Real de Deseos Abierto"
                            : "Toca el Sobre Dorado de Lluvia de Sobres"}
                        </strong>
                        <span>
                          {envelopeFlipped
                            ? `Recepción • ${locations[1]?.place || "Salón Principal"}`
                            : "Haz clic para descubrir la nota del buzón real"}
                        </span>
                      </div>
                      <Sparkles size={16} className="cash-sparkle" />
                    </div>

                    <AnimatePresence initial={false}>
                      {envelopeFlipped && (
                        <motion.div
                          className="cash-pocket-revealed-letter"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p>{gifts.note}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>

              {hasAccessControl && (
                <AccessControlSection
                  data={data}
                  onConfetti={fireRoyalRoseConfetti}
                  themeVariant="royal"
                />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER DE ESTUDIO ================= */}
      <footer className="royal-studio-footer">
        <div className="royal-container">
          <div className="royal-footer-card">
            <div className="footer-monogram-badge">
              <Crown size={15} />
              <span>
                {quinceanera.name} • {quinceanera.dateDisplay}
              </span>
            </div>

            <p className="studio-crafted-by">
              Edición Digital elaborada por <strong>{studio.name}</strong>
            </p>

            <div className="studio-social-links">
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill"
              >
                <Instagram size={15} />
                <span>{studio.instagram}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill"
              >
                <Facebook size={15} />
                <span>{studio.facebook}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill highlight"
              >
                <Phone size={15} />
                <span>{studio.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= LIGHTBOX DE GALERÍA ================= */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar galería"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + gallery.length) % gallery.length
                );
              }}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="lightbox-stage"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-edition-bar">
                <span>
                  THE QUINCEAÑERA POST • EDICIÓN 0{lightboxIndex + 1}
                </span>
                <span>{gallery[lightboxIndex].tag}</span>
              </div>
              <img
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].title}
              />
              <div className="lightbox-caption">
                <strong>{gallery[lightboxIndex].title}</strong>
                <span>{gallery[lightboxIndex].caption}</span>
              </div>
            </motion.div>

            <button
              type="button"
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % gallery.length);
              }}
              aria-label="Siguiente foto"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
