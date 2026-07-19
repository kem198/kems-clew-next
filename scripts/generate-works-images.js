import { constants } from "fs";
import { access, mkdir, readdir, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const WORKS_SRC_DIR = join(process.cwd(), "assets_src", "works");
  const WORKS_OUT_DIR = join(process.cwd(), "public", "assets", "works");
  const WORKS_MANIFEST_PATH = join(WORKS_OUT_DIR, "manifest.json");

  const TARGET_WIDTH = 1800;
  const TARGET_HEIGHT = 2400;
  const OUTPUT_QUALITY = 85;

  const force = process.argv.includes("--force");

  await mkdir(WORKS_OUT_DIR, { recursive: true });

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
    const input = join(WORKS_SRC_DIR, file);
    const name = file.replace(/\.[^.]+$/, "");

    try {
      // generate a single display image preserving aspect ratio (no crop)
      // use `inside` so the image fits within the box without cropping
      const outDisplayWebP = join(WORKS_OUT_DIR, `${name}.webp`);

      let exists = false;
      try {
        await access(outDisplayWebP, constants.F_OK);
        exists = true;
      } catch {}

      if (exists && !force) {
        console.log("skip existing display", outDisplayWebP);
      } else {
        await sharp(input)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: OUTPUT_QUALITY })
          .toFile(outDisplayWebP);
      }

      // read metadata from the generated webp image and record actual size
      const meta = await sharp(outDisplayWebP).metadata();

      manifest[name] = {
        src: `/assets/works/${name}.webp`,
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
