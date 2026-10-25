// Uitbreiding op verzoek van Coen, gebaseerd op het zoekwoordonderzoek van 25 oktober 2026.
// Onderzoeksgegevens en de paginamapping staan buiten de publieke webroot.
const date = "2026-10-25";
const seedSource = '<p>Productspecifieke hoeveelheden, gebruiksvoorwaarden en houdbaarheid: het <a href="/public/assets/pdfs/kingseed-allround.pdf">aangeleverde KingSeed Allround-productblad</a>. De actuele verpakking blijft leidend.</p>';
const novaSource = '<p>NovaFerm-productinformatie: de door Eco Yard Supply aangeleverde leveranciersinformatie van 25 oktober 2026. Het product wordt als plantenhulpmiddel beschreven; hier wordt geen gegarandeerde bestrijding of mengbaarheid met andere producten geclaimd. Volg de actuele verpakking.</p>';
const seed = { href: "/producten/kingseed", label: "Bekijk KingSeed Allround", note: "Graszaad voor nieuwe aanleg en doorzaai in zon en halfschaduw. Bekijk het productblad en de hoeveelheid voor jouw toepassing." };
const nova = { href: "/producten/novaferm-viva", label: "Bekijk NovaFerm Viva", note: "Een plantenhulpmiddel voor de bodem. Bespreek eerst de oorzaak van de schade en bekijk de eigen toepassing en gebruiksaanwijzing." };
const lawn = { href: "/producten/gazonmest", label: "Bekijk Dungking Gazonmest", note: "Bekijk samenstelling, toepassingsperiode en dosering. Stem voeding af op de conditie van het gazon en eerdere bemesting." };

