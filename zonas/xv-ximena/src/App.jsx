import React, { useState, useEffect, useRef } from "react";
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
  Send,
  Instagram,
  Facebook,
  Phone,
  Expand,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Navigation,
  Users,
  Disc3,
  Star,
  MailOpen,
  Mail,
} from "lucide-react";
import { INVITATION_DATA } from "./data/invitationData";
import FloatingButterflies from "./components/FloatingButterflies";
import EnvelopeIntro from "./components/EnvelopeIntro";

const ROMAN_NUMERALS = ["I", "II", "III", "IV"];

const GUEST_DRESS_SWATCHES = [
  { name: "Borgoña Imperial", hex: "#5e2538" },
  { name: "Champagne Dorado", hex: "#d8a47f" },
  { name: "Azul Medianoche", hex: "#1f2a44" },
  { name: "Esmeralda Real", hex: "#1f4e3d" },
  { name: "Bronce Antiguo", hex: "#6b4c3e" },
];

function getCountdownParts(targetISO) {
  const now = new Date().getTime();
  const target = new Date(targetISO).getTime();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

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

export default function App() {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } =
    INVITATION_DATA;

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(quinceanera.dateISO)
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  // RSVP Smart Form State
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("si");
  const [guestWish, setGuestWish] = useState(
    `¡Muchas felicidades ${quinceanera.name}! Ahí estaremos para celebrar contigo este sueño hecho realidad.`
  );
  const [rsvpSent, setRsvpSent] = useState(false);

  const audioRef = useRef(null);
  const monogramLetter = (quinceanera?.name || "X").charAt(0).toUpperCase();
  const quoteText = quinceanera.welcomeQuote || "";
  const firstQuoteChar = quoteText.charAt(0);
  const restQuoteText = quoteText.slice(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(quinceanera.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [quinceanera.dateISO]);

  // Keyboard navigation for Lightbox
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
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `${quinceanera.title} — ${quinceanera.name}`
    );
    const locSummary = locations
      .map((l) => `${l.type}: ${l.time} en ${l.place} (${l.address})`)
      .join(" | ");
    const details = encodeURIComponent(locSummary);
    const location = encodeURIComponent(
      locations[0]?.address || "Escape de Lagunillas, Puebla, México"
    );
    const dates = "20261226T180000Z/20261227T050000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    fireRoyalRoseConfetti();
    setRsvpSent(true);

    const cleanName = guestName.trim() || "Familia Invitada";
    const statusText =
      attendance === "si"
        ? `✅ *Confirmo asistencia* (${guestCount} ${
            guestCount === "1" ? "persona" : "personas"
          })`
        : `❌ *No podré asistir*, pero te envío un fuerte abrazo`;

    const text = [
      `👑 *CONFIRMACIÓN XV AÑOS ${quinceanera.name.toUpperCase()} (${quinceanera.dateDisplay})*`,
      `Hola, soy *${cleanName}*.`,
      statusText,
      guestWish.trim() ? `💌 *Mensaje:* "${guestWish.trim()}"` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://api.whatsapp.com/send?phone=${
      quinceanera.whatsappNumber
    }&text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 450);
  };

  return (
    <div className="royal-palace-app-shell">
      <audio ref={audioRef} src={quinceanera.audioUrl} loop preload="auto" />

      {/* Fondo Animado Temático (Seda Porcelana + Pétalos + Bokeh Rose-Gold + Mariposas) */}
      <FloatingButterflies />

      {/* Apertura 3D Multi-Etapa: Sobre de Seda y Puertas Filigrana de Palacio */}
      {!envelopeOpen && (
        <EnvelopeIntro
          onOpen={handleOpenInvitation}
          quinceanera={quinceanera}
        />
      )}

      {/* ================= STICKY EDITORIAL MASTHEAD BAR ================= */}
      <header className="royal-masthead-nav">
        <div className="royal-masthead-inner">
          <a href="#hero" className="royal-masthead-monogram">
            <Crown size={14} className="masthead-crown-icon" />
            <span>[ {monogramLetter} • XV ]</span>
          </a>

          <div className="royal-masthead-issue-pill">
            <span>THE QUINCEAÑERA POST • VOL. XV</span>
          </div>

          <nav
            className="royal-masthead-links"
            aria-label="Secciones de la invitación"
          >
            <a href="#hero">Portada</a>
            <a href="#honor">Corte de Honor</a>
            <a href="#locations">Sedes</a>
            <a href="#itinerary">Programa</a>
            <a href="#gallery">Editorial</a>
            <a href="#rsvp">Confirmar</a>
          </nav>

          <button
            type="button"
            onClick={toggleAudio}
            className={`royal-masthead-audio-btn ${isPlaying ? "playing" : ""}`}
            aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
          >
            <div className="masthead-eq-bars" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span className="masthead-audio-label">
              {isPlaying ? "ON AIR" : "MÚSICA"}
            </span>
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL DE LA INVITACIÓN */}
      <main className="royal-invitation-main">
        {/* ================= 1. HERO SECTION — THE QUINCEAÑERA POST FRONT PAGE ================= */}
        <section id="hero" className="royal-hero-section">
          <div className="royal-container">
            <motion.div
              className="gazette-frontpage-sheet"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              {/* Newspaper Edition Top Masthead Strip */}
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

              {/* Asymmetric 2-Column Editorial Grid */}
              <div className="gazette-hero-two-col">
                {/* LEFT COLUMN: Editorial Lead, Script Name & Gramophone Vinyl Player */}
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

                  {/* Editorial Pull-Quote with Illuminated Drop Cap */}
                  <blockquote className="gazette-editorial-pullquote">
                    <span className="editorial-dropcap">{firstQuoteChar}</span>
                    <span className="editorial-quote-body">
                      {restQuoteText}
                    </span>
                  </blockquote>

                  {/* Interactive Rose-Gold Gramophone / Vinyl Disc Player */}
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

                {/* RIGHT COLUMN: Royal Versailles Arch Portrait Frame */}
                <div className="gazette-hero-right-col">
                  <motion.div
                    className="versailles-arch-portrait-stage"
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {/* Rotating Celestial Rose-Gold Halo Ring */}
                    <div
                      className="versailles-celestial-halo"
                      aria-hidden="true"
                    />

                    {/* Corner Filigree SVG Ornaments */}
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

                    {/* Double Rose-Gold Arch Frame */}
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

                    {/* Floating Save The Date Medallion */}
                    <div className="versailles-floating-medallion">
                      <Crown size={14} className="medallion-crown" />
                      <span>SAVE THE DATE • {quinceanera.dateDisplay}</span>
                      <Star size={12} className="medallion-crown" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* BOTTOM OF HERO: Integrated Royal Palace Horology Countdown Strip */}
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
              {/* Royal Wax Monogram Seal Divider */}
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

              {/* 2-Column Royal Honor Block */}
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

        {/* ================= 3. SEDES REALES — MISA & RECEPCIÓN ================= */}
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

                  {/* Perforated Rose-Gold Divider with Side Notches */}
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

        {/* ================= 4. CRÓNICA DE UNA NOCHE MÁGICA — ITINERARIO ================= */}
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

        {/* ================= 5. EDICIÓN IMPRESA "THE QUINCEAÑERA POST" — GALERÍA ================= */}
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

        {/* ================= 6. PROTOCOLO REAL (VESTIMENTA + LLUVIA DE SOBRES) & RSVP ================= */}
        <section id="rsvp" className="royal-salon-rsvp-section">
          <div className="royal-container">
            <div className="royal-section-header">
              <span className="royal-section-eyebrow">
                PROTOCOLO DE PALACIO &amp; PASE DE LISTA
              </span>
              <h2 className="royal-section-script-title">
                Etiqueta, Regalos y Confirmación
              </h2>
              <p className="royal-section-subtitle">
                Tu presencia es el mayor honor en esta celebración real
              </p>
            </div>

            <div className="royal-salon-two-col-grid">
              {/* LEFT COLUMN: Dress Code + Interactive 3D Lluvia de Sobres */}
              <div className="royal-protocol-left-stack">
                {/* Dress Code Card */}
                <motion.div
                  className="royal-dresscode-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="protocol-card-kicker">
                    <Crown size={15} />
                    <span>CÓDIGO DE VESTIMENTA • ETIQUETA REAL</span>
                  </div>

                  <h3 className="protocol-card-title">Formal / Gala</h3>
                  <p className="protocol-card-desc">
                    Te invitamos a lucir elegante para una velada mágica.
                    Sugerimos los siguientes tonos de gala para nuestros
                    invitados:
                  </p>

                  {/* Suggested Guest Color Swatches */}
                  <div className="dresscode-swatches-row">
                    {GUEST_DRESS_SWATCHES.map((swatch) => (
                      <div key={swatch.name} className="dresscode-swatch-item">
                        <span
                          className="swatch-circle"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="swatch-label">{swatch.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Reserved Color Notice for Quinceañera */}
                  <div className="reserved-blush-notice">
                    <div className="reserved-swatch-badge">
                      <Crown size={14} />
                    </div>
                    <div className="reserved-notice-copy">
                      <strong>
                        Color Reservado para {quinceanera.name}: Rosa Princesa /
                        Blush
                      </strong>
                      <span>
                        Agradecemos reservar todas las tonalidades de rosa claro
                        y blush exclusivamente para la Quinceañera.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Interactive 3D Rose-Gold Envelope for Lluvia de Sobres */}
                <motion.div
                  id="gifts"
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
                            ? "Recepción • Auditorio Ejidal"
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

              {/* RIGHT COLUMN: Smart WhatsApp RSVP Registry Form */}
              <motion.div
                className="royal-rsvp-registry-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <div className="rsvp-registry-top-stamp">
                  <div className="stamp-crown-circle">
                    <Crown size={18} />
                  </div>
                  <div>
                    <span className="rsvp-stamp-kicker">
                      REGISTRO OFICIAL DE INVITADOS
                    </span>
                    <h3 className="rsvp-stamp-title">
                      Confirmación de Asistencia
                    </h3>
                  </div>
                </div>

                <p className="rsvp-registry-lead">
                  Para nosotros es un honor contar contigo en esta fecha tan
                  especial. Confirma tu asistencia por WhatsApp en segundos:
                </p>

                <form
                  onSubmit={handleRsvpSubmit}
                  className="royal-rsvp-form"
                >
                  <div className="royal-form-field">
                    <label htmlFor="guestName">
                      Tu Nombre o Familia Invitada
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      placeholder="Ej. Familia García Hernández"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="royal-form-row-two">
                    <div className="royal-form-field">
                      <label htmlFor="attendance">
                        ¿Podrás acompañarnos?
                      </label>
                      <select
                        id="attendance"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                      >
                        <option value="si">¡Sí, ahí estaremos! ✨</option>
                        <option value="no">No podremos asistir 😢</option>
                      </select>
                    </div>

                    <div className="royal-form-field">
                      <label htmlFor="guestCount">
                        <Users size={14} /> Personas confirmadas
                      </label>
                      <select
                        id="guestCount"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        disabled={attendance === "no"}
                      >
                        <option value="1">1 Persona</option>
                        <option value="2">2 Personas</option>
                        <option value="3">3 Personas</option>
                        <option value="4">4 Personas</option>
                        <option value="5">5+ Personas (Familia)</option>
                      </select>
                    </div>
                  </div>

                  <div className="royal-form-field">
                    <label htmlFor="guestWish">
                      Dedicatoria para {quinceanera.name} (Opcional)
                    </label>
                    <textarea
                      id="guestWish"
                      rows={3}
                      value={guestWish}
                      onChange={(e) => setGuestWish(e.target.value)}
                    />
                  </div>

                  <div className="rsvp-ticket-preview-bar">
                    <span>PASE REAL:</span>
                    <strong>
                      {guestName.trim() || "Familia Invitada"} •{" "}
                      {attendance === "si"
                        ? `${guestCount} ${
                            guestCount === "1" ? "Persona" : "Personas"
                          }`
                        : "Envía Felicitación"}
                    </strong>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-royal-whatsapp-submit"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.975 }}
                  >
                    {rsvpSent ? <Check size={20} /> : <Send size={20} />}
                    <span>
                      {rsvpSent
                        ? "¡Confirmación Lista! Abrir WhatsApp"
                        : "Confirmar Asistencia por WhatsApp"}
                    </span>
                  </motion.button>
                </form>
              </motion.div>
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
