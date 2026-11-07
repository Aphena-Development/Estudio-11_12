import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const TEMPLATES_DIR = path.join(ROOT_DIR, "plantillas");
const ZONES_DIR = path.join(ROOT_DIR, "zonas");
const CACHE_DIR = path.join(ROOT_DIR, ".zones-cache");
const MAIN_PUBLIC_ZONES_DIR = path.join(ROOT_DIR, "main", "public", "i");
const MAIN_GENERATED_DIR = path.join(ROOT_DIR, "main", "src", "generated");
const INVITATIONS_MANIFEST_PATH = path.join(
  MAIN_GENERATED_DIR,
  "invitations.json"
);
const TEMPLATES_MANIFEST_PATH = path.join(
  MAIN_GENERATED_DIR,
  "templates.json"
);

function computeDirectoryHash(dirPath) {
  const hash = crypto.createHash("sha256");

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (
        entry.name === "node_modules" ||
        entry.name === "dist" ||
        entry.name === ".git" ||
        entry.name.startsWith(".")
      ) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);
      const relPath = path.relative(dirPath, fullPath).replace(/\\/g, "/");

      if (entry.isDirectory()) {
        hash.update(`dir:${relPath}\n`);
        walk(fullPath);
      } else if (entry.isFile()) {
        const stat = fs.statSync(fullPath);
        hash.update(`file:${relPath}:${stat.size}\n`);
        if (stat.size < 512 * 1024) {
          hash.update(fs.readFileSync(fullPath));
        } else {
          hash.update(`${stat.mtimeMs}`);
        }
      }
    }
  }

  walk(dirPath);
  return hash.digest("hex");
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function extractZoneMetadata(slug, zoneDir, isTemplate = false) {
  const dataFilePath = path.join(zoneDir, "src", "data", "invitationData.js");
  let meta = {};
  let data = {};

  if (fs.existsSync(dataFilePath)) {
    try {
      const fileUrl = `${pathToFileURL(dataFilePath).href}?t=${Date.now()}`;
      const mod = await import(fileUrl);
      meta = mod.INVITATION_META || {};
      data = mod.INVITATION_DATA || {};
    } catch (err) {
      console.warn(
        `⚠️  No se pudo importar invitationData.js en ${slug}:`,
        err.message
      );
    }
  }

  const quince = data.quinceanera || {};
  const firstLocation =
    Array.isArray(data.locations) && data.locations.length > 0
      ? data.locations[0]
      : {};

  const coverAsset = meta.coverAsset || "assets/ximena-3.jpg";

  return {
    slug,
    url: `/i/${slug}`,
    isTemplate,
    templateId: meta.templateId || (isTemplate ? slug : "xv-princesa"),
    templateName: meta.templateName || meta.eventType || "Diseño Personalizado",
    clientName: meta.clientName || quince.name || slug,
    eventType: meta.eventType || quince.title || "Evento Especial",
    title:
      meta.title ||
      `${quince.title || "Invitación"} — ${quince.name || slug}`,
    subtitle:
      meta.subtitle ||
      quince.subtitle ||
      "Invitación Digital Interactiva",
    eventDate:
      meta.eventDate ||
      (quince.dateISO ? quince.dateISO.slice(0, 10) : "2026-12-26"),
    dateDisplay: meta.dateDisplay || quince.dateDisplay || "",
    dateFullText: meta.dateFullText || quince.dateFullText || "",
    locationSummary:
      meta.locationSummary ||
      firstLocation.address ||
      firstLocation.place ||
      "",
    coverImage: `/i/${slug}/${coverAsset.replace(/^\/+/, "")}`,
    whatsappNumber: quince.whatsappNumber || "",
    showInPortfolio:
      typeof meta.showInPortfolio === "boolean" ? meta.showInPortfolio : true,
    updatedAt: new Date().toISOString(),
  };
}