export const clusterAdvicePages = [
  {
    slug: "engerlingen-in-gazon",
    title: "Engerlingen in het gazon: herkennen en schade beoordelen",
    seoTitle: "Engerlingen in gazon herkennen | Eco Yard Supply",
    description: "Last van losse graszoden of gele plekken? Lees hoe je engerlingen herkent, wat je onder het gras controleert en hoe je een passende vervolgstap kiest.",
    eyebrow: "Engerlingen en gazonschade",
    intro: "Gele plekken en een losliggende grasmat kunnen wijzen op wortelschade. Engerlingen zijn één mogelijke oorzaak. Bekijk daarom eerst wat er onder het beschadigde gras zit voordat je mest strooit of opnieuw zaait.",
    summary: "Engerlingen zijn keverlarven met meestal een witachtig, C-vormig lichaam, een bruine kop en drie paar poten bij de kop. Sommige soorten eten graswortels. Een gevonden larve bewijst nog niet dat daarmee alle schade is verklaard: beoordeel ook de wortels, bodem en omvang van het probleem.",
    photo: { product: "novaferm-viva", label: "Fles 1 liter", caption: "NovaFerm Viva is een plantenhulpmiddel voor de bodem. Bekijk eerst welke oorzaak bij jouw gazonschade past." },
    body: `
<h2 id="herkennen">Hoe herken je engerlingen onder het gras?</h2>
<p>Bekijk de vorm en de poten samen. Alleen de kleur wit is onvoldoende voor herkenning. Ook larven van andere kevers kunnen erop lijken, zeker wanneer je ze in compost of bij dood hout vindt. Voor het gazon is vooral van belang of er larven bij beschadigde graswortels zitten.</p>
<p>Vind je juist langwerpige grijsbruine larven zonder zichtbare poten? Gebruik dan de <a href="/advies/verschil-engerlingen-en-emelten">vergelijking tussen engerlingen en emelten</a>.</p>
<h2 id="schade">Wat zeggen losse zoden en vogels?</h2>
<p>Bij wortelvraat kan de grasmat plaatselijk minder stevig vastzitten. Vogels en andere dieren kunnen het gras verder openmaken terwijl ze larven zoeken. Deze signalen zijn aanleiding om te kijken, geen sluitende diagnose op afstand. Ook droogte of slecht groeiende wortels kunnen een rol spelen.</p>
<h2 id="controleren">Leg je waarnemingen vast</h2>
<ol class="steps-list"><li><strong>Kies een beschadigde plek.</strong> Til voorzichtig een klein los stuk gras op en bekijk de bovenste grondlaag.</li><li><strong>Bekijk een tweede plek.</strong> Vergelijk de wortels en grond met een minder beschadigd deel van het gazon.</li><li><strong>Maak herkenbare foto's.</strong> Fotografeer de larve van dichtbij, liefst met een maatverdeling, en maak ook een overzicht van de schade.</li><li><strong>Noteer de omstandigheden.</strong> Vermeld wanneer de plekken ontstonden en wat je recent hebt gedaan aan water geven, maaien of bemesten.</li></ol>
<h2 id="aanpak">Wat kun je doen bij vermoedelijke engerlingen?</h2>
<p>Zoek je naar engerlingen bestrijden, laat dan eerst beoordelen welke larven en schade je hebt. Kies een gerichte aanpak met een eigen gebruiksvoorschrift. Meer mest strooien verwijdert de oorzaak van wortelvraat niet.</p>
<p><a href="/producten/novaferm-viva">NovaFerm Viva</a> is een plantenhulpmiddel dat volgens de leverancier de groei en weerstand ondersteunt en de gevoeligheid voor schadelijke bodeminsecten vermindert. Bespreek of die toepassing past bij jouw situatie; verwacht geen gegarandeerde verwijdering van alle larven.</p>
<p>Beoordeel daarna wat de grasmat nog nodig heeft. In het advies over <a href="/advies/gazon-herstellen">gazon herstellen</a> vind je de bredere volgorde van bodemcontrole, onderhoud en eventueel doorzaaien.</p>`,
    faq: [
      ["Zijn alle witte larven in de tuin schadelijke engerlingen?", "Nee. Kijk ook naar de vindplaats, vorm en poten. Verschillende keverlarven lijken op elkaar; een larve in compost is niet automatisch de oorzaak van gazonschade."],
      ["Kan ik meteen opnieuw gras zaaien?", "Beoordeel eerst of de oorzaak van de schade nog aanwezig is. Doorzaaien herstelt de groeiomstandigheden of wortelschade niet vanzelf."],
    ],
    related: ["emelten-in-gazon", "verschil-engerlingen-en-emelten", "gazon-herstellen"],
    sourceNote: '<p>Herkenning en mogelijke schade: <a href="https://www.rhs.org.uk/biodiversity/chafer-grubs-in-lawns">RHS over keverlarven in gazons</a>, geraadpleegd 25 oktober 2026. De bron beschrijft meerdere soorten; aanwezigheid is niet automatisch bewijs van schadelijke aantallen.</p>' + novaSource,
    product: nova,
  },
  {
    slug: "emelten-in-gazon",
    title: "Emelten in het gazon: herkennen en gericht verder",
    seoTitle: "Emelten in gazon herkennen | Eco Yard Supply",
    description: "Emelten in je gazon? Leer de larven herkennen, controleer de schade onder het gras en bepaal wat je nodig hebt voordat je behandelt of doorzaait.",
    eyebrow: "Emelten en graswortels",
    intro: "Emelten zijn larven van langpootmuggen. Sommige soorten kunnen gras beschadigen. Zie je kale of geelbruine plekken, zoek dan eerst naar de oorzaak in en onder de grasmat. Alleen een kleurverschil vertelt nog niet wat er aan de hand is.",
    summary: "Een emelt heeft een langwerpig grijsbruin lichaam, zonder zichtbare poten of duidelijk afgetekende kop. Controleer de grond bij beschadigd gras en vergelijk met een gezonde plek. Stem een eventuele aanpak af op de herkenning, de schade en de gebruiksvoorwaarden van het gekozen product.",
    photo: { product: "novaferm-viva", label: "Fles 1 liter", caption: "De NovaFerm Viva-fles. Productkeuze volgt op beoordeling van de larven en de schade." },
    body: `
<h2 id="herkennen">Hoe herken je emelten?</h2>
<p>Het langwerpige lichaam onderscheidt emelten van de vaak opgerolde, witachtige engerlingen met poten. Emelten kunnen in de bovenste bodemlaag bij het aangetaste gras zitten. Bekijk een gevonden larve goed en maak een scherpe foto voordat je conclusies trekt.</p>
<p>Twijfel je welk type je hebt gevonden? De <a href="/advies/verschil-engerlingen-en-emelten">kenmerken van emelten en engerlingen naast elkaar</a> helpen bij de eerste herkenning.</p>
<h2 id="schade">Welke schade kan bij emelten passen?</h2>
<p>Sommige emelten vreten aan wortels en plantendelen rond het grondoppervlak. Het gazon kan daardoor geelbruin en plaatselijk kaal worden. Vogels die larven zoeken kunnen kleine gaten achterlaten. Er zijn echter ook andere oorzaken voor slecht groeiend gras, zoals te weinig vocht of een verdichte bodem.</p>
<h2 id="beoordelen">Controleer voordat je iets toevoegt</h2>
<ul><li>Bekijk de grond onder een aangetaste plek en maak een foto van eventuele larven.</li><li>Vergelijk de wortels en het bodemvocht met een plek waar het gras beter groeit.</li><li>Noteer hoe snel de schade is uitgebreid en of er recent is gezaaid of bemest.</li><li>Geef bij een adviesvraag de maand, het oppervlak en overzichtsfoto's mee.</li></ul>
<p>Zo'n korte beschrijving maakt de vraag concreter dan alleen “mijn gras wordt geel”. Voorkom dat je meerdere middelen of extra voeding toevoegt terwijl nog onduidelijk is welk probleem je wilt oplossen.</p>
<h2 id="vervolg">Emelten bestrijden of de grasmat ondersteunen?</h2>
<p>Een gerichte bestrijdingsaanpak en het ondersteunen van planten zijn verschillende doelen. Vraag bij een bestrijdingsproduct naar de bedoelde toepassing en actuele gebruiksvoorwaarden. Mest alleen is geen oplossing voor aanwezige larven.</p>
<p>Eco Yard Supply heeft <a href="/producten/novaferm-viva">NovaFerm Viva als plantenhulpmiddel voor de bodem</a>. Volgens de leverancier ondersteunt het groei en weerstand en vermindert het de gevoeligheid voor schadelijke bodeminsecten. Bespreek eerst of deze toepassing aansluit bij jouw gazon; er wordt geen gegarandeerde bestrijding beloofd.</p>
<p>Is later doorzaai nodig? Volg dan het <a href="/advies/gazon-doorzaaien">stappenplan voor een bestaand gazon doorzaaien</a>, zodra de oorzaak is beoordeeld en de omstandigheden geschikt zijn.</p>`,
    faq: [
      ["Is elke langpootmug een probleem voor mijn gazon?", "Nee. Binnen deze groep komen veel soorten voor en slechts een deel kan planten beschadigen. Kijk naar de larven en de werkelijke schade in de grasmat."],
      ["Helpt extra gazonmest tegen emelten?", "Gazonmest is voeding en geen middel om emelten te bestrijden. Beoordeel de oorzaak en bespreek een gerichte vervolgstap."],
    ],
    related: ["engerlingen-in-gazon", "verschil-engerlingen-en-emelten", "gazon-doorzaaien"],
    sourceNote: '<p>Algemene herkenning en schade: <a href="https://www.rhs.org.uk/biodiversity/leatherjackets">RHS over emelten</a>, geraadpleegd 25 oktober 2026. Buitenlandse toepassingskalenders zijn niet overgenomen als Nederlands productvoorschrift.</p>' + novaSource,
    product: nova,
  },
  {
    slug: "verschil-engerlingen-en-emelten",
    title: "Verschil tussen engerlingen en emelten: wat zie je?",
    seoTitle: "Verschil engerlingen en emelten | Eco Yard Supply",
    description: "Vergelijk vorm, kleur en poten van engerlingen en emelten. Met een herkenningstabel en uitleg over wat een gevonden larve wel en niet vertelt.",
    eyebrow: "Larven vergelijken",
    intro: "Je vindt een larve onder het gras. Is het een engerling of een emelt? Begin bij het uiterlijk van het dier. Schadebeelden kunnen op elkaar lijken en zijn daardoor minder geschikt om de twee uit elkaar te houden.",
    summary: "Een engerling is meestal witachtig en C-vormig, met een bruine kop en drie paar poten. Een emelt is langwerpig en grijsbruin, zonder zichtbare poten of duidelijke kop. Deze kenmerken helpen bij een eerste onderscheid, maar bepalen nog niet de soort, omvang van de schade of geschikte aanpak.",
    photo: { product: "novaferm-viva", label: "Fles 1 liter", caption: "Een productfoto van NovaFerm Viva; voor herkenning van larven gebruik je de kenmerken in de tabel." },
    body: `
<h2 id="vergelijking">Engerling of emelt: vergelijk meerdere kenmerken</h2>
<div class="table-wrap"><table class="advice-table compact-table"><caption>Eerste onderscheid tussen twee typen larven</caption><thead><tr><th scope="col">Kenmerk</th><th scope="col">Engerling</th><th scope="col">Emelt</th></tr></thead><tbody>
<tr><th scope="row">Afkomst</th><td>Larve van een kever</td><td>Larve van een langpootmug</td></tr>
<tr><th scope="row">Vorm</th><td>Vaak gekromd als een C</td><td>Langwerpig, buisvormig</td></tr>
<tr><th scope="row">Kleur</th><td>Witachtig, met bruine kop</td><td>Grijsbruin</td></tr>
<tr><th scope="row">Poten</th><td>Drie paar bij de kop</td><td>Geen zichtbare poten</td></tr>
</tbody></table></div>
<h2 id="waarneming">Wat kun je met de herkenning doen?</h2>
<p>Fotografeer het dier voordat je verdergaat. Maak ook een foto waarop de vindplaats en het gras zichtbaar zijn. Noteer of je de larve direct onder beschadigd gras vond of ergens anders in de tuin. Die context is nodig om een waarneming aan een gazonprobleem te koppelen.</p>
<p>Voor de vervolgstappen bij een gekromde larve lees je <a href="/advies/engerlingen-in-gazon">engerlingen in het gazon herkennen en beoordelen</a>. Bij een langwerpige, pootloze larve past het artikel over <a href="/advies/emelten-in-gazon">emelten in het gazon</a>.</p>
<h2 id="grenzen">Eén larve is nog geen volledige diagnose</h2>
<p>De vergelijking is een eerste hulpmiddel, geen determinatiesleutel voor alle bodemdieren. Je kunt er niet mee vaststellen hoeveel dieren er in de hele tuin zitten of welke ingreep noodzakelijk is. Koop daarom niet direct een product op basis van één foto of alleen de kleur van het gras.</p>
<p>Voor hoveniers is het nuttig waarnemingen per plek vast te leggen. Zo blijft later duidelijk welk stuk is onderzocht, welke aanpak is gekozen en waar nog herstel nodig is. Ook voor een kleine particuliere tuin geven een overzichtsfoto en datum houvast.</p>
<h2 id="productkeuze">Koppel productkeuze aan een duidelijk doel</h2>
<p>Bespreek eerst of je larven wilt aanpakken, groeiomstandigheden wilt verbeteren of open plekken wilt herstellen. <a href="/producten/novaferm-viva">NovaFerm Viva</a> heeft een eigen toepassing als plantenhulpmiddel voor de bodem. Volg de productinformatie en verwacht van een productfoto of de naam alleen geen antwoord op de oorzaak van je schade.</p>`,
    faq: [
      ["Kun je engerlingen en emelten aan gazonschade uit elkaar houden?", "Niet betrouwbaar op het schadebeeld alleen. Bekijk een gevonden larve en vergelijk verschillende uiterlijke kenmerken."],
      ["Hebben emelten poten?", "Emelten hebben geen zichtbare poten. Bij een engerling zie je drie paar poten vlak achter de kop."],
    ],
    related: ["engerlingen-in-gazon", "emelten-in-gazon", "gazon-herstellen"],
    sourceNote: '<p>Kenmerken gecontroleerd met <a href="https://www.rhs.org.uk/biodiversity/chafer-grubs-in-lawns">RHS over keverlarven</a> en <a href="https://www.rhs.org.uk/biodiversity/leatherjackets">RHS over emelten</a>, geraadpleegd 25 oktober 2026. De tabel dient als eerste vergelijking, niet als volledige soortbepaling.</p>' + novaSource,
    product: nova,
  },
  {
    slug: "gazon-doorzaaien",
    title: "Gazon doorzaaien: stappen voor een bestaande grasmat",
    seoTitle: "Gazon doorzaaien: stappenplan | Eco Yard Supply",
    description: "Een dun gazon doorzaaien? Bereid de grasmat voor, bereken de KingSeed-hoeveelheid en plan water geven en de eerste maaibeurt.",
    eyebrow: "Doorzaaien en bijzaaien",
    intro: "Doorzaaien is graszaad toevoegen aan een bestaande grasmat. Het kan passen bij een dun gazon, maar nieuw zaad lost een gebrek aan licht, water of een verdichte bodem niet vanzelf op. Begin daarom bij de plek en plan ook de nazorg.",
    summary: "Beoordeel eerst de oorzaak van dunne plekken. Maak vervolgens ruimte voor zaadcontact met de grond, zaai gelijkmatig en houd het zaaibed vochtig. Voor KingSeed Allround geldt bij doorzaai 10 g/m², van april tot en met oktober bij minimaal 10 °C bodemtemperatuur.",
    photo: { product: "kingseed", label: "Overzicht", caption: "KingSeed Allround voor nieuwe aanleg en doorzaai. De benodigde hoeveelheid verschilt per toepassing." },
    body: `
<h2 id="voorbereiding">Maak eerst een herstelplan</h2>
<p>Noteer waar het gazon dun is en waarom. Een drukke looproute vraagt bijvoorbeeld ook om aandacht voor gebruik en bodemverdichting. Bij langdurige schaduw moet het grasmengsel bij de lichtomstandigheden passen. KingSeed Allround wordt op het productblad genoemd voor zon en halfschaduw.</p>
<h2 id="stappen">Doorzaaien in vijf stappen</h2>
<ol class="steps-list"><li><strong>Ruim de grasmat op.</strong> Verwijder blad en losse resten. Maai zo nodig passend, zonder het gazon kaal te scheren.</li><li><strong>Zorg voor contact met grond.</strong> Hark open plekken licht los. Verticuteren is alleen een passende voorbereiding wanneer er een storende viltlaag is; het is geen vaste verplichting bij elke doorzaai.</li><li><strong>Meet en weeg af.</strong> Bereken voor KingSeed 10 gram per m² doorzaai. Voor 60 m² is dat 600 gram.</li><li><strong>Verdeel gelijkmatig.</strong> Splits de afgewogen hoeveelheid in twee delen en werk in verschillende richtingen. Zo voorkom je dat het eerste vak alles krijgt.</li><li><strong>Plan vocht en rust.</strong> Houd de grond de eerste weken vochtig en beperk intensieve betreding van jonge planten.</li></ol>
<h2 id="hoeveelheid">Volledig doorzaaien of een kale plek opnieuw inzaaien?</h2>
<p>Het KingSeed-productblad maakt onderscheid tussen doorzaai, 10 g/m², en nieuwe aanleg, 25 g/m². Een bestaande dunne mat is niet hetzelfde als volledig kale grond. Bespreek bij grotere kale vlakken welke toepassing past en bekijk de <a href="/advies/hoeveel-graszaad-per-m2">rekentabel voor de twee zaaihoeveelheden</a>.</p>
<h2 id="nazorg">Wat doe je na het zaaien?</h2>
<p>Controleer het vocht bij het zaad in plaats van alleen de kleur van het oude gras. Geef voorzichtig water zodat het zaad niet wegspoelt. Het productblad noemt een eerste maaibeurt bij 8 cm grashoogte; kijk ook of het jonge gras voldoende vaststaat.</p>
<p>Lees voor de keuze van een geschikte periode <a href="/advies/wanneer-graszaad-zaaien">wanneer je graszaad kunt zaaien</a>. De genoemde één tot twee weken voor zichtbaar resultaat is een productindicatie bij passende omstandigheden, geen termijn voor een volledig belastbare grasmat.</p>
<p>Bekijk <a href="/producten/kingseed">KingSeed Allround en het productblad</a> voor de samenstelling en gebruiksvoorwaarden. Stem eventuele bemesting afzonderlijk af; een doorzaaibeurt vraagt niet automatisch om een extra mestgift.</p>`,
    faq: [
      ["Moet je altijd verticuteren voor doorzaaien?", "Nee. Beoordeel of een storende viltlaag aanwezig is. Zaad moet de grond kunnen bereiken, maar onnodig zwaar verticuteren kan de bestaande grasmat verder beschadigen."],
      ["Hoeveel KingSeed gebruik je voor 100 m² doorzaai?", "Bij de productspecifieke richtlijn van 10 g/m² is dat 1 kg. De richtlijn voor nieuwe aanleg is anders: 25 g/m²."],
    ],
    related: ["wanneer-graszaad-zaaien", "graszaad-komt-niet-op", "gazon-herstellen"],
    sourceNote: seedSource + '<p>Algemene werkwijze en beoordeling van open plekken: <a href="https://www.rhs.org.uk/lawns/repairing">RHS over gazonherstel</a>. Voor vilt en doorzaai: <a href="https://www.rhs.org.uk/lawns/autumn-care">RHS over najaarsonderhoud</a>. Geraadpleegd 25 oktober 2026; KingSeed-doseringen komen uitsluitend uit het eigen productblad.</p>',
    product: seed,
  },
  {
    slug: "graszaad-komt-niet-op",
    title: "Graszaad komt niet op: wat controleer je eerst?",
    seoTitle: "Graszaad komt niet op? Controleer dit | Eco Yard Supply",
    description: "Nog geen gras na het zaaien? Controleer bodemtemperatuur, vocht, zaaibed en bewaargeschiedenis voordat je opnieuw graszaad of extra mest strooit.",
    eyebrow: "Problemen met opkomst",
    intro: "Je hebt gezaaid, maar ziet nog weinig groen. Dat hoeft niet direct te betekenen dat het zaad niet goed is. Met een paar gerichte controles kun je beter beslissen of wachten, de omstandigheden verbeteren of plaatselijk opnieuw zaaien zinvol is.",
    summary: "Controleer eerst zaaidatum, bodemtemperatuur, vocht bij het zaad en de voorbereiding van de grond. Voor KingSeed geldt minimaal 10 °C bodemtemperatuur en vochtig houden in de eerste weken. Het genoemde zichtbare resultaat na één tot twee weken is een indicatie, geen gegarandeerde opkomsttermijn.",
    photo: { product: "kingseed", label: "Overzicht", caption: "KingSeed Allround bestaat uit drie grassoorten. Beoordeel opkomst samen met de omstandigheden op de zaaiplek." },
    body: `
<h2 id="controle">Loop deze controles langs</h2>
<div class="table-wrap"><table class="advice-table compact-table"><thead><tr><th scope="col">Controle</th><th scope="col">Wat noteer je?</th></tr></thead><tbody>
<tr><td>Zaaimoment</td><td>Datum en gekozen mengsel, plus de gebruiksvoorwaarden op de verpakking</td></tr>
<tr><td>Bodemtemperatuur</td><td>Temperatuur op de zaaiplek; een warme middag is niet hetzelfde als warme grond</td></tr>
<tr><td>Vocht</td><td>Of de bovenlaag bij het zaad droog, vochtig of langdurig nat is</td></tr>
<tr><td>Zaaibed</td><td>Of zaad contact heeft met losse grond of vooral tussen oud gras en resten ligt</td></tr>
<tr><td>Bewaring</td><td>Wanneer de verpakking is geopend en of het zaad droog en donker is bewaard</td></tr>
</tbody></table></div>
<h2 id="vocht">Een beetje regen zegt niet alles</h2>
<p>Bekijk de grond waar het zaad ligt. Op een zonnig of winderig stuk kan de bovenlaag eerder uitdrogen dan elders. Anderzijds is een plas geen geschikte manier om een zaaibed vochtig te houden. Geef voorzichtig water en controleer het resultaat ter plaatse.</p>
<p>Bij een harde of ongelijk voorbereide ondergrond is nog een hand zaad strooien niet vanzelf de oplossing. Bekijk eerst waar het bestaande zaad terecht is gekomen. Voor een volgende poging helpt het <a href="/advies/gazon-doorzaaien">stappenplan voor doorzaaien</a> om de voorbereiding opnieuw langs te lopen.</p>
<h2 id="wachten">Wachten of opnieuw beginnen?</h2>
<p>Vergelijk je waarnemingen met de voorwaarden van het mengsel. Voor KingSeed noemt het productblad april tot en met oktober en minimaal 10 °C bodemtemperatuur. Lees de uitleg over <a href="/advies/wanneer-graszaad-zaaien">het zaaimoment en de nazorg</a> als die voorwaarden nog niet op orde zijn.</p>
<p>Zijn de omstandigheden passend maar blijven dezelfde stukken kaal, maak dan overzichts- en detailfoto's. Noteer wat je hebt gebruikt en hoeveel. Zo kun je gericht bespreken of je plaatselijk moet herstellen, in plaats van het hele oppervlak opnieuw te behandelen.</p>
<h2 id="restant">Controleer ook wat je hebt gezaaid</h2>
<p>Een onbekend restant uit een vochtige schuur vraagt om een andere beoordeling dan een recent geopende verpakking. Bekijk <a href="/advies/graszaad-bewaren">de bewaarrichtlijnen voor KingSeed</a> voordat je meer oud zaad uitstrooit.</p>
<p>Op de <a href="/producten/kingseed">KingSeed-productpagina</a> vind je de gebruiksvoorwaarden en het productblad. Voeg niet automatisch extra mest toe om opkomst af te dwingen; zaaien en bemesten hebben elk hun eigen voorschrift.</p>`,
    faq: [
      ["Moet graszaad na twee weken overal groen zijn?", "Nee. Het KingSeed-productblad noemt één tot twee weken voor zichtbaar resultaat onder passende omstandigheden. Een volledig dicht en belastbaar gazon is een andere stap."],
      ["Moet ik meer graszaad strooien als ik niets zie?", "Controleer eerst de omstandigheden en de gebruikte hoeveelheid. Opnieuw strooien zonder de oorzaak te beoordelen kan hetzelfde probleem herhalen."],
    ],
    related: ["gazon-doorzaaien", "graszaad-bewaren", "wanneer-graszaad-zaaien"],
    sourceNote: seedSource + '<p>Algemene voorbereiding, zaadcontact en vocht bij gazonaanleg: <a href="https://www.rhs.org.uk/lawns/lawns-from-seed">RHS over een gazon zaaien</a>, geraadpleegd 25 oktober 2026. De controletabel is een praktische ordening van deze aandachtspunten en de KingSeed-gebruiksvoorwaarden.</p>',
    product: seed,
  },
  {
    slug: "graszaad-bewaren",
    title: "Graszaad bewaren: houdbaarheid en restanten van KingSeed",
    seoTitle: "Graszaad bewaren en houdbaarheid | Eco Yard Supply",
    description: "KingSeed graszaad over? Lees de bewaarrichtlijnen, noteer de openingsdatum en bereken hoeveel je voor een volgende zaai- of herstelbeurt nodig hebt.",
    eyebrow: "Houdbaarheid graszaad",
    intro: "Na doorzaaien blijft geregeld graszaad over. Bewaar het restant samen met de productinformatie, zodat je later nog weet welk mengsel je hebt en wanneer je de verpakking hebt geopend. De termijn op het productblad geldt onder de genoemde bewaarvoorwaarden.",
    summary: "Het KingSeed Allround-productblad vermeldt twee jaar houdbaarheid ongeopend en één jaar na openen, mits donker en droog bewaard. Controleer de actuele verpakking en de bewaargeschiedenis. Deze termijnen gelden voor dit product en zijn geen algemene garantie voor elk graszaad.",
    photo: { product: "kingseed", label: "Overzicht", caption: "Bewaar een restant KingSeed met de bijbehorende productinformatie en noteer wanneer je de verpakking opent." },
    body: `
<h2 id="termijn">Welke houdbaarheid moet je aanhouden?</h2>
<p>Lees zowel de verpakking als het productblad van jouw partij. De vermelding “twee jaar ongeopend” betekent niet dat je zonder meer twee jaar vanaf jouw aankoopdatum mag rekenen. Bewaar een eventueel vermelde datum of partijcode, zodat je bij twijfel gericht navraag kunt doen.</p>
<p>Op de <a href="/producten/kingseed">KingSeed-productpagina</a> staat het productblad met de bevestigde bewaarrichtlijnen. Een andere verpakking of een ander merk kan eigen voorwaarden hebben.</p>
<h2 id="bewaren">Maak het restant herkenbaar</h2>
<ol class="steps-list"><li><strong>Noteer de openingsdatum.</strong> Schrijf die op de verpakking zodra je begint met zaaien.</li><li><strong>Houd productgegevens bij het zaad.</strong> Bewaar mengselnaam, partijgegevens en gebruiksaanwijzing. Meng onbekende restanten niet ongemerkt door elkaar.</li><li><strong>Bewaar donker en droog.</strong> Kies een plek die aan de productvoorwaarden voldoet en voorkom dat regen of vocht bij het restant kan komen.</li><li><strong>Sluit de verpakking na gebruik.</strong> Zet het restant pas terug nadat je schoon en droog hebt gewerkt.</li></ol>
<h2 id="opnieuw">Kun je het volgend seizoen nog gebruiken?</h2>
<p>Bekijk eerst de openingsdatum en wat je weet over de opslag. Bij een onbekende leeftijd of twijfel over vocht kun je de opgegeven houdbaarheid niet zomaar als bevestiging gebruiken dat het restant nog goed is. Geef die onzekerheid door wanneer je advies vraagt.</p>
<p>Past het restant nog binnen de voorwaarden, bereken dan wat je nodig hebt voordat je gaat strooien. Bij KingSeed is dat bijvoorbeeld 400 gram voor 40 m² doorzaai, op basis van 10 g/m². De <a href="/advies/hoeveel-graszaad-per-m2">berekening voor graszaad per m²</a> laat ook het verschil met nieuwe aanleg zien.</p>
<h2 id="hoeveelheid">Voorkom een onnodig grote voorraad</h2>
<p>Meet vooraf hoeveel je werkelijk wilt zaaien. Heb je na de berekening nog zaad over, strooi dat niet extra dik om de verpakking leeg te maken. Bewaren volgens het voorschrift of vooraf een passende verpakkingshoeveelheid bespreken is een betere vervolgstap.</p>
<p>Let bij hergebruik ook op <a href="/advies/wanneer-graszaad-zaaien">een geschikt zaaimoment</a>. Goed bewaard zaad neemt de voorwaarden voor bodemtemperatuur, vocht en nazorg niet weg.</p>`,
    faq: [
      ["Hoe lang is KingSeed na openen houdbaar?", "Het productblad noemt één jaar na openen, mits donker en droog bewaard. Controleer ook de actuele verpakking en eventuele partijinformatie."],
      ["Kan ik de hele rest van de emmer over mijn gazon strooien?", "Meet en bereken eerst de benodigde hoeveelheid. Een restant is geen reden om meer te zaaien dan de productspecifieke richtlijn."],
    ],
    related: ["hoeveel-graszaad-per-m2", "graszaad-komt-niet-op", "gazon-doorzaaien"],
    sourceNote: seedSource + '<p>De bewaartermijnen zijn niet uitgebreid tot andere merken of omstandigheden. De werklijst helpt om de genoemde droge en donkere opslag en de openingsdatum in de praktijk bij te houden.</p>',
    product: seed,
  },
  {
    slug: "hoeveel-gazonmest-per-m2",
    title: "Hoeveel gazonmest per m²? Berekenen en gelijkmatig strooien",
    seoTitle: "Hoeveel gazonmest per m²? Rekentabel | Eco Yard Supply",
    description: "Bereken Dungking gazonmest per m² en voor 30, 60, 100 of 150 m². Met aparte richtlijnen voor onderhoud en najaar en uitleg over gelijkmatig verdelen.",
    eyebrow: "Mest berekenen",
    intro: "Een oppervlakte meten en de mest afwegen voorkomt gokken tijdens het strooien. Er bestaat geen universele hoeveelheid gazonmest per m². Product, toepassing en seizoen bepalen welke berekening je gebruikt.",
    summary: "Dungking Gazonmest vermeldt 1 kg per 15 m² in maart-april en juni-juli: ongeveer 66,7 g/m². Voor de gazongift met Border- en Najaarsmest in september-november noemt het Gazonmest-productblad 1 kg per 10 m², dus 100 g/m². Dit zijn afzonderlijke toepassingen, geen hoeveelheden om bij elkaar op te tellen.",
    photo: { product: "gazonmest", label: "Korrels", caption: "Dungking Gazonmest-korrels. Weeg de totale hoeveelheid af voordat je het oppervlak in vakken verdeelt." },
    body: `
<h2 id="rekenen">Gebruik de dosering van jouw product</h2>
<p>Bij <a href="/producten/gazonmest">Dungking Gazonmest</a> deel je het aantal vierkante meters door 15 voor de hoeveelheid in kilogram. Voor de genoemde najaarsgift deel je door 10. Controleer eerst of die toepassing bij jouw gazon en eerdere bemesting past.</p>
<div class="table-wrap"><table class="advice-table compact-table"><caption>Rekenvoorbeelden met de Dungking-richtlijnen</caption><thead><tr><th scope="col">Gazon</th><th scope="col">Gazonmest<br>1 kg / 15 m²</th><th scope="col">Najaar<br>1 kg / 10 m²</th></tr></thead><tbody>
<tr><td>30 m²</td><td>2 kg</td><td>3 kg</td></tr><tr><td>60 m²</td><td>4 kg</td><td>6 kg</td></tr><tr><td>100 m²</td><td>Circa 6,67 kg</td><td>10 kg</td></tr><tr><td>150 m²</td><td>10 kg</td><td>15 kg</td></tr>
</tbody></table></div>
<p>De laatste kolom hoort bij <a href="/producten/bordermest">Dungking Border- en Najaarsmest</a>. De toepassingsperiode voor gazon komt uit het Gazonmest-blad. Neem een periode voor borders niet automatisch over voor gras.</p>
<h2 id="meten">Meet het gras, niet de hele tuin</h2>
<p>Splits een onregelmatig gazon op in eenvoudige vlakken. Een vlak van 6 bij 5 meter is 30 m². Trek een border of terras af als je die eerder hebt meegerekend. Meet bij een plaatselijke toepassing alleen het werkelijk te behandelen deel.</p>
<h2 id="verdelen">Een voorbeeld met twee strooirondes</h2>
<p>Stel dat je 60 m² met Gazonmest behandelt: totaal 4 kg. Deel het gazon op in twee vakken van 30 m² en reserveer 2 kg per vak. Wil je per vak kruislings werken, gebruik dan 1 kg in de eerste richting en 1 kg in de tweede. Dat blijft samen 2 kg per vak, geen dubbele gift.</p>
<p>Bij een strooiwagen is een standnummer geen dosering in g/m². De uitkomst hangt ook af van apparaat en korrel. Controleer de apparaatinstelling en de werkelijk verbruikte hoeveelheid; vul niet op gevoel telkens opnieuw bij.</p>
<h2 id="planning">Een berekende hoeveelheid is geen automatische bemestingsbeurt</h2>
<p>Noteer wanneer je eerder hebt gestrooid. Controleer ook of bodemvocht en groei geschikt zijn. Gebruik de <a href="/advies/gazon-bemesten">bemestingskalender voor het gazon</a> voor de context en lees bij een droge periode eerst <a href="/advies/gazon-bemesten-bij-droogte">wanneer je beter wacht met bemesten</a>.</p>`,
    faq: [
      ["Hoeveel Dungking Gazonmest heb ik nodig voor 100 m²?", "Bij 1 kg per 15 m² is dat 100 ÷ 15 = circa 6,67 kg. Dit is de richtlijn voor de genoemde Gazonmest-toepassing, niet voor elk product."],
      ["Moet ik bij kruislings strooien tweemaal de dosering gebruiken?", "Nee. Verdeel de totale afgewogen hoeveelheid over twee strooirichtingen. De totale gift blijft hetzelfde."],
    ],
    related: ["gazon-bemesten", "gazon-bemesten-bij-droogte", "wat-betekent-npk"],
    sourceNote: '<p>Doseringen en gazonperioden: het <a href="/public/assets/pdfs/dungking-gazonmest.pdf">Dungking Gazonmest-productblad</a>. De samenstelling van het najaarsproduct staat in het <a href="/public/assets/pdfs/dungking-bordermest.pdf">Border- en Najaarsmest-productblad</a>. De tabel en verdeling zijn rekenvoorbeelden, geen extra bemestingsvoorschrift. Volg de actuele verpakking.</p>',
    product: lawn,
  },
  {
    slug: "gazon-bemesten-bij-droogte",
    title: "Gazon bemesten bij droogte of voor regen: doen of wachten?",
    seoTitle: "Gazon bemesten bij droogte of regen | Eco Yard Supply",
    description: "Kun je mest strooien op droog gras? Beoordeel bodemvocht, grasgroei en regenverwachting voordat je bemest. Met aandacht voor sproeien na het strooien.",
    eyebrow: "Bemesten en bodemvocht",
    intro: "Een geel gazon na droge weken lijkt misschien om voeding te vragen. Toch is strooien niet de eerste stap bij droogtestress. Bepaal eerst of het gras nog groeit en hoe droog de wortelzone is. Kijk pas daarna naar een geplande mestgift.",
    summary: "Strooi geen mest op een gazon dat door droogte nauwelijks groeit. Wacht op herstelde groeiomstandigheden. Alleen een regenicoon in de weersverwachting is onvoldoende: beoordeel of het water de bodem bereikt en of de gekozen mest bij seizoen, eerdere giften en gebruiksvoorwaarden past.",
    photo: { product: "gazonmest", label: "Korrels", caption: "Dungking Gazonmest. Een afgewogen hoeveelheid vraagt ook om een geschikt toepassingsmoment." },
    body: `
<h2 id="droogte">Waarom eerst naar vocht en groei kijken?</h2>
<p>Bij droogte kan gras verkleuren en de groei sterk teruglopen. Extra voeding vervangt geen vocht en neemt de oorzaak van droogtestress niet weg. Bestaand gras kan na regen herstellen, maar de ernst van de schade verschilt per plek. Beoordeel die ontwikkeling voordat je een behandeling plant.</p>
<h2 id="beslissen">Drie situaties rond het strooimoment</h2>
<ul><li><strong>Droge bodem en nauwelijks groei.</strong> Stel bemesten uit en beperk belastend onderhoud. Bekijk of het gazon later zelf weer gaat groeien.</li><li><strong>Vochtige bodem en actieve groei.</strong> Controleer eerst het productvoorschrift, het seizoen en eerdere giften voordat je een geplande beurt uitvoert.</li><li><strong>Plassen of een verzadigde bodem.</strong> Wacht ook dan. Meer water is niet hetzelfde als een bruikbare wortelomgeving.</li></ul>
<h2 id="regen">Kun je gazon bemesten voor regen?</h2>
<p>Neem de voorspelling mee, maar controleer de situatie op de plek zelf. Een korte bui hoeft een uitgedroogde bovenlaag niet voldoende vochtig te maken. Andersom is een stortbui geen reden om haastig mest te strooien. Plan op basis van bodem en gebruiksaanwijzing, niet op één symbool op je telefoon.</p>
<p>Voor <a href="/producten/gazonmest">Dungking Gazonmest</a> noemt het productblad maart-april en juni-juli. Ook binnen die perioden moet het moment passen. Lees de <a href="/advies/gazon-bemesten">algemene bemestingskalender</a> voor de plaats van een gift in het onderhoud.</p>
<h2 id="beregenen">Wanneer sproeien na bemesten?</h2>
<p>Volg de vochtinstructies van het product dat je gebruikt. Het Dungking Startersmest-blad vermeldt bijvoorbeeld dat sproeien of beregenen nodig is bij te lange droogte of felle zon na het strooien. Dat is geen uitnodiging om een ernstig uitgedroogd gazon toch te bemesten, en geen universeel aantal minuten voor elke sproeier.</p>
<p>Noteer bij twijfel product, hoeveelheid, strooidatum en het verloop van het weer. Gebruik voor de afweging vooraf de <a href="/advies/hoeveel-gazonmest-per-m2">rekentabel voor gazonmest</a>. Bemest niet nogmaals omdat een eerder gestrooide korrel nog zichtbaar is.</p>
<h2 id="herstel">Wat als het gras geel blijft?</h2>
<p>Bekijk of alleen droogte een rol speelt of ook andere oorzaken. Het advies over <a href="/advies/gazon-herstellen">geel en dun gazon herstellen</a> helpt om die volgende controle te kiezen. Herhaal niet meteen dezelfde mestgift.</p>`,
    faq: [
      ["Is geel gras tijdens droogte altijd een voedingstekort?", "Nee. Droogtestress kan ook verkleuring en minder groei geven. Controleer vocht en herstel voordat je extra voeding toevoegt."],
      ["Hoeveel minuten moet ik na bemesten sproeien?", "Er is geen vaste tijd voor iedere tuin en sproeier. Volg de productinstructie en beoordeel bodemvocht en waterverdeling op de plek zelf."],
    ],
    related: ["gazon-herstellen", "hoeveel-gazonmest-per-m2", "gazon-bemesten-voorjaar"],
    sourceNote: '<p>Droogtestress, herstel en terughoudend bemesten: <a href="https://www.rhs.org.uk/lawns/drought-care">RHS over gazons tijdens droogte</a>, geraadpleegd 25 oktober 2026. Productperioden: <a href="/public/assets/pdfs/dungking-gazonmest.pdf">Dungking Gazonmest</a>. De expliciete beregeningsinstructie komt uit het <a href="/public/assets/pdfs/dungking-startersmest.pdf">Startersmest-productblad</a> en is niet als universeel watervoorschrift gebruikt.</p>',
    product: lawn,
  },
  {
    slug: "wat-betekent-npk",
    title: "Wat betekent NPK op meststoffen? Lees het etiket",
    seoTitle: "Wat betekent NPK? Meststoffen vergelijken | Eco Yard Supply",
    description: "Leer waar N, P en K voor staan en vergelijk de samenstellingen van Dungking. Begrijp ook waarom een NPK-getal geen dosering of kwaliteitsscore is.",
    eyebrow: "Meststoffen begrijpen",
    intro: "Op een zak mest staan vaak drie getallen, soms met een toevoeging zoals MgO. Die informatie helpt bij het vergelijken van samenstellingen. Ze vertelt niet op zichzelf welk product jouw tuin nodig heeft of hoeveel je moet strooien.",
    summary: "N staat voor stikstof, P voor fosfor en K voor kalium. De getallen beschrijven de samenstelling van een meststof. Bekijk daarnaast altijd toepassing, dosering en periode. Een hoger getal is geen algemene aanwijzing dat een product beter is.",
    photo: { product: "bordermest", label: "Overzicht", caption: "Dungking Border- en Najaarsmest heeft een andere samenstelling dan Gazonmest of Startersmest. Vergelijk altijd ook de toepassing." },
    body: `
<h2 id="letters">Wat vertellen de drie letters?</h2>
<p>Stikstof ondersteunt groene groei, fosfor speelt een rol bij de groei van wortels en scheuten, en kalium onder meer bij bloei, vruchtvorming en weerbaarheid tegen kou. De behoefte hangt ook af van de plant, bodem en groeifase. Meer van één voedingsstof toevoegen is niet automatisch nuttig.</p>
<p>Bij NPK 9-3-6 staat stikstof relatief hoger vermeld dan bij NPK 6-3-12. Dat maakt de twee producten niet zonder meer uitwisselbaar. Lees de precieze declaratie samen met het doel en de toepassing op het etiket.</p>
<h2 id="producten">Vier Dungking-samenstellingen naast elkaar</h2>
<div class="table-wrap"><table class="advice-table compact-table"><thead><tr><th scope="col">Product</th><th scope="col">NPK volgens productblad</th><th scope="col">Kijk daarnaast naar</th></tr></thead><tbody>
<tr><td>Startersmest</td><td>12-3-6 + 4MgO</td><td>Vroege toepassing in gazon en border</td></tr>
<tr><td>Gazonmest</td><td>9-3-6 + 4MgO</td><td>Onderhoud van het gazon</td></tr>
<tr><td>Border- en Najaarsmest</td><td>6-3-12 + 3MgO</td><td>Planttoepassing en seizoen</td></tr>
<tr><td>Aanplantmest</td><td>4-3-3</td><td>Nieuwe aanleg en productspecifieke hoeveelheid</td></tr>
</tbody></table></div>
<p>De MgO-vermelding heeft betrekking op magnesium, uitgedrukt als magnesiumoxide. Vergelijk de volledige productinformatie via het <a href="/producten/">overzicht van de meststoffen</a>, in plaats van alleen het hoogste stikstofgetal te kiezen.</p>
<h2 id="dosering">NPK is niet hetzelfde als gram per m²</h2>
<p>Een product met een andere samenstelling kan ook een andere richtlijn of functie hebben. Verdubbel of halveer daarom niet zelfstandig de gift om twee etiketten gelijk te trekken. Met de <a href="/advies/hoeveel-gazonmest-per-m2">berekening voor gazonmest</a> gebruik je de hoeveelheid die bij de gekozen toepassing hoort.</p>
<h2 id="grond">Hoe lees je bemesting in een grondmengsel?</h2>
<p>Bij Vitalmix wordt bemesting 4-7-7 genoemd als ingrediënt, naast andere grondstoffen en aanplantmest. Dat is geen opgegeven NPK-waarde van de volledige zak grond. De hoeveelheid grond in liters kun je evenmin behandelen als een mestgift in kilogrammen.</p>
<p>Ook de herkomst van een meststof is een afzonderlijke vraag. Lees <a href="/advies/insectenmest">hoe Dungking insectenmest gebruikt</a> als je wilt begrijpen wat die basis betekent. NPK alleen zegt niets over een biologisch keurmerk of een absolute milieuclaim.</p>`,
    faq: [
      ["Is een hoger NPK-getal altijd beter?", "Nee. Kies een samenstelling en gebruiksvoorschrift die bij de toepassing passen. Het etiket is geen ranglijst van kwaliteit."],
      ["Is Vitalmix zelf een NPK 4-7-7-meststof?", "Die conclusie kun je niet trekken. De aangeleverde Vitalmix-informatie noemt bemesting 4-7-7 als toevoeging in het grondmengsel, niet als NPK-declaratie van het hele product."],
    ],
    related: ["hoeveel-gazonmest-per-m2", "organische-mest", "insectenmest"],
    sourceNote: '<p>Algemene uitleg: <a href="https://www.rhs.org.uk/garden-jobs/fertilisers">RHS over meststoffen en etiketten</a>, geraadpleegd 25 oktober 2026. Samenstellingen komen uit de aangeleverde <a href="/public/assets/pdfs/dungking-startersmest.pdf">Startersmest</a>-, <a href="/public/assets/pdfs/dungking-gazonmest.pdf">Gazonmest</a>-, <a href="/public/assets/pdfs/dungking-bordermest.pdf">Border- en Najaarsmest</a>- en <a href="/public/assets/pdfs/dungking-aanplantmest.pdf">Aanplantmest-productbladen</a>. Vitalmix-gegevens zijn aangeleverd op 28 september 2026.</p>',
    product: { href: "/producten/bordermest", label: "Bekijk Border- en Najaarsmest", note: "Een concreet voorbeeld van NPK 6-3-12 + 3MgO. Bekijk ook de toepassingen, perioden en doseringen op de productpagina." },
  },
  {
    slug: "aanplantgrond-of-potgrond",
    title: "Aanplantgrond of potgrond: wat past bij jouw plantklus?",
    seoTitle: "Aanplantgrond of potgrond? Zo kies je | Eco Yard Supply",
    description: "Een plant in de tuin zetten of een pot vullen? Lees hoe je aanplantgrond en potgrond vergelijkt op toepassing, aanwezige voeding en productvoorschrift.",
    eyebrow: "Grondsoorten kiezen",
    intro: "Een nieuwe haag in de tuin planten is een andere klus dan een terrasplant oppotten. Daardoor kan ook de grondkeuze verschillen. Begin bij plant en standplaats en controleer daarna waarvoor het grondmengsel op de zak bedoeld is.",
    summary: "Aanplantgrond wordt vaak aangeboden voor de plantplaats in de volle grond; potgrond voor planten in potten en bakken, soms ook andere toepassingen. De precieze geschiktheid verschilt per product. Vitalmix is aangeboden als aanplantgrond: neem geschiktheid voor potten of specifieke plantsoorten niet zonder productadvies aan.",
    photo: { product: "vitalmix", label: "Structuur", caption: "De vezelige structuur van Vitalmix aanplantgrond. De zichtbare structuur bepaalt niet op zichzelf voor welke plant of pot het geschikt is." },
    body: `
<h2 id="verschil">Kijk naar het gebruiksdoel op de verpakking</h2>
<p>Een fabrikant kan aanplantgrond speciaal voor vollegrondstoepassingen aanbieden en een potgrond voor kamer-, kuip- of tuinplanten. Dat zijn concrete productkeuzes, geen bewijs dat alle grond met dezelfde naam identiek is. Sommige potgronden mogen bijvoorbeeld ook in borders worden gebruikt.</p>
<div class="table-wrap"><table class="advice-table compact-table"><thead><tr><th scope="col">Jouw klus</th><th scope="col">Wat controleer je?</th></tr></thead><tbody>
<tr><td>Planten in de volle grond</td><td>Of het mengsel past bij de plant en bestaande grond, en hoe je het verwerkt</td></tr>
<tr><td>Een pot of bak vullen</td><td>Of potgebruik expliciet wordt genoemd en het mengsel bij de plant past</td></tr>
<tr><td>Bestaande planten voeden</td><td>Of voeding nodig is; extra grond is niet hetzelfde als gericht bemesten</td></tr>
</tbody></table></div>
<h2 id="vitalmix">Wat weten we van Vitalmix?</h2>
<p><a href="/producten/vitalmix">Vitalmix aanplantgrond</a> wordt aangeboden in zakken van 50 liter. De aangeleverde samenstelling bevat onder andere veen, Horticompost, Hortivezel, tuinturf, Biovin, bemesting 4-7-7 en aanplantmest. Het is daarmee geen turfvrij product.</p>
<p>Deze ingrediëntenlijst vertelt nog niet welke mengverhouding voor jouw project geschikt is. Geef bij een aanvraag daarom door welke planten je gaat zetten, waar ze komen en welke grond er al ligt. Voor potgebruik is een gerichte geschiktheidscontrole nodig.</p>
<h2 id="voeding">Moet er direct extra aanplantmest bij?</h2>
<p>Niet automatisch. Een grondmengsel kan al voeding bevatten. De losse Dungking Aanplantmest is een ander product met een eigen dosering. In het advies over <a href="/advies/mest-bij-aanplanten">mest bij nieuwe aanplant</a> lees je hoe je die keuze van de grondvraag onderscheidt.</p>
<h2 id="hoeveelheid">Kies eerst het product, bereken dan het volume</h2>
<p>Meet de benodigde ruimte en houd rekening met de kluit en hergebruikte grond. Met de uitleg over <a href="/advies/hoeveel-aanplantgrond-nodig">liters aanplantgrond en zakken berekenen</a> kun je de hoeveelheid uitwerken zodra de verwerking is bepaald. Een volumeberekening levert geen mengadvies op.</p>
<p>Gaat je twijfel over het ophogen van een border? Lees dan de afzonderlijke <a href="/advies/aanplantgrond-of-tuinaarde">vergelijking tussen aanplantgrond en tuinaarde</a>. Zo kies je vanuit de klus en niet alleen vanuit de naam op een zak.</p>`,
    faq: [
      ["Kan Vitalmix zonder meer in elke plantenpot?", "Die geschiktheid is niet bevestigd in de aangeleverde productinformatie. Geef plantsoort en toepassing door en bespreek eerst welk grondmengsel past."],
      ["Is potgrond uitsluitend voor binnenplanten?", "Nee. Er zijn producten voor binnen- en buitenplanten. Controleer het gebruiksdoel en de geschikte planten op de verpakking van het gekozen product."],
    ],
    related: ["aanplantgrond-of-tuinaarde", "hoeveel-aanplantgrond-nodig", "mest-bij-aanplanten"],
    sourceNote: '<p>Voor het onderscheid tussen concrete producttoepassingen: <a href="https://www.pokon.nl/producten/item/aanplantgrond-tuinplanten-bomen-hagen-bio-30l/">Pokon aanplantgrond voor volle grond</a> en <a href="https://www.pokon.nl/producten/item/potgrond-universeel-10l/">Pokon Potgrond</a>, geraadpleegd 25 oktober 2026. Hun samenstelling, mengverhoudingen en voedingsduur zijn geen voorschrift voor Vitalmix. Vitalmix-gegevens komen van Eco Yard Supply, 28 september 2026.</p>',
    product: { href: "/producten/vitalmix", label: "Bekijk Vitalmix aanplantgrond", note: "Aanplantgrond in zakken van 50 liter. Bespreek plantsoort, bestaande bodem, verwerking en benodigde hoeveelheid voor jouw project." },
  },
].map(page => ({ ...page, datePublished: date, dateModified: date }));
