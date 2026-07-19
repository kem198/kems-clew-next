import { constants } from "fs";
import { access, copyFile, mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const WORKS_SRC_DIR = join(process.cwd(), "assets_src", "works");
  const WORKS_OUT_DIR = join(process.cwd(), "public", "assets", "works");
  const WORKS_MANIFEST_PATH = join(WORKS_OUT_DIR, "manifest.json");

  const TARGET_WIDTH = 1800;
  const TARGET_HEIGHT = 2400;
  const OUTPUT_QUALITY = 90;

  const force = process.argv.includes("--force");

  await mkdir(WORKS_OUT_DIR, { recursive: true });

  let files = [];
  try {
    files = await readdir(WORKS_SRC_DIR);
  } catch (err) {
    console.error("Source directory not found:", WORKS_SRC_DIR);
    process.exit(1);
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;
  const gifExt = /\.gif$/i;
  const manifest = {};

  for (const file of files) {
    if (!imageExt.test(file)) continue;
    const input = join(WORKS_SRC_DIR, file);
    const name = file.replace(/\.[^.]+$/, "");

    try {
      // generate a single display image preserving aspect ratio (no crop)
      // For GIFs we copy as-is; for others we create a WebP display image.
      const outDisplayFile = gifExt.test(file)
        ? join(WORKS_OUT_DIR, `${name}.gif`)
        : join(WORKS_OUT_DIR, `${name}.webp`);

      let exists = false;
      try {
        await access(outDisplayFile, constants.F_OK);
        exists = true;
      } catch {}

      if (exists && !force) {
        console.log("skip existing display", outDisplayFile);
      } else {
        if (gifExt.test(file)) {
          // Copy GIF as-is (no conversion or scaling)
          await copyFile(input, outDisplayFile);
          console.log("copied gif", input, "->", outDisplayFile);
        } else {
          await sharp(input)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, {
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({
              nearLossless: true,
              quality: OUTPUT_QUALITY,
              effort: 6,
              alphaQuality: 90,
            })
            .toFile(outDisplayFile);
        }
      }

      // read metadata from the generated webp image and record actual size
      const meta = await sharp(outDisplayFile).metadata();

      manifest[name] = {
        src: `/assets/works/${name}${gifExt.test(file) ? ".gif" : ".webp"}`,
        width: meta.width || TARGET_WIDTH,
        height: meta.height || TARGET_HEIGHT,
      };
    } catch (err) {
      console.error(
        "failed processing",
        file,
        err && err.message ? err.message : err,
      );
      // continue with next file
      continue;
    }
  }

  await writeFile(
    WORKS_MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    "utf8",
  );
  console.log("Generated images and manifest at", WORKS_OUT_DIR);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
