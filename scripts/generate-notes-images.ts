import { join } from "node:path";
import { generateImages } from "./lib/image-generator";

generateImages({
  name: "notes",

  srcDir: join(process.cwd(), "assets_src", "notes"),

  outDir: join(process.cwd(), "public", "assets", "notes"),

  resize: {
    width: 1200,
    height: 1600,
  },

  webp: {
    mode: "lossy",
    quality: 80,
    effort: 6,
    alphaQuality: 90,
  },

  keepOriginalIfLarger: false,
});
