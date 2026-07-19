import { constants } from "fs";
import { access, mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const SRC_DIR = join(process.cwd(), "assets_src", "works");
  const OUT_DIR = join(process.cwd(), "public", "assets", "works", "compare");
  const MANIFEST_PATH = join(OUT_DIR, "compare-manifest.json");

  const TARGET_WIDTH = 1800;
  const TARGET_HEIGHT = 2400;
  const QUALITY = 85; // requested quality for both encodings
  const EFFORT = 6;

  const force = process.argv.includes("--force");

  const KB = 1024;
  const MB = KB * 1024;
  const formatBytes = (b) => {
    if (b >= MB) return `${(b / MB).toFixed(2)} MB`;
    return `${(b / KB).toFixed(1)} KB`;
  };

  try {
    await access(SRC_DIR, constants.F_OK);
  } catch (err) {
    console.error("Source directory not found:", SRC_DIR);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;
  // only compare these specific files
  const targetFiles = [
    "20260718-shirusumayu.png",
    "20260710-yunyun.png",
    "20260610-swordman.png",
  ];

  const manifest = {};

  for (const file of targetFiles) {
    if (!imageExt.test(file)) {
      console.warn("skipping (unsupported ext)", file);
      continue;
    }
    const base = file.replace(/\.[^.]+$/, "");
    const input = join(SRC_DIR, file);

    try {
      await access(input, constants.F_OK);
    } catch (err) {
      console.warn("source not found, skipping", input);
      continue;
    }

    const losslessOut = join(OUT_DIR, `${base}.lossless.webp`);
    const nearOut = join(OUT_DIR, `${base}.nearlossless.webp`);
    const lossyOut = join(OUT_DIR, `${base}.lossy.webp`);

    try {
      // lossy
      let exists = false;
      try {
        await access(lossyOut, constants.F_OK);
        exists = true;
      } catch {}
      if (!exists || force) {
        await sharp(input)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY, effort: EFFORT, alphaQuality: 90 })
          .toFile(lossyOut);
      }

      // lossless
      exists = false;
      try {
        await access(losslessOut, constants.F_OK);
        exists = true;
      } catch {}
      if (!exists || force) {
        await sharp(input)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ lossless: true, effort: EFFORT, alphaQuality: 90 })
          .toFile(losslessOut);
      }

      // near-lossless
      exists = false;
      try {
        await access(nearOut, constants.F_OK);
        exists = true;
      } catch {}
      if (!exists || force) {
        await sharp(input)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            nearLossless: true,
            quality: QUALITY,
            effort: EFFORT,
            alphaQuality: 90,
          })
          .toFile(nearOut);
      }

      const metaLossy = await sharp(lossyOut).metadata();
      const metaLoss = await sharp(losslessOut).metadata();
      const metaNear = await sharp(nearOut).metadata();
      const statLossy = await stat(lossyOut);
      const statLoss = await stat(losslessOut);
      const statNear = await stat(nearOut);

      manifest[base] = {
        lossy: {
          src: `/assets/works/compare/${base}.lossy.webp`,
          width: metaLossy.width || TARGET_WIDTH,
          height: metaLossy.height || TARGET_HEIGHT,
          bytes: statLossy.size,
          size: formatBytes(statLossy.size),
        },
        lossless: {
          src: `/assets/works/compare/${base}.lossless.webp`,
          width: metaLoss.width || TARGET_WIDTH,
          height: metaLoss.height || TARGET_HEIGHT,
          bytes: statLoss.size,
          size: formatBytes(statLoss.size),
        },
        nearLossless: {
          src: `/assets/works/compare/${base}.nearlossless.webp`,
          width: metaNear.width || TARGET_WIDTH,
          height: metaNear.height || TARGET_HEIGHT,
          bytes: statNear.size,
          size: formatBytes(statNear.size),
        },
      };

      console.log(
        `${base}: lossy ${manifest[base].lossy.height}px ${manifest[base].lossy.size}, lossless ${manifest[base].lossless.height}px ${manifest[base].lossless.size}, near ${manifest[base].nearLossless.height}px ${manifest[base].nearLossless.size}`,
      );
    } catch (err) {
      console.error("failed", file, err && err.message ? err.message : err);
      continue;
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Compare manifest written to", MANIFEST_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
