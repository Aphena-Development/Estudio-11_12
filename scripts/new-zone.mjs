import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(ROOT_DIR, "main", "src", "templates");
const CONTENT_DIR = path.join(ROOT_DIR, "main", "src", "content", "invitations");
const PUBLIC_INVITATIONS_DIR = path.join(ROOT_DIR, "main", "public", "i");

const availableTemplates = fs.existsSync(TEMPLATES_DIR)
  ? fs
      .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
  : ["xv-princesa", "xv-elegante", "boda-elegante", "boda-religiosa"];

const args = process.argv.slice(2);
const templateName = args[0];
const rawSlug = args[1];
const customName = args[2];

if (!templateName || !rawSlug || !availableTemplates.includes(templateName)) {
  console.log("\n========================================================");
  console.log("✨ GENERADOR DE INVITACIONES MULTI-PLANTILLA (11.12 Estudio)");
  console.log("========================================================\n");
  console.log("Plantillas disponibles en main/src/templates/:");
  for (const t of availableTemplates) {
    console.log(`  • ${t}`);
  }
  console.log(
    '\nUso:\n  npm run nueva-invitacion -- <plantilla> <slug-cliente> ["Nombre(s)"]\n'
  );
  console.log("Ejemplos:");
  console.log('  npm run nueva-invitacion -- xv-princesa xv-valentina "Valentina"');
  console.log('  npm run nueva-invitacion -- xv-elegante xv-sofia "Sofía"');
  console.log(
    '  npm run nueva-invitacion -- boda-elegante boda-carlos-ana "Carlos & Ana"'
  );
  console.log(
    '  npm run nueva-invitacion -- boda-religiosa boda-diego-sofia "Diego & Sofía"\n'
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

const targetDataFile = path.join(CONTENT_DIR, `${slug}.js`);
const targetAssetsDir = path.join(PUBLIC_INVITATIONS_DIR, slug, "assets");

if (fs.existsSync(targetDataFile)) {
  console.error(
    `\n❌ El archivo de datos main/src/content/invitations/${slug}.js ya existe.\n`
  );
  process.exit(1);
}

const baseSeedMap = {
  "xv-princesa": "xv-ximena.js",
  "xv-elegante": "xv-camila.js",
  "boda-elegante": "boda-valeria-sebastian.js",
  "boda-religiosa": "boda-mariana-alejandro.js",
};

const seedFile = path.join(CONTENT_DIR, baseSeedMap[templateName]);
const exportVarName =
  slug.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase()) + "Invitation";

let content = fs.readFileSync(seedFile, "utf8");
const eventTitlePrefix = isWedding ? "Nuestra Boda" : "Mis XV Años";

content = content
  .replace(/const SLUG = "[^"]*";/, `const SLUG = "${slug}";`)
  .replace(/export const \w+Invitation =/, `export const ${exportVarName} =`)
  .replace(/clientName:\s*"[^"]*"/, `clientName: "${defaultClientName}"`)
  .replace(
    /title:\s*"[^"]*"/,
    `title: "${eventTitlePrefix} — ${defaultClientName}"`
  )
  .replace(/showInPortfolio:\s*true/, "showInPortfolio: false")
  .replace(/name:\s*"[^"]*"/, `name: "${defaultClientName}"`);

fs.writeFileSync(targetDataFile, content, "utf8");
fs.mkdirSync(targetAssetsDir, { recursive: true });

console.log("\n========================================================");
console.log(`✅ Nueva invitación creada con plantilla [${templateName}]`);
console.log(`📄 Datos:   main/src/content/invitations/${slug}.js`);
console.log(`🖼️ Assets:  main/public/i/${slug}/assets/`);
console.log(`👤 Evento:  ${defaultClientName}`);
console.log(`🔗 Ruta:    /i/${slug}`);
console.log("========================================================");
console.log(
  `👉 Registra "${exportVarName}" en main/src/content/invitations/index.js para activarla.\n`
);
