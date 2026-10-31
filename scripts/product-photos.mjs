import fs from 'node:fs/promises';
import { productPrices, businessPriceNote } from '../content/product-prices.mjs';
const site = 'https://ecoyardsupply.nl';
export const photoUpdate = '2026-10-18';
export const productPhotos = JSON.parse(await fs.readFile(new URL('../content/product-photos.json', import.meta.url), 'utf8'));
const photoBase = '/public/assets/images/products/photos/';
export const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export function photoImage(photo, { small = false, eager = false, sizes = '(min-width: 58rem) 25vw, (min-width: 40rem) 50vw, 100vw' } = {}) {
  return `<img src="${photoBase}${photo.file}${small ? '-560' : ''}.webp"${small ? '' : ` srcset="${photoBase}${photo.file}-560.webp 560w, ${photoBase}${photo.file}.webp 1600w" sizes="${sizes}"`} alt="${esc(photo.alt)}" title="${esc(photo.title)}" width="${small ? 560 : 1600}" height="${small ? 560 : 1600}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
export function imageSchema(photo) {
  return { '@type': 'ImageObject', contentUrl: `${site}${photoBase}${photo.file}.webp`, name: photo.title, caption: photo.alt, description: photo.description, encodingFormat: 'image/webp', width: 1600, height: 1600 };
}
export function gallery(slug) {
  const product = productPhotos[slug];
  const cheapest = [...(productPrices[slug] || [])].sort((a, b) => a.cents - b.cents)[0];
  const initial = product.photos.find(p => p.label === cheapest?.photo) || product.photos[0];
  const initialIndex = product.photos.indexOf(initial);
  if (product.photos.length === 1) return `<div class="product-gallery" aria-label="Productfoto van ${esc(product.name)}"><figure class="gallery-stage"><a href="${photoBase}${product.photos[0].file}.webp" target="_blank" rel="noopener" aria-label="Open productfoto op volledig formaat">${photoImage(product.photos[0], { eager: true, sizes: '(min-width: 58rem) 48vw, 100vw' })}</a><figcaption>${esc(product.photos[0].label)}</figcaption></figure><a class="text-link" href="${photoBase}${product.photos[0].file}.webp" target="_blank" rel="noopener">Open foto op volledig formaat ↗</a></div>`;
  return `<div class="product-gallery" data-product-gallery aria-label="Foto’s van ${esc(product.name)}">
    <figure class="gallery-stage"><a data-gallery-full href="${photoBase}${initial.file}.webp" target="_blank" rel="noopener" aria-label="Open productfoto op volledig formaat">${photoImage(initial, { eager: true, sizes: '(min-width: 58rem) 48vw, 100vw' })}</a><figcaption data-gallery-caption aria-live="polite">${esc(initial.label)} · ${initialIndex + 1} van ${product.photos.length}</figcaption></figure>
    <nav class="gallery-thumbs" aria-label="Kies een productfoto">${product.photos.map((p, i) => `<a href="${photoBase}${p.file}.webp" data-gallery-select data-photo-label="${esc(p.label)}" data-src="${photoBase}${p.file}.webp" data-small="${photoBase}${p.file}-560.webp" data-alt="${esc(p.alt)}" data-title="${esc(p.title)}" data-caption="${esc(p.label)} · ${i + 1} van ${product.photos.length}" aria-label="Toon ${esc(p.label.toLowerCase())}"${i === initialIndex ? ' aria-current="true"' : ''}>${photoImage(p, { small: true })}<span>${esc(p.label)}</span></a>`).join('')}</nav>
    <a class="gallery-zoom text-link" data-gallery-zoom href="${photoBase}${initial.file}.webp" target="_blank" rel="noopener">Open foto op volledig formaat ↗</a>
  </div>`;
}
export function orderLink(slug) {
  return `https://wa.me/31626672878?text=${encodeURIComponent(`Hallo Eco Yard Supply, ik wil graag ${productPhotos[slug].name} bestellen. Kunnen jullie mij helpen met de hoeveelheid, prijs en beschikbaarheid?`)}`;
}
export function orderTracking(slug) {
  return `data-contact-intent="order" data-product-id="${esc(slug)}" data-product-name="${esc(productPhotos[slug].name)}"`;
}
export function retailPrices(slug) {
  const prices = productPrices[slug];
  if (!prices) return '';
  const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
  return `<div class="product-prices"><p class="price-heading">Consumentenprijzen <span>inclusief btw</span></p><dl>${prices.map(({ packaging, cents }) => `<div><dt>${esc(packaging)}</dt><dd>${euro.format(cents / 100)}</dd></div>`).join('')}</dl><p class="business-price-note">${businessPriceNote}</p></div>`;
}
const euro = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
export function cardPrice(slug) {
  const prices = productPrices[slug];
  if (!prices?.length) return '';
  return `<a class="card-price" href="/producten/${esc(slug)}"><span>Vanaf</span><strong>${euro.format(Math.min(...prices.map(p => p.cents)) / 100)}</strong><span class="visually-hidden"> inclusief btw</span></a>`;
}
function purchasePrice(slug) {
  const prices = productPrices[slug];
  if (!prices?.length) return '';
  const cheapest = prices.reduce((a, b) => a.cents < b.cents ? a : b);
  if (prices.length === 1) return `<div class="purchase-pricing"><p class="selected-price"><strong>${euro.format(cheapest.cents / 100)}</strong><span>inclusief btw · ${esc(cheapest.packaging)}</span></p><p class="business-price-note">${businessPriceNote}</p></div>`;
  return `<div data-static-prices>${retailPrices(slug)}</div><div class="purchase-pricing" data-variant-picker hidden><p class="selected-price" aria-live="polite" aria-atomic="true"><strong data-variant-price>${euro.format(cheapest.cents / 100)}</strong><span>inclusief btw</span></p><fieldset class="variant-options"><legend>Kies je verpakking</legend>${prices.map(p => `<label class="variant-option"><input type="radio" name="verpakking" value="${esc(p.packaging)}" data-cents="${p.cents}" data-photo="${esc(p.photo || 'Overzicht')}"${p === cheapest ? ' checked' : ''}><span>${esc(p.packaging)}</span><strong>${euro.format(p.cents / 100)}</strong></label>`).join('')}</fieldset><p class="business-price-note">${businessPriceNote}</p></div>`;
}
export function orderPanel(slug) {
  return `<div class="product-order" id="bestellen" data-product-purchase data-product-name="${esc(productPhotos[slug].name)}">${purchasePrice(slug)}<div class="actions"><a class="button" href="${orderLink(slug)}" ${orderTracking(slug)} target="_blank" rel="noopener">Bestellen via WhatsApp</a><a class="text-link" href="tel:+31626672878" ${orderTracking(slug)}>Liever bellen? +31 6 2667 2878</a></div><p class="order-note">We stemmen beschikbaarheid en afhalen of levering persoonlijk met je af. Afhalen op afspraak.</p></div>`;
}
export function articlePhoto(page) {
  const slug = page.product.href.split('/').pop();
  const product = productPhotos[slug];
  return product ? `<a class="advice-product-photo" href="${page.product.href}">${photoImage(product.photos[0], { sizes: '(min-width: 58rem) 300px, 100vw' })}</a>` : '';
}
export function detailPhoto(page) {
  if (page.photo) {
    const product = productPhotos[page.photo.product];
    const photo = product.photos.find(p => p.label === page.photo.label);
    if (!photo) throw new Error(`Unknown detail photo for ${page.slug}`);
    return `<figure class="advice-detail-photo">${photoImage(photo, { sizes: '(min-width: 58rem) 700px, 100vw' })}<figcaption>${esc(page.photo.caption)}</figcaption></figure>`;
  }
  const slug = ({ 'insectenmest': 'aanplantmest', 'gazon-bemesten': 'gazonmest', 'gazon-bemesten-voorjaar': 'startersmest', 'borders-bemesten': 'bordermest', 'gazon-bemesten-najaar': 'bordermest' })[page.slug];
  if (!slug) return '';
  const product = productPhotos[slug];
  const photo = product.photos.find(p => p.label === 'Korrels');
  return `<figure class="advice-detail-photo">${photoImage(photo, { sizes: '(min-width: 58rem) 700px, 100vw' })}<figcaption>Zo zien de korrels van ${esc(product.name)} eruit. <a href="/producten/${slug}">Bekijk het product en de toepassing</a>.</figcaption></figure>`;
}
// These four product pages and the homepage are maintained as HTML; only marked
// photo blocks and existing card media are refreshed when the site is generated.
export async function refreshHandwrittenPages(root) {
  for (const slug of ['startersmest', 'gazonmest', 'bordermest', 'aanplantmest']) {
    const file = `${root}/producten/${slug}.html`;
    let html = await fs.readFile(file, 'utf8');
    const portable = markup => markup.replaceAll('src="/', 'src="../').replaceAll('href="/', 'href="../').replaceAll('srcset="/', 'srcset="../').replaceAll(', /public/', ', ../public/').replaceAll('data-src="/', 'data-src="../').replaceAll('data-small="/', 'data-small="../');
    html = html.replace(/<!-- product-gallery:start -->[\s\S]*?<!-- product-gallery:end -->/, `<!-- product-gallery:start -->${portable(gallery(slug))}<!-- product-gallery:end -->`);
    html = html.replace(/<!-- product-order:start -->[\s\S]*?<!-- product-order:end -->/, `<!-- product-order:start -->${orderPanel(slug)}<!-- product-order:end -->`);
    html = html.replace(/<!-- product-images-schema:start -->[\s\S]*?<!-- product-images-schema:end -->/, `<!-- product-images-schema:start --><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': productPhotos[slug].photos.map(imageSchema) })}</script><!-- product-images-schema:end -->`);
    const first = productPhotos[slug].photos[0];
    html = html.replace(/("image":\s*)(?:"https:\/\/ecoyardsupply\.nl\/public\/assets\/images\/products\/dungking-[^"]+\.webp"|\[[^\]]*\])/, `$1${JSON.stringify(productPhotos[slug].photos.map(p => `${site}${photoBase}${p.file}.webp`))}`);
    html = html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+/, `$1${site}${photoBase}${first.file}.webp`);
    html = html.replace(/(<meta property="og:image:alt" content=")[^"]+/, `$1${esc(first.alt)}`);
    await fs.writeFile(file, html);
  }
  const file = `${root}/index.html`;
  let html = await fs.readFile(file, 'utf8');
  for (const [slug, product] of Object.entries(productPhotos)) {
    const re = new RegExp(`(<a class="product-card-media" href="producten/${slug}"[^>]*>)[\\s\\S]*?(</a>)`);
    html = html.replace(re, `$1${photoImage(product.photos[0]).replaceAll('src="/', 'src="').replaceAll('srcset="/', 'srcset="').replaceAll(', /public/', ', public/')}$2`);
    // Keep card pricing generated from the same source as the product pages.
    const card = new RegExp(`(<article class="product-card">(?:(?!</article>)[\\s\\S])*?href="producten/${slug}"(?:(?!</article>)[\\s\\S])*?)(<a class="button" href="producten/${slug}">)`);
    html = html.replace(card, (_, before, button) => `${before.replace(/<!-- product-prices:start -->[\s\S]*?<!-- product-prices:end -->\s*/, '')}<!-- product-prices:start -->${cardPrice(slug).replace('href="/', 'href="')}<!-- product-prices:end -->\n              ${button}`);
  }
  html = html.replace(/href="producten\/([^"#]+)#inhoud"/g, 'href="producten/$1#bestellen"');
  await fs.writeFile(file, html);
}
