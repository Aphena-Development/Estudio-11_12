/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Regla comodín única: cualquier invitación compilada en /public/i/{slug}
        // se sirve automáticamente sin necesidad de modificar este archivo.
        source: "/i/:slug",
        destination: "/i/:slug/index.html",
      },
      {
        source: "/i/:slug/",
        destination: "/i/:slug/index.html",
      },
    ];
  },
};

export default nextConfig;
