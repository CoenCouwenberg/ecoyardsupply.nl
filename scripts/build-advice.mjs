import fs from "node:fs/promises";
import path from "node:path";
import { adviceHub, advicePages } from "../content/advice-pages.mjs";

const root = path.resolve(import.meta.dirname, "..");
const published = "2026-07-22";
const contentUpdate = "2026-08-31";
const seedUpdate = "2026-10-01";
const vitalmixUpdate = "2026-09-30";
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
          <a href="/producten/">Producten</a><a href="/advies/">Advies</a><a href="/voor-hoveniers">Voor hoveniers</a><a href="/#over-ons">Over ons</a><a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-inner">
      <img src="/public/assets/images/ecoyard-supply-logo.webp" alt="Eco Yard Supply" width="500" height="237" loading="lazy" decoding="async">
      <nav class="footer-nav" aria-label="Voettekstnavigatie"><a href="/">Home</a><a href="/producten/">Producten</a><a href="/advies/">Advies</a><a href="/voor-hoveniers">Voor hoveniers</a><a href="/#contact">Contact</a></nav>
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
    return `<article class="content-card"><p class="eyebrow">${related.eyebrow}</p><h3><a href="/advies/${related.slug}">${related.title}</a></h3><p>${related.description}</p><a class="read-more" href="/advies/${related.slug}">Lees het advies</a></article>`;
  }).join("");
}

function articleSchema(page) {
  const canonical = `${site}/advies/${page.slug}`;
  const datePublished = page.datePublished || published;
  const dateModified = page.dateModified || datePublished;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${canonical}#article`, headline: page.title, description: page.description, datePublished, dateModified, inLanguage: "nl-NL", mainEntityOfPage: canonical, author: { "@type": "Organization", name: "Eco Yard Supply", url: site }, publisher: { "@id": `${site}/#business` } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
      { "@type": "ListItem", position: 2, name: "Advies", item: `${site}/advies/` },
      { "@type": "ListItem", position: 3, name: page.title, item: canonical },
    ] },
    { "@type": "FAQPage", mainEntity: page.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ] };
}

function articlePage(page) {
  const canonical = `${site}/advies/${page.slug}`;
  const dateModified = page.dateModified || page.datePublished || published;
  const bodyHtml = page.body.trim();
  const faqHtml = page.faq.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("");
  return makePortable(`${head({ title: page.seoTitle, description: page.description, canonical, schema: articleSchema(page) })}<body class="article-page">${header()}
    <main id="inhoud">
      <section class="article-hero"><div class="container narrow-container">
        <nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/advies/">Advies</a><span aria-hidden="true">/</span><span>${page.title}</span></nav>
        <p class="eyebrow">${page.eyebrow}</p><h1>${page.title}</h1><p class="article-intro">${page.intro}</p>
        <div class="article-meta"><span>Door Eco Yard Supply</span><span>Bijgewerkt ${dateModified.split("-").reverse().join("-")}</span><span>Advies vanuit Noord-Brabant</span></div>
      </div></section>
      <section class="section"><div class="container article-layout">
        <article class="article-body">
          <aside class="direct-answer"><p class="eyebrow">Kort antwoord</p><p>${page.summary}</p></aside>
      ${bodyHtml}
          <aside class="editorial-note"><p class="eyebrow">Bronnen en controle</p><h2>Hoe dit advies is opgebouwd</h2>${page.sourceNote || `<p>Productsamenstelling, toepassingsperioden en doseringen zijn gecontroleerd aan de hand van de aangeleverde Dungking-productbladen. Praktische stappen zijn bewust voorwaardelijk geformuleerd, omdat bodem, weer en uitgangssituatie het resultaat beïnvloeden. De actuele verpakking en het actuele productblad blijven leidend.</p><p>Inhoudelijk gecontroleerd door Eco Yard Supply &middot; Laatste wijziging: ${dateModified.split("-").reverse().join("-")}</p>`}</aside>
          <section class="faq-section article-faq" aria-labelledby="faq-title"><p class="eyebrow">Veelgestelde vragen</p><h2 id="faq-title">Veelgestelde vragen</h2><div class="faq-grid">${faqHtml}</div></section>
        </article>
        <aside class="article-sidebar"><div class="sticky-card"><p class="eyebrow">Passend product</p><h2>Praktisch toepassen?</h2><p>${page.product.note}</p><a class="button" href="${page.product.href}">${page.product.label}</a><a class="text-link" href="/#contact">Vraag persoonlijk advies</a></div></aside>
      </div></section>
      <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Lees verder</p><h2>Gerelateerd advies</h2></div><div class="cards related-grid">${relatedCards(page)}</div></div></section>
      <section class="section local-cta"><div class="container split"><div><p class="eyebrow">Eco Yard Supply in Landhorst</p><h2>Advies nodig voor jouw tuin of project?</h2><p>Eco Yard Supply helpt hoveniers en particuliere tuinliefhebbers in Noord-Brabant met productkeuze, dosering en praktische toepassing.</p></div><div class="actions"><a class="button" href="tel:+31626672878">Bel +31 6 2667 2878</a><a class="button button-secondary" href="mailto:info@ecoyardsupply.nl">Stuur een e-mail</a></div></div></section>
    </main>${footer()}</body></html>`, "../", "../");
}

