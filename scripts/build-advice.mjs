import fs from "node:fs/promises";
import path from "node:path";
import { adviceHub, advicePages } from "../content/advice-pages.mjs";

const root = path.resolve(import.meta.dirname, "..");
const published = "2026-07-22";
const site = "https://ecoyardsupply.nl";

const escapeJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const pageBySlug = new Map(advicePages.map((page) => [page.slug, page]));

function makePortable(html, rootPrefix, homePath) {
  return html
    .replaceAll('href="/#', `href="${homePath}#`)
    .replaceAll('href="/"', `href="${homePath}"`)
    .replaceAll('href="/', `href="${rootPrefix}`)
    .replaceAll('src="/', `src="${rootPrefix}`);
}

function analytics() {
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=G-LQNK50RZ5W"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-LQNK50RZ5W");</script>`;
}

function header() {
  return `<a class="skip-link" href="#inhoud">Ga naar de inhoud</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="Eco Yard Supply home"><img src="/public/assets/images/ecoyard-supply-logo.webp" alt="Eco Yard Supply" width="500" height="237"></a>
        <div class="header-actions"><a class="button button-small" href="/#contact">Contact</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" aria-label="Menu openen"><span></span><span></span><span></span></button></div>
        <nav class="site-nav" id="site-navigation" aria-label="Hoofdnavigatie">
          <a href="/producten/index.html">Producten</a><a href="/advies/index.html">Advies</a><a href="/voor-hoveniers.html">Voor hoveniers</a><a href="/#over-ons">Over ons</a><a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-inner">
      <img src="/public/assets/images/ecoyard-supply-logo.webp" alt="Eco Yard Supply" width="500" height="237" loading="lazy" decoding="async">
      <nav class="footer-nav" aria-label="Voettekstnavigatie"><a href="/">Home</a><a href="/producten/index.html">Producten</a><a href="/advies/index.html">Advies</a><a href="/voor-hoveniers.html">Voor hoveniers</a><a href="/#contact">Contact</a></nav>
      <p>Organische meststoffen en praktisch bodemadvies vanuit Landhorst, Noord-Brabant.</p><small>&copy; 2026 Eco Yard Supply</small>
    </div></footer>
    <a class="whatsapp-float" href="https://wa.me/31626672878" target="_blank" rel="noopener" aria-label="Stuur Eco Yard Supply een WhatsApp-bericht"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.03 4.25c-6.46 0-11.72 5.14-11.72 11.46 0 2.07.57 4.09 1.64 5.86L4.25 27.75l6.42-1.63a11.92 11.92 0 0 0 5.36 1.29c6.46 0 11.72-5.14 11.72-11.46S22.49 4.25 16.03 4.25Z"></path><path d="M22.62 19.24c-.29.81-1.44 1.48-2.32 1.67-.62.13-1.43.24-4.16-.88-3.48-1.43-5.72-4.94-5.9-5.17-.17-.22-1.41-1.84-1.41-3.52s.89-2.5 1.2-2.84c.29-.32.76-.47 1.2-.47.15 0 .28.01.41.02.36.02.54.04.78.61.29.69 1 2.37 1.08 2.54.09.18.18.42.05.64-.12.24-.22.35-.4.56-.18.2-.35.36-.53.58-.16.19-.34.39-.14.74.2.34.88 1.42 1.89 2.3 1.3 1.14 2.35 1.5 2.73 1.66.29.12.64.09.85-.13.27-.29.6-.78.94-1.26.24-.34.55-.38.88-.26.33.11 2.08.96 2.43 1.13.36.18.59.27.68.42.08.15.08.85-.22 1.66Z"></path></svg></a>
    <script src="/public/assets/js/main.js"></script>`;
}

function head({ title, description, canonical, type = "article", schema }) {
  return `<!doctype html><html lang="nl"><head>${analytics()}
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="${canonical}"><link rel="icon" type="image/png" href="/public/assets/images/ecoyard-favicon.png"><link rel="apple-touch-icon" href="/public/assets/images/ecoyard-favicon.png">
    <meta property="og:type" content="${type}"><meta property="og:locale" content="nl_NL"><meta property="og:site_name" content="Eco Yard Supply"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${site}/public/assets/images/ecoyard-supply-hero.png"><meta property="og:image:alt" content="Eco Yard Supply organische meststoffen in Noord-Brabant">
    <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${site}/public/assets/images/ecoyard-supply-hero.png">
    <script type="application/ld+json">${escapeJson(schema)}</script><script>document.documentElement.classList.add("js")</script><link rel="stylesheet" href="/public/assets/css/styles.css"></head>`;
}

function relatedCards(page) {
  return page.related.map((slug) => {
    const related = pageBySlug.get(slug);
    return `<article class="content-card"><p class="eyebrow">${related.eyebrow}</p><h3><a href="/advies/${related.slug}.html">${related.title}</a></h3><p>${related.description}</p><a class="read-more" href="/advies/${related.slug}.html">Lees het advies</a></article>`;
  }).join("");
}

function articleSchema(page) {
  const canonical = `${site}/advies/${page.slug}.html`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${canonical}#article`, headline: page.title, description: page.description, datePublished: published, dateModified: published, inLanguage: "nl-NL", mainEntityOfPage: canonical, author: { "@type": "Organization", name: "Eco Yard Supply", url: site }, publisher: { "@id": `${site}/#business` } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
      { "@type": "ListItem", position: 2, name: "Advies", item: `${site}/advies/` },
      { "@type": "ListItem", position: 3, name: page.title, item: canonical },
    ] },
    { "@type": "FAQPage", mainEntity: page.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
}

