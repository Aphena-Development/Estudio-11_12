/**
 * Resuelve la URL pública de un activo multimedia (imagen o audio) de una invitación.
 *
 * - Si `NEXT_PUBLIC_ASSETS_URL` está definido (ej. endpoint de Garage S3 en sslip.io:
 *   `http://estudio-11-12.s3-web.31.97.215.179.sslip.io`), sirve el archivo desde Garage S3.
 * - Si no está definido, hace fallback transparente a `/i/{slug}/assets/{file}` local.
 */
const ASSETS_BASE_URL = (process.env.NEXT_PUBLIC_ASSETS_URL || "").replace(
  /\/+$/,
  ""
);

export function invitationAsset(slug, file) {
  const cleanFile = String(file).replace(/^\/+/, "");
  if (ASSETS_BASE_URL) {
    return `${ASSETS_BASE_URL}/i/${slug}/assets/${cleanFile}`;
  }
  return `/i/${slug}/assets/${cleanFile}`;
}
