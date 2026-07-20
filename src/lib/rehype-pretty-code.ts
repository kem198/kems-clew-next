import type { Options } from "rehype-pretty-code";

export const rehypePrettyCodeOptions: Options = {
  theme: "github-dark",

  keepBackground: false,

  defaultLang: {
    block: "text",
    inline: "text",
  },
};
