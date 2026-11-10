"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
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
  Bell,
  BookOpen,
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

const DEFAULT_SACRAMENTAL_COURT = {
  brideParents: [
    "Sr. Roberto Villaseñor Montes",
    "Sra. María Elena Cortés de Villaseñor",
  ],
  groomParents: [
    "Sr. Alejandro Mendoza Alarcón",
    "Sra. Lucía Saldívar de Mendoza",
  ],
  padrinos: [
    {
      role: "Padrinos de Velación",
      names: "Sr. Carlos Eduardo Cortés & Sra. Sofía Castellanos de Cortés",
    },
    {
      role: "Padrinos de Lazo y Arras",
      names: "Ing. Fernando Mendoza Saldívar & Lic. Valeria Villaseñor Cortés",
    },
  ],
};

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];

function getItineraryIcon(iconName) {
  switch (iconName) {
    case "church":
      return <Church size={20} />;
    case "utensils":
      return <Utensils size={20} />;
    case "sparkles":
      return <Sparkles size={20} />;
    case "music":
      return <Music size={20} />;
    default:
      return <Sparkles size={20} />;
  }
}

export default function BodaReligiosaTemplate({ data }) {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } = data;
  const court = data.court || DEFAULT_SACRAMENTAL_COURT;

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  const countdown = useCountdown(quinceanera.dateISO);
  const { audioRef, isPlaying, playAudio, toggleAudio } = useAudioPlayer();

  const nameParts = quinceanera.name.includes("&")
    ? quinceanera.name.split("&").map((s) => s.trim())
    : [quinceanera.name, ""];
  const firstInitial = (nameParts[0] || "M").charAt(0).toUpperCase();
  const secondInitial = (nameParts[1] || "A").charAt(0).toUpperCase();

  const fireCathedralConfetti = () => {
    confetti({
      particleCount: 65,
      spread: 64,
      origin: { y: 0.65 },
      colors: ["#c89d54", "#631628", "#fdfbf9", "#e5c88f", "#8a243d"],
    });
  };

  const handleOpenInvitation = () => {
    setEnvelopeOpen(true);
    fireCathedralConfetti();
    playAudio();
  };

  const handleAddToCalendar = () => {
    openGoogleCalendar({
      title: `${quinceanera.title || "Nuestra Boda"} — ${quinceanera.name}`,
      dateISO: quinceanera.dateISO,
      locations,
    });
  };

  return (
    <div className="cathedral-app-shell">
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
        className={`sacred-music-fab ${isPlaying ? "playing" : ""}`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <div className="sacred-fab-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
        {isPlaying ? <Pause size={17} /> : <Play size={17} />}
        <span className="sacred-fab-label">
          {isPlaying ? "Marcha Nupcial" : "Escuchar Música"}
        </span>
      </motion.button>

      <main className="cathedral-main">
        {/* ================= 1. ENGRAVED CATHEDRAL FRAME HERO ================= */}
        <section id="hero" className="cathedral-hero-section">
          <div className="cathedral-container">
            <motion.div
              className="engraved-cathedral-sheet"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="engraved-inner-border">
                <span className="corner-flourish tl" aria-hidden="true" />
                <span className="corner-flourish tr" aria-hidden="true" />
                <span className="corner-flourish bl" aria-hidden="true" />
                <span className="corner-flourish br" aria-hidden="true" />

                <div className="sacramental-crest-header">
                  <div className="crest-monogram-seal">
                    <span className="crest-letter">{firstInitial}</span>
                    <span className="crest-cross">✝</span>
                    <span className="crest-letter">{secondInitial}</span>
                  </div>
                  <p className="solemn-invocation">
                    CON LA BENDICIÓN DE DIOS Y DE NUESTROS PADRES
                  </p>
                  <div className="gold-filigree-rule">
                    <span className="rule-wing" />
                    <span className="rule-diamond">❖</span>
                    <span className="rule-wing" />
                  </div>
                </div>

                <motion.h1
                  className="cathedral-couple-names"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                >
                  {quinceanera.name}
                </motion.h1>

                <p className="cathedral-sacrament-sub">
                  UNEN SUS VIDAS EN EL SAGRADO SACRAMENTO DEL MATRIMONIO
                </p>

                <motion.div
                  className="cathedral-arch-portrait-wrap"
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 180 }}
                >
                  <div className="arch-outer-trim">
                    <img
                      src={quinceanera.heroImage}
                      alt={quinceanera.name}
                      className="cathedral-arch-img"
                    />
                  </div>
                  <div className="arch-keystone-badge">
                    <span>SAGRADO MATRIMONIO</span>
                  </div>
                </motion.div>

                <div className="roman-date-lockup">
                  <div className="roman-date-band">
                    <span className="roman-number">
                      {quinceanera.dateDisplay}
                    </span>
                  </div>
                  <p className="roman-location-caption">
                    {quinceanera.dateFullText} —{" "}
                    {(locations[0]?.place || "ATLIXCO, PUEBLA").toUpperCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. BLESSING OF PARENTS & PADRINOS SECTION ================= */}
        <section id="blessing" className="blessing-court-section">
          <div className="cathedral-container">
            <motion.div
              className="parchment-decree-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="decree-header">
                <BookOpen size={22} className="decree-icon" />
                <span className="cathedral-eyebrow">
                  EPÍSTOLA &amp; BENDICIÓN PATERNA
                </span>
              </div>

              <blockquote className="sacred-scripture-quote">
                &ldquo;{quinceanera.welcomeQuote}&rdquo;
                <cite className="scripture-citation">
                  — 1 Corintios 13:7-8
                </cite>
              </blockquote>

              <div className="gold-filigree-rule compact">
                <span className="rule-wing" />
                <span className="rule-diamond">✝</span>
                <span className="rule-wing" />
              </div>

              <p className="blessing-intro-lead">
                Con el amor y ejemplo de quienes nos guiaron en la fe:
              </p>

              <div className="parents-diptych-grid">
                <div className="parents-column">
                  <span className="parents-role-title">PADRES DE LA NOVIA</span>
                  {court.brideParents.map((parent) => (
                    <p key={parent} className="parent-formal-name">
                      {parent}
                    </p>
                  ))}
                </div>

                <div className="parents-vertical-divider" aria-hidden="true">
                  <span>&amp;</span>
                </div>

                <div className="parents-column">
                  <span className="parents-role-title">PADRES DEL NOVIO</span>
                  {court.groomParents.map((parent) => (
                    <p key={parent} className="parent-formal-name">
                      {parent}
                    </p>
                  ))}
                </div>
              </div>

              <div className="padrinos-honor-box">
                <span className="padrinos-box-header">
                  Y EN COMPAÑÍA DE NUESTROS PADRINOS DE HONOR
                </span>
                <div className="padrinos-grid">
                  {court.padrinos.map((item) => (
                    <div key={item.role} className="padrino-item">
                      <span className="padrino-role-badge">{item.role}</span>
                      <p className="padrino-names">{item.names}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="formal-proclamation-text">
                {quinceanera.invitationText}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= 3. CLASSICAL BELL-TOWER COUNTDOWN & SACRED MUSIC ================= */}
        <section id="countdown" className="belltower-countdown-section">
          <div className="cathedral-container">
            <motion.div
              className="belltower-panel"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.75 }}
            >
              <div className="sacred-music-bar">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`rosette-play-btn ${isPlaying ? "spinning" : ""}`}
                  aria-label={
                    isPlaying
                      ? "Pausar marcha nupcial"
                      : "Escuchar marcha nupcial"
                  }
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div className="sacred-music-meta">
                  <span className="sacred-music-kicker">
                    ACOMPAÑAMIENTO MUSICAL • MARCHA &amp; VALS NUPCIAL
                  </span>
                  <strong className="sacred-music-title">
                    {quinceanera.songTitle}
                  </strong>
                </div>
                <div
                  className={`sacred-sound-waves ${isPlaying ? "active" : ""}`}
                >
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <div className="belltower-header">
                <Bell size={22} className="belltower-icon" />
                <span className="cathedral-eyebrow">
                  CAMPANARIO NUPCIAL • CUENTA REGRESIVA
                </span>
                <h2 className="cathedral-section-title">
                  Víspera de Nuestro Enlace
                </h2>
                <p className="cathedral-section-subtitle">
                  {quinceanera.dateFullText} • {locations[0]?.time || "1:00 PM"}
                </p>
              </div>

              <div className="roman-clock-grid">
                {[
                  { numeral: "I", label: "Días", value: countdown.days },
                  { numeral: "II", label: "Horas", value: countdown.hours },
                  { numeral: "III", label: "Minutos", value: countdown.minutes },
                  { numeral: "IV", label: "Segundos", value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="roman-clock-plaque">
                    <span className="plaque-roman-num">{unit.numeral}</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={unit.value}
                        className="plaque-digit"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        {String(unit.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="plaque-unit-label">{unit.label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddToCalendar}
                className="btn-cathedral-calendar"
              >
                <CalendarPlus size={18} />
                <span>
                  Reservar el {quinceanera.dateFullText} en mi Calendario
                </span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= 4. DIPTYQUE VENUE CARDS ================= */}
        <section id="locations" className="diptyque-venues-section">
          <div className="cathedral-container">
            <div className="cathedral-section-heading">
              <span className="cathedral-eyebrow">RECINTOS CONSAGRADOS</span>
              <h2 className="cathedral-section-title">
                Ceremonia Religiosa &amp; Recepción
              </h2>
              <div className="gold-filigree-rule compact">
                <span className="rule-wing" />
                <span className="rule-diamond">❖</span>
                <span className="rule-wing" />
              </div>
            </div>

            <div className="diptyque-venues-grid">
              {locations.map((loc, idx) => (
                <motion.article
                  key={loc.id}
                  className="diptyque-venue-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                >
                  <div className="diptyque-card-inner">
                    <div className="venue-roman-crest">
                      <span className="venue-roman-index">
                        {ROMAN_NUMERALS[idx] || "I"}
                      </span>
                      <div className="venue-arch-icon">
                        {loc.icon === "church" ? (
                          <Church size={26} />
                        ) : (
                          <MapPin size={26} />
                        )}
                      </div>
                    </div>

                    <span className="venue-sacrament-type">{loc.type}</span>
                    <h3 className="venue-monumental-title">{loc.title}</h3>

                    <div className="venue-time-ribbon">
                      <Clock size={15} />
                      <span>CITA: {loc.time}</span>
                    </div>

                    <div className="venue-address-parchment">
                      <strong>{loc.place}</strong>
                      <span>{loc.address}</span>
                    </div>

                    <p className="venue-solemn-desc">{loc.description}</p>

                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-burgundy-gps"
                    >
                      <Navigation size={16} />
                      <span>Abrir Ubicación en Google Maps</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. SACRED ORDER OF THE DAY ================= */}
        <section id="itinerary" className="sacred-order-section">
          <div className="cathedral-container">
            <div className="cathedral-section-heading">
              <span className="cathedral-eyebrow">LITURGIA &amp; FESTEJO</span>
              <h2 className="cathedral-section-title">Orden del Día</h2>
              <p className="cathedral-section-subtitle">
                Secuencia solemne de nuestra celebración nupcial
              </p>
            </div>

            <div className="sacred-order-scroll">
              <div className="sacred-order-spine" aria-hidden="true" />
              {itinerary.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="sacred-order-row"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                >
                  <div className="sacred-medallion">
                    <span className="medallion-roman">
                      {ROMAN_NUMERALS[index] || index + 1}
                    </span>
                    <div className="medallion-icon">
                      {getItineraryIcon(step.icon)}
                    </div>
                  </div>

                  <div className="sacred-order-card">
                    <div className="sacred-order-meta">
                      <span className="sacred-order-time">{step.time}</span>
                      <span className="sacred-order-badge">{step.badge}</span>
                    </div>
                    <h3 className="sacred-order-title">{step.title}</h3>
                    <p className="sacred-order-desc">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. CATHEDRAL RETABLO PHOTO GALLERY ================= */}
        <section id="gallery" className="retablo-gallery-section">
          <div className="cathedral-container">
            <div className="cathedral-section-heading">
              <span className="cathedral-eyebrow">
                RETABLO DE RECUERDOS • SESIÓN PRE-NUPCIAL
              </span>
              <h2 className="cathedral-section-title">
                Galería de Nuestra Promesa
              </h2>
              <p className="cathedral-section-subtitle">
                Toca cualquier nicho fotográfico para contemplarlo en pantalla
                completa
              </p>
            </div>

            <div className="retablo-gallery-grid">
              {gallery.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  className="retablo-niche-card"
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.12, duration: 0.65 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="retablo-arch-window">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="retablo-img"
                    />
                    <div className="retablo-overlay">
                      <span className="retablo-tag">{photo.tag}</span>
                      <div className="retablo-zoom-btn">
                        <Expand size={17} />
                      </div>
                    </div>
                  </div>
                  <figcaption className="retablo-plaque-caption">
                    <span className="retablo-roman-idx">
                      LÁMINA {ROMAN_NUMERALS[index] || index + 1}
                    </span>
                    <strong>{photo.title}</strong>
                    <span>{photo.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 7. LLUVIA DE SOBRES (COFRE NUPCIAL) ================= */}
        <section id="gifts" className="nuptial-gifts-section">
          <div className="cathedral-container">
            <motion.div
              className="nuptial-coffer-card"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="coffer-wax-emblem">
                <Gift size={28} />
              </div>

              <span className="cathedral-eyebrow">{gifts.title}</span>
              <h2 className="cathedral-section-title">
                Presentes &amp; Bendiciones
              </h2>

              <p className="coffer-message">{gifts.message}</p>

              <motion.div
                className={`nuptial-envelope-box ${
                  envelopeFlipped ? "opened" : ""
                }`}
                onClick={() => setEnvelopeFlipped(!envelopeFlipped)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                <div className="nuptial-envelope-crest">
                  <Sparkles size={16} />
                  <span>{gifts.subtitle}</span>
                  <Heart size={16} />
                </div>
                <p className="nuptial-envelope-note">{gifts.note}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <AccessControlSection
          data={data}
          onConfetti={fireCathedralConfetti}
          themeVariant="cathedral"
        />
      </main>

      {/* ================= COLOFÓN DE ESTUDIO ================= */}
      <footer className="cathedral-footer">
        <div className="cathedral-container">
          <div className="cathedral-footer-card">
            <span className="footer-monogram">
              {firstInitial} ✝ {secondInitial}
            </span>
            <p className="footer-crafted-by">
              Papelería Digital Nupcial por <strong>{studio.name}</strong>
            </p>
            <div className="footer-social-links">
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                <Instagram size={15} />
                <span>{studio.instagram}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill"
              >
                <Facebook size={15} />
                <span>{studio.facebook}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-pill gold"
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
            className="cathedral-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar imagen"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="lightbox-arrow prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + gallery.length) % gallery.length
                );
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="lightbox-frame"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].title}
              />
              <div className="lightbox-meta">
                <strong>{gallery[lightboxIndex].title}</strong>
                <span>{gallery[lightboxIndex].caption}</span>
              </div>
            </motion.div>

            <button
              type="button"
              className="lightbox-arrow next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % gallery.length);
              }}
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
