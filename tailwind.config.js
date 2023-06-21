// @ts-nocheck
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@heathmont/moon-core-tw/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [
    require("@heathmont/moon-core-tw/lib/private/presets/ds-moon-preset"),
  ],
  theme: {
    extend: {
      /*       fontFamily: {
        sans: ["var(--font-robotoFlex)"],
        serif: ["var(--font-kaisei)"],
        mono: ["var(--font-sfmono)"],
      }, */
      fontFamily: {
        sans: ["RobotoFlex", ...fontFamily.sans],
        serif: ["Kaisei", ...fontFamily.serif],
        mono: ["SFMono", ...fontFamily.mono],
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      colors: {
        codeblack: "#171717",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("@tailwindcss/typography")],
};
