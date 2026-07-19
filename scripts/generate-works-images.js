import { constants } from "fs";
import { access, mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const SRC_DIR = join(process.cwd(), "assets_src", "works");
  const OUT_BASE = join(process.cwd(), "public", "assets", "works");
  const OUT_DISPLAY = join(OUT_BASE, "display");
  const MANIFEST_PATH = join(OUT_BASE, "manifest.json");

  const DISPLAY_WIDTH = 1800;
  const DISPLAY_HEIGHT = 2400;
  const DISPLAY_QUALITY = 85;

  const force = process.argv.includes("--force");

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
      // generate a single display image sized to DISPLAY_WIDTH x DISPLAY_HEIGHT
      const outDisplayWebP = join(
        OUT_DISPLAY,
        `${name}.${DISPLAY_HEIGHT}.webp`,
      );
      try {
        await access(outDisplayWebP, constants.F_OK);
        if (!force) {
          console.log("skip existing display", outDisplayWebP);
        } else {
          await sharp(input)
            .resize(DISPLAY_WIDTH, DISPLAY_HEIGHT, { fit: "cover" })
            .webp({ quality: DISPLAY_QUALITY })
            .toFile(outDisplayWebP);
        }
      } catch {
        await sharp(input)
          .resize(DISPLAY_WIDTH, DISPLAY_HEIGHT, { fit: "cover" })
          .webp({ quality: DISPLAY_QUALITY })
          .toFile(outDisplayWebP);
      }

      // read metadata from the generated webp image
      const metaDisplay = await sharp(outDisplayWebP).metadata();

      manifest[name] = {
        src: `/assets/works/display/${name}.${DISPLAY_HEIGHT}.webp`,
        width: metaDisplay.width || DISPLAY_WIDTH,
        height: metaDisplay.height || DISPLAY_HEIGHT,
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