function hubPage() {
  const canonical = `${site}/advies/`;
  const adviceGroups = [
    { title: "Graszaad", slugs: ["wanneer-graszaad-zaaien", "hoeveel-graszaad-per-m2"] },
    { title: "Aanplantgrond", slugs: ["aanplantgrond-of-tuinaarde", "hoeveel-aanplantgrond-nodig"] },
    { title: "Gazon verzorgen", slugs: ["gazon-bemesten", "gazon-herstellen", "organische-gazonmest-of-kunstmest", "gazon-bemesten-voorjaar", "gazon-bemesten-najaar", "mest-voor-graszoden"] },
    { title: "Tuin, borders en bomen", slugs: ["tuin-bemesten", "rozen-bemesten", "borders-bemesten", "beukenhaag-bemesten", "fruitbomen-bemesten"] },
    { title: "Bodem en bemesting", slugs: advicePages.filter((page) => !["wanneer-graszaad-zaaien", "hoeveel-graszaad-per-m2", "aanplantgrond-of-tuinaarde", "hoeveel-aanplantgrond-nodig", "gazon-bemesten", "gazon-herstellen", "organische-gazonmest-of-kunstmest", "gazon-bemesten-voorjaar", "gazon-bemesten-najaar", "mest-voor-graszoden", "tuin-bemesten", "rozen-bemesten", "borders-bemesten", "beukenhaag-bemesten", "fruitbomen-bemesten"].includes(page.slug)).map((page) => page.slug) },
  ];
  const categoryBySlug = new Map(adviceGroups.flatMap((group, index) => group.slugs.map((slug) => [slug, String(index)])));
  const filters = [{ title: "Alles", value: "all" }, ...adviceGroups.map((group, index) => ({ title: group.title, value: String(index) }))].map((group) => `<button class="advice-filter" type="button" data-advice-filter="${group.value}" aria-pressed="${group.value === "all"}" aria-controls="advice-cards">${group.title}</button>`).join("");
  const cards = advicePages.map((page) => `<article class="content-card" data-advice-category="${categoryBySlug.get(page.slug)}"><p class="eyebrow">${page.eyebrow}</p><h2><a href="/advies/${page.slug}">${page.title}</a></h2><p>${page.description}</p><a class="read-more" href="/advies/${page.slug}">Lees het advies</a></article>`).join("");
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${canonical}#page`, name: adviceHub.title, description: adviceHub.description, url: canonical, inLanguage: "nl-NL", publisher: { "@id": `${site}/#business` } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Advies", item: canonical }] },
  ] };
  return makePortable(`${head({ title: adviceHub.seoTitle, description: adviceHub.description, canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Advies</span></nav><p class="eyebrow">Kennisbank</p><h1>${adviceHub.title}</h1><p class="article-intro">Directe, praktische antwoorden over graszaad, tuin en gazon bemesten, insectenmest, bodem en aanplantgrond. Geschreven voor hoveniers en tuinliefhebbers in Noord-Brabant.</p></div></section>
    <section class="section"><div class="container"><div class="section-heading"><h2>Alle adviesartikelen</h2><p>Bekijk alle artikelen of kies een onderwerp dat past bij jouw tuin of project.</p></div><div class="advice-filters" role="group" aria-label="Filter adviesartikelen op onderwerp" hidden>${filters}</div><p class="advice-result-count" data-advice-count role="status" aria-live="polite" aria-atomic="true">${advicePages.length} artikelen</p><div class="cards knowledge-grid" id="advice-cards">${cards}</div></div></section>
    <section class="section pro-section"><div class="container split"><div><p class="eyebrow">Voor professionals</p><h2>Werk je als hovenier in Noord-Brabant?</h2><p>Bekijk de zakelijke pagina voor projectadvies, productkeuze, hoeveelheden en afhalen of levering vanuit Landhorst.</p></div><div class="actions"><a class="button" href="/voor-hoveniers">Naar de hovenierspagina</a><a class="button button-secondary" href="/#contact">Neem contact op</a></div></div></section>
  </main>${footer()}</body></html>`, "../", "../");
}

