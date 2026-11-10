"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send, Users, QrCode, Printer, Wallet } from "lucide-react";

/**
 * Componente modular de Control de Acceso / Confirmación.
 * - mode: "none" (por defecto) -> No renderiza nada (propuesta base sin registro de invitados).
 * - mode: "whatsapp" -> Confirmación directa por WhatsApp parametrizada (sin nombres hardcodeados).
 * - mode: "external-ticket" -> Punto de extensión listo para conectar con la futura API de Boletos QR / Wallet.
 */
export default function AccessControlSection({
  data,
  onConfetti,
  themeVariant = "royal",
}) {
  const accessControl = data?.accessControl || { mode: "none" };
  const mode = accessControl.mode || "none";
  const quinceanera = data?.quinceanera || {};

  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("si");
  const [guestWish, setGuestWish] = useState(
    accessControl.defaultWish ||
      `¡Muchas felicidades ${quinceanera.name || ""}! Ahí estaremos para celebrar este gran día.`
  );
  const [rsvpSent, setRsvpSent] = useState(false);

  if (mode === "none") {
    return null;
  }

  if (mode === "external-ticket") {
    const ticketPreview = accessControl.ticketPreview || null;
    if (!ticketPreview) return null;

    return (
      <section id="rsvp" className={`access-ticket-section theme-${themeVariant}`}>
        <div className="access-ticket-card">
          <div className="access-ticket-header">
            <QrCode size={22} />
            <div>
              <span>PASE DIGITAL DE ACCESO</span>
              <h3>{ticketPreview.guestLabel || "Invitado Especial"}</h3>
            </div>
          </div>
          <p className="access-ticket-meta">
            Lugares autorizados: <strong>{ticketPreview.passes?.allowed ?? 2}</strong>
            {ticketPreview.seating?.table ? ` • ${ticketPreview.seating.table}` : ""}
          </p>
          <div className="access-ticket-actions">
            {ticketPreview.actions?.printablePdfUrl && (
              <a
                href={ticketPreview.actions.printablePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ticket-action"
              >
                <Printer size={16} />
                <span>Imprimir Boleto PDF</span>
              </a>
            )}
            {ticketPreview.actions?.googleWalletSaveUrl && (
              <a
                href={ticketPreview.actions.googleWalletSaveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ticket-action"
              >
                <Wallet size={16} />
                <span>Guardar en Google Wallet</span>
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (onConfetti) onConfetti();
    setRsvpSent(true);

    const cleanName = guestName.trim() || "Familia Invitada";
    const statusText =
      attendance === "si"
        ? `✅ *Confirmo asistencia* (${guestCount} ${
            guestCount === "1" ? "persona" : "personas"
          })`
        : `❌ *No podré asistir*, pero envío mis mejores deseos`;

    const eventHeader = `${(quinceanera.title || "EVENTO").toUpperCase()} — ${(
      quinceanera.name || ""
    ).toUpperCase()}`;

    const text = [
      `✨ *CONFIRMACIÓN ${eventHeader} (${quinceanera.dateDisplay || ""})*`,
      `Hola, soy *${cleanName}*.`,
      statusText,
      guestWish.trim() ? `💌 *Mensaje:* "${guestWish.trim()}"` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const phone = accessControl.whatsappNumber || quinceanera.whatsappNumber || "";
    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      text
    )}`;

    setTimeout(() => {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }, 400);
  };

  return (
    <section id="rsvp" className={`optional-rsvp-section theme-${themeVariant}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="optional-rsvp-container"
      >
        <h3>Confirmación de Asistencia</h3>
        {accessControl.deadlineText && <p>{accessControl.deadlineText}</p>}
        <form onSubmit={handleRsvpSubmit} className="optional-rsvp-form">
          <label htmlFor="guestName">Nombre o Familia Invitada</label>
          <input
            id="guestName"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
          <label htmlFor="attendance">¿Podrás acompañarnos?</label>
          <select
            id="attendance"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            <option value="si">Sí, confirmo asistencia</option>
            <option value="no">No podré asistir</option>
          </select>
          <label htmlFor="guestCount">
            <Users size={14} /> Lugares confirmados
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
            <option value="5">5+ Personas</option>
          </select>
          <label htmlFor="guestWish">
            Dedicatoria para {quinceanera.name} (Opcional)
          </label>
          <textarea
            id="guestWish"
            rows={2}
            value={guestWish}
            onChange={(e) => setGuestWish(e.target.value)}
          />
          <button type="submit">
            {rsvpSent ? <Check size={18} /> : <Send size={18} />}
            <span>
              {rsvpSent
                ? "¡Confirmación Lista! Abrir WhatsApp"
                : "Confirmar por WhatsApp"}
            </span>
          </button>
        </form>
      </motion.div>
    </section>
  );
}
