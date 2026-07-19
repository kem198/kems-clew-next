import { constants } from "fs";
import { access, copyFile, mkdir, readdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

async function main() {
  const NOTES_SRC_DIR = join(process.cwd(), "assets_src", "notes");
  const NOTES_OUT_DIR = join(process.cwd(), "public", "assets", "notes");
  const OUTPUT_QUALITY = 80;
  const TARGET_WIDTH = 1200;
  const TARGET_HEIGHT = 1600;
  const force = process.argv.includes("--force");

  let folders = [];
  try {
    folders = await readdir(NOTES_SRC_DIR, { withFileTypes: true });
  } catch (err) {
    console.error("Source notes directory not found:", NOTES_SRC_DIR);
    process.exit(1);
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;
  const gifExt = /\.gif$/i;

  for (const dirent of folders) {
    if (!dirent.isDirectory()) continue;
    const folderName = dirent.name;
    const srcDir = join(NOTES_SRC_DIR, folderName);
    const outDir = join(NOTES_OUT_DIR, folderName);

    try {
      await mkdir(outDir, { recursive: true });
    } catch (err) {
      console.error("failed to create output dir", outDir, err);
      continue;
    }

    let files = [];
    try {
      files = await readdir(srcDir);
    } catch (err) {
      console.error("failed to read folder", srcDir, err);
      continue;
    }

    for (const file of files) {
      if (!imageExt.test(file)) continue;
      const name = file.replace(/\.[^.]+$/, "");
      const inPath = join(srcDir, file);
      const outPath = gifExt.test(file)
        ? join(outDir, `${name}.gif`)
        : join(outDir, `${name}.webp`);

      try {
        let exists = false;
        try {
          await access(outPath, constants.F_OK);
          exists = true;
        } catch {}

        if (exists && !force) {
          console.log("skip existing", outPath);
          continue;
        }

        if (gifExt.test(file)) {
          // Copy GIF as-is to the public output directory (no conversion/upscaling)
          await copyFile(inPath, outPath);
          console.log("copied gif", inPath, "->", outPath);
          continue;
        }

        // Default: use sharp to convert other formats to WebP (no upscaling)
        await sharp(inPath)
          .resize(TARGET_WIDTH, TARGET_HEIGHT, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: OUTPUT_QUALITY })
          .toFile(outPath);
        console.log("converted", inPath, "->", outPath);
      } catch (err) {
        console.error(
          "failed to convert",
          inPath,
          err && err.message ? err.message : err,
        );
        continue;
      }
    }
  }

  console.log("Notes images conversion complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
