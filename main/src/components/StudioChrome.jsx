"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Facebook,
  ArrowUpRight,
} from "lucide-react";
import { STUDIO_INFO } from "../data/studioInfo";

const HOME_SECTIONS = [
  { id: "inicio", num: "01", label: "Inicio" },
  { id: "portafolio", num: "02", label: "Sesiones" },
  { id: "invitaciones", num: "03", label: "Invitaciones" },
  { id: "experiencia", num: "04", label: "Estudio" },
  { id: "contacto", num: "05", label: "Contacto" },
];

export function StudioScrollNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const updateScrollTelemetry = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        docHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
          : 0;
      setScrollProgress(progress);

      if (!isHome) return;

      const viewportTrigger = window.innerHeight * 0.42;
      let currentId = "inicio";

      for (const sec of HOME_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTrigger) {
            currentId = sec.id;
          }
        }
      }
      setActiveSection(currentId);
    };

    updateScrollTelemetry();
    window.addEventListener("scroll", updateScrollTelemetry, { passive: true });
    window.addEventListener("resize", updateScrollTelemetry);
    return () => {
      window.removeEventListener("scroll", updateScrollTelemetry);
      window.removeEventListener("resize", updateScrollTelemetry);
    };
  }, [isHome]);

  const handleSectionSelect = (e, id) => {
    if (!isHome) return;
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* MENÚ LATERAL MINIMALISTA FLOTANTE (SOLO SECCIONES + LÍNEA DE AVANCE) */}
      <aside
        className="right-sidebar-rail"
        aria-label="Navegación lateral por secciones"
      >
        <nav className="rail-nav-list" aria-label="Secciones de la página">
          <div className="rail-track-line" aria-hidden="true">
            <div
              className="rail-track-fill"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          {HOME_SECTIONS.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            const threshold = (idx / (HOME_SECTIONS.length - 1)) * 100;
            const isPassed = scrollProgress >= threshold - 4;

            return (
              <Link
                key={sec.id}
                href={isHome ? `#${sec.id}` : `/#${sec.id}`}
                onClick={(e) => handleSectionSelect(e, sec.id)}
                className={`rail-node-btn ${isActive ? "is-active" : ""} ${
                  isPassed ? "is-passed" : ""
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="rail-node-text">
                  <span className="rail-node-num tabular">{sec.num}</span>
                  <span className="rail-node-label">{sec.label}</span>
                </span>
                <span className="rail-node-tick" aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export function StudioFooter() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="wrap">
        <div className="footer-visit-band" data-reveal="up">
          <div className="visit-heading-col">
            <span className="chapter-index tabular">05 / CONTACTO</span>
            <h2 className="visit-title">
              Visítanos en nuestro estudio en Atlixco o escríbenos para apartar
              la fecha de tu evento.
            </h2>
            <p className="visit-copy">
              Realizamos sesiones fotográficas previas, cobertura de ceremonia y
              recepción, e invitaciones digitales personalizadas en Atlixco y
              Puebla.
            </p>
            <div className="visit-cta-row">
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <MessageCircle size={17} aria-hidden="true" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <a
                href={STUDIO_INFO.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <MapPin size={17} aria-hidden="true" />
                <span>Cómo llegar al estudio</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="visit-details-grid">
            <div className="contact-block" data-reveal="fade-scale" style={{ transitionDelay: "80ms" }}>
              <h3 className="contact-label">Dirección en Atlixco</h3>
              <a
                href={STUDIO_INFO.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value-link"
              >
                <MapPin size={18} aria-hidden="true" className="contact-icon" />
                <span>
                  {STUDIO_INFO.address.street}
                  <br />
                  {STUDIO_INFO.address.city}, C.P.{" "}
                  {STUDIO_INFO.address.postalCode}
                </span>
              </a>
            </div>

            <div className="contact-block" data-reveal="fade-scale" style={{ transitionDelay: "160ms" }}>
              <h3 className="contact-label">Teléfono y WhatsApp</h3>
              <a
                href={STUDIO_INFO.phoneHref}
                className="contact-value-link tabular"
              >
                <Phone size={18} aria-hidden="true" className="contact-icon" />
                <span>{STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>

            <div className="contact-block" data-reveal="fade-scale" style={{ transitionDelay: "240ms" }}>
              <h3 className="contact-label">Correo Electrónico</h3>
              <a href={STUDIO_INFO.emailHref} className="contact-value-link">
                <Mail size={18} aria-hidden="true" className="contact-icon" />
                <span>{STUDIO_INFO.photographerEmail}</span>
              </a>
            </div>

            <div className="contact-block" data-reveal="fade-scale" style={{ transitionDelay: "320ms" }}>
              <h3 className="contact-label">Facebook Oficial</h3>
              <a
                href={STUDIO_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value-link"
              >
                <Facebook
                  size={18}
                  aria-hidden="true"
                  className="contact-icon"
                />
                <span>11.12 Estudio</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>
            © {new Date().getFullYear()} {STUDIO_INFO.name} • Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
