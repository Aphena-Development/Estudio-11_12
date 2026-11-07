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
} from "lucide-react";
import { INVITATION_DATA } from "./data/invitationData";
import FloatingButterflies from "./components/FloatingButterflies";
import EnvelopeIntro from "./components/EnvelopeIntro";

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
    "¡Muchas felicidades Ximena! Ahí estaremos para celebrar contigo."
  );
  const [rsvpSent, setRsvpSent] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(quinceanera.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [quinceanera.dateISO]);

  const fireLuxuryConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 68,
      origin: { y: 0.65 },
      colors: ["#d46a8c", "#f7bfd0", "#d4a373", "#fff0f5", "#9e2a4b"],
    });
  };

  const handleOpenInvitation = () => {
    setEnvelopeOpen(true);
    fireLuxuryConfetti();
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
    const title = encodeURIComponent("Mis XV Años — Ximena");
    const details = encodeURIComponent(
      "Misa 12:00 PM en Parroquia Santa María de Guadalupe y Recepción 3:00 PM en Auditorio Ejidal, Escape de Lagunillas, Puebla."
    );
    const location = encodeURIComponent("Escape de Lagunillas, Puebla, México");
    const dates = "20261226T180000Z/20261227T050000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    fireLuxuryConfetti();
    setRsvpSent(true);

    const cleanName = guestName.trim() || "Familia Invitada";
    const statusText =
      attendance === "si"
        ? `✅ *Confirmo asistencia* (${guestCount} ${
            guestCount === "1" ? "persona" : "personas"
          })`
        : `❌ *No podré asistir*, pero te envío un fuerte abrazo`;

    const text = [
      `👑 *CONFIRMACIÓN XV AÑOS XIMENA (26.12.26)*`,
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
    <div className="invitation-app-shell">
      <audio ref={audioRef} src={quinceanera.audioUrl} loop preload="auto" />

      {/* Fondo Animado Temático (Seda Aurora + Pétalos + Bokeh Dorado + Mariposas) */}
      <FloatingButterflies />

      {/* Sobre Interactivo de Apertura */}
      {!envelopeOpen && (
        <EnvelopeIntro
          onOpen={handleOpenInvitation}
          quinceanera={quinceanera}
        />
      )}

      {/* Botón Flotante de Música */}
      <motion.button
        type="button"
        onClick={toggleAudio}
        className={`floating-music-fab ${isPlaying ? "playing" : ""}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
      >
        <div className="fab-Soundbars">
          <span />
          <span />
          <span />
          <span />
        </div>
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        <span className="fab-label">
          {isPlaying ? "Música Activa" : "Reproducir Canción"}
        </span>
      </motion.button>

      {/* CONTENIDO PRINCIPAL DE LA INVITACIÓN */}
      <main className="invitation-main">
        {/* ================= 1. HERO SECTION ================= */}
        <section id="hero" className="hero-section">
          <div className="section-container">
            <motion.div
              className="hero-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            >
              <motion.div
                className="hero-crown-wrap"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Crown size={38} strokeWidth={1.5} />
              </motion.div>

              <div className="hero-title-lockup">
                <span className="hero-mis">MIS</span>
                <span className="hero-15">15</span>
                <span className="hero-anos">AÑOS</span>
              </div>

              <div className="hero-divider-gold">
                <span className="line" />
                <Sparkles size={16} />
                <span className="line" />
              </div>

              {/* Retrato Circular con Halo Dorado y Foto Real de Ximena */}
              <motion.div
                className="hero-portrait-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="portrait-halo-ring" />
                <img
                  src={quinceanera.heroImage}
                  alt="Ximena - Save The Date 26.12.26"
                  className="hero-portrait-img"
                />
                <div className="portrait-newspaper-pill">
                  <span>SAVE THE DATE • {quinceanera.dateDisplay}</span>
                </div>
              </motion.div>

              <motion.h1
                className="hero-quince-name"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {quinceanera.name}
              </motion.h1>

              <p className="hero-date-subtitle">{quinceanera.dateFullText}</p>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. MENSAJE EMOTIVO + MÚSICA ================= */}
        <section id="welcome" className="welcome-section">
          <div className="section-container">
            <motion.div
              className="parchment-glass-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75 }}
            >
              <Sparkles className="quote-sparkle-icon" size={24} />
              <blockquote className="welcome-quote">
                &ldquo;{quinceanera.welcomeQuote}&rdquo;
              </blockquote>

              {/* Reproductor Musical Interactivo */}
              <div className="inline-music-player">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`music-disc-btn ${isPlaying ? "spinning" : ""}`}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <div className="music-player-info">
                  <span className="music-kicker">REPRODUCE MI CANCIÓN</span>
                  <strong>{quinceanera.songTitle}</strong>
                  <div className={`equalizer-bars ${isPlaying ? "on" : ""}`}>
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="floral-ornament-divider" />

              <p className="formal-invite-lead">
                {quinceanera.invitationText}
              </p>

              <div className="formal-mis-15">
                <span>Mis</span>
                <div className="center-15-crown">
                  <Crown size={28} />
                  <strong>15</strong>
                </div>
                <span>Años</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= 3. CUENTA REGRESIVA EN VIVO ================= */}
        <section id="countdown" className="countdown-section">
          <div className="section-container">
            <motion.div
              className="countdown-glass-panel"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75 }}
            >
              <span className="section-eyebrow">RESERVA LA FECHA</span>
              <h2 className="countdown-date-banner">
                {quinceanera.dateDisplay}
              </h2>
              <p className="countdown-subtitle">Faltan exactamente...</p>

              <div className="countdown-boxes">
                {[
                  { label: "Días", value: countdown.days },
                  { label: "Horas", value: countdown.hours },
                  { label: "Minutos", value: countdown.minutes },
                  { label: "Segundos", value: countdown.seconds },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="countdown-unit-card"
                    whileHover={{ y: -4 }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={item.value}
                        className="countdown-number"
                        initial={{ y: -12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {String(item.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                    <span className="countdown-label">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddToCalendar}
                className="btn-calendar-pill"
              >
                <CalendarPlus size={18} />
                <span>Agendar el 26 de Diciembre en mi Calendario</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= 4. DONDE Y CUANDO (MISA Y RECEPCIÓN) ================= */}
        <section id="locations" className="locations-section">
          <div className="section-container">
            <div className="section-header-center">
              <span className="section-eyebrow">DÓNDE & CUÁNDO</span>
              <h2 className="section-script-heading">Ubicaciones del Evento</h2>
              <p className="section-desc">
                Escape de Lagunillas, Puebla • Sábado 26 de Diciembre de 2026
              </p>
            </div>

            <div className="locations-grid">
              {locations.map((loc, idx) => (
                <motion.article
                  key={loc.id}
                  className="location-luxury-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="location-icon-halo">
                    {loc.icon === "church" ? (
                      <Church size={30} />
                    ) : (
                      <MapPin size={30} />
                    )}
                  </div>

                  <span className="location-badge">{loc.type}</span>
                  <h3 className="location-card-title">{loc.title}</h3>

                  <div className="location-place-box">
                    <strong>{loc.place}</strong>
                    <span>{loc.address}</span>
                  </div>

                  <div className="location-time-chip">
                    <Clock size={16} />
                    <span>{loc.time}</span>
                  </div>

                  <p className="location-text">{loc.description}</p>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-location-map"
                  >
                    <Navigation size={17} />
                    <span>Ver Mapa en Google Maps</span>
                  </a>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. ITINERARIO INTERACTIVO ================= */}
        <section id="itinerary" className="itinerary-section">
          <div className="section-container">
            <div className="section-header-center">
              <span className="section-eyebrow">PROGRAMA DEL DÍA</span>
              <h2 className="section-script-heading">Itinerario</h2>
              <p className="section-desc">
                Cada momento ha sido planeado con ilusión para vivirlo junto a
                ti
              </p>
            </div>

            <div className="timeline-wrapper">
              <div className="timeline-center-line" />
              {itinerary.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="timeline-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: index * 0.1 }}
                >
                  <div className="timeline-icon-node">
                    {getItineraryIcon(step.icon)}
                  </div>

                  <div className="timeline-content-card">
                    <div className="timeline-card-top">
                      <span className="timeline-time">{step.time}</span>
                      <span className="timeline-place-pill">{step.badge}</span>
                    </div>
                    <h3 className="timeline-title">{step.title}</h3>
                    <p className="timeline-desc">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. GALERÍA EDITORIAL DE FOTOS ================= */}
        <section id="gallery" className="gallery-section">
          <div className="section-container">
            <div className="section-header-center">
              <span className="section-eyebrow">
                THE QUINCEAÑERA POST • EDICIÓN ESPECIAL
              </span>
              <h2 className="section-script-heading">Mi Galería de Fotos</h2>
              <p className="section-desc">
                Toca cualquier fotografía para verla en pantalla completa
              </p>
            </div>

            <div className="editorial-gallery-grid">
              {gallery.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  className="gallery-arch-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.12, duration: 0.65 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="gallery-img-wrapper">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="gallery-img"
                    />
                    <div className="gallery-hover-overlay">
                      <span className="gallery-tag">{photo.tag}</span>
                      <div className="gallery-zoom-icon">
                        <Expand size={18} />
                      </div>
                    </div>
                  </div>
                  <figcaption className="gallery-caption">
                    <strong>{photo.title}</strong>
                    <span>{photo.caption}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 7. LLUVIA DE SOBRES (REGALOS) ================= */}
        <section id="gifts" className="gifts-section">
          <div className="section-container">
            <motion.div
              className="gifts-luxury-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="gifts-icon-circle"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Gift size={32} />
              </motion.div>

              <span className="section-eyebrow">{gifts.title}</span>
              <h2 className="section-script-heading">Regalos</h2>

              <p className="gifts-message">{gifts.message}</p>

              <motion.div
                className={`interactive-cash-envelope ${
                  envelopeFlipped ? "revealed" : ""
                }`}
                onClick={() => setEnvelopeFlipped(!envelopeFlipped)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="cash-envelope-badge">
                  <Sparkles size={16} />
                  <span>{gifts.subtitle}</span>
                  <Heart size={16} />
                </div>
                <p className="cash-envelope-note">{gifts.note}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= 8. RSVP INTELIGENTE POR WHATSAPP ================= */}
        <section id="rsvp" className="rsvp-section">
          <div className="section-container">
            <motion.div
              className="rsvp-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <span className="section-eyebrow">CONFIRMACIÓN DE ASISTENCIA</span>
              <h2 className="section-script-heading">¡¡¡Te esperamos!!!</h2>
              <p className="section-desc">
                Para nosotros es muy importante contar contigo. Por favor
                confirma tu asistencia en menos de 15 segundos:
              </p>

              <form onSubmit={handleRsvpSubmit} className="rsvp-smart-form">
                <div className="form-group">
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

                <div className="form-row-two">
                  <div className="form-group">
                    <label htmlFor="attendance">¿Podrás acompañarnos?</label>
                    <select
                      id="attendance"
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                    >
                      <option value="si">¡Sí, ahí estaremos! ✨</option>
                      <option value="no">No podremos asistir 😢</option>
                    </select>
                  </div>

                  <div className="form-group">
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

                <div className="form-group">
                  <label htmlFor="guestWish">
                    Dedícale unas palabras a Ximena (Opcional)
                  </label>
                  <textarea
                    id="guestWish"
                    rows={2}
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-whatsapp-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {rsvpSent ? <Check size={20} /> : <Send size={20} />}
                  <span>
                    {rsvpSent
                      ? "¡Confirmación lista! Abrir WhatsApp"
                      : "Confirmar Asistencia por WhatsApp"}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER DE ESTUDIO ================= */}
      <footer className="studio-footer">
        <div className="section-container">
          <div className="studio-footer-card">
            <p className="studio-crafted-by">
              Elaborado por <strong>{studio.name}</strong>
            </p>
            <div className="studio-social-links">
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill"
              >
                <Instagram size={16} />
                <span>{studio.instagram}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill"
              >
                <Facebook size={16} />
                <span>{studio.facebook}</span>
              </a>
              <a
                href={studio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-pill highlight"
              >
                <Phone size={16} />
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
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
