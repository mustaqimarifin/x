import localFont from "next/font/local";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Roboto_Flex } from "next/font/google";

const rFlex = Roboto_Flex({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-rFlex",
  display: "swap",
});

/* const kK = Kaisei_Tokumin({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-k",
  display: "swap",
});
 */
/* const rFlex: NextFontWithVariable = localFont({
  src: "../../public/fonts/RobotoFlex.woff2",
  weight: "variable",
  variable: "--font-robotoFlex",
  display: "optional",
});
 */
const kK: NextFontWithVariable = localFont({
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

export { rFlex, kK, sfmono };
