import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./contents/**/*.{md,mdx,markdown}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.zinc.700"),
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.primary"),
            },
            h1: {
              fontWeight: theme("fontWeight.black"),
              lineHeight: "1.4",
            },
            h2: {
              borderBottom: `1px solid ${theme("colors.gray.300")}`,
            },
            a: {
              color: theme("colors.cyan.600"),
              "&:hover": {
                color: theme("colors.cyan.700"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