function articlePage(page) {
  const canonical = `${site}/advies/${page.slug}.html`;
  const faqHtml = page.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
  return makePortable(`${head({ title: page.seoTitle, description: page.description, canonical, schema: articleSchema(page) })}<body class="article-page">${header()}
    <main id="inhoud">
      <section class="article-hero"><div class="container narrow-container">
        <nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/advies/index.html">Advies</a><span aria-hidden="true">/</span><span>${page.title}</span></nav>
        <p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="article-intro">${page.intro}</p>
        <div class="article-meta"><span>Door Eco Yard Supply</span><span>Bijgewerkt ${published.split("-").reverse().join("-")}</span><span>Advies vanuit Noord-Brabant</span></div>
      </div></section>
      <section class="section"><div class="container article-layout">
        <article class="article-body">
          <aside class="direct-answer"><p class="eyebrow">Kort antwoord</p><p>${page.summary}</p></aside>
          ${page.body}
          <aside class="editorial-note"><p class="eyebrow">Bronnen en controle</p><h2>Hoe dit advies is opgebouwd</h2><p>Productsamenstelling, toepassingsperioden en doseringen zijn gecontroleerd aan de hand van de aangeleverde Dungking-productbladen. Praktische stappen zijn bewust voorwaardelijk geformuleerd, omdat bodem, weer en uitgangssituatie het resultaat beïnvloeden. De actuele verpakking en het actuele productblad blijven leidend.</p><p>Inhoudelijk gecontroleerd door Eco Yard Supply &middot; Laatste wijziging: ${published.split("-").reverse().join("-")}</p></aside>
          <section class="faq-section article-faq" aria-labelledby="faq-title"><p class="eyebrow">Veelgestelde vragen</p><h2 id="faq-title">Veelgestelde vragen</h2><div class="faq-grid">${faqHtml}</div></section>
        </article>
        <aside class="article-sidebar"><div class="sticky-card"><p class="eyebrow">Passend product</p><h2>Praktisch toepassen?</h2><p>${page.product.note}</p><a class="button" href="${page.product.href}">${page.product.label}</a><a class="text-link" href="/#contact">Vraag persoonlijk advies</a></div></aside>
      </div></section>
      <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Lees verder</p><h2>Gerelateerd advies</h2></div><div class="cards related-grid">${relatedCards(page)}</div></div></section>
      <section class="section local-cta"><div class="container split"><div><p class="eyebrow">Eco Yard Supply in Landhorst</p><h2>Advies nodig voor jouw tuin of project?</h2><p>Eco Yard Supply helpt hoveniers en particuliere tuinliefhebbers in Noord-Brabant met productkeuze, dosering en praktische toepassing.</p></div><div class="actions"><a class="button" href="tel:+31626672878">Bel +31 6 2667 2878</a><a class="button button-secondary" href="mailto:info@ecoyardsupply.nl">Stuur een e-mail</a></div></div></section>
    </main>${footer()}</body></html>`, "../", "../index.html");
}

