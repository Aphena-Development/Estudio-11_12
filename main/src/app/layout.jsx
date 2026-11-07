import "./globals.css";

export const metadata = {
  title: "11.12 Estudio | Fotografía Editorial e Invitaciones Digitales en Atlixco",
  description:
    "Estudio fotográfico profesional en 15 Oriente Número 4, Atlixco, Puebla. Sesiones fotográficas de XV Años, bodas e invitaciones digitales interactivas.",
  openGraph: {
    title: "11.12 Estudio | Fotografía & Invitaciones Digitales en Atlixco",
    description:
      "Sesiones fotográficas editoriales e invitaciones web interactivas para XV Años y Bodas en Atlixco y Puebla.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
