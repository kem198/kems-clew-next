import { join } from "node:path";
import { generateImages } from "./lib/image-generator";

generateImages({
  name: "works",

  srcDir: join(process.cwd(), "assets_src", "works"),

  outDir: join(process.cwd(), "public", "assets", "works"),

  manifestPath: join(
    process.cwd(),
    "public",
    "assets",
    "works",
    "manifest.json",
  ),

  resize: {
    width: 1800,
    height: 2400,
  },

  webp: {
    mode: "near-lossless",
    quality: 90,
    effort: 6,
    alphaQuality: 90,
  },

  keepOriginalIfLarger: true,
});
