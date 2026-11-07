import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(ROOT_DIR, "plantillas");
const ZONES_DIR = path.join(ROOT_DIR, "zonas");

const availableTemplates = fs.existsSync(TEMPLATES_DIR)
  ? fs
      .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
  : [];

const args = process.argv.slice(2);
const templateName = args[0];
const rawSlug = args[1];
const customName = args[2];

if (!templateName || !rawSlug || !availableTemplates.includes(templateName)) {
  console.log("\n========================================================");
  console.log("✨ GENERADOR DE ZONAS DESDE PLANTILLAS (11.12 Estudio)");
  console.log("========================================================\n");
  console.log("Plantillas oficiales disponibles en /plantillas/:");
  for (const t of availableTemplates) {
    console.log(`  • ${t}`);
  }
  console.log(
    "\nUso:\n  npm run nueva-zona -- <plantilla> <slug-cliente> [\"Nombre(s)\"]\n"
  );
  console.log("Ejemplos:");
  console.log('  npm run nueva-zona -- xv-princesa xv-valentina "Valentina"');
  console.log('  npm run nueva-zona -- xv-elegante xv-camila "Camila"');
  console.log(
    '  npm run nueva-zona -- boda-elegante boda-carlos-ana "Carlos & Ana"'
  );
  console.log(
    '  npm run nueva-zona -- boda-religiosa boda-diego-sofia "Diego & Sofía"\n'
  );
  process.exit(1);
}

const slug = rawSlug
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9-_]/g, "-");

const isWedding = templateName.startsWith("boda");
const defaultClientName =
  customName || (isWedding ? "Novia & Novio" : "Quinceañera");

const templateDir = path.join(TEMPLATES_DIR, templateName);
const targetDir = path.join(ZONES_DIR, slug);

if (fs.existsSync(targetDir)) {
  console.error(`\n❌ La zona /zonas/${slug} ya existe.\n`);
  process.exit(1);
}

function copyTemplate(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyTemplate(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyTemplate(templateDir, targetDir);

// Actualizar package.json de la nueva zona
const pkgPath = path.join(targetDir, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = `zona-${slug}`;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), "utf8");
}

// Actualizar slug, título y nombre en invitationData.js
const dataPath = path.join(targetDir, "src", "data", "invitationData.js");
if (fs.existsSync(dataPath)) {
  let content = fs.readFileSync(dataPath, "utf8");
  const eventTitlePrefix = isWedding ? "Nuestra Boda" : "Mis XV Años";

  content = content
    .replace(/slug:\s*"[^"]*"/, `slug: "${slug}"`)
    .replace(/clientName:\s*"[^"]*"/, `clientName: "${defaultClientName}"`)
    .replace(
      /title:\s*"[^"]*"/,
      `title: "${eventTitlePrefix} — ${defaultClientName}"`
    )
    .replace(/name:\s*"[^"]*"/, `name: "${defaultClientName}"`);

  fs.writeFileSync(dataPath, content, "utf8");
}

// Actualizar index.html para vista previa en WhatsApp
const htmlPath = path.join(targetDir, "index.html");
if (fs.existsSync(htmlPath)) {
  const eventTitlePrefix = isWedding ? "Nuestra Boda" : "Mis XV Años";
  let html = fs.readFileSync(htmlPath, "utf8");
  html = html
    .replace(
      /<title>.*?<\/title>/,
      `<title>${eventTitlePrefix} — ${defaultClientName}</title>`
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${eventTitlePrefix} — ${defaultClientName}" />`
    )
    .replace(/\/i\/[^/]+\//g, `/i/${slug}/`);
  fs.writeFileSync(htmlPath, html, "utf8");
}

console.log("\n========================================================");
console.log(`✅ Nueva zona creada desde plantilla [${templateName}]`);
console.log(`📂 Carpeta: zonas/${slug}`);
console.log(`👤 Evento:  ${defaultClientName}`);
console.log(`🔗 Ruta:    /i/${slug}`);
console.log("========================================================");
console.log(`👉 Ejecuta "npm run build:zones" o haz "git push" para vincularla.\n`);
