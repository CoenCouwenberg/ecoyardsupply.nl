# ecoyardsupply.nl

Statische website van Eco Yard Supply met een productvergelijker, productpagina's, een regionale hovenierspagina en een gegenereerde kennisbank over gazon, bodem, organische mest, hagen, fruitbomen en aanplant.

## Lokaal onderhouden

Voor de publieke website is geen framework of package-installatie nodig. De HTML, CSS en JavaScript kunnen direct statisch worden gehost.

Adviescontent staat centraal in `content/advice-pages.mjs`. Genereer na een inhoudelijke wijziging de pagina's, sitemap en AI-overzicht opnieuw:

```powershell
node scripts/build-advice.mjs
node scripts/validate-site.mjs
```

De validator controleert paginametadata, JSON-LD, interne links en fragmenten, sitemapdekking en enkele risicovolle claims.

Publieke pagina-URL's zijn extensieloos. De meegeleverde `.htaccess` laat LiteSpeed/Apache de bestaande HTML-bestanden serveren en stuurt oude `.html`-URL's permanent door naar hun schone variant. Upload dit verborgen bestand daarom mee naar de documentroot.

Start desgewenst een lokale preview op `http://127.0.0.1:8765/`:

```powershell
node scripts/serve.mjs
```

Met `BASE_PATH=/preview` kan dezelfde server ook een hosting-submap simuleren. Alle zichtbare interne links en assets gebruiken daarom relatieve paden; canonicals en structured data blijven bewust absolute productie-URL's.

De builder beheert de HTML in `advies/`, `producten/index.html` en `voor-hoveniers.html`; pas die gegenereerde bestanden niet handmatig aan.

Zie `SEO-ROADMAP.md` voor zoekwoordclusters, claimregels en volgende contentprioriteiten.