function hubPage() {
  const canonical = `${site}/advies/`;
  const cards = advicePages.map((page) => `<article class="content-card"><p class="eyebrow">${page.eyebrow}</p><h2><a href="/advies/${page.slug}.html">${page.title}</a></h2><p>${page.description}</p><a class="read-more" href="/advies/${page.slug}.html">Lees het advies</a></article>`).join("");
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${canonical}#page`, name: adviceHub.title, description: adviceHub.description, url: canonical, inLanguage: "nl-NL", publisher: { "@id": `${site}/#business` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Advies", item: canonical }] },
  ] };
  return makePortable(`${head({ title: adviceHub.seoTitle, description: adviceHub.description, canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Advies</span></nav><p class="eyebrow">Kennisbank</p><h1>${adviceHub.title}</h1><p class="article-intro">Directe, praktische antwoorden over gazon, bodem, bemesting en nieuwe aanplant. Geschreven vanuit de vragen die Eco Yard Supply krijgt van hoveniers en tuinliefhebbers in Noord-Brabant.</p></div></section>
    <section class="section"><div class="container"><div class="topic-intro"><div><h2>Begin bij je vraag, niet bij het product</h2><p>Een sterke tuin begint met een goede diagnose. Daarom koppelt ieder artikel een probleem of seizoensvraag aan een passende aanpak, productspecificatie en duidelijke vervolgstap.</p></div><aside class="note-card"><strong>Onze schrijfregel:</strong> concrete antwoorden, controleerbare doseringen en geen onbewezen biologische, ecologische of resultaatsclaims.</aside></div><div class="cards knowledge-grid">${cards}</div></div></section>
    <section class="section pro-section"><div class="container split"><div><p class="eyebrow">Voor professionals</p><h2>Werk je als hovenier in Noord-Brabant?</h2><p>Bekijk de zakelijke pagina voor projectadvies, productkeuze, hoeveelheden en afhalen of levering vanuit Landhorst.</p></div><div class="actions"><a class="button" href="/voor-hoveniers.html">Naar de hovenierspagina</a><a class="button button-secondary" href="/#contact">Neem contact op</a></div></div></section>
  </main>${footer()}</body></html>`, "../", "../index.html");
}