function vitalmixPage() {
  const canonical = `${site}/producten/vitalmix`;
  const title = "Vitalmix aanplantgrond 50 liter | Eco Yard Supply";
  const description = "Vitalmix: hoogwaardige aanplantgrond in zakken van 50 liter. Bekijk de samenstelling en vraag Eco Yard Supply om advies voor jouw aanplantproject.";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${canonical}#page`, name: title, description, url: canonical, dateModified: vitalmixUpdate, inLanguage: "nl-NL" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Producten", item: `${site}/producten/` }, { "@type": "ListItem", position: 3, name: "Vitalmix aanplantgrond", item: canonical }] },
  ] };
  return makePortable(`${head({ title, description, canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/producten/">Producten</a><span aria-hidden="true">/</span><span>Vitalmix</span></nav><p class="eyebrow">Hoogwaardige aanplantgrond · 50 liter</p><h1>Vitalmix aanplantgrond</h1><p class="article-intro">Een grondmengsel voor nieuwe aanplant, voor hoveniers en particuliere tuinliefhebbers. Vitalmix is verkrijgbaar per zak van 50 liter. Eco Yard Supply denkt met je mee over de toepassing en de hoeveelheid voor jouw project.</p><div class="actions"><a class="button" href="/#contact">Vraag advies over Vitalmix</a><a class="button button-secondary" href="#samenstelling">Bekijk de samenstelling</a></div></div></section>
    <section class="section"><div class="container article-layout"><article class="article-body">
      <aside class="direct-answer"><p class="eyebrow">Vitalmix in het kort</p><p><strong>Product:</strong> hoogwaardige aanplantgrond.<br><strong>Inhoud:</strong> 50 liter per zak.<br><strong>Toepassing:</strong> nieuwe aanplant; stem de productkeuze en verwerking af op je beplanting en de bestaande grond.</p></aside>
      <h2 id="samenstelling">Wat zit er in Vitalmix?</h2><p>Vitalmix bevat de volgende grondstoffen en toevoegingen:</p>
      <div class="table-wrap"><table class="advice-table compact-table"><caption>Samenstelling Vitalmix</caption><thead><tr><th scope="col">Onderdeel</th><th scope="col">Grondstoffen en toevoegingen</th></tr></thead><tbody><tr><th scope="row">Grondmengsel</th><td>Baltisch veen middel, Horticompost, Hortivezel en tuinturf middel</td></tr><tr><th scope="row">Toevoeging</th><td>Biovin</td></tr><tr><th scope="row">Bemesting</th><td>Bemesting 4-7-7 en aanplantmest</td></tr><tr><th scope="row">Verpakking</th><td>Zak van 50 liter</td></tr></tbody></table></div>
      <p>De aanduiding 4-7-7 hoort bij de toegevoegde bemesting. Het is geen opgegeven NPK-waarde van het volledige grondmengsel. Omdat Vitalmix veen en tuinturf bevat, is het geen turfvrije aanplantgrond.</p>
      <h2 id="gebruik">Vitalmix gebruiken bij jouw aanplant</h2><p>Een passende grondkeuze begint bij de planten en de bestaande bodem. Geef bij je aanvraag aan wat je wilt planten, of het om volle grond of een bak gaat en welke grond er al aanwezig is. Bespreek daarna de verwerking, mengverhouding en benodigde hoeveelheid.</p><p>Volg vóór gebruik het actuele productvoorschrift. Voeg niet automatisch extra mest toe: Vitalmix bevat al bemesting en aanplantmest. Laat de keuze voor eventuele aanvullende voeding afhangen van het toepassingsadvies.</p>
      <h2 id="hoeveelheid">Hoeveel zakken van 50 liter heb je nodig?</h2><p>Meet de te vullen ruimte en houd rekening met de kluiten en de bestaande grond die je opnieuw gebruikt. Zodra de benodigde hoeveelheid aanplantgrond bekend is, deel je die door 50 om het aantal zakken te berekenen. Zo is 100 liter gelijk aan twee zakken. Bekijk de <a href="/advies/hoeveel-aanplantgrond-nodig">uitleg met rekenvoorbeelden voor liters en zakken</a>.</p>
      <h2 id="aanplantmest">Aanplantgrond en aanplantmest: twee verschillende producten</h2><p>Vitalmix is een grondmengsel. De afzonderlijke <a href="/producten/aanplantmest">Dungking Aanplantmest</a> heeft een eigen samenstelling en doseervoorschrift. Neem die dosering niet over voor Vitalmix en combineer de producten niet zonder toepassingsadvies. Lees ook <a href="/advies/aanplantgrond-of-tuinaarde">hoe je kiest tussen aanplantgrond, tuinaarde en aanplantmest</a>.</p>
      <p class="source-line">Productinformatie aangeleverd door Eco Yard Supply op 28 september 2026. De actuele verpakking en het toepassingsadvies zijn leidend bij gebruik.</p>
    </article><aside class="article-sidebar"><div class="sticky-card"><p class="eyebrow">Jouw aanplantproject</p><h2>Bespreek je aanvraag</h2><p>Geef de plantnamen, afmetingen en gewenste hoeveelheid door. Vraag naar prijs, beschikbaarheid en de mogelijkheden voor afhalen of levering.</p><a class="button" href="tel:+31626672878">Bel Harm voor advies</a><a class="text-link" href="mailto:info@ecoyardsupply.nl?subject=Aanvraag%20Vitalmix">Mail over Vitalmix</a><p>Eco Yard Supply<br>Landhorst, Noord-Brabant<br>Bezoek en afhalen op afspraak.</p></div></aside></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Voorbereid aanplanten</p><h2>Praktisch advies bij Vitalmix</h2></div><div class="cards related-grid">${relatedCards({ related: ["aanplantgrond-of-tuinaarde", "hoeveel-aanplantgrond-nodig", "mest-bij-aanplanten"] })}</div></div></section>
  </main>${footer()}</body></html>`, "../", "../");
}

