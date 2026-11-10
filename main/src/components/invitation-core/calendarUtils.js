function formatGoogleCalendarUTC(dateObj) {
  return dateObj.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function openGoogleCalendar({ title, dateISO, locations = [] }) {
  const startDate = dateISO ? new Date(dateISO) : new Date("2026-12-26T18:00:00Z");
  const validStart = Number.isNaN(startDate.getTime())
    ? new Date("2026-12-26T18:00:00Z")
    : startDate;
  // Duración por defecto del evento: 8 horas
  const endDate = new Date(validStart.getTime() + 8 * 60 * 60 * 1000);

  const datesParam = `${formatGoogleCalendarUTC(validStart)}/${formatGoogleCalendarUTC(
    endDate
  )}`;

  const encodedTitle = encodeURIComponent(title || "Evento Especial");
  const locSummary = locations
    .map((l) => `${l.type}: ${l.time} en ${l.place} (${l.address})`)
    .join(" | ");
  const details = encodeURIComponent(locSummary);
  const primaryLocation = encodeURIComponent(
    locations[0]?.address || locations[0]?.place || "Atlixco, Puebla, México"
  );

  if (typeof window !== "undefined") {
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${datesParam}&details=${details}&location=${primaryLocation}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}
