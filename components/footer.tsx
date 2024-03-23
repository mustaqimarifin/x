"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import styles from "@/styles/components/footer.module.scss";
import { Suspense } from "react";

const KLC = dynamic(() => import("@/components/clock2"), { ssr: false });

export default function Footer() {
	return (
		<footer className={`transition-fade ${styles.footer}`}>
			<section className={styles.links}>
				<div className={styles.connect}>
					<h2 className={styles.title}>Connect</h2>
					<ul className={styles.list}>
						<li>
							<a
								href="https://x.com/vmprmyth"
								className={`${styles.link} ${styles.twitter}`}
								target="_blank"
								rel="noreferrer"
							>
								X.com
							</a>
						</li>
						<li>
							<a
								href="mailto:mustaqim.arifin@gmail.com"
								className={`${styles.link} ${styles.imessage}`}
								target="_blank"
								rel="noreferrer"
							>
								Mail
							</a>
						</li>
						{/* <li>
							<a href="https://www.cosmos.so/stallboerger" className={styles.link} target="_blank" rel="noreferrer">
								Cosmos
							</a>
						</li> */}
						<li>
							<a
								href="https://t.ly/iB7Sz"
								className={`${styles.link} ${styles.readcv}`}
								target="_blank"
								rel="noreferrer"
							>
								Resume
							</a>
						</li>
					</ul>
				</div>

				<div className={styles.explore}>
					<h2 className={styles.title}>Explore</h2>
					<ul className={styles.list}>
						<li>
							<Link href="/" className={styles.link}>
								Home
							</Link>
						</li>
						<li>
							<Link href="/about" className={styles.link}>
								About
							</Link>
						</li>
						<li>
							<Link href="/thoughts" className={styles.link}>
								Thoughts
							</Link>
						</li>
						<li>
							<Link href="/playground" className="self-start">
								Playground
							</Link>
						</li>
					</ul>
				</div>

				<p className={styles.copyright}>&copy;{new Date().getFullYear()} Mustaqim Arifin</p>
				<div className={styles.legals}>
					<Link href="/credits" className={styles.link}>
						Credits
					</Link>
					{/* <Link href="/imprint" className={styles.link}>
						Imprint
					</Link> */}
				</div>
			</section>
			<Suspense>
				<section id="clock" className={styles.clock}>
					<KLC />
				</section>
			</Suspense>
		</footer>
	);
}
