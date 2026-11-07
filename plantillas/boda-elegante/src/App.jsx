import React, { useState, useEffect, useRef } from "react";
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
  Compass,
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

export default function App() {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } =
    INVITATION_DATA;

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(quinceanera.dateISO)
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [giftBoxOpen, setGiftBoxOpen] = useState(false);

  // RSVP Smart Wedding Form State
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("si");
  const [guestWish, setGuestWish] = useState(
    "¡Muchas felicidades Valeria y Sebastián! Con mucha alegría los acompañaremos en su boda."
  );
  const [rsvpSent, setRsvpSent] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(quinceanera.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [quinceanera.dateISO]);

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
    const title = encodeURIComponent(`Nuestra Boda — ${quinceanera.name}`);
    const details = encodeURIComponent(
      "Ceremonia Civil 4:00 PM en Patio de los Olivos y Banquete Nupcial 5:30 PM en Jardín Mayor, Hacienda Santo Cristo, Atlixco, Puebla."
    );
    const location = encodeURIComponent(
      "Hacienda Santo Cristo, Paseo de las Bugambilias, Atlixco, Puebla, México"
    );
    const dates = "20270214T220000Z/20270215T080000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    fireBotanicalConfetti();
    setRsvpSent(true);

    const cleanName = guestName.trim() || "Familia Invitada";
    const statusText =
      attendance === "si"
        ? `✅ *Confirmo asistencia a la boda* (${guestCount} ${
            guestCount === "1" ? "lugar confirmado" : "lugares confirmados"
          })`
        : `❌ *No podremos asistir*, pero les enviamos nuestros mejores deseos en su matrimonio`;

    const text = [
      `💍 *CONFIRMACIÓN BODA VALERIA & SEBASTIÁN (${quinceanera.dateDisplay})*`,
      `Hola Valeria y Sebastián, somos *${cleanName}*.`,
      statusText,
      guestWish.trim() ? `🥂 *Mensaje para los novios:* "${guestWish.trim()}"` : "",
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

  const nameParts = quinceanera.name.includes("&")
    ? quinceanera.name.split("&").map((s) => s.trim())
    : [quinceanera.name, ""];

  const loveStoryMoments = [
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
      title: "14 . 02 . 27",
      text: "Bajo los olivos de Atlixco sellaremos nuestra promesa rodeados de las personas que más amamos.",
    },
  ];

  return (
    <div className="hacienda-wedding-shell">
      <audio ref={audioRef} src={quinceanera.audioUrl} loop preload="auto" />

      {/* Fondo Botánico de Papel Algodón, Hojas de Olivo y Rayos de Sol */}
      <FloatingButterflies />

      {/* Pórtico de Doble Arco de Hacienda (Intro Interactiva) */}
      {!envelopeOpen && (
        <EnvelopeIntro
          onOpen={handleOpenInvitation}
          quinceanera={quinceanera}
        />
      )}

      {/* Botón Flotante de Música (Salvia & Latón) */}
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

      {/* CONTENIDO PRINCIPAL ARQUITECTÓNICO & EDITORIAL */}
      <main className="hacienda-main-content">
        {/* ================= 1. ASYMMETRIC TWO-COLUMN EDITORIAL HERO ================= */}
        <section id="hero" className="editorial-hero-section">
          <div className="hacienda-container">
            <div className="editorial-hero-grid">
              {/* Columna Izquierda: Tipografía Editorial, Cita y Control de Audio */}
              <motion.div
                className="hero-editorial-left"
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              >
                <div className="hero-kicker-badge">
                  <span className="kicker-dot" />
                  <span>NUESTRA BODA • 14.02.27</span>
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
                  {quinceanera.dateFullText} • Hacienda Santo Cristo, Atlixco
                </p>

                <blockquote className="hero-editorial-quote">
                  <p>&ldquo;{quinceanera.welcomeQuote}&rdquo;</p>
                </blockquote>

                <p className="hero-parents-blessing">
                  {quinceanera.invitationText}
                </p>

                {/* Control de Audio Editorial + Acceso Rápido a RSVP */}
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

                  <a href="#rsvp" className="btn-hero-rsvp-link">
                    <span>Confirmar Asistencia</span>
                  </a>
                </div>
              </motion.div>

              {/* Columna Derecha: Arco Mediterráneo Alto + Insignia Flotante */}
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

                {/* Insignia Flotante de Fecha sobre el Arco */}
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

                {/* Sello de Monograma Lateral */}
                <div className="arch-corner-monogram" aria-hidden="true">
                  <span>V&amp;S</span>
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
                  { label: "DÍAS", sub: "Para el gran día", value: countdown.days },
                  { label: "HORAS", sub: "De ilusión", value: countdown.hours },
                  { label: "MINUTOS", sub: "Por compartir", value: countdown.minutes },
                  { label: "SEGUNDOS", sub: "Latidos", value: countdown.seconds },
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
                Hacienda Santo Cristo • Atlixco, Puebla
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
                  {/* Cabecera en Arco Colonial */}
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

                  {/* Cuerpo Arquitectónico de la Tarjeta */}
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

            {/* Franja Horizontal de Historia de Amor */}
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

            {/* Programa Horizontal de 4 Pasos con Divisores Botánicos */}
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
                    <span className="program-step-number">
                      0{index + 1}
                    </span>
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
                  {/* Cinta adhesiva de papel arroz */}
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
              {/* Tarjeta de Cofre / Sobre de Luna de Miel */}
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
                      ? "En la entrada del Jardín Mayor contaremos con un cofre de madera y sobres de papel algodón para quienes deseen contribuir a nuestra luna de miel por el Mediterráneo."
                      : "Su presencia en este día tan especial es el mejor regalo que podemos recibir."}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= 7. SMART WHATSAPP WEDDING RSVP ================= */}
        <section id="rsvp" className="wedding-rsvp-section">
          <div className="hacienda-container">
            <motion.div
              className="wedding-rsvp-architectural-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="rsvp-arch-header">
                <span className="editorial-index">
                  05 / CONFIRMACIÓN DE ASISTENCIA • R.S.V.P.
                </span>
                <h2 className="editorial-serif-title">
                  Acompáñanos a Celebrar
                </h2>
                <p className="editorial-subtitle">
                  Por favor confirma tu asistencia antes del 20 de Enero de 2027
                  para reservar tus lugares en la hacienda
                </p>
                <BotanicalDivider />
              </div>

              <form onSubmit={handleRsvpSubmit} className="wedding-rsvp-form">
                <div className="rsvp-field-group">
                  <label htmlFor="guestName">
                    NOMBRE COMPLETO O FAMILIA INVITADA
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    placeholder="Ej. Familia Morales Valencia"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>

                <div className="rsvp-two-cols">
                  <div className="rsvp-field-group">
                    <label htmlFor="attendance">¿PODRÁN ACOMPAÑARNOS?</label>
                    <select
                      id="attendance"
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                    >
                      <option value="si">
                        ¡Sí, con mucho gusto asistiremos! 🥂
                      </option>
                      <option value="no">
                        No podremos asistir, les enviamos nuestro cariño 🤍
                      </option>
                    </select>
                  </div>

                  <div className="rsvp-field-group">
                    <label htmlFor="guestCount">
                      <Users size={14} /> LUGARES A CONFIRMAR
                    </label>
                    <select
                      id="guestCount"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      disabled={attendance === "no"}
                    >
                      <option value="1">1 Persona (Individual)</option>
                      <option value="2">2 Personas (Pareja)</option>
                      <option value="3">3 Personas</option>
                      <option value="4">4 Personas</option>
                      <option value="5">5+ Personas (Familia)</option>
                    </select>
                  </div>
                </div>

                <div className="rsvp-field-group">
                  <label htmlFor="guestWish">
                    DEDÍCALES UN MENSAJE A VALERIA &amp; SEBASTIÁN (OPCIONAL)
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
                  className="btn-wedding-whatsapp-rsvp"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {rsvpSent ? <Check size={19} /> : <Send size={19} />}
                  <span>
                    {rsvpSent
                      ? "Confirmación Lista • Enviar por WhatsApp"
                      : "Enviar Confirmación Nupcial por WhatsApp"}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER DE ESTUDIO ================= */}
      <footer className="hacienda-studio-footer">
        <div className="hacienda-container">
          <div className="footer-architectural-inner">
            <div className="footer-couple-signoff">
              <span className="signoff-monogram">V &amp; S</span>
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
