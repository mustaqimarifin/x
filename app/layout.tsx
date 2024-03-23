import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
//import Soehne from "next/font/local";
import "/styles/base.scss";

import { cx } from "@/lib/utils";
import styles from "@/styles/layout.module.scss";
import { GMono, GSans, Quad } from "./fonts";

/* const soehne = Soehne({
	src: [
		{
			path: "@/public/font/soehne-buch.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "@/public/font/soehne-buch-kursiv.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "@/public/font/soehne-halbfett.woff2",
			weight: "600",
			style: "normal",
		},
	],
}); */

export const metadata: Metadata = {
	title: {
		default: "Mustaqim Arifin",
		template: "%s · Mustaqim Arifin",
	},
	description: "Marketing Manager",
	openGraph: {
		title: "Mustaqim Arifin",
		description: "Marketing Manager",
		url: `https://mstqmarfn.vercel.app`,
		siteName: "Mustaqim Arifin",
		images: [
			{
				url: `https://mstqmarfn.vercel.app/og.jpg`,
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Mustaqim Arifin",
		card: "summary_large_image",
		description: "Marketing Manager",
		images: [
			{
				url: `https://mstqmarfn.vercel.app/og.jpg`,
				width: 1920,
				height: 1080,
			},
		],
	},
	icons: {
		shortcut: `https://mstqmarfn.vercel.app/favicon.ico`,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={cx(GSans.variable, Quad.variable, GMono.variable)}>
			<body className={styles.body}>
				<Navbar />
				<main id="swup" className={`transition-fade ${styles.layout}`}>
					{children}
				</main>
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
