import { constants } from "fs";
import { access, mkdir, readdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

type ManifestItem = {
  src: string;
  width: number;
  height: number;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatSaved(input: number, output: number): string {
  if (input === 0) {
    return "0%";
  }

  return (((input - output) / input) * 100).toFixed(1) + "%";
}

async function main() {
  const WORKS_SRC_DIR = join(process.cwd(), "assets_src", "works");

  const WORKS_OUT_DIR = join(process.cwd(), "public", "assets", "works");

  const WORKS_MANIFEST_PATH = join(WORKS_OUT_DIR, "manifest.json");

  const TARGET_WIDTH = 1800;
  const TARGET_HEIGHT = 2400;

  const OUTPUT_QUALITY = 90;

  const force = process.argv.includes("--force");

  await mkdir(WORKS_OUT_DIR, {
    recursive: true,
  });

  let files: string[];

  try {
    files = await readdir(WORKS_SRC_DIR);
  } catch {
    console.error("Source directory not found:", WORKS_SRC_DIR);
    process.exit(1);
    return;
  }

  const imageExt = /\.(png|jpe?g|webp|gif|avif)$/i;

  const manifest: Record<string, ManifestItem> = {};

  let totalInputSize = 0;
  let totalOutputSize = 0;

  console.log("\n=== Generate works images ===\n");

  for (const file of files) {
    if (!imageExt.test(file)) {
      continue;
    }

    const start = performance.now();

    const input = join(WORKS_SRC_DIR, file);

    const name = file.replace(/\.[^.]+$/, "");

    const output = join(WORKS_OUT_DIR, `${name}.webp`);

    try {
      const inputStat = await stat(input);

      totalInputSize += inputStat.size;

      const metadata = await sharp(input, {
        animated: true,
      }).metadata();

      const isAnimated = !!metadata.pages && metadata.pages > 1;

      const exists = await access(output, constants.F_OK)
        .then(() => true)
        .catch(() => false);

      if (!exists || force) {
        const pipeline = sharp(input, {
          animated: true,
        }).resize({
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          fit: "inside",
          withoutEnlargement: true,
        });

        await pipeline
          .webp({
            quality: OUTPUT_QUALITY,
            effort: 6,
            alphaQuality: 90,
            nearLossless: !isAnimated,
          })
          .toFile(output);
      }

      const outputStat = await stat(output);

      totalOutputSize += outputStat.size;

      const outputMeta = await sharp(output, {
        animated: true,
      }).metadata();

      manifest[name] = {
        src: `/assets/works/${name}.webp`,
        width: outputMeta.width ?? TARGET_WIDTH,
        height: outputMeta.height ?? TARGET_HEIGHT,
      };

      const elapsed = performance.now() - start;

      console.log(
        [
          `${isAnimated ? "[ANIMATED]" : "[STATIC]"} ${file}`,
          `  input : ${formatBytes(inputStat.size)}`,
          `  output: ${formatBytes(outputStat.size)}`,
          `  saved : ${formatSaved(inputStat.size, outputStat.size)}`,
          `  size  : ${metadata.width}x${metadata.height}`,
          metadata.pages ? `  frames: ${metadata.pages}` : "",
          `  time  : ${elapsed.toFixed(0)} ms`,
        ]
          .filter(Boolean)
          .join("\n"),
      );

      console.log("");
    } catch (error) {
      console.error(`[FAILED] ${file}`, error);
    }
  }

  await writeFile(
    WORKS_MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  console.log("=== Summary ===");

  console.log(`input : ${formatBytes(totalInputSize)}`);

  console.log(`output: ${formatBytes(totalOutputSize)}`);

  console.log(`saved : ${formatSaved(totalInputSize, totalOutputSize)}`);

  console.log("\nGenerated:", WORKS_MANIFEST_PATH);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