async function compileCollection(baseDir, label, isTemplate = false) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    return [];
  }

  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const folders = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name);

  const manifest = [];

  for (const slug of folders) {
    const itemDir = path.join(baseDir, slug);
    const pkgPath = path.join(itemDir, "package.json");

    if (!fs.existsSync(pkgPath)) continue;

    const currentHash = computeDirectoryHash(itemDir);
    const cacheSubDir = path.join(
      CACHE_DIR,
      isTemplate ? `tpl-${slug}` : `zone-${slug}`
    );
    const hashFilePath = path.join(cacheSubDir, "hash.txt");
    const cachedDistDir = path.join(cacheSubDir, "dist");
    const targetPublicDir = path.join(MAIN_PUBLIC_ZONES_DIR, slug);

    const cachedHash = fs.existsSync(hashFilePath)
      ? fs.readFileSync(hashFilePath, "utf8").trim()
      : null;

    if (cachedHash === currentHash && fs.existsSync(cachedDistDir)) {
      console.log(
        `⚡ [CACHÉ] ${label} "${slug}" sin cambios (${currentHash.slice(0, 8)}).`
      );
    } else {
      console.log(`🔨 [BUILD] Compilando ${label} "${slug}"...`);

      const nodeModulesDir = path.join(itemDir, "node_modules");
      if (!fs.existsSync(nodeModulesDir)) {
        console.log(`📦 Instalando dependencias para "${slug}"...`);
        execSync("npm install --no-audit --no-fund", {
          cwd: itemDir,
          stdio: "inherit",
        });
      }

      if (fs.existsSync(cachedDistDir)) {
        fs.rmSync(cachedDistDir, { recursive: true, force: true });
      }
      fs.mkdirSync(cacheSubDir, { recursive: true });

      const buildCmd = `npx vite build --base=/i/${slug}/ --outDir="${cachedDistDir}"`;
      execSync(buildCmd, {
        cwd: itemDir,
        stdio: "inherit",
      });

      fs.writeFileSync(hashFilePath, currentHash, "utf8");
      console.log(`✅ [OK] ${label} "${slug}" compilada con éxito.`);
    }

    if (fs.existsSync(targetPublicDir)) {
      fs.rmSync(targetPublicDir, { recursive: true, force: true });
    }
    copyDirRecursive(cachedDistDir, targetPublicDir);

    const metadata = await extractZoneMetadata(slug, itemDir, isTemplate);
    manifest.push(metadata);
    console.log(`🔗 [VINCULADA] ${metadata.title} -> ${metadata.url}`);
  }

  return manifest;
}

async function buildAll() {
  console.log("\n========================================================");
  console.log("🚀 ORQUESTADOR MULTI-ZONA: Plantillas + Zonas Clientes");
  console.log("========================================================\n");

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.mkdirSync(MAIN_PUBLIC_ZONES_DIR, { recursive: true });
  fs.mkdirSync(MAIN_GENERATED_DIR, { recursive: true });

  console.log("--- 1. Procesando Plantillas Oficiales (/plantillas/) ---");
  const templatesManifest = await compileCollection(
    TEMPLATES_DIR,
    "Plantilla",
    true
  );

  console.log("\n--- 2. Procesando Invitaciones de Clientes (/zonas/) ---");
  const invitationsManifest = await compileCollection(
    ZONES_DIR,
    "Zona Cliente",
    false
  );

  fs.writeFileSync(
    TEMPLATES_MANIFEST_PATH,
    JSON.stringify(templatesManifest, null, 2),
    "utf8"
  );
  fs.writeFileSync(
    INVITATIONS_MANIFEST_PATH,
    JSON.stringify(invitationsManifest, null, 2),
    "utf8"
  );

  console.log("\n========================================================");
  console.log(
    `✨ ${templatesManifest.length} Plantilla(s) Oficiales y ${invitationsManifest.length} Zona(s) de Clientes vinculadas.`
  );
  console.log("========================================================\n");
}

buildAll().catch((err) => {
  console.error("❌ Error en build-zones:", err);
  process.exit(1);
});
