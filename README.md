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

De builder beheert de HTML in `advies/`, `producten/index.html`, `producten/vitalmix.html`, `producten/kingseed.html` en `voor-hoveniers.html`; pas die gegenereerde bestanden niet handmatig aan.

Zie `SEO-ROADMAP.md` voor zoekwoordclusters, claimregels en volgende contentprioriteiten.

## Productfoto’s

De visueel gecontroleerde selectie en Nederlandse titels, altteksten en afbeeldingsomschrijvingen staan in `content/product-photos.json`. De originele fotomap blijft buiten de repository. Genereer de WebP-bestanden met Python en Pillow:

```sh
python3 scripts/optimize-product-photos.py "/pad/naar/Productfoto's"
node scripts/build-advice.mjs
node scripts/validate-site.mjs
```

Dit maakt 1600 × 1600 WebP’s van maximaal 300 kB en 560 × 560 varianten voor kaarten/miniaturen, met behoud van verhoudingen, transparantie en bestaande schaduwen. Titel en omschrijving worden ook als XMP opgeslagen. Werkelijke bestandsgroottes staan in `content/product-photo-sizes.json`. De huidige selectie valt volledig binnen 200–300 kB per grote foto; kleinere varianten zijn bewust kleiner.

`scripts/product-photos.mjs` verzorgt galerijen, afbeeldingsmetadata en contactknoppen. De vier handmatig onderhouden Dungking-pagina’s bevatten gemarkeerde fotoblokken die de builder bijwerkt. Behoud deze blokmarkeringen bij toekomstige wijzigingen. Zonder JavaScript blijven de miniaturen als links naar de foto's bruikbaar.
