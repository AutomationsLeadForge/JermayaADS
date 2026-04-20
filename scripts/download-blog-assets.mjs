import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const RESEARCH = path.join(ROOT, "docs/research/blog");
const MANIFEST = path.join(RESEARCH, "manifest.json");
const OUT_DIR = path.join(ROOT, "public/images/blog");
const MAP_PATH = path.join(RESEARCH, "image-map.json");

const hashUrl = (u) =>
  crypto.createHash("sha1").update(u).digest("hex").slice(0, 14);

const extFromUrl = (u) => {
  const m = u.match(/\.(png|jpe?g|gif|webp|svg)(\?|$)/i);
  if (!m) return "png";
  return m[1].toLowerCase().replace("jpeg", "jpg");
};

const localNameFor = (u) => `${hashUrl(u)}.${extFromUrl(u)}`;

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; JermayaADS-BlogMirror/1.0)",
      },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    if (!ct.startsWith("image/")) throw new Error(`non-image content-type: ${ct}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 200) throw new Error(`suspiciously small body (${buf.length}b)`);
    await writeFile(dest, buf);
    return { ok: true, size: buf.length };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });
  const urls = [...new Set(manifest.allImageUrls)];
  console.log(`Downloading ${urls.length} unique images → ${OUT_DIR}`);

  const urlToLocal = {};
  const fails = [];
  const concurrency = 6;
  let i = 0;

  async function worker() {
    while (true) {
      const idx = i++;
      if (idx >= urls.length) return;
      const url = urls[idx];
      const name = localNameFor(url);
      const dest = path.join(OUT_DIR, name);
      if (existsSync(dest)) {
        urlToLocal[url] = `/images/blog/${name}`;
        process.stdout.write(".");
        continue;
      }
      const r = await download(url, dest);
      if (r.ok) {
        urlToLocal[url] = `/images/blog/${name}`;
        process.stdout.write("+");
      } else {
        fails.push({ url, err: r.error });
        process.stdout.write("x");
      }
    }
  }

  await Promise.all(Array(concurrency).fill(0).map(worker));
  process.stdout.write("\n");

  await writeFile(MAP_PATH, JSON.stringify(urlToLocal, null, 2));

  const okCount = Object.keys(urlToLocal).length;
  console.log(`Done: ${okCount} ok, ${fails.length} failed.`);
  if (fails.length) {
    console.log("First 10 failures:");
    fails.slice(0, 10).forEach((f) => console.log(`  - ${f.url.slice(0, 80)}: ${f.err}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
