import { constants } from "node:fs";
import {
  access,
  copyFile,
  mkdir,
  readdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

export type WebpMode = "lossy" | "lossless" | "near-lossless";

export type ImageGeneratorConfig = {
  name: string;

  srcDir: string;

  outDir: string;

  manifestPath?: string;

  resize: {
    width: number;
    height: number;
  };

  webp: {
    mode: WebpMode;
    quality: number;
    effort: number;
    alphaQuality: number;
  };

  keepOriginalIfLarger?: boolean;
};

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

function getWebpOptions(config: ImageGeneratorConfig) {
  switch (config.webp.mode) {
    case "lossless":
      return {
        lossless: true,
        effort: config.webp.effort,
        alphaQuality: config.webp.alphaQuality,
      };

    case "near-lossless":
      return {
        nearLossless: true,
        quality: config.webp.quality,
        effort: config.webp.effort,
        alphaQuality: config.webp.alphaQuality,
      };

    case "lossy":
    default:
      return {
        quality: config.webp.quality,
        effort: config.webp.effort,
        alphaQuality: config.webp.alphaQuality,
      };
  }
}

export async function generateImages(config: ImageGeneratorConfig) {
  await mkdir(config.outDir, {
    recursive: true,
  });

  console.log(`\n=== Generate ${config.name} images ===\n`);

  console.log("=== Settings ===");
  console.log(`webp mode       : ${config.webp.mode}`);
  console.log(`webp quality    : ${config.webp.quality}`);
  console.log(`webp effort     : ${config.webp.effort}`);
  console.log(`alpha quality   : ${config.webp.alphaQuality}`);
  console.log(
    `target size     : ${config.resize.width}x${config.resize.height}`,
  );
  console.log(`source dir      : ${config.srcDir}`);
  console.log(`output dir      : ${config.outDir}`);
  console.log("");

  const files = await readdir(config.srcDir, {
    recursive: true,
  });

  const imageRegex = /\.(png|jpe?g|gif|webp|avif)$/i;

  const manifest: Record<string, ManifestItem> = {};

  let totalInput = 0;
  let totalOutput = 0;

  for (const relativeFile of files) {
    if (!imageRegex.test(relativeFile)) {
      continue;
    }

    const start = performance.now();

    const input = join(config.srcDir, relativeFile);

    const relativeDir = relativeFile.includes("/")
      ? relativeFile.substring(0, relativeFile.lastIndexOf("/"))
      : "";

    const fileName = basename(relativeFile);

    const name = basename(fileName, extname(fileName));

    const outputDir = join(config.outDir, relativeDir);

    await mkdir(outputDir, {
      recursive: true,
    });

    const outputWebp = join(outputDir, `${name}.webp`);

    const outputOriginal = join(outputDir, fileName);

    try {
      const inputStat = await stat(input);

      totalInput += inputStat.size;

      const isGif = extname(input).toLowerCase() === ".gif";

      const inputMeta = await sharp(input, {
        animated: true,
      }).metadata();

      await sharp(input, {
        animated: true,
      })
        .resize(config.resize.width, config.resize.height, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp(getWebpOptions(config))
        .toFile(outputWebp);

      const webpStat = await stat(outputWebp);

      let selectedPath = outputWebp;

      let result = "USE WEBP";

      let reason = "";

      if (isGif) {
        reason =
          webpStat.size < inputStat.size
            ? "gif converted to webp"
            : "gif forced to webp";
      } else {
        reason =
          webpStat.size < inputStat.size
            ? "generated webp is smaller"
            : "generated webp is larger but original is not kept";
      }

      if (
        config.keepOriginalIfLarger &&
        !isGif &&
        webpStat.size >= inputStat.size
      ) {
        await unlink(outputWebp);

        await copyFile(input, outputOriginal);

        selectedPath = outputOriginal;

        result = "KEEP ORIGINAL";

        reason = "generated webp is larger";
      }

      const outputStat = await stat(selectedPath);

      totalOutput += outputStat.size;

      /*
       * manifest 用 metadata
       *
       * GIF:
       *   必ず WebP 採用なので WebP metadata
       *
       * その他:
       *   実際に採用したファイル metadata
       */
      const outputMeta = isGif
        ? await sharp(outputWebp).metadata()
        : await sharp(selectedPath).metadata();

      const manifestKey = relativeFile.replace(extname(relativeFile), "");

      const selectedExt = extname(selectedPath);

      manifest[manifestKey] = {
        src: `/assets/${config.name}/${relativeFile.replace(
          extname(relativeFile),
          selectedExt,
        )}`,
        width: outputMeta.width ?? config.resize.width,
        height: outputMeta.height ?? config.resize.height,
      };

      console.log(
        [
          `[CONVERT] ${relativeFile}`,
          `  input       : ${formatBytes(inputStat.size)}`,
          `  generated   : ${formatBytes(webpStat.size)} (webp)`,
          `  result      : ${result}`,
          `  output      : ${formatBytes(outputStat.size)}`,
          `  reason      : ${reason}`,
          `  saved       : ${formatSaved(inputStat.size, outputStat.size)}`,
          `  size        : ${inputMeta.width}x${inputMeta.height}`,
          `  time        : ${(performance.now() - start).toFixed(0)} ms`,
          "",
        ].join("\n"),
      );
    } catch (error) {
      console.error(`[FAILED] ${relativeFile}`, error);
    }
  }

  if (config.manifestPath) {
    await writeFile(
      config.manifestPath,
      JSON.stringify(manifest, null, 2),
      "utf8",
    );
  }

  console.log("=== Summary ===");

  console.log(`input  : ${formatBytes(totalInput)}`);
  console.log(`output : ${formatBytes(totalOutput)}`);
  console.log(`saved  : ${formatSaved(totalInput, totalOutput)}`);

  if (config.manifestPath) {
    console.log(`Generated: ${config.manifestPath}`);
  }
}
