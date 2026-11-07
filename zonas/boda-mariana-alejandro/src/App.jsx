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
  Bell,
  BookOpen,
} from "lucide-react";
import { INVITATION_DATA } from "./data/invitationData";
import FloatingButterflies from "./components/FloatingButterflies";
import EnvelopeIntro from "./components/EnvelopeIntro";

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

export default function App() {
  const { quinceanera, locations, itinerary, gallery, gifts, studio } =
    INVITATION_DATA;
  const court = INVITATION_DATA.court || DEFAULT_SACRAMENTAL_COURT;

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(() =>
    getCountdownParts(quinceanera.dateISO)
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);

  // RSVP State
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("si");
  const [guestWish, setGuestWish] = useState(
    "¡Muchas felicidades Mariana & Alejandro! Que Dios bendiga siempre su matrimonio. Ahí estaremos para acompañarlos."
  );
  const [rsvpSent, setRsvpSent] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(quinceanera.dateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [quinceanera.dateISO]);

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
      `${quinceanera.invitationText}. Misa 1:00 PM en Templo de Nuestra Señora de la Merced y Recepción 3:30 PM en Claustro Las Calandrias, Atlixco, Puebla.`
    );
    const location = encodeURIComponent("Atlixco, Puebla, México");
    const dates = "20270417T190000Z/20270418T050000Z";
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    fireCathedralConfetti();
    setRsvpSent(true);

    const cleanName = guestName.trim() || "Familia Invitada";
    const statusText =
      attendance === "si"
        ? `✅ *Confirmo nuestra asistencia* (${guestCount} ${
            guestCount === "1" ? "persona" : "personas"
          })`
        : `❌ *No podremos asistir*, pero los acompañamos con nuestras oraciones`;

    const text = [
      `🕊️ *CONFIRMACIÓN BODA MARIANA & ALEJANDRO*`,
      `📅 *Fecha:* ${quinceanera.dateFullText}`,
      `👤 *Invitado / Familia:* ${cleanName}`,
      statusText,
      guestWish.trim() ? `💌 *Felicitación:* "${guestWish.trim()}"` : "",
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
    <div className="cathedral-app-shell">
      <audio ref={audioRef} src={quinceanera.audioUrl} loop preload="auto" />

      {/* Fondo de Luz de Velas y Filigrana en Oro Antiguo */}
      <FloatingButterflies />

      {/* Tríptico Catedralicio de Apertura (Gatefold) */}
      {!envelopeOpen && (
        <EnvelopeIntro
          onOpen={handleOpenInvitation}
          quinceanera={quinceanera}
        />
      )}

      {/* Botón Flotante de Música Sacra / Vals */}
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

      {/* CONTENIDO PRINCIPAL: ARQUITECTURA CATEDRALICIA */}
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
              {/* Double-bordered antique gold ornamental frame with corner flourishes */}
              <div className="engraved-inner-border">
                <span className="corner-flourish tl" aria-hidden="true" />
                <span className="corner-flourish tr" aria-hidden="true" />
                <span className="corner-flourish bl" aria-hidden="true" />
                <span className="corner-flourish br" aria-hidden="true" />

                {/* Sacramental Crest & Monogram */}
                <div className="sacramental-crest-header">
                  <div className="crest-monogram-seal">
                    <span className="crest-letter">M</span>
                    <span className="crest-cross">✝</span>
                    <span className="crest-letter">A</span>
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

                {/* Monumental Script Names */}
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

                {/* Cathedral Gothic Arch Portrait */}
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

                {/* Classical Roman / Tabular Date Lockup */}
                <div className="roman-date-lockup">
                  <div className="roman-date-band">
                    <span className="roman-number">17</span>
                    <span className="roman-dot">•</span>
                    <span className="roman-month">ABRIL</span>
                    <span className="roman-dot">•</span>
                    <span className="roman-number">2027</span>
                  </div>
                  <p className="roman-location-caption">
                    {quinceanera.dateFullText} — ATLIXCO DE LAS FLORES, PUEBLA
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

              {/* Two-column Parents Honor Roll */}
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

              {/* Padrinos de Honor Section */}
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
              {/* Ornate Burgundy & Gold Music Bar */}
              <div className="sacred-music-bar">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`rosette-play-btn ${isPlaying ? "spinning" : ""}`}
                  aria-label={isPlaying ? "Pausar marcha nupcial" : "Escuchar marcha nupcial"}
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
                <div className={`sacred-sound-waves ${isPlaying ? "active" : ""}`}>
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
                  {quinceanera.dateFullText} • 1:00 PM
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
                <span>Reservar el 17 de Abril de 2027 en mi Calendario</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= 4. DIPTYQUE VENUE CARDS (TEMPLO & CLAUSTRO) ================= */}
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

        {/* ================= 5. SACRED ORDER OF THE DAY (ORDEN DEL DÍA) ================= */}
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
              <h2 className="cathedral-section-title">Presentes &amp; Bendiciones</h2>

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

        {/* ================= 8. FORMAL NUPTIAL WHATSAPP RSVP ================= */}
        <section id="rsvp" className="cathedral-rsvp-section">
          <div className="cathedral-container">
            <motion.div
              className="cathedral-rsvp-sheet"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
            >
              <div className="rsvp-sheet-inner">
                <span className="cathedral-eyebrow">
                  REGISTRO NUPCIAL DE INVITADOS
                </span>
                <h2 className="cathedral-section-title">
                  Confirmación de Asistencia
                </h2>
                <p className="cathedral-section-subtitle">
                  Para organizar con esmero nuestro banquete nupcial, agradeceremos
                  confirmar su presencia:
                </p>

                <form onSubmit={handleRsvpSubmit} className="cathedral-rsvp-form">
                  <div className="cathedral-field-group">
                    <label htmlFor="guestName">
                      Nombre Completo o Familia Invitada
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      placeholder="Ej. Familia Villaseñor Cortés"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="cathedral-form-row">
                    <div className="cathedral-field-group">
                      <label htmlFor="attendance">
                        ¿Nos honrarán con su presencia?
                      </label>
                      <select
                        id="attendance"
                        value={attendance}
                        onChange={(e) => setAttendance(e.target.value)}
                      >
                        <option value="si">
                          🕊️ Sí, asistiremos con mucho gusto
                        </option>
                        <option value="no">
                          Lo sentimos, no podremos asistir
                        </option>
                      </select>
                    </div>

                    <div className="cathedral-field-group">
                      <label htmlFor="guestCount">
                        <Users size={14} /> Lugares Reservados
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

                  <div className="cathedral-field-group">
                    <label htmlFor="guestWish">
                      Dedicatoria o Bendición para los Novios (Opcional)
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
                    className="btn-cathedral-whatsapp"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {rsvpSent ? <Check size={19} /> : <Send size={19} />}
                    <span>
                      {rsvpSent
                        ? "¡Confirmación Lista! Enviar por WhatsApp"
                        : "Confirmar Asistencia por WhatsApp"}
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ================= COLOFÓN DE ESTUDIO ================= */}
      <footer className="cathedral-footer">
        <div className="cathedral-container">
          <div className="cathedral-footer-card">
            <span className="footer-monogram">M ✝ A</span>
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
