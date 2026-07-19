import { constants } from "fs";
import { access, mkdir, readdir, stat, unlink, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import sharp from "sharp";

type WebpMode = "lossy" | "lossless" | "near-lossless";

type ManifestItem = {
  src: string;
  width: number;
  height: number;
};

/**
 * ==========================
 * Image settings
 * ==========================
 */

// WebP 圧縮方式
const WEBP_MODE: WebpMode = "lossy";

// 非可逆品質
const WEBP_QUALITY = 82;

// 圧縮処理量 (0 - 6)
const WEBP_EFFORT = 6;

// 透過部分品質
const WEBP_ALPHA_QUALITY = 90;

/**
 * ==========================
 * Resize settings
 * ==========================
 */

const TARGET_WIDTH = 1800;
const TARGET_HEIGHT = 2400;

/**
 * ==========================
 * Directory
 * ==========================
 */

const SRC_DIR = join(process.cwd(), "assets_src", "works");

const OUT_DIR = join(process.cwd(), "public", "assets", "works");

const MANIFEST_PATH = join(OUT_DIR, "manifest.json");

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
  if (input <= output) {
    return "0.0%";
  }

  return `${(((input - output) / input) * 100).toFixed(1)}%`;
}

async function exists(path: string) {
  return access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

/**
 * WebP options
 */
function getWebpOptions() {
  switch (WEBP_MODE) {
    case "lossless":
      return {
        lossless: true,
        effort: WEBP_EFFORT,
        alphaQuality: WEBP_ALPHA_QUALITY,
      };

    case "near-lossless":
      return {
        nearLossless: true,
        quality: WEBP_QUALITY,
        effort: WEBP_EFFORT,
        alphaQuality: WEBP_ALPHA_QUALITY,
      };

    case "lossy":
    default:
      return {
        quality: WEBP_QUALITY,
        effort: WEBP_EFFORT,
        alphaQuality: WEBP_ALPHA_QUALITY,
      };
  }
}

async function main() {
  await mkdir(OUT_DIR, {
    recursive: true,
  });

  const files = await readdir(SRC_DIR);

  const imageRegex = /\.(png|jpe?g|gif|webp|avif)$/i;

  const manifest: Record<string, ManifestItem> = {};

  let totalInput = 0;
  let totalOutput = 0;

  console.log("\n=== Generate works images ===\n");

  for (const file of files) {
    if (!imageRegex.test(file)) {
      continue;
    }

    const start = performance.now();

    const input = join(SRC_DIR, file);

    const name = basename(file, extname(file));

    const outputWebp = join(OUT_DIR, `${name}.webp`);

    const outputOriginal = join(OUT_DIR, file);

    try {
      const inputStat = await stat(input);

      totalInput += inputStat.size;

      const metadata = await sharp(input, {
        animated: true,
      }).metadata();

      const animated = Boolean(metadata.pages && metadata.pages > 1);

      /**
       * Generate WebP
       */
      await sharp(input, {
        animated: true,
      })
        .resize(TARGET_WIDTH, TARGET_HEIGHT, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp(getWebpOptions())
        .toFile(outputWebp);

      const webpStat = await stat(outputWebp);

      let selectedPath = outputWebp;

      let result = "USE WEBP";

      let reason = "generated webp is smaller";

      /**
       * Keep original if WebP is larger
       */
      if (webpStat.size >= inputStat.size) {
        if (await exists(outputWebp)) {
          await unlink(outputWebp);
        }

        selectedPath = outputOriginal;

        result = "KEEP ORIGINAL";

        reason = "generated webp is larger";
      }

      const outputStat = await stat(selectedPath);

      totalOutput += outputStat.size;

      const outputMeta = await sharp(selectedPath, {
        animated: true,
      }).metadata();

      manifest[name] = {
        src: `/assets/works/${basename(selectedPath)}`,
        width: outputMeta.width ?? TARGET_WIDTH,
        height: outputMeta.height ?? TARGET_HEIGHT,
      };

      console.log(
        [
          `[CONVERT] ${file}`,
          `  type        : ${animated ? "animated" : "static"}`,
          `  input       : ${formatBytes(inputStat.size)}`,
          `  generated   : ${formatBytes(webpStat.size)} (webp)`,
          `  result      : ${result}`,
          `  output      : ${formatBytes(outputStat.size)} (${extname(
            selectedPath,
          )})`,
          `  reason      : ${reason}`,
          `  saved       : ${formatSaved(inputStat.size, outputStat.size)}`,
          `  size        : ${metadata.width}x${metadata.height}`,
          metadata.pages ? `  frames      : ${metadata.pages}` : "",
          `  time        : ${(performance.now() - start).toFixed(0)} ms`,
          "",
        ]
          .filter(Boolean)
          .join("\n"),
      );
    } catch (error) {
      console.error(`[FAILED] ${file}`, error);
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

  console.log("=== Summary ===");

  console.log(`input  : ${formatBytes(totalInput)}`);

  console.log(`output : ${formatBytes(totalOutput)}`);

  console.log(`saved  : ${formatSaved(totalInput, totalOutput)}`);

  console.log("\nGenerated:", MANIFEST_PATH);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
