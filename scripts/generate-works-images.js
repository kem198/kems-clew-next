import { constants } from "fs";
import { access, mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const SRC_DIR = join(process.cwd(), "assets_src", "works");
  const OUT_BASE = join(process.cwd(), "public", "assets", "works");
  const OUT_THUMBS = join(OUT_BASE, "thumbs");
  const OUT_DISPLAY = join(OUT_BASE, "display");
  const MANIFEST_PATH = join(OUT_BASE, "manifest.json");

  const THUMB_SIZES = [400, 800];
  const DISPLAY_SIZE = 1600;
  const THUMB_QUALITY = 80;
  const DISPLAY_QUALITY = 85;

  const force = process.argv.includes("--force");

  await mkdir(OUT_THUMBS, { recursive: true });
  await mkdir(OUT_DISPLAY, { recursive: true });

  let files = [];
  try {
    files = await readdir(SRC_DIR);
  } catch (err) {
    console.error("Source directory not found:", SRC_DIR);
    process.exit(1);
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;
  const manifest = {};

  for (const file of files) {
    if (!imageExt.test(file)) continue;
    const input = join(SRC_DIR, file);
    const name = file.replace(/\.[^.]+$/, "");

    try {
      // generate thumbs
      for (const w of THUMB_SIZES) {
        const outWebP = join(OUT_THUMBS, `${name}.${w}.webp`);
        let exists = false;
        try {
          await access(outWebP, constants.F_OK);
          exists = true;
        } catch {}

        if (exists && !force) {
          console.log("skip existing thumb", outWebP);
        } else {
          await sharp(input)
            .resize({ width: w })
            .webp({ quality: THUMB_QUALITY })
            .toFile(outWebP);
        }
      }

      // generate display size
      const outDisplayWebP = join(OUT_DISPLAY, `${name}.${DISPLAY_SIZE}.webp`);
      try {
        await access(outDisplayWebP, constants.F_OK);
        if (!force) {
          console.log("skip existing display", outDisplayWebP);
        } else {
          await sharp(input)
            .resize({ width: DISPLAY_SIZE })
            .webp({ quality: DISPLAY_QUALITY })
            .toFile(outDisplayWebP);
        }
      } catch {
        await sharp(input)
          .resize({ width: DISPLAY_SIZE })
          .webp({ quality: DISPLAY_QUALITY })
          .toFile(outDisplayWebP);
      }

      // read metadata from the generated webp images
      const metaDisplay = await sharp(outDisplayWebP).metadata();
      const thumbPath = join(OUT_THUMBS, `${name}.${THUMB_SIZES[1]}.webp`);
      const metaThumb = await sharp(thumbPath).metadata();

      manifest[name] = {
        thumb: `/assets/works/thumbs/${name}.${THUMB_SIZES[1]}.webp`,
        thumbWidth: metaThumb.width || THUMB_SIZES[1],
        thumbHeight: metaThumb.height || null,
        display: `/assets/works/display/${name}.${DISPLAY_SIZE}.webp`,
        displayWidth: metaDisplay.width || DISPLAY_SIZE,
        displayHeight: metaDisplay.height || null,
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

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  console.log("Generated images and manifest at", OUT_BASE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
