import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_I_DIR = path.join(ROOT_DIR, "main", "public", "i");

for (const envCandidate of [
  path.join(ROOT_DIR, ".env"),
  path.join(ROOT_DIR, "main", ".env.local"),
  path.join(ROOT_DIR, "main", ".env"),
]) {
  if (fs.existsSync(envCandidate)) {
    const lines = fs.readFileSync(envCandidate, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const S3_ENDPOINT = (process.env.S3_ENDPOINT || "").replace(/\/+$/, "");
const S3_REGION = process.env.S3_REGION || "garage";
const S3_BUCKET = process.env.S3_BUCKET || "estudio-11-12";
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || "";
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || "";

const args = process.argv.slice(2);
const slugFilterArg = args.find((a) => a.startsWith("--slug="));
const targetSlug = slugFilterArg ? slugFilterArg.split("=")[1] : null;
const isDryRun = args.includes("--dry-run");
const CONCURRENCY = 6;

if (
  !isDryRun &&
  (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY)
) {
  console.error(
    "\n❌ Faltan variables de conexión para Garage S3 (S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY)."
  );
  console.error(
    "👉 Configúralas en tu archivo .env o ejecuta con --dry-run para verificar el inventario local.\n"
  );
  process.exit(1);
}

const MIME_MAP = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
};

function sha256Hex(bufferOrString) {
  return crypto.createHash("sha256").update(bufferOrString).digest("hex");
}

function hmacSha256(key, data) {
  return crypto.createHmac("sha256", key).update(data).digest();
}

function signS3Request({
  method,
  endpointUrl,
  objectKey,
  payloadBuffer,
  contentType,
  cacheControl,
}) {
  const url = new URL(`${endpointUrl}/${S3_BUCKET}/${objectKey}`);
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256Hex(payloadBuffer);

  const headers = {
    host: url.host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate,
  };

  if (contentType) headers["content-type"] = contentType;
  if (cacheControl) headers["cache-control"] = cacheControl;

  const sortedHeaderKeys = Object.keys(headers).sort();
  const canonicalHeaders = sortedHeaderKeys
    .map((k) => `${k}:${headers[k].trim()}\n`)
    .join("");
  const signedHeaders = sortedHeaderKeys.join(";");

  const canonicalUri = url.pathname
    .split("/")
    .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
    .join("/");

  const canonicalRequest = [
    method,
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${S3_REGION}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const kDate = hmacSha256(`AWS4${S3_SECRET_ACCESS_KEY}`, dateStamp);
  const kRegion = hmacSha256(kDate, S3_REGION);
  const kService = hmacSha256(kRegion, "s3");
  const kSigning = hmacSha256(kService, "aws4_request");
  const signature = crypto
    .createHmac("sha256", kSigning)
    .update(stringToSign)
    .digest("hex");

  headers[
    "authorization"
  ] = `AWS4-HMAC-SHA256 Credential=${S3_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return { url: url.toString(), headers };
}

function collectAssets() {
  if (!fs.existsSync(PUBLIC_I_DIR)) return [];
  const slugs = fs
    .readdirSync(PUBLIC_I_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && (!targetSlug || d.name === targetSlug))
    .map((d) => d.name);

  const items = [];
  for (const slug of slugs) {
    const assetsDir = path.join(PUBLIC_I_DIR, slug, "assets");
    if (!fs.existsSync(assetsDir)) continue;
    const files = fs
      .readdirSync(assetsDir, { withFileTypes: true })
      .filter((f) => f.isFile());
    for (const file of files) {
      const fullPath = path.join(assetsDir, file.name);
      const ext = path.extname(file.name).toLowerCase();
      items.push({
        slug,
        fileName: file.name,
        fullPath,
        objectKey: `i/${slug}/assets/${file.name}`,
        contentType: MIME_MAP[ext] || "application/octet-stream",
      });
    }
  }
  return items;
}

async function run() {
  const assets = collectAssets();
  console.log(
    `\n📦 Garage S3 Sync — Bucket: [${S3_BUCKET}] | Archivos encontrados: ${assets.length}`
  );

  if (isDryRun) {
    for (const item of assets) {
      const sizeKb = (fs.statSync(item.fullPath).size / 1024).toFixed(1);
      console.log(
        `  • [DRY-RUN] s3://${S3_BUCKET}/${item.objectKey} (${item.contentType}, ${sizeKb} KB)`
      );
    }
    console.log("\n✅ Inventario verificado correctamente (modo --dry-run).\n");
    return;
  }

  let completed = 0;
  let index = 0;

  async function worker() {
    while (index < assets.length) {
      const currentIdx = index++;
      const item = assets[currentIdx];
      const buffer = fs.readFileSync(item.fullPath);
      const cacheControl = "public, max-age=31536000, immutable";
      const { url, headers } = signS3Request({
        method: "PUT",
        endpointUrl: S3_ENDPOINT,
        objectKey: item.objectKey,
        payloadBuffer: buffer,
        contentType: item.contentType,
        cacheControl,
      });

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: buffer,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(
          `Error subiendo ${item.objectKey} (HTTP ${response.status}): ${errText}`
        );
      }

      completed++;
      console.log(`  ✓ [${completed}/${assets.length}] ${item.objectKey}`);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, assets.length) }, () => worker())
  );

  console.log(
    `\n✅ ${completed} activos sincronizados en Garage S3 (${S3_ENDPOINT}/${S3_BUCKET}).\n`
  );
}

run().catch((err) => {
  console.error("\n❌ Fallo en s3:sync:", err.message);
  process.exit(1);
});