function productHubPage() {
  const canonical = `${site}/producten/`;
  const products = [
    { name: "Dungking Startersmest", href: "/producten/startersmest.html", image: "/public/assets/images/products/dungking-startersmest.webp", npk: "12-3-6 + 4MgO", period: "Februari - mei", use: "Vroege start voor gazon en border", dose: "1 kg per 15 m²", advice: "/advies/gazon-bemesten-voorjaar.html" },
    { name: "Dungking Gazonmest", href: "/producten/gazonmest.html", image: "/public/assets/images/products/dungking-gazonmest.webp", npk: "9-3-6 + 4MgO", period: "Maart-april en juni-juli", use: "Groei, kleur en beworteling van het gazon", dose: "1 kg per 15 m²", advice: "/advies/gazon-bemesten.html" },
    { name: "Dungking Border- en Najaarsmest", href: "/producten/bordermest.html", image: "/public/assets/images/products/dungking-bordermest.webp", npk: "6-3-12 + 3MgO", period: "Maart-april, juni-juli en najaar", use: "Borders, bloei en winterweerbaarheid", dose: "1 kg per 15 m²; najaar 1 kg per 10 m²", advice: "/advies/gazon-bemesten-najaar.html" },
    { name: "Dungking Aanplantmest", href: "/producten/aanplantmest.html", image: "/public/assets/images/products/dungking-aanplantmest.webp", npk: "4-3-3", period: "Bij nieuwe aanleg en aanplant", use: "Gazon, graszoden, borders, bomen en hagen", dose: "Per toepassing; zie productblad", advice: "/advies/mest-bij-aanplanten.html" },
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${canonical}#page`, name: "Dungking meststoffen vergelijken", description: "Vergelijk de Dungking meststoffen van Eco Yard Supply op toepassing, seizoen, NPK en dosering.", url: canonical, inLanguage: "nl-NL", publisher: { "@id": `${site}/#business` } },
    { "@type": "ItemList", itemListElement: products.map((product, index) => ({ "@type": "ListItem", position: index + 1, url: `${site}${product.href}`, name: product.name })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Producten", item: canonical }] },
  ] };
  const rows = products.map((product) => `<tr><td><a href="${product.href}">${product.name}</a></td><td>${product.npk}</td><td>${product.period}</td><td>${product.use}</td><td>${product.dose}</td></tr>`).join("");
  const cards = products.map((product) => `<article class="product-card"><a class="product-card-media" href="${product.href}"><img src="${product.image}" alt="Productblad ${product.name}" width="900" height="1272" loading="lazy" decoding="async"></a><p class="product-card-meta">NPK ${product.npk}</p><h2>${product.name}</h2><p>${product.use}. Adviesperiode: ${product.period}.</p><a class="read-more" href="${product.href}">Bekijk product en dosering</a><a class="text-link" href="${product.advice}">Lees passend gebruiksadvies</a></article>`).join("");
  return makePortable(`${head({ title: "Dungking meststoffen vergelijken | Eco Yard Supply", description: "Vergelijk Startersmest, Gazonmest, Border- en Najaarsmest en Aanplantmest op toepassing, NPK, seizoen en dosering.", canonical, type: "website", schema })}<body class="article-page product-hub-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Producten</span></nav><p class="eyebrow">Productvergelijker</p><h1>Welke Dungking meststof past bij jouw toepassing?</h1><p class="article-intro">Vergelijk de vier producten op seizoen, NPK, toepassing en dosering. Kies niet alleen op productnaam: bodem, groeifase en doel bepalen welke mest logisch is.</p></div></section>
    <section class="section"><div class="container"><aside class="direct-answer"><p class="eyebrow">Snel kiezen</p><p>Startersmest is voor een vroege seizoensstart, Gazonmest voor gericht gazononderhoud, Border- en Najaarsmest voor borders en de latere seizoensfase, en Aanplantmest voor de wortelomgeving bij nieuwe aanleg.</p></aside><div class="table-wrap"><table class="advice-table"><thead><tr><th>Product</th><th>NPK</th><th>Periode</th><th>Hoofdtoepassing</th><th>Dosering productblad</th></tr></thead><tbody>${rows}</tbody></table></div><p class="source-line">Vergelijking gebaseerd op de actuele productinformatie in de aangeleverde Dungking-productbladen. Controleer vóór gebruik altijd de actuele verpakking.</p></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Assortiment</p><h2>Bekijk ieder product afzonderlijk</h2></div><div class="cards product-grid">${cards}</div></div></section>
    <section class="section local-cta"><div class="container split"><div><p class="eyebrow">Persoonlijk advies</p><h2>Twijfel je tussen twee producten?</h2><p>Stuur toepassing, oppervlak, bodemtype, foto's en gewenste uitvoerdatum. Eco Yard Supply denkt mee vanuit Landhorst voor projecten in Noord-Brabant.</p></div><div class="actions"><a class="button" href="tel:+31626672878">Bel voor productadvies</a><a class="button button-secondary" href="/#contact">Bekijk contactgegevens</a></div></div></section>
  </main>${footer()}</body></html>`, "../", "../index.html");
}

function professionalPage() {
  const canonical = `${site}/voor-hoveniers.html`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${canonical}#service`, name: "Meststoffen en bemestingsadvies voor hoveniers", provider: { "@id": `${site}/#business` }, areaServed: { "@type": "AdministrativeArea", name: "Noord-Brabant" }, serviceType: "Product- en toepassingsadvies voor organische meststoffen op basis van insectenmest" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Voor hoveniers", item: canonical }] },
  ] };
  return makePortable(`${head({ title: "Meststoffen voor hoveniers in Noord-Brabant | Eco Yard Supply", description: "Dungking meststoffen en praktisch bemestingsadvies voor hoveniers en groenprofessionals in Noord-Brabant. Productkeuze, dosering en afhalen op afspraak.", canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero professional-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Voor hoveniers</span></nav><p class="eyebrow">Zakelijk in Noord-Brabant</p><h1>Meststoffen en praktisch advies voor hoveniers</h1><p class="article-intro">Eco Yard Supply levert Dungking meststoffen op basis van insectenmest en denkt mee over toepassing, dosering en productkeuze voor gazon, borders en nieuwe aanplant.</p><div class="actions"><a class="button" href="tel:+31626672878">Bespreek je project</a><a class="button button-secondary" href="mailto:info@ecoyardsupply.nl?subject=Zakelijke%20aanvraag">Vraag beschikbaarheid aan</a></div></div></section>
    <section class="section"><div class="container split align-start"><div><p class="eyebrow">Praktische samenwerking</p><h2>Van productkeuze naar uitvoerbaar bemestingsplan</h2><p>De juiste mest hangt af van seizoen, bodem, beplanting en projectdoel. Deel oppervlak, planning, bodemtype en gewenste toepassing; dan kan Eco Yard Supply helpen bepalen welk product en welke hoeveelheid logisch is.</p><ul class="check-list content-checks"><li><span class="list-icon">✓</span><span>Persoonlijk contact met een leverancier vanuit Landhorst</span></li><li><span class="list-icon">✓</span><span>Productbladen met NPK, toepassingsperiode en dosering</span></li><li><span class="list-icon">✓</span><span>Keuze voor gazon, borders, voorjaar, najaar en nieuwe aanplant</span></li><li><span class="list-icon">✓</span><span>Afhalen alleen op afspraak; levering en voorraad in overleg</span></li></ul></div><aside class="direct-answer"><p class="eyebrow">Snel aanvragen</p><h2>Deze gegevens helpen</h2><ul><li>Projectplaats in Noord-Brabant</li><li>Oppervlak of strekkende meters</li><li>Gazon, border, bomen, haag of gemengd</li><li>Gewenste uitvoerdatum</li><li>Foto’s en bekende bodeminformatie</li></ul></aside></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Assortiment</p><h2>Vier producten, elk met een eigen moment</h2></div><div class="cards product-service-grid"><article class="content-card"><h3><a href="/producten/startersmest.html">Startersmest</a></h3><p>Voor gazons en borders in het vroege voorjaar. NPK 12-3-6 + 4MgO.</p></article><article class="content-card"><h3><a href="/producten/gazonmest.html">Gazonmest</a></h3><p>Voor gericht gazononderhoud in maart-april en juni-juli. NPK 9-3-6 + 4MgO.</p></article><article class="content-card"><h3><a href="/producten/bordermest.html">Border- en Najaarsmest</a></h3><p>Voor borders en de latere seizoensfase. NPK 6-3-12 + 3MgO.</p></article><article class="content-card"><h3><a href="/producten/aanplantmest.html">Aanplantmest</a></h3><p>Bodemverbeteraar voor nieuwe gazons, borders, bomen en hagen. NPK 4-3-3.</p></article></div></div></section>
    <section class="section"><div class="container split align-start"><div><p class="eyebrow">Regio</p><h2>Leverancier vanuit Landhorst</h2><p>Eco Yard Supply is gevestigd aan Tweede Stichting 9, 5445 NZ Landhorst. Bezoek en afhalen zijn alleen mogelijk op afspraak. Bespreek vooraf beschikbaarheid en levering voor je project in Noord-Brabant.</p><p>We maken bewust geen losse pagina voor iedere plaats. Lokale informatie voegen we toe zodra die wordt ondersteund door echte projecten, leveringsmogelijkheden of klantcases.</p></div><div class="sticky-card"><p class="eyebrow">Contact</p><h2>Plan je aanvraag</h2><p>Maandag t/m vrijdag 08:00-20:00<br>Zaterdag 09:00-17:00</p><a class="button" href="tel:+31626672878">Bel +31 6 2667 2878</a><a class="text-link" href="mailto:info@ecoyardsupply.nl">info@ecoyardsupply.nl</a></div></div></section>
    <section class="section pro-section"><div class="container split"><div><p class="eyebrow">Kennis delen</p><h2>Onderbouw je productkeuze richting de klant</h2><p>Gebruik de kennisbank voor uitleg over gazonbemesting, bodemverbetering, organische mest en nieuwe aanplant.</p></div><div class="actions"><a class="button" href="/advies/index.html">Bekijk de kennisbank</a><a class="button button-secondary" href="/producten/index.html">Vergelijk producten</a></div></div></section>
  </main>${footer()}</body></html>`, "", "index.html");
}