function kingseedPage() {
  const canonical = `${site}/producten/kingseed`;
  const title = "KingSeed Allround graszaad | Eco Yard Supply";
  const description = "KingSeed Allround graszaad voor nieuwe aanleg en doorzaai, in zon en halfschaduw. Bekijk samenstelling, zaaihoeveelheid en het productblad.";
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${canonical}#page`, name: title, description, url: canonical, dateModified: seedUpdate, inLanguage: "nl-NL" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Producten", item: `${site}/producten/` }, { "@type": "ListItem", position: 3, name: "KingSeed Allround", item: canonical }] },
  ] };
  return makePortable(`${head({ title, description, canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/producten/">Producten</a><span aria-hidden="true">/</span><a href="/producten/#zaden">Zaden</a><span aria-hidden="true">/</span><span>KingSeed</span></nav><p class="eyebrow">Zaden · Graszaad</p><h1>KingSeed Allround graszaad</h1><p class="article-intro">Een mengsel van drie grassoorten voor een nieuw gazon of het doorzaaien van een bestaande grasmat. Geschikt voor zon en halfschaduw, met een eigen zaaihoeveelheid per toepassing.</p><div class="actions"><a class="button" href="/#contact">Vraag KingSeed aan</a><a class="button button-secondary" href="/public/assets/pdfs/kingseed-allround.pdf" download>Download productblad (PDF)</a></div></div></section>
    <section class="section"><div class="container article-layout"><article class="article-body">
      <aside class="direct-answer"><p class="eyebrow">KingSeed in het kort</p><p><strong>Verpakking:</strong> 7,5 kg.<br><strong>Nieuw gazon:</strong> 25 g/m², voldoende voor 300 m².<br><strong>Doorzaaien:</strong> 10 g/m², voldoende voor 750 m².<br><strong>Zaaiperiode:</strong> april tot en met oktober, bij minimaal 10 °C bodemtemperatuur.</p></aside>
      <h2 id="samenstelling">Samenstelling van het grasmengsel</h2><div class="table-wrap"><table class="advice-table compact-table"><thead><tr><th scope="col">Grassoort</th><th scope="col">Aandeel</th></tr></thead><tbody><tr><td>Engels raaigras</td><td>75%</td></tr><tr><td>Veldbeemdgras</td><td>15%</td></tr><tr><td>Roodzwenkgras</td><td>10%</td></tr></tbody></table></div>
      <p>Het productblad beschrijft KingSeed Allround als een mengsel voor intensief gebruik en spelen, geschikt voor zon en halfschaduw. De ontwikkeling van je gazon hangt mede af van bodem, vocht, licht en onderhoud.</p>
      <h2 id="dosering">Hoeveel KingSeed heb je nodig?</h2><p>Meet het oppervlak dat je wilt zaaien. Gebruik 25 gram per m² voor nieuwe aanleg of 10 gram per m² voor doorzaai. Voor 100 m² is dat respectievelijk 2,5 kg of 1 kg. Lees de <a href="/advies/hoeveel-graszaad-per-m2">rekentabel voor graszaad per m²</a> voor meer oppervlakken.</p>
      <h2 id="gebruik">Zaaien en verzorgen</h2><ol class="steps-list"><li><strong>Controleer de omstandigheden.</strong> Zaai van april tot en met oktober bij minimaal 10 °C bodemtemperatuur.</li><li><strong>Maak de bodem goed los.</strong> Bereid de te zaaien plek voor en verdeel de afgewogen hoeveelheid gelijkmatig.</li><li><strong>Houd de grond vochtig.</strong> Controleer het bodemvocht gedurende de eerste weken.</li><li><strong>Maai op het juiste moment.</strong> Het productblad noemt de eerste maaibeurt zodra het gras 8 cm hoog is.</li></ol>
      <p>Het productblad noemt zichtbaar resultaat binnen één tot twee weken. Dit is een indicatie bij passende omstandigheden en geen garantie op een volledig dicht gazon in die periode. Bekijk ook <a href="/advies/wanneer-graszaad-zaaien">het advies over het zaaimoment en nazorg</a>.</p>
      <h2 id="bewaren">Bewaren en houdbaarheid</h2><p>Volgens het productblad is KingSeed twee jaar ongeopend en één jaar na openen houdbaar, mits donker en droog bewaard. Controleer ook de houdbaarheidsinformatie op je verpakking.</p>
      <h2 id="productblad">Het complete productblad</h2><p>Bekijk of download het aangeleverde productblad voor de productinformatie en gebruiksrichtlijnen. Volg bij toepassing altijd de actuele verpakking.</p><a class="button button-secondary" href="/public/assets/pdfs/kingseed-allround.pdf" download>Download KingSeed-productblad</a>
      <p class="source-line">Bron: het door Eco Yard Supply aangeleverde KingSeed Allround-productblad. De zaairichtlijnen op deze pagina horen bij dit specifieke product.</p>
    </article><aside class="article-sidebar"><div class="sticky-card"><a class="seed-flyer" href="/public/assets/pdfs/kingseed-allround.pdf" aria-label="Bekijk het KingSeed Allround-productblad als PDF"><img src="/public/assets/images/products/kingseed-allround.webp" alt="KingSeed Allround-productblad met emmer graszaad, samenstelling en zaairichtlijnen" width="900" height="1277" loading="lazy" decoding="async"></a><p class="eyebrow">Voor jouw gazon</p><h2>Bespreek je aanvraag</h2><p>Geef je oppervlakte door en vermeld of je een nieuw gazon aanlegt of doorzaait. Vraag naar prijs en beschikbaarheid.</p><a class="button" href="tel:+31626672878">Bel voor graszaadadvies</a><a class="text-link" href="mailto:info@ecoyardsupply.nl?subject=Aanvraag%20KingSeed">Mail over KingSeed</a></div></aside></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Praktisch aan de slag</p><h2>Advies over graszaad en gazonherstel</h2></div><div class="cards related-grid">${relatedCards({ related: ["wanneer-graszaad-zaaien", "hoeveel-graszaad-per-m2", "gazon-herstellen"] })}</div></div></section>
  </main>${footer()}</body></html>`, "../", "../");
}

