# SEO-roadmap Eco Yard Supply

Deze site is ingericht rond regionale vindbaarheid in Noord-Brabant, zonder dunne plaatsnaam- of provinciepagina's. De homepage bezit de brede intentie **organische meststoffen Noord-Brabant**. Productpagina's bedienen de koopintentie; adviespagina's beantwoorden concrete vragen; de hovenierspagina bedient zakelijke en regionale intentie.

## Zoekwoordbasis

De aangeleverde export bevat 59 zoekwoorden met circa 5.890 maandelijkse zoekopdrachten. De hoogste prioriteit is het gazoncluster, met onder andere:

- `gazonmest` (810)
- `gazon bemesten` (290)
- `gazon bemesten najaar` (210)
- `gazon bemesten voorjaar` (170)
- `gazon herstellen` (170)
- `organische gazonmest` (140)
- `hoe vaak gazon bemesten` (140)
- `gazonmest kopen` (90)

De volgende clusters zijn organische mest en bodem (`wat is organische mest`, `organische mestkorrels`, `arme grond verbeteren`, `tuingrond verbeteren`) en geschikte plant-/aanplanttoepassingen.

## Huidige contentarchitectuur

- `/` — brede regionale landingspagina
- `/producten/` — productvergelijker op toepassing, seizoen, NPK en dosering
- `/producten/*` — vier afzonderlijke productpagina's met extensieloze URL's
- `/advies/` — kennisbank met tien verdiepende adviespagina's
- `/voor-hoveniers` — zakelijke en regionale landingspagina

De kennisbank bevat naast de basisartikelen aparte zoekintenties voor voorjaarsbemesting, najaarsbemesting, graszoden, beukenhagen en fruitbomen. Elke adviespagina bevat een direct antwoord, inhoudelijke verdieping, FAQ, productschakel, gerelateerde artikelen en een transparante bronnotitie.

## Publicatieregels

1. Maak alleen een nieuwe pagina als die een eigen zoekintentie en voldoende unieke informatie heeft.
2. Start met een direct antwoord; voeg daarna nuance, stappen, tabellen, dosering en een passende vervolgstap toe.
3. Link advies naar een passend product en productpagina's terug naar relevante adviezen.
4. Gebruik een plantsoort alleen als een huidig product aantoonbaar geschikt is en er uniek advies beschikbaar is.
5. Maak geen generieke stadspagina's. Voeg een lokale pagina pas toe met echte leveringsinformatie, projecten, foto's, reviews of cases uit die plaats.
6. Houd NAP-gegevens overal gelijk: Eco Yard Supply, Tweede Stichting 9, 5445 NZ Landhorst, +31 6 2667 2878.
7. Werk `dateModified` en sitemap-`lastmod` alleen bij na een inhoudelijke wijziging.

## Claims en terminologie

Voorkeursterm: **organische meststoffen op basis van insectenmest**.

- `duurzaam` mag als positionering, maar maak concreet waarom.
- `organisch` beschrijft herkomst/basis en is geen synoniem voor `biologisch`.
- Vermijd `biologische meststoffen`, `ecologische meststoffen`, `volledig natuurlijk`, `CO2-neutraal` en gegarandeerde resultaten zonder actuele certificering of onderbouwing.
- Beschrijf alleen de Aanplantmest als bodemverbeteraar voor het hele product; noem niet het volledige assortiment bodemverbeteraar.
- Formuleer mos en onkruid als mogelijke uitkomst van een dichtere grasmat, niet als bestrijdingswerking.
- Leid doseringen, werkingstermijnen en samenstelling af van het actuele productblad.

## Volgende contentprioriteiten

1. Voeg echte praktijkcases uit Noord-Brabant toe met plaats, datum, uitgangssituatie, toepassing, dosering en resultaatfoto's.
2. Onderzoek ontbrekende B2B-termen zoals `meststoffen voor hoveniers`, `grootverpakking`, `zakelijk inkopen` en regionale varianten.
3. Voeg alleen pagina's voor laurier, coniferen, olijfbomen of andere planten toe na expliciete productgeschiktheidscontrole.
4. Voeg actuele prijs, verpakking en voorraad toe voordat `Offer`-schema wordt gebruikt.
5. Voeg echte reviews toe voordat review- of rating-schema wordt gebruikt.
6. Stel in Google Analytics de gemeten telefoon-, e-mail-, WhatsApp- en flyerklikken in als belangrijke gebeurtenissen.
7. Evalueer na 8 tot 12 weken in Search Console welke pagina's vertoningen krijgen en verbeter daarop titels, interne links en inhoud.

## Nieuwe adviespagina toevoegen

Voeg de pagina toe in `content/advice-pages.mjs` en voer uit:

```powershell
node scripts/build-advice.mjs
node scripts/validate-site.mjs
```

De builder genereert de adviespagina's, productvergelijker, hovenierspagina, `sitemap.xml` en `llms.txt`. Bewerk gegenereerde HTML daarom niet handmatig.
