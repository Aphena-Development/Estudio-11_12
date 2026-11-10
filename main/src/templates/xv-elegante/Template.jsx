"use client";

import React, { useState } from "react";
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
  Instagram,
  Facebook,
  Phone,
  Expand,
  ChevronLeft,
  ChevronRight,
  X,
  Navigation,
  Disc3,
  Ticket,
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

export default function XvEleganteTemplate({ data }) {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } = data;
  const hasAccessControl =
    data?.accessControl?.mode && data.accessControl.mode !== "none";

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  const countdown = useCountdown(quinceanera.dateISO);
  const { audioRef, isPlaying, playAudio, toggleAudio } = useAudioPlayer();

  const monogramLetter = (quinceanera?.name || "C").charAt(0).toUpperCase();

  const fireGoldGalaConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 72,
      origin: { y: 0.62 },
      colors: ["#d4af37", "#f5db8c", "#fff6d6", "#aa8220", "#1a1621"],
    });
  };

  const handleOpenInvitation = () => {
    setEnvelopeOpen(true);
    fireGoldGalaConfetti();
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
    <div className="gala-app-shell">
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
        className={`floating-gala-music-fab ${isPlaying ? "playing" : ""}`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
      >
        <div className="fab-eq-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span className="fab-text">
          {isPlaying ? "Gala Soundtrack" : "Reproducir Vals"}
        </span>
      </motion.button>

      <main className="gala-main-content">
        {/* ================= 1. FULL-BLEED MAGAZINE COVER HERO + HORIZONTAL COUNTDOWN ================= */}
        <section id="hero" className="vogue-hero-section">
          <div className="gala-container">
            <motion.div
              className="vogue-magazine-cover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="magazine-issue-bar">
                <span>VOGUE NIGHT EDITION • NO. XV</span>
                <span className="issue-center-diamond">◆</span>
                <span>{quinceanera.dateFullText}</span>
              </div>

              <div className="couture-cover-stage">
                <div className="cover-vertical-tag left" aria-hidden="true">
                  <span>ALTA COSTURA • BLACK TIE GALA</span>
                </div>
                <div className="cover-vertical-tag right" aria-hidden="true">
                  <span>EDICIÓN COLECCIONISTA • {quinceanera.dateDisplay}</span>
                </div>

                <div className="couture-portrait-frame">
                  <div className="couture-frame-border-outer" />
                  <div className="couture-frame-border-inner" />

                  <img
                    src={quinceanera.heroImage}
                    alt={`${quinceanera.name} — Portada de Gala XV`}
                    className="couture-hero-img"
                  />

                  <div className="couture-img-gradient" />

                  <div className="cover-top-badge">
                    <Crown size={15} />
                    <span>{quinceanera.subtitle}</span>
                  </div>

                  <div className="cover-overlapping-headline">
                    <span className="cover-kicker-label">
                      — {quinceanera.title.toUpperCase()} —
                    </span>
                    <h1 className="cover-giant-name">{quinceanera.name}</h1>
                    <div className="cover-sub-lockup">
                      <span className="gold-line" />
                      <span className="cover-gala-tag">XV GALA NIGHT</span>
                      <span className="gold-line" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                id="countdown"
                className="horizontal-countdown-console"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.75 }}
              >
                <div className="console-date-meta">
                  <span className="console-eyebrow">SAVE THE DATE • GALA</span>
                  <strong className="console-date-num">
                    {quinceanera.dateDisplay}
                  </strong>
                </div>

                <div className="console-digits-strip">
                  {[
                    { label: "Días", value: countdown.days },
                    { label: "Horas", value: countdown.hours },
                    { label: "Minutos", value: countdown.minutes },
                    { label: "Segundos", value: countdown.seconds },
                  ].map((item, index) => (
                    <React.Fragment key={item.label}>
                      <div className="console-digit-cell">
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={item.value}
                            className="console-digit-value"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            {String(item.value).padStart(2, "0")}
                          </motion.span>
                        </AnimatePresence>
                        <span className="console-digit-label">{item.label}</span>
                      </div>
                      {index < 3 && (
                        <span className="console-colon" aria-hidden="true">
                          :
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="btn-console-calendar"
                >
                  <CalendarPlus size={16} />
                  <span>Agendar Gala</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. EDITORIAL QUOTE & SPINNING GOLD VINYL AUDIO BAR ================= */}
        <section id="welcome" className="editorial-quote-section">
          <div className="gala-container">
            <motion.div
              className="vinyl-equalizer-bar"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="vinyl-disc-assembly">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`gold-vinyl-record ${isPlaying ? "spinning" : ""}`}
                  aria-label={isPlaying ? "Pausar pista" : "Reproducir pista"}
                >
                  <div className="vinyl-grooves" />
                  <div className="vinyl-gold-center">
                    <span>XV</span>
                  </div>
                </button>
                <div className="vinyl-status-dot" />
              </div>

              <div className="vinyl-track-center">
                <div className="vinyl-track-header">
                  <Disc3 size={14} className="gold-icon-spin" />
                  <span>SOUNDTRACK OFICIAL • VELADA DE GALA</span>
                </div>
                <strong className="vinyl-song-title">
                  {quinceanera.songTitle}
                </strong>
                <div
                  className={`gold-equalizer-strip ${isPlaying ? "active" : ""}`}
                  aria-hidden="true"
                >
                  {Array.from({ length: 18 }, (_, i) => (
                    <i key={i} style={{ animationDelay: `${(i * 0.09) % 0.6}s` }} />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className="btn-vinyl-toggle"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? "PAUSAR" : "ESCUCHAR"}</span>
              </button>
            </motion.div>

            <motion.div
              className="editorial-manifesto-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="manifesto-top-monogram">
                <span className="line" />
                <span className="monogram-pill">[ {monogramLetter} • XV ]</span>
                <span className="line" />
              </div>

              <blockquote className="editorial-blockquote">
                &ldquo;{quinceanera.welcomeQuote}&rdquo;
              </blockquote>

              <div className="manifesto-gold-rule" />

              <p className="editorial-parents-invite">
                {quinceanera.invitationText}
              </p>

              <div className="editorial-signature-lockup">
                <span className="sig-label">LA PROTAGONISTA DE LA NOCHE</span>
                <span className="sig-name">{quinceanera.name}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 3. ASYMMETRIC RUNWAY ITINERARY ================= */}
        <section id="itinerary" className="runway-itinerary-section">
          <div className="gala-container">
            <div className="gala-section-header">
              <span className="gala-eyebrow">
                RUNWAY TIMELINE • PROGRAMA DE LA VELADA
              </span>
              <h2 className="gala-serif-title">Itinerario de Gala</h2>
              <p className="gala-section-subtitle">
                Cuatro momentos estelares diseñados para una noche inolvidable
              </p>
            </div>

            <div className="runway-bento-grid">
              {itinerary.map((step, index) => {
                const stageNumber = String(index + 1).padStart(2, "0");
                return (
                  <motion.article
                    key={step.id}
                    className={`runway-stage-card stage-${index + 1}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, delay: index * 0.12 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="stage-card-top">
                      <span className="stage-giant-number">{stageNumber}</span>
                      <div className="stage-icon-frame">
                        {getItineraryIcon(step.icon)}
                      </div>
                    </div>

                    <div className="stage-meta-row">
                      <span className="stage-time-gold">
                        <Clock size={13} />
                        {step.time}
                      </span>
                      <span className="stage-venue-pill">{step.badge}</span>
                    </div>

                    <h3 className="stage-title">{step.title}</h3>
                    <p className="stage-description">{step.description}</p>

                    <div className="stage-bottom-accent" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 4. SIDE-BY-SIDE VIP VENUE TICKETS ================= */}
        <section id="locations" className="venue-tickets-section">
          <div className="gala-container">
            <div className="gala-section-header">
              <span className="gala-eyebrow">
                VIP ACCESS PASSES • DÓNDE &amp; CUÁNDO
              </span>
              <h2 className="gala-serif-title">Sedes de la Celebración</h2>
              <p className="gala-section-subtitle">
                {quinceanera.dateFullText}
              </p>
            </div>

            <div className="venue-tickets-grid">
              {locations.map((loc, idx) => (
                <motion.article
                  key={loc.id}
                  className="vip-venue-ticket"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="venue-ticket-header">
                    <div className="ticket-type-tag">
                      <Ticket size={14} />
                      <span>PASE 0{idx + 1} • {loc.type}</span>
                    </div>
                    <div className="ticket-icon-medal">
                      {loc.icon === "church" ? (
                        <Church size={22} />
                      ) : (
                        <MapPin size={22} />
                      )}
                    </div>
                  </div>

                  <div className="venue-ticket-body">
                    <h3 className="venue-ticket-title">{loc.title}</h3>

                    <div className="venue-address-block">
                      <strong className="venue-place-name">{loc.place}</strong>
                      <span className="venue-street">{loc.address}</span>
                    </div>

                    <p className="venue-ticket-desc">{loc.description}</p>
                  </div>

                  <div className="venue-ticket-perforation" aria-hidden="true">
                    <span className="notch left" />
                    <span className="perforated-gold-line" />
                    <span className="notch right" />
                  </div>

                  <div className="venue-ticket-stub">
                    <div className="stub-time-box">
                      <span className="stub-time-label">HORA DE CITA</span>
                      <strong className="stub-time-val">
                        <Clock size={15} />
                        {loc.time}
                      </strong>
                    </div>

                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ticket-map"
                    >
                      <Navigation size={15} />
                      <span>Ver en Google Maps</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. MASONRY / FILMSTRIP COUTURE GALLERY ================= */}
        <section id="gallery" className="couture-gallery-section">
          <div className="gala-container">
            <div className="gala-section-header">
              <span className="gala-eyebrow">
                VOGUE ARCHIVE • SESIÓN EDITORIAL
              </span>
              <h2 className="gala-serif-title">Galería de Alta Costura</h2>
              <p className="gala-section-subtitle">
                Haz clic en cualquier retrato para abrir la vista de galería en
                pantalla completa
              </p>
            </div>

            <div className="filmstrip-sprocket-bar" aria-hidden="true">
              <span>FILM 35MM • KODAK GOLD 400</span>
              <div className="sprocket-holes">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <span>FRAME 01 — 04</span>
            </div>

            <div className="couture-masonry-grid">
              {gallery.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  className={`couture-photo-card item-${index + 1}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.12, duration: 0.65 }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="couture-photo-frame">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="couture-photo-img"
                    />
                    <div className="couture-photo-overlay">
                      <div className="overlay-top-bar">
                        <span className="photo-index-num">
                          0{index + 1} / 0{gallery.length}
                        </span>
                        <span className="photo-editorial-tag">{photo.tag}</span>
                      </div>

                      <div className="overlay-bottom-bar">
                        <div className="overlay-caption-text">
                          <strong>{photo.title}</strong>
                          <span>{photo.caption}</span>
                        </div>
                        <div className="photo-expand-btn">
                          <Expand size={17} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. GOLD ENVELOPE GIFTS ================= */}
        <section id="gifts" className="vip-lounge-section">
          <div className="gala-container">
            <div
              className="vip-lounge-grid"
              style={
                !hasAccessControl
                  ? {
                      gridTemplateColumns: "minmax(0, 680px)",
                      justifyContent: "center",
                    }
                  : undefined
              }
            >
              <motion.div
                className="vip-dresscode-gifts-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75 }}
              >
                <div className="gifts-editorial-box">
                  <div className="gifts-crest-icon">
                    <Gift size={26} />
                  </div>
                  <span className="gala-eyebrow">{gifts.title}</span>
                  <h3 className="gifts-serif-heading">{gifts.subtitle}</h3>
                  <p className="gifts-editorial-text">{gifts.message}</p>

                  <motion.div
                    className={`gold-foil-envelope ${
                      envelopeFlipped ? "opened" : ""
                    }`}
                    onClick={() => setEnvelopeFlipped(!envelopeFlipped)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="foil-envelope-header">
                      <Sparkles size={16} />
                      <span>BUZÓN DE SOBRES EN RECEPCIÓN</span>
                      <Crown size={16} />
                    </div>
                    <p className="foil-envelope-sub">
                      {envelopeFlipped
                        ? `✨ ${gifts.note || "¡Gracias por ser parte de esta noche mágica!"}`
                        : "Toca el sobre dorado para descubrir el detalle de cortesía"}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {hasAccessControl && (
                <AccessControlSection
                  data={data}
                  onConfetti={fireGoldGalaConfetti}
                  themeVariant="gala"
                />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER DE ESTUDIO ================= */}
      <footer className="gala-studio-footer">
        <div className="gala-container">
          <div className="gala-footer-inner">
            <div className="footer-brand-lockup">
              <span className="footer-monogram">[ {monogramLetter} • XV ]</span>
              <p className="footer-crafted">
                Diseño Digital de Alta Costura por{" "}
                <strong>{studio.name}</strong>
              </p>
            </div>

            <div className="footer-social-row">
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
            className="gala-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              className="gala-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar vista ampliada"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              className="gala-lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + gallery.length) % gallery.length
                );
              }}
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={26} />
            </button>

            <motion.div
              key={lightboxIndex}
              className="gala-lightbox-frame"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightboxIndex].src}
                alt={gallery[lightboxIndex].title}
              />
              <div className="gala-lightbox-meta">
                <span className="lightbox-tag">
                  0{lightboxIndex + 1} • {gallery[lightboxIndex].tag}
                </span>
                <strong>{gallery[lightboxIndex].title}</strong>
                <span>{gallery[lightboxIndex].caption}</span>
              </div>
            </motion.div>

            <button
              type="button"
              className="gala-lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % gallery.length);
              }}
              aria-label="Siguiente fotografía"
            >
              <ChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
