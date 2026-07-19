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
            color: theme("colors.gray.800"),
            h1: {
              fontWeight: theme("fontWeight.black"),
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