function productHubPage() {
  const canonical = `${site}/producten/`;
  const products = [
    { name: "Dungking Startersmest", href: "/producten/startersmest", image: "/public/assets/images/products/dungking-startersmest.webp", npk: "12-3-6 + 4MgO", period: "Februari - mei", use: "Vroege start voor gazon en border", dose: "1 kg per 15 m²", advice: "/advies/gazon-bemesten-voorjaar" },
    { name: "Dungking Gazonmest", href: "/producten/gazonmest", image: "/public/assets/images/products/dungking-gazonmest.webp", npk: "9-3-6 + 4MgO", period: "Maart-april en juni-juli", use: "Groei, kleur en beworteling van het gazon", dose: "1 kg per 15 m²", advice: "/advies/gazon-bemesten" },
    { name: "Dungking Border- en Najaarsmest", href: "/producten/bordermest", image: "/public/assets/images/products/dungking-bordermest.webp", npk: "6-3-12 + 3MgO", period: "Maart-april, juni-juli en najaar", use: "Borders, bloei en winterweerbaarheid", dose: "1 kg per 15 m²; najaar 1 kg per 10 m²", advice: "/advies/gazon-bemesten-najaar" },
    { name: "Dungking Aanplantmest", href: "/producten/aanplantmest", image: "/public/assets/images/products/dungking-aanplantmest.webp", npk: "4-3-3", period: "Bij nieuwe aanleg en aanplant", use: "Gazon, graszoden, borders, bomen en hagen", dose: "Per toepassing; zie productblad", advice: "/advies/mest-bij-aanplanten" },
  ];
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": `${canonical}#page`, name: "Meststoffen, aanplantgrond en zaden", description: "Bekijk Dungking meststoffen, Vitalmix aanplantgrond en KingSeed graszaad bij Eco Yard Supply.", url: canonical, inLanguage: "nl-NL", publisher: { "@id": `${site}/#business` } },
    { "@type": "ItemList", itemListElement: [...products, { name: "Vitalmix aanplantgrond 50 liter", href: "/producten/vitalmix" }, { name: "KingSeed Allround graszaad", href: "/producten/kingseed" }].map((product, index) => ({ "@type": "ListItem", position: index + 1, url: `${site}${product.href}`, name: product.name })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Producten", item: canonical }] },
  ] };
  const rows = products.map((product) => `<tr><td><a href="${product.href}">${product.name}</a></td><td>${product.npk}</td><td>${product.period}</td><td>${product.use}</td><td>${product.dose}</td></tr>`).join("");
  const cards = products.map((product) => `<article class="product-card"><a class="product-card-media" href="${product.href}"><img src="${product.image}" alt="Productblad ${product.name}" width="900" height="1272" loading="lazy" decoding="async"></a><p class="product-card-meta">NPK ${product.npk}</p><h2>${product.name}</h2><p>${product.use}. Adviesperiode: ${product.period}.</p><a class="read-more" href="${product.href}">Bekijk product en dosering</a><a class="text-link" href="${product.advice}">Lees passend gebruiksadvies</a></article>`).join("");
  return makePortable(`${head({ title: "Meststoffen, aanplantgrond en zaden | Eco Yard Supply", description: "Bekijk Dungking meststoffen, Vitalmix aanplantgrond en KingSeed Allround graszaad. Productinformatie, dosering en persoonlijk advies voor jouw tuin.", canonical, type: "website", schema })}<body class="article-page product-hub-page">${header()}<main id="inhoud">
    <section class="article-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Producten</span></nav><p class="eyebrow">Ons assortiment</p><h1>Meststoffen, aanplantgrond en zaden</h1><p class="article-intro">Vind Dungking meststoffen, Vitalmix aanplantgrond en KingSeed graszaad voor jouw tuin of project. Kies hieronder de productgroep die bij je vraag past.</p><nav class="actions" aria-label="Productgroepen"><a class="button button-secondary" href="#meststoffen">Meststoffen</a><a class="button button-secondary" href="#aanplantgrond">Aanplantgrond</a><a class="button button-secondary" href="#zaden">Zaden</a></nav></div></section>
    <section class="section muted-section" id="aanplantgrond"><div class="container split align-start"><div><p class="eyebrow">50 liter per zak</p><h2>Aanplantgrond</h2><h3><a href="/producten/vitalmix">Vitalmix: hoogwaardige aanplantgrond</a></h3><p>Een grondmengsel met Baltisch veen middel, Horticompost, Hortivezel, tuinturf middel en Biovin, met toegevoegde bemesting en aanplantmest. Bespreek de toepassing en benodigde hoeveelheid voor jouw project.</p><a class="button" href="/producten/vitalmix">Bekijk Vitalmix aanplantgrond</a></div><aside class="note-card"><h3>Grond of mest kiezen?</h3><p>Lees het <a href="/advies/aanplantgrond-of-tuinaarde">verschil tussen aanplantgrond, tuinaarde en aanplantmest</a> of bereken <a href="/advies/hoeveel-aanplantgrond-nodig">hoeveel liters aanplantgrond je nodig hebt</a>.</p></aside></div></section>
    <section class="section" id="meststoffen"><div class="container"><div class="section-heading"><p class="eyebrow">Dungking</p><h2>Meststoffen</h2></div><aside class="direct-answer"><p class="eyebrow">Snel kiezen</p><p>Startersmest is voor een vroege seizoensstart, Gazonmest voor gericht gazononderhoud, Border- en Najaarsmest voor borders en de latere seizoensfase, en Aanplantmest voor de wortelomgeving bij nieuwe aanleg. Bekijk ook <a href="/advies/tuin-bemesten">wanneer je welk deel van de tuin bemest</a> en <a href="/advies/insectenmest">wat insectenmest binnen het Dungking-assortiment betekent</a>.</p></aside><div class="table-wrap"><table class="advice-table"><thead><tr><th>Product</th><th>NPK</th><th>Periode</th><th>Hoofdtoepassing</th><th>Dosering productblad</th></tr></thead><tbody>${rows}</tbody></table></div><p class="source-line">Vergelijking gebaseerd op de actuele productinformatie in de aangeleverde Dungking-productbladen. Controleer vóór gebruik altijd de actuele verpakking.</p></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Assortiment</p><h2>Bekijk ieder product afzonderlijk</h2></div><div class="cards product-grid">${cards}</div></div></section>
    <section class="section" id="zaden"><div class="container"><div class="section-heading"><p class="eyebrow">Voor nieuwe aanleg en doorzaai</p><h2>Zaden</h2><p>Bekijk het graszaad en kies de hoeveelheid die past bij jouw gazon.</p></div><article class="content-card seed-product"><a class="seed-flyer" href="/producten/kingseed"><img src="/public/assets/images/products/kingseed-allround.webp" alt="Productblad KingSeed Allround graszaad" width="900" height="1277" loading="lazy" decoding="async"></a><div><p class="eyebrow">Graszaad · 7,5 kg</p><h3><a href="/producten/kingseed">KingSeed Allround</a></h3><p>Grasmengsel voor zon en halfschaduw. Eén verpakking is bij de richtlijn van 25 g/m² voldoende voor 300 m² nieuw gazon, of bij 10 g/m² voor 750 m² doorzaai.</p><div class="actions"><a class="button" href="/producten/kingseed">Bekijk KingSeed graszaad</a><a class="text-link" href="/public/assets/pdfs/kingseed-allround.pdf" download>Download productblad (PDF)</a></div><p>Lees ook <a href="/advies/wanneer-graszaad-zaaien">wanneer je graszaad zaait</a> en <a href="/advies/hoeveel-graszaad-per-m2">hoeveel graszaad je per m² nodig hebt</a>.</p></div></article></div></section>
    <section class="section local-cta"><div class="container split"><div><p class="eyebrow">Persoonlijk advies</p><h2>Twijfel je tussen twee producten?</h2><p>Stuur toepassing, oppervlak, bodemtype, foto's en gewenste uitvoerdatum. Eco Yard Supply denkt mee vanuit Landhorst voor projecten in Noord-Brabant.</p></div><div class="actions"><a class="button" href="tel:+31626672878">Bel voor productadvies</a><a class="button button-secondary" href="/#contact">Bekijk contactgegevens</a></div></div></section>
  </main>${footer()}</body></html>`, "../", "../");
}

