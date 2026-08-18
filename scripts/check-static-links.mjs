import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";

const outputRoot = resolve("out");
const htmlFiles = [];
// Hosted as a separate operational resource beneath the same custom domain.
const externallyManagedPaths = new Set(["/IncidentResponse/"]);

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

function candidates(sourceFile, href) {
  const clean = decodeURIComponent(href.split("#")[0].split("?")[0]);
  if (!clean) return [];
  const base = clean.startsWith("/") ? join(outputRoot, clean) : resolve(dirname(sourceFile), clean);
  if (extname(base)) return [base];
  return [base, `${base}.html`, join(base, "index.html")].map(normalize);
}

await walk(outputRoot);
const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/g)].map(match => match[1]);
  for (const href of hrefs) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(href)) continue;
    if (externallyManagedPaths.has(href.split("#")[0].split("?")[0])) continue;
    const paths = candidates(file, href);
    if (paths.length && !(await Promise.all(paths.map(exists))).some(Boolean)) failures.push(`${relative(outputRoot,file)} -> ${href}`);
  }
}

const home = await readFile(join(outputRoot, "index.html"), "utf8");
const requiredPlaybooks = ["ransomware", "business-email-compromise", "cloud-identity-compromise", "data-exfiltration", "repository-compromise", "malware-outbreak", "ai-security-ir"];
for (const slug of requiredPlaybooks) {
  if (!home.includes(`href=\"/${slug === "repository-compromise" || slug === "ai-security-ir" ? slug : `playbooks/${slug}`}/\"`)) failures.push(`index.html -> missing linked playbook ${slug}`);
}

if (failures.length) {
  console.error(`Static link validation failed:\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Validated ${htmlFiles.length} HTML files and all seven playbook routes.`);
