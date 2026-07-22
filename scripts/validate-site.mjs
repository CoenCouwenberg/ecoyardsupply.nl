import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const siteOrigin = "https://ecoyardsupply.nl";
const errors = [];
const warnings = [];

async function listHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "tmp"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(fullPath));
    else if (entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

const htmlFiles = await listHtmlFiles(root);
const pages = new Map();

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const html = await fs.readFile(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
  pages.set(relative, { file, html, ids });

  const titleCount = (html.match(/<title>/g) || []).length;
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  const canonicalMatches = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/g)];
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/s);
  const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/s);

  if (titleCount !== 1) errors.push(`${relative}: expected exactly one <title>, found ${titleCount}`);
  if (h1Count !== 1) errors.push(`${relative}: expected exactly one <h1>, found ${h1Count}`);
  if (canonicalMatches.length !== 1) errors.push(`${relative}: expected exactly one canonical, found ${canonicalMatches.length}`);
  if (!description) errors.push(`${relative}: missing meta description`);
  if (!ogImage || !ogImage[1].startsWith("https://")) errors.push(`${relative}: og:image must be an absolute HTTPS URL`);
  for (const match of html.matchAll(/\s(?:href|content)=["']([^"']+\.html(?:[?#][^"']*)?)["']/g)) {
    errors.push(`${relative}: public URL must not expose .html (${match[1]})`);
  }

  for (const match of html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); }
    catch (error) { errors.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }

  if (/verzekert resultaat/i.test(html)) errors.push(`${relative}: contains the unsupported claim “verzekert resultaat”`);
  if (/ecologische meststoffen/i.test(html)) errors.push(`${relative}: contains the broad claim “ecologische meststoffen”`);
}

function localTarget(sourceRelative, href) {
  if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  if (/^https?:\/\//i.test(href)) {
    if (!href.startsWith(siteOrigin)) return null;
    href = href.slice(siteOrigin.length) || "/";
  }
  const [pathname, fragment = ""] = href.split("#", 2);
  let targetRelative;
  if (!pathname) targetRelative = sourceRelative;
  else if (pathname.startsWith("/")) targetRelative = pathname === "/" ? "index.html" : pathname.slice(1);
  else targetRelative = path.posix.normalize(path.posix.join(path.posix.dirname(sourceRelative), pathname));
  if (targetRelative.endsWith("/")) targetRelative += "index.html";
  return { targetRelative, fragment };
}

for (const [relative, page] of pages) {
  for (const match of page.html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const target = localTarget(relative, match[1]);
    if (!target) continue;
    let resolvedRelative = target.targetRelative;
    let absoluteTarget = path.join(root, resolvedRelative.replaceAll("/", path.sep));
    try { await fs.access(absoluteTarget); }
    catch {
      if (!path.posix.extname(resolvedRelative)) {
        resolvedRelative += ".html";
        absoluteTarget = path.join(root, resolvedRelative.replaceAll("/", path.sep));
      }
      try { await fs.access(absoluteTarget); }
      catch { errors.push(`${relative}: missing local target ${match[1]} -> ${target.targetRelative}`); continue; }
    }
    if (target.fragment && resolvedRelative.endsWith(".html")) {
      const targetPage = pages.get(resolvedRelative);
      if (targetPage && !targetPage.ids.has(target.fragment)) errors.push(`${relative}: missing fragment #${target.fragment} in ${resolvedRelative}`);
    }
  }
}

const canonicalUrls = new Map();
for (const [relative, page] of pages) {
  const canonical = page.html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/)?.[1];
  if (!canonical) continue;
  if (canonicalUrls.has(canonical)) errors.push(`${relative}: duplicate canonical also used by ${canonicalUrls.get(canonical)}`);
  canonicalUrls.set(canonical, relative);
}

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
for (const [canonical, relative] of canonicalUrls) if (!sitemapUrls.has(canonical)) errors.push(`${relative}: canonical missing from sitemap.xml`);
for (const url of sitemapUrls) if (!canonicalUrls.has(url)) warnings.push(`sitemap.xml: ${url} has no matching canonical page`);

if (warnings.length) console.warn(`Warnings (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`Validation failed (${errors.length}):\n- ${[...new Set(errors)].join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages: metadata, JSON-LD, links, fragments, claims and sitemap are consistent.`);