await fs.mkdir(path.join(root, "advies"), { recursive: true });
await fs.mkdir(path.join(root, "producten"), { recursive: true });
await fs.writeFile(path.join(root, "advies", "index.html"), hubPage());
for (const page of advicePages) await fs.writeFile(path.join(root, "advies", `${page.slug}.html`), articlePage(page));
await fs.writeFile(path.join(root, "producten", "index.html"), productHubPage());
await fs.writeFile(path.join(root, "voor-hoveniers.html"), professionalPage());

const urls = [
  ["/", "2026-07-22"], ["/producten/", published], ["/producten/startersmest.html", "2026-07-22"], ["/producten/gazonmest.html", "2026-07-22"], ["/producten/bordermest.html", "2026-07-22"], ["/producten/aanplantmest.html", "2026-07-22"],
  ["/voor-hoveniers.html", published], ["/advies/", published], ...advicePages.map((page) => [`/advies/${page.slug}.html`, published]),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([url, lastmod]) => `  <url><loc>${site}${url}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap);

const llms = `# Eco Yard Supply\n\nEco Yard Supply levert vanuit Landhorst organische meststoffen op basis van insectenmest en praktisch toepassingsadvies voor hoveniers en particuliere tuinliefhebbers in Noord-Brabant.\n\n## Producten\n\n- Productvergelijker: ${site}/producten/\n- Startersmest: ${site}/producten/startersmest.html\n- Gazonmest: ${site}/producten/gazonmest.html\n- Border- en Najaarsmest: ${site}/producten/bordermest.html\n- Aanplantmest: ${site}/producten/aanplantmest.html\n\n## Advies\n\n- Kennisbank: ${site}/advies/\n${advicePages.map((page) => `- ${page.title}: ${site}/advies/${page.slug}.html`).join("\n")}\n\n## Zakelijk en contact\n\n- Voor hoveniers: ${site}/voor-hoveniers.html\n- Contact: ${site}/#contact\n- E-mail: info@ecoyardsupply.nl\n- Telefoon: +31 6 2667 2878\n- Vestiging: Tweede Stichting 9, 5445 NZ Landhorst, Nederland\n\nProductclaims en doseringen horen te worden gelezen in combinatie met de actuele productpagina en het gekoppelde productblad.\n`;
await fs.writeFile(path.join(root, "llms.txt"), llms);

console.log(`Built ${advicePages.length + 3} SEO pages, sitemap.xml and llms.txt.`);
