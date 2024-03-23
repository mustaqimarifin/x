"use client";

import { Logo } from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

//@ts-ignore
import SwupFadeTheme from "@swup/fade-theme";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupScrollPlugin from "@swup/scroll-plugin";

import Swup from "swup";

import styles from "@/styles/components/navbar.module.scss";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [currentRoute, setCurrentRoute] = useState<any | null>(usePathname());

	useEffect(() => {
		const swup = new Swup({
			native: true,
			plugins: [
				new SwupHeadPlugin({
					persistAssets: true,
					awaitAssets: true,
				}),
				new SwupFadeTheme(),
				new SwupScrollPlugin({
					/* animateScroll: {
						betweenPages: false,
						samePageWithHash: false,
						samePage: false,
					},  */
				}),
			],
		});

		swup.hooks.on("page:view", (visit) => {
			setCurrentRoute(visit.to.url);
		});
	}, []);

	return (
		<nav className={styles.navbar}>
			<Link href="/" className={`${styles.home} ${styles.link} ${currentRoute === "/" && styles.active}`}>
				Home
			</Link>

			<div className={styles.pages}>
				<Link href="/about" className={`${styles.link} ${currentRoute === "/about" && styles.active}`}>
					About
				</Link>
				<Link href="/thoughts" className={`${styles.link} ${currentRoute === "/thoughts" && styles.active}`}>
					Thoughts
				</Link>

				<Link href="/playground" className={`${styles.link} ${currentRoute === "/playground" && styles.active}`}>
					Playground
				</Link>
			</div>
			<div className={styles.logo}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width={24}>
					<path
						fill="currentColor"
						strokeWidth="0.4"
						d="M21.9 14.4c.6-1.3 1-2.7.8-4.1-.1-1.5-.1-3-.4-4.4 0-.6.2-1.4-.4-2v-.3l-.7-.4v.6l-1.5-.6c-1.3-.8-2.7-.7-4-.8L14 2.2h-2.4c-1 .1-2 .4-3 .7L5 4.7h-.2c-.4-.3-.6-.8-.7-1.4V3a8 8 0 01-.5 0c0 .4-.1.5-.5.6h-.6l-.4.1c-.5.7-.8 1.6-.8 2.4l.3 4v.7c0 .7.5 1.4-.3 2 .3.5.5 1.1.6 1.7l.8 1.8 1 1.3.8.6a5 5 0 011.8 2l.1.1a7 7 0 012.5.6h.3c1.2 0 2.2.3 3 .7h1A5 5 0 0115 21l2.1-.4 1.5-.2.6-.7 1-.8.7-.5c.3-.8.9-1.6 1.5-2.1l-.4-1c-.1-.2-.2-.6-.1-.8zm-.3-7.8l.2 2c-.5-.6-1-1.3-.2-2zm-.5 2.8c.2.7.1 1.4 0 2a6 6 0 01-2.2 3.5c-1 .8-2.2 1.5-3.4 2-1.3.5-2.4.5-3.7.4l-1.2-.3-2.9-1.5-.8-.8L5.5 12c-.2-.5-.2-1.1-.3-1.7h.1V10c-.1-.7.2-1.2.9-1.5C7.4 8 8.6 7.3 9.9 7c1-.4 2.3-.6 3.4-.7 1.8 0 3.6-.1 5.3.4l1.4.6.3.2c.3.7.7 1.3.9 2zm-15.6-4c1.8-1 3.5-2 5.6-2.2l1.2-.2.5-.1 5 .4c1.2.1 2.1.9 3.2 1.4 0 0 .1.2 0 .4 0 .4 0 .8-.2 1.4l-1.2-.3c-1-.6-2.1-.5-3.2-.6-3.2-.4-6.5.2-9.4 1.7l-1.8.8C5 7.6 5 7 5 6.5c0 0 .1-.2 0-.2-.2-.6.2-.7.5-.9zM18 17.8l-3 1.6-1 .2c-1.3.2-2.6-.3-3.9-.6L9 18.7a6.3 6.3 0 01-3-1.5 8.8 8.8 0 01-3.3-5.5A16 16 0 012 7v-.5l.7 1 .2.3c.6.3 1 .2 1-.5V6l-.1-.3a.7.7 0 00-1-.2l-.6.4c-.2-.8.2-1.7 1-1.5.2.1.5.3.6.6.3.6.4 1.2.5 1.8.4 1.2.2 2.5.3 3.8 0 1.2.5 2.3 1 3.4.8 1.6 2 2.5 3.6 3.2a8 8 0 004.3.9c.8 0 1.6-.1 2.3-.5l2.4-1.3c2-1 2.8-2.8 3.5-4.8.1-.2 0-.5.2-.7.2.7.1 1.6-.2 2.3-.7 2-2 3.6-3.7 4.8z"
					/>
					<path fill="currentColor" strokeWidth="0.4" d="M21.6 6.7l.2 2c-.5-.7-1-1.4-.2-2z" />
					<path
						fill="currentColor"
						d="M15 15.2l-1.1-.8c-.6.3-1 1.3-2 .7l1-.7c.3-.2.2-.5 0-.7l-.3-.5a1 1 0 01-.1-.6l.4-.1h1.8v.6c0 .2-.5.4-.2.7l.4.6c.5.3.5.4 0 .8z"
					/>
					<path
						fill="currentColor"
						strokeWidth="0.4"
						d="M18.4 9c.3 0 .7 0 .7.5 0 .3 0 .5-.4.5a4 4 0 00-1.8 1 1 1 0 01-1.2 0c-.3-.2-.2-.7 0-1 .5-.5 1-.7 1.6-.8a6 6 0 011-.2zM11 11a10.7 10.7 0 01-2.3-1 1 1 0 01-.4-.3c-.4-.5-.2-.8.4-.7l1.3.2h.5c.7 0 1.3.7 1.1 1.4 0 .2-.4.2-.6.4zM3.6 7.9l-.4-.3-.7-.6-.2-.4c-.1-.4 0-.7.2-.7l.6.2h.2c.3 0 .6.8.5 1.4 0 .2-.2.2-.3.3z"
					/>
					<path
						fill="currentColor"
						strokeWidth="0.4"
						d="M3.8 7.3l-.3-.2-.5-.5-.1-.3c-.2-.4-.1-.6 0-.6l.5.2h.2c.3 0 .5.6.4 1.1 0 .2-.1.2-.2.3z"
					/>
				</svg>
			</div>
		</nav>
	);
}