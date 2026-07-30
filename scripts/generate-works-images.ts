import { join } from "node:path";
import { generateImages } from "./lib/image-generator";

const force = process.argv.includes("--force");

generateImages({
  name: "works",

  srcDir: join(process.cwd(), "public_src", "assets", "works"),

  outDir: join(process.cwd(), "public", "assets", "works"),

  manifestPath: join(
    process.cwd(),
    "public",
    "assets",
    "works",
    "manifest.json",
  ),

  resize: {
    width: 2000,
    height: 2560,
  },

  webp: {
    mode: "near-lossless",
    quality: 90,
    effort: 6,
    alphaQuality: 90,
  },

  keepOriginalIfLarger: true,

  force,
});