function professionalPage() {
  const canonical = `${site}/voor-hoveniers`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${canonical}#service`, name: "Meststoffen en bemestingsadvies voor hoveniers", provider: { "@id": `${site}/#business` }, areaServed: { "@type": "AdministrativeArea", name: "Noord-Brabant" }, serviceType: "Product- en toepassingsadvies voor organische meststoffen op basis van insectenmest" },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${site}/` }, { "@type": "ListItem", position: 2, name: "Voor hoveniers", item: canonical }] },
  ] };
  return makePortable(`${head({ title: "Meststoffen voor hoveniers in Noord-Brabant | Eco Yard Supply", description: "Dungking meststoffen en praktisch bemestingsadvies voor hoveniers en groenprofessionals in Noord-Brabant. Productkeuze, dosering en afhalen op afspraak.", canonical, type: "website", schema })}<body class="article-page">${header()}<main id="inhoud">
    <section class="article-hero professional-hero"><div class="container narrow-container"><nav class="breadcrumbs" aria-label="Broodkruimels"><a href="/">Home</a><span aria-hidden="true">/</span><span>Voor hoveniers</span></nav><p class="eyebrow">Zakelijk in Noord-Brabant</p><h1>Dungking meststoffen voor hoveniers in Noord-Brabant</h1><p class="article-intro">Eco Yard Supply levert Dungking meststoffen op basis van insectenmest en denkt mee over toepassing, dosering en productkeuze voor gazon, borders en nieuwe aanplant.</p><div class="actions"><a class="button" href="tel:+31626672878">Bespreek je project</a><a class="button button-secondary" href="mailto:info@ecoyardsupply.nl?subject=Zakelijke%20aanvraag">Vraag beschikbaarheid aan</a></div></div></section>
    <section class="section"><div class="container split align-start"><div><p class="eyebrow">Praktische samenwerking</p><h2>Van productkeuze naar uitvoerbaar bemestingsplan</h2><p>De juiste mest hangt af van seizoen, bodem, beplanting en projectdoel. Deel oppervlak, planning, bodemtype en gewenste toepassing; dan kan Eco Yard Supply helpen bepalen welk product en welke hoeveelheid logisch is.</p><ul class="check-list content-checks"><li><span class="list-icon">✓</span><span>Persoonlijk contact met een leverancier vanuit Landhorst</span></li><li><span class="list-icon">✓</span><span>Productbladen met NPK, toepassingsperiode en dosering</span></li><li><span class="list-icon">✓</span><span>Keuze voor gazon, borders, voorjaar, najaar en nieuwe aanplant</span></li><li><span class="list-icon">✓</span><span>Afhalen alleen op afspraak; levering en voorraad in overleg</span></li></ul></div><aside class="direct-answer"><p class="eyebrow">Snel aanvragen</p><h2>Deze gegevens helpen</h2><ul><li>Projectplaats in Noord-Brabant</li><li>Oppervlak of strekkende meters</li><li>Gazon, border, bomen, haag of gemengd</li><li>Gewenste uitvoerdatum</li><li>Foto’s en bekende bodeminformatie</li></ul></aside></div></section>
    <section class="section muted-section"><div class="container"><div class="section-heading"><p class="eyebrow">Assortiment</p><h2>Meststoffen, grond en zaden voor je project</h2></div><div class="cards product-service-grid"><article class="content-card"><p class="eyebrow">Zaden</p><h3><a href="/producten/kingseed">KingSeed Allround</a></h3><p>Graszaad voor nieuwe aanleg en doorzaai. Bekijk de productspecifieke hoeveelheid per m² en het productblad.</p></article><article class="content-card"><h3><a href="/producten/vitalmix">Vitalmix aanplantgrond</a></h3><p>Hoogwaardige aanplantgrond in zakken van 50 liter. Bespreek de toepassing en hoeveelheid voor je aanplantproject.</p></article><article class="content-card"><h3><a href="/producten/startersmest">Startersmest</a></h3><p>Voor gazons en borders in het vroege voorjaar. NPK 12-3-6 + 4MgO.</p></article><article class="content-card"><h3><a href="/producten/gazonmest">Gazonmest</a></h3><p>Voor gericht gazononderhoud in maart-april en juni-juli. NPK 9-3-6 + 4MgO.</p></article><article class="content-card"><h3><a href="/producten/bordermest">Border- en Najaarsmest</a></h3><p>Voor borders en de latere seizoensfase. NPK 6-3-12 + 3MgO.</p></article><article class="content-card"><h3><a href="/producten/aanplantmest">Aanplantmest</a></h3><p>Bodemverbeteraar voor nieuwe gazons, borders, bomen en hagen. NPK 4-3-3.</p></article></div></div></section>
    <section class="section"><div class="container split align-start"><div><p class="eyebrow">Regio</p><h2>Leverancier vanuit Landhorst</h2><p>Eco Yard Supply is gevestigd aan Tweede Stichting 9, 5445 NZ Landhorst. Bezoek en afhalen zijn alleen mogelijk op afspraak. Bespreek vooraf beschikbaarheid en levering voor je project in Noord-Brabant.</p><p>We maken bewust geen losse pagina voor iedere plaats. Lokale informatie voegen we toe zodra die wordt ondersteund door echte projecten, leveringsmogelijkheden of klantcases.</p></div><div class="sticky-card"><p class="eyebrow">Contact</p><h2>Plan je aanvraag</h2><p>Maandag t/m vrijdag 08:00-20:00<br>Zaterdag 09:00-17:00</p><a class="button" href="tel:+31626672878">Bel +31 6 2667 2878</a><a class="text-link" href="mailto:info@ecoyardsupply.nl">info@ecoyardsupply.nl</a></div></div></section>
    <section class="section pro-section"><div class="container split"><div><p class="eyebrow">Kennis delen</p><h2>Onderbouw je productkeuze richting de klant</h2><p>Gebruik de kennisbank voor uitleg over <a href="/advies/insectenmest">insectenmest</a>, tuin- en gazonbemesting, bodemverbetering en nieuwe aanplant.</p></div><div class="actions"><a class="button" href="/advies/">Bekijk de kennisbank</a><a class="button button-secondary" href="/producten/">Vergelijk producten</a></div></div></section>
  </main>${footer()}</body></html>`, "", "./");
}

