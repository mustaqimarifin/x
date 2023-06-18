import localFont from "next/font/local";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

const inter: NextFontWithVariable = localFont({
  src: "../../public/fonts/RobotoFlex.woff2",
  weight: "variable",
  variable: "--font-inter",
  display: "swap",
});

const kaisei: NextFontWithVariable = localFont({
  src: "../../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});

const sfmono: NextFontWithVariable = localFont({
  src: "../../public/fonts/SFMono-300.woff2",
  weight: "300",
  variable: "--font-sfmono",
  display: "swap",
});

const sohne: NextFontWithVariable = localFont({
  src: [
    {
      path: "../../public/fonts/Sohne-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Sohne-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});

export { inter, kaisei, sfmono, sohne };
