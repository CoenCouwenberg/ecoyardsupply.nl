"""Create WebP assets from the reviewed selection; originals are never changed.
Usage: python3 scripts/optimize-product-photos.py /path/to/Productfoto\'s
Requires Pillow. Full images: <=300,000 bytes; responsive images: 560 px.
"""
import argparse
import io
import json
from pathlib import Path
from xml.sax.saxutils import escape
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
args = parser.parse_args()
manifest = json.loads((ROOT / 'content/product-photos.json').read_text())
out = ROOT / 'public/assets/images/products/photos'
out.mkdir(parents=True, exist_ok=True)
report = []
for product in manifest.values():
    for photo in product['photos']:
        source = args.source / photo['source']
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert('RGBA')
            # Fit without cropping; keep original shadows, transparency and proportions.
            image = ImageOps.pad(image, (1600, 1600), method=Image.Resampling.LANCZOS, color=(0, 0, 0, 0))
        xmp = ('<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
               '<rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/">'
               f'<dc:title><rdf:Alt><rdf:li xml:lang="nl">{escape(photo["title"])}</rdf:li></rdf:Alt></dc:title>'
               f'<dc:description><rdf:Alt><rdf:li xml:lang="nl">{escape(photo["description"])}</rdf:li></rdf:Alt></dc:description>'
               '</rdf:Description></rdf:RDF></x:xmpmeta>').encode()
        best = None
        # Retain the highest quality under the requested 300 kB cap.
        low, high = 45, 100
        while low <= high:
            quality = (low + high) // 2
            buffer = io.BytesIO()
            image.save(buffer, format='WEBP', quality=quality, method=6, xmp=xmp)
            if buffer.tell() <= 300_000:
                best = (buffer.getvalue(), quality)
                low = quality + 1
            else:
                high = quality - 1
        if best is None:
            raise RuntimeError(f'Cannot meet file budget: {source.name}')
        full = out / (photo['file'] + '.webp')
        full.write_bytes(best[0])
        small = out / (photo['file'] + '-560.webp')
        image.resize((560, 560), Image.Resampling.LANCZOS).save(small, format='WEBP', quality=84, method=6, xmp=xmp)
        report.append({'file': full.name, 'source': photo['source'], 'bytes': len(best[0]), 'quality': best[1], 'width': 1600, 'height': 1600, 'responsiveBytes': small.stat().st_size})
(ROOT / 'content/product-photo-sizes.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(f'{len(report)} full images, {len(report)} responsive images; {min(p["bytes"] for p in report):,}–{max(p["bytes"] for p in report):,} bytes per full image.')