await fs.mkdir(path.join(root, "advies"), { recursive: true });
await fs.mkdir(path.join(root, "producten"), { recursive: true });
await fs.writeFile(path.join(root, "advies", "index.html"), hubPage());
for (const page of advicePages) await fs.writeFile(path.join(root, "advies", `${page.slug}.html`), articlePage(page));
await fs.writeFile(path.join(root, "producten", "index.html"), productHubPage());
await fs.writeFile(path.join(root, "producten", "vitalmix.html"), vitalmixPage());
await fs.writeFile(path.join(root, "producten", "kingseed.html"), kingseedPage());
await fs.writeFile(path.join(root, "voor-hoveniers.html"), professionalPage());

const urls = [
  ["/", seedUpdate], ["/producten/", seedUpdate], ["/producten/kingseed", seedUpdate], ["/producten/vitalmix", vitalmixUpdate], ["/producten/startersmest", "2026-07-22"], ["/producten/gazonmest", contentUpdate], ["/producten/bordermest", contentUpdate], ["/producten/aanplantmest", "2026-07-22"],
  ["/voor-hoveniers", seedUpdate], ["/advies/", seedUpdate], ...advicePages.map((page) => [`/advies/${page.slug}`, page.dateModified || page.datePublished || published]),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([url, lastmod]) => `  <url><loc>${site}${url}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`;
await fs.writeFile(path.join(root, "sitemap.xml"), sitemap);

const llms = `# Eco Yard Supply\n\nEco Yard Supply levert vanuit Landhorst organische meststoffen op basis van insectenmest en praktisch toepassingsadvies voor hoveniers en particuliere tuinliefhebbers in Noord-Brabant.\n\n## Producten\n\n- Productvergelijker: ${site}/producten/\n- Vitalmix aanplantgrond (50 liter): ${site}/producten/vitalmix\n- Zaden: ${site}/producten/#zaden\n- KingSeed Allround graszaad: ${site}/producten/kingseed\n- Startersmest: ${site}/producten/startersmest\n- Gazonmest: ${site}/producten/gazonmest\n- Border- en Najaarsmest: ${site}/producten/bordermest\n- Aanplantmest: ${site}/producten/aanplantmest\n\n## Advies\n\n- Kennisbank: ${site}/advies/\n${advicePages.map((page) => `- ${page.title}: ${site}/advies/${page.slug}`).join("\n")}\n\n## Zakelijk en contact\n\n- Voor hoveniers: ${site}/voor-hoveniers\n- Contact: ${site}/#contact\n- E-mail: info@ecoyardsupply.nl\n- Telefoon: +31 6 2667 2878\n- Vestiging: Tweede Stichting 9, 5445 NZ Landhorst, Nederland\n\nProductclaims en doseringen horen te worden gelezen in combinatie met de actuele productpagina en het gekoppelde productblad.\n`;
await fs.writeFile(path.join(root, "llms.txt"), llms);

console.log(`Built ${advicePages.length + 5} SEO pages, sitemap.xml and llms.txt.`);
