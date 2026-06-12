/* Optimiza las imágenes del libro in-place: redimensiona a un ancho máximo
 * y recomprime manteniendo el formato (PNG/JPG) y el nombre de archivo.
 * Uso: node optimize-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIR = path.join(__dirname, 'static', 'img', 'libro');
const MAX_WIDTH = 1600;

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
  let before = 0;
  let after = 0;
  for (const file of files) {
    const fp = path.join(DIR, file);
    const orig = fs.readFileSync(fp);
    before += orig.length;
    const isPng = /\.png$/i.test(file);

    let pipeline = sharp(orig).rotate(); // respeta orientación EXIF
    const meta = await sharp(orig).metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    pipeline = isPng
      ? pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 })
      : pipeline.jpeg({ quality: 80, mozjpeg: true });

    const out = await pipeline.toBuffer();
    // Solo sobrescribimos si reducimos tamaño
    if (out.length < orig.length) {
      fs.writeFileSync(fp, out);
      after += out.length;
    } else {
      after += orig.length;
    }
  }
  const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
  console.log(`Imágenes: ${files.length}`);
  console.log(`Antes:  ${mb(before)}`);
  console.log(`Después: ${mb(after)}`);
  console.log(`Reducción: ${(100 - (after / before) * 100).toFixed(1)}%`);
}

run().catch((e) => {
  console.error('ERROR', e);
  process.exit(1);
});
