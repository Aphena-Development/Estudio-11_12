"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Camera,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
  Expand,
} from "lucide-react";
import { getPortfolioInvitations } from "../content/invitations";
import { STUDIO_INFO } from "../data/studioInfo";
import { StudioScrollNav, StudioFooter } from "../components/StudioChrome";

const invitationsData = getPortfolioInvitations();

export default function StudioHomePage() {
  const featuredInvitation = invitationsData[0];

  // Minimalist Independent Carousel State (Exclusive per clicked session)
  const [activeSessionIndex, setActiveSessionIndex] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Rich Scroll-Driven Choreography (IntersectionObserver + Continuous Scroll Progress)
  useEffect(() => {
    let rafId = null;

    const updateScrollMotion = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      const parallaxNodes = document.querySelectorAll("[data-parallax]");
      const vh = window.innerHeight;

      parallaxNodes.forEach((node) => {
        const speed = parseFloat(node.getAttribute("data-parallax") || "0.08");
        const rect = node.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        const shift = -centerOffset * speed;
        node.style.setProperty("--parallax-y", `${shift.toFixed(1)}px`);
      });

      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollMotion);
      }
    };

    updateScrollMotion();
    window.addEventListener("scroll", onScroll, { passive: true });

    const revealElements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
            // Re-arm animation when element scrolls back below the viewport
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Keyboard Navigation for the Single-Session Minimalist Carousel
  useEffect(() => {
    if (activeSessionIndex === null) return;
    const currentSession = STUDIO_INFO.editorialShots[activeSessionIndex];
    const totalSlides = currentSession?.gallery?.length || 1;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveSessionIndex(null);
      } else if (e.key === "ArrowRight") {
        setActiveSlideIndex((prev) => (prev + 1) % totalSlides);
      } else if (e.key === "ArrowLeft") {
        setActiveSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSessionIndex]);

  const openSessionCarousel = (sessionIdx, slideIdx = 0) => {
    setActiveSessionIndex(sessionIdx);
    setActiveSlideIndex(slideIdx);
  };

  const closeCarousel = () => {
    setActiveSessionIndex(null);
  };

  const currentSession =
    activeSessionIndex !== null
      ? STUDIO_INFO.editorialShots[activeSessionIndex]
      : null;
  const currentSlides = currentSession?.gallery || [];
  const currentSlide = currentSlides[activeSlideIndex] || null;

  const nextSlide = () => {
    if (!currentSlides.length) return;
    setActiveSlideIndex((prev) => (prev + 1) % currentSlides.length);
  };

  const prevSlide = () => {
    if (!currentSlides.length) return;
    setActiveSlideIndex(
      (prev) => (prev - 1 + currentSlides.length) % currentSlides.length
    );
  };

  const heroParallax = Math.min(54, scrollY * 0.09);

  return (
    <div id="inicio" className="site-shell">
      <StudioScrollNav />

      <main id="main-content">
        {/* CAPÍTULO 01: HERO VANGUARDISTA ASIMÉTRICO */}
        <section className="section-hero avant-hero">
          <div className="wrap avant-hero-grid">
            <div className="avant-hero-copy">
              <div
                className="hero-studio-signature"
                data-reveal="fade-scale"
              >
                <span className="brand-mark" aria-hidden="true">
                  <Camera size={18} strokeWidth={1.75} />
                </span>
                <div className="brand-text">
                  <strong className="brand-name">{STUDIO_INFO.name}</strong>
                  <span className="brand-loc">
                    01 / ESTUDIO EN ATLIXCO, PUEBLA
                  </span>
                </div>
              </div>

              <h1
                className="display-title avant-display"
                data-reveal="mask-up"
                style={{ transitionDelay: "70ms" }}
              >
                Autoría visual y experiencias digitales para{" "}
                <em>XV años y bodas</em>.
              </h1>

              <p
                className="lead-paragraph"
                data-reveal="up"
                style={{ transitionDelay: "150ms" }}
              >
                Producimos sesiones fotográficas con estética de revista y
                diseñamos una invitación digital única para tu evento con música,
                apertura interactiva, mapas GPS y galería editorial de alta
                resolución.
              </p>

              <div
                className="action-row"
                data-reveal="up"
                style={{ transitionDelay: "220ms" }}
              >
                <a
                  href={STUDIO_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  <span>Cotizar paquete por WhatsApp</span>
                </a>

                <a href="#portafolio" className="btn btn-outline">
                  <span>Explorar sesiones fotográficas</span>
                </a>
              </div>

              <div
                className="scroll-divider-line"
                data-reveal="line"
                style={{ transitionDelay: "280ms" }}
              />

              <dl
                className="studio-facts-bar"
                data-reveal="up"
                style={{ transitionDelay: "330ms" }}
              >
                <div className="fact-item">
                  <dt>Estudio Físico</dt>
                  <dd>15 Oriente Número 4, Atlixco</dd>
                </div>
                <div className="fact-item">
                  <dt>Diseño Web</dt>
                  <dd>100% Único por Evento</dd>
                </div>
                <div className="fact-item">
                  <dt>Contacto Directo</dt>
                  <dd className="tabular">{STUDIO_INFO.phoneDisplay}</dd>
                </div>
              </dl>
            </div>

            <div className="avant-hero-visual" data-reveal="clip-left">
              <div
                className="avant-collage-stage"
                style={{
                  transform: `translate3d(0, ${-heroParallax}px, 0)`,
                }}
              >
                <button
                  type="button"
                  onClick={() => openSessionCarousel(0, 0)}
                  className="avant-primary-portrait"
                  aria-label="Abrir galería de sesión de Ximena"
                >
                  <img
                    src={STUDIO_INFO.editorialShots[0].src}
                    alt="Retrato editorial de quinceañera por 11.12 Estudio"
                    className="stage-img"
                  />
                  <span className="portrait-zoom-badge">
                    <Expand size={14} aria-hidden="true" />
                    <span>Ver sesión</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openSessionCarousel(2, 0)}
                  className="avant-secondary-portrait"
                  aria-label="Abrir galería de sesión de Valeria y Sebastián"
                >
                  <img
                    src={STUDIO_INFO.editorialShots[2].src}
                    alt="Fotografía de boda en hacienda de Atlixco"
                  />
                </button>

                {featuredInvitation && (
                  <div className="floating-live-card avant-live-dock">
                    <div className="live-card-info">
                      <span className="status-indicator">
                        Invitación destacada
                      </span>
                      <strong className="live-card-title">
                        {featuredInvitation.title}
                      </strong>
                      <span className="live-card-date tabular">
                        {featuredInvitation.dateFullText ||
                          featuredInvitation.dateDisplay}
                      </span>
                    </div>
                    <a
                      href={featuredInvitation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold btn-compact"
                    >
                      <span>Abrir invitación</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULO 02: SESIONES FOTOGRÁFICAS CON CARRUSEL MINIMALISTA INDIVIDUAL */}
        <section id="portafolio" className="section-block section-surface">
          <div className="wrap">
            <div className="section-head-split">
              <div data-reveal="mask-up">
                <span className="chapter-index tabular">
                  02 / ARCHIVO EDITORIAL
                </span>
                <h2 className="section-heading">
                  Sesiones fotográficas de autor en Atlixco y Puebla.
                </h2>
              </div>
              <p
                className="section-description"
                data-reveal="up"
                style={{ transitionDelay: "120ms" }}
              >
                Selecciona cualquier sesión para abrir su visor individual y
                recorrer sus fotografías en alta resolución.
              </p>
            </div>

            <div
              className="scroll-divider-line section-line-gap"
              data-reveal="line"
            />

            <div className="avant-sessions-grid">
              {STUDIO_INFO.editorialShots.map((shot, idx) => (
                <article
                  key={shot.id}
                  data-reveal={idx % 2 === 0 ? "clip-up" : "fade-scale"}
                  data-parallax={idx % 2 === 0 ? "0.03" : "-0.03"}
                  style={{ transitionDelay: `${(idx % 2) * 140}ms` }}
                  className="avant-session-card parallax-card"
                >
                  <button
                    type="button"
                    onClick={() => openSessionCarousel(idx, 0)}
                    className="session-card-trigger"
                    aria-label={`Ver sesión fotográfica ${shot.title}`}
                  >
                    <div className="tile-img-frame">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className="tile-img"
                      />
                      <div className="session-hover-veil">
                        <span className="session-count-pill tabular">
                          {shot.gallery.length} fotos
                        </span>
                        <span className="session-open-cta">
                          <Expand size={15} aria-hidden="true" />
                          <span>Ver galería</span>
                        </span>
                      </div>
                    </div>

                    <div className="tile-meta-row">
                      <div>
                        <span className="session-kicker">{shot.category}</span>
                        <h3 className="tile-title">{shot.title}</h3>
                      </div>
                      <span className="tile-sub">{shot.meta}</span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 03: INVITACIONES DIGITALES (CADA UNA CON DISEÑO ÚNICO + BOTÓN A /INVITACIONES) */}
        <section id="invitaciones" className="section-block">
          <div className="wrap">
            <div className="section-head-split">
              <div data-reveal="mask-up">
                <span className="chapter-index tabular">
                  03 / ARQUITECTURA DIGITAL
                </span>
                <h2 className="section-heading">
                  Cada invitación tiene un diseño único creado a la medida del
                  evento.
                </h2>
              </div>
              <div
                className="section-head-actions"
                data-reveal="up"
                style={{ transitionDelay: "120ms" }}
              >
                <p className="section-description">
                  Explora cuatro experiencias interactivas completamente
                  distintas entre sí: desde una edición de princesa con sobre de
                  lacre o una gala nocturna de revista, hasta una boda en
                  hacienda o un tríptico sacramental.
                </p>
                <Link href="/invitaciones" className="btn btn-gold">
                  <span>Ver todas las invitaciones</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div
              className="scroll-divider-line section-line-gap"
              data-reveal="line"
            />

            <div className="templates-showcase-grid">
              {invitationsData.map((inv, idx) => (
                <article
                  key={inv.slug}
                  data-reveal={idx % 2 === 0 ? "clip-left" : "clip-right"}
                  style={{ transitionDelay: `${(idx % 2) * 130}ms` }}
                  className="template-card avant-invite-card"
                >
                  <a
                    href={inv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="template-media-link"
                    aria-label={`Abrir invitación interactiva de ${inv.title}`}
                  >
                    <img
                      src={inv.coverImage}
                      alt={inv.title}
                      loading="lazy"
                      className="template-img"
                    />
                    <span className="template-category-tag">
                      {inv.eventType}
                    </span>
                  </a>

                  <div className="template-card-content">
                    <h3 className="template-card-title">{inv.title}</h3>
                    <p className="template-card-desc">{inv.subtitle}</p>

                    <div className="card-event-details">
                      {inv.dateFullText && (
                        <span className="event-detail-item tabular">
                          <Calendar size={15} aria-hidden="true" />
                          <span>{inv.dateFullText}</span>
                        </span>
                      )}
                      {inv.locationSummary && (
                        <span className="event-detail-item">
                          <MapPin size={15} aria-hidden="true" />
                          <span>{inv.locationSummary}</span>
                        </span>
                      )}
                    </div>

                    <div className="template-card-footer">
                      <a
                        href={inv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-full"
                      >
                        <span>Explorar experiencia interactiva</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CAPÍTULO 04: EXPERIENCIA INTEGRAL DEL ESTUDIO */}
        <section id="experiencia" className="section-block section-surface">
          <div className="wrap">
            <div className="section-head-split">
              <div data-reveal="mask-up">
                <span className="chapter-index tabular">
                  04 / PRODUCCIÓN INTEGRAL
                </span>
                <h2 className="section-heading">
                  De la sesión fotográfica previa a la invitación en el celular
                  de tus invitados.
                </h2>
              </div>
              <p
                className="section-description"
                data-reveal="up"
                style={{ transitionDelay: "120ms" }}
              >
                Integramos la fotografía, el cine documental y el desarrollo web
                de tu invitación para que cada etapa de tu evento conserve una
                misma firma visual.
              </p>
            </div>

            <div
              className="scroll-divider-line section-line-gap"
              data-reveal="line"
            />

            <div className="services-three-col">
              <article
                className="service-pillar-card"
                data-reveal="clip-up"
                style={{ transitionDelay: "0ms" }}
              >
                <span className="pillar-number tabular">01</span>
                <h3>Dirección de Arte y Sesión Previa</h3>
                <p>
                  Planeamos la locación en Atlixco o Puebla, dirigimos cada pose
                  con iluminación profesional y entregamos fotografías de alta
                  costura listas para tu invitación.
                </p>
              </article>

              <article
                className="service-pillar-card"
                data-reveal="clip-up"
                style={{ transitionDelay: "140ms" }}
              >
                <span className="pillar-number tabular">02</span>
                <h3>Invitación Digital con Diseño Único</h3>
                <p>
                  Construimos una experiencia web exclusiva con apertura
                  interactiva, tu canción favorita, cuenta regresiva, mapas GPS
                  de misa y salón, e itinerario editorial.
                </p>
              </article>

              <article
                className="service-pillar-card"
                data-reveal="clip-up"
                style={{ transitionDelay: "280ms" }}
              >
                <span className="pillar-number tabular">03</span>
                <h3>Cobertura Documental del Gran Día</h3>
                <p>
                  Capturamos la ceremonia religiosa, el cóctel, el banquete y el
                  vals con fotografía y película cinematográfica en 4K e
                  impresión de álbum editorial.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />

      {/* CARRUSEL MINIMALISTA E INDEPENDIENTE POR SESIÓN (NO COMPARTIDO) */}
      {currentSession && currentSlide && (
        <div
          className="minimal-carousel-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de sesión: ${currentSession.title}`}
          onClick={closeCarousel}
        >
          <div
            className="minimal-carousel-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera Minimalista de la Sesión */}
            <header className="minimal-carousel-header">
              <div className="minimal-carousel-meta">
                <span className="minimal-carousel-title">
                  {currentSession.title}
                </span>
                <span className="minimal-carousel-sep" aria-hidden="true">
                  /
                </span>
                <span className="minimal-carousel-loc">
                  {currentSession.location}
                </span>
              </div>

              <div className="minimal-carousel-right">
                <span className="minimal-carousel-counter tabular">
                  {String(activeSlideIndex + 1).padStart(2, "0")} /{" "}
                  {String(currentSlides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={closeCarousel}
                  className="minimal-close-btn"
                  aria-label="Cerrar galería"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
            </header>

            {/* Escenario Minimalista sin Marco Pesado */}
            <div className="minimal-carousel-stage">
              <button
                type="button"
                onClick={prevSlide}
                className="minimal-nav-btn prev"
                aria-label="Fotografía anterior"
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>

              <figure className="minimal-figure">
                <img
                  key={currentSlide.src}
                  src={currentSlide.src}
                  alt={currentSlide.caption}
                  className="minimal-slide-img"
                />
                <figcaption className="minimal-caption">
                  {currentSlide.caption}
                </figcaption>
              </figure>

              <button
                type="button"
                onClick={nextSlide}
                className="minimal-nav-btn next"
                aria-label="Siguiente fotografía"
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Indicadores Lineales Minimalistas Exclusivos de esta Sesión */}
            <div className="minimal-dots-bar" role="tablist">
              {currentSlides.map((slide, idx) => (
                <button
                  key={slide.src}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeSlideIndex}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`minimal-dash-btn ${
                    idx === activeSlideIndex ? "is-active" : ""
                  }`}
                  aria-label={`Fotografía ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
