import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

const extraction = JSON.parse(await readFile("docs/research/GLOBAL_EXTRACTION.json", "utf8"));
const assets = [];

for (const image of extraction.assets.images) {
  const url = new URL(image.src);
  const original = url.searchParams.get("url") || url.pathname;
  const clean = decodeURIComponent(original).replace(/^\//, "");
  assets.push({ url: image.src, path: join("public", clean), alt: image.alt });
}

for (const icon of extraction.assets.favicons) {
  const url = new URL(icon.href);
  assets.push({ url: icon.href, path: join("public", "seo", basename(url.pathname)), alt: icon.rel });
}

let downloaded = 0;
for (const asset of assets) {
  await mkdir(dirname(asset.path), { recursive: true });
  const response = await fetch(asset.url);
  if (!response.ok) throw new Error(`Failed ${response.status}: ${asset.url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(asset.path, buffer);
  downloaded += 1;
  console.log(`${asset.path} (${buffer.length} bytes)`);
}
console.log(`Downloaded ${downloaded} assets`);
