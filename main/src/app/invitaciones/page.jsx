"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Copy,
  Check,
  Share2,
  ArrowUpRight,
  Calendar,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { getPortfolioInvitations } from "../../content/invitations";
import { STUDIO_INFO } from "../../data/studioInfo";
import { StudioScrollNav, StudioFooter } from "../../components/StudioChrome";

const invitationsData = getPortfolioInvitations();

export default function InvitacionesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyUrl = (id, urlPath) => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}${urlPath}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleShareWhatsApp = (item) => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const fullUrl = `${origin}${item.url}`;
    const message = `${item.title}\nTe compartimos la invitación digital interactiva elaborada por 11.12 Estudio:\n${fullUrl}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const filteredInvitations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return invitationsData.filter((inv) => {
      if (
        selectedFilter === "xv" &&
        !inv.slug.includes("xv") &&
        !inv.eventType.toLowerCase().includes("xv")
      ) {
        return false;
      }
      if (
        selectedFilter === "boda" &&
        !inv.slug.includes("boda") &&
        !inv.eventType.toLowerCase().includes("boda")
      ) {
        return false;
      }
      if (!q) return true;
      return (
        inv.title.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.eventType.toLowerCase().includes(q) ||
        (inv.locationSummary && inv.locationSummary.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div id="inicio" className="site-shell">
      <StudioScrollNav />

      <main id="main-content" className="directory-main">
        {/* ENCABEZADO DE LA GALERÍA DE INVITACIONES */}
        <section className="directory-hero">
          <div className="wrap">
            <div className="directory-top-nav">
              <Link href="/" className="back-studio-link">
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Volver a {STUDIO_INFO.name}</span>
              </Link>
            </div>

            <div className="directory-header-split">
              <div>
                <h1 className="directory-title">
                  Colección de Invitaciones Digitales
                </h1>
                <p className="directory-subtitle">
                  Selecciona cualquier invitación para ver su experiencia
                  interactiva en pantalla completa o compartir su enlace por
                  WhatsApp.
                </p>
              </div>
            </div>

            {/* BARRA DE BÚSQUEDA Y FILTROS POR EVENTO */}
            <div className="directory-controls-bar">
              <div className="search-field-group">
                <label htmlFor="search-invitaciones" className="field-label">
                  Buscar por nombre, festejo o lugar
                </label>
                <div className="search-input-wrap">
                  <Search
                    size={18}
                    aria-hidden="true"
                    className="search-icon"
                  />
                  <input
                    id="search-invitaciones"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ej. Ximena, Camila, Valeria, Atlixco..."
                    className="search-input"
                  />
                </div>
              </div>

              <div
                className="filter-group"
                role="group"
                aria-label="Filtrar invitaciones por tipo de evento"
              >
                {[
                  { id: "todas", label: "Todos los eventos" },
                  { id: "xv", label: "XV Años" },
                  { id: "boda", label: "Bodas" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedFilter(tab.id)}
                    aria-pressed={selectedFilter === tab.id}
                    className={`filter-btn ${
                      selectedFilter === tab.id ? "is-selected" : ""
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LISTA DE INVITACIONES (SIN DETALLES TÉCNICOS NI COMANDOS) */}
        <section className="directory-section">
          <div className="wrap">
            {filteredInvitations.length === 0 ? (
              <div className="empty-state-box">
                <p>No se encontraron invitaciones con ese criterio de búsqueda.</p>
              </div>
            ) : (
              <div className="invitations-list-stack">
                {filteredInvitations.map((inv) => (
                  <article key={inv.slug} className="invitation-list-row">
                    <a
                      href={inv.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="row-thumb-link"
                      aria-label={`Abrir invitación ${inv.title}`}
                    >
                      <img
                        src={inv.coverImage}
                        alt={inv.title}
                        className="row-thumb-img"
                      />
                    </a>

                    <div className="row-main-info">
                      <div className="row-title-line">
                        <h2 className="row-title">{inv.title}</h2>
                        <span className="row-badge-live">{inv.eventType}</span>
                      </div>
                      <p className="row-subtitle">{inv.subtitle}</p>
                      <div className="row-meta-tags">
                        {(inv.dateFullText || inv.dateDisplay) && (
                          <span className="meta-chip tabular">
                            <Calendar size={14} aria-hidden="true" />
                            <span>{inv.dateFullText || inv.dateDisplay}</span>
                          </span>
                        )}
                        {inv.locationSummary && (
                          <span className="meta-chip">
                            <MapPin size={14} aria-hidden="true" />
                            <span>{inv.locationSummary}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="row-actions-group">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(inv.slug, inv.url)}
                        className="btn btn-outline btn-action"
                      >
                        {copiedId === inv.slug ? (
                          <>
                            <Check size={16} aria-hidden="true" />
                            <span>Enlace copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} aria-hidden="true" />
                            <span>Copiar enlace</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareWhatsApp(inv)}
                        className="btn btn-whatsapp btn-action"
                      >
                        <Share2 size={16} aria-hidden="true" />
                        <span>Compartir por WhatsApp</span>
                      </button>

                      <a
                        href={inv.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-gold btn-action"
                      >
                        <span>Abrir invitación</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  );
}
