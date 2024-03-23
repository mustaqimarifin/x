import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
//import {  Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";

/*  const RFlex = Roboto_Flex({
	//weight: ['400', '500', '700'],
	variable: "--rflex",
	subsets: ["latin"],
});
 */
const GMono = localFont({
	src: "../public/font/GeistMono.woff2",
	variable: "--mono",
});

const GSans = localFont({
	src: "../public/font/Geist.woff2",
	variable: "--sans",
});

const Quad: NextFontWithVariable = localFont({
	src: "../public/font/qbc.woff2",
	weight: "700",
	style: "italic",
	variable: "--font-quad",
});

/* const NewsReader: NextFontWithVariable = Newsreader({
	subsets: ["latin"],
	style: ["italic", "normal"],
	weight: ["400", "600"],
	variable: "--newsreader",
});
 */
export { GMono, GSans, Quad };

/* const GT: NextFontWithVariable = localFont({
  src: [
    { path: './assets/fonts/7.woff2', weight: '400', style: 'normal' },
    { path: './assets/fonts/gtwm.woff2', weight: '500', style: 'normal' },
    { path: './assets/fonts/gtwb.woff2', weight: '700', style: 'normal' },
    { path: './assets/fonts/gtwbb.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-gt',
})
 */
