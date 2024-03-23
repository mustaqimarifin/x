import type { Metadata } from "next";

import styles from "@/styles/views/credit.module.scss";

export const metadata: Metadata = {
	title: "Credits",
	description: "Marketing Manager | Music Production | Noob Developer.",
};

export default function CreditPage() {
	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>Colophon</h1>
				<p className={styles.date}>Last updated Aug 11, 2023</p>
			</header>

			<section className={styles.content}>
				<h2>Typography</h2>
				<p>
					<a href="https://klim.co.nz/retail-fonts/soehne/" className={styles.link} target="_blank" rel="noreferrer">
						Söhne
					</a>{" "}
					is a typeface designed and published by the{" "}
					<a href="https://klim.co.nz/" className={styles.link} target="_blank" rel="noreferrer">
						Klim Type Foundry
					</a>
					. It is the memory of Akzidenz-Grotesk framed through the reality of Helvetica. Söhne captures the analogue
					materiality of “Standard Medium” used in Unimark&rsquo;s legendary wayfinding system for the NYC Subway.
				</p>

				<h2>Tech stack</h2>
				<p>
					Built with{" "}
					<a href="https://nextjs.org/" className={styles.link} target="_blank" rel="noreferrer">
						Next.js
					</a>{" "}
					and{" "}
					<a href="https://tailwindcss.com/" className={styles.link} target="_blank" rel="noreferrer">
						Tailwind CSS
					</a>
					. Hosted on{" "}
					<a href="https://vercel.com/home" className={styles.link} target="_blank" rel="noreferrer">
						Vercel
					</a>
					. Privacy friendly analytics with{" "}
					<a href="https://plausible.io/" className={styles.link} target="_blank" rel="noreferrer">
						Plausible
					</a>
					.
				</p>
				<p>
					<a
						href="https://github.com/antonstallboerger/antonstallboerger-v2"
						className={styles.link}
						target="_blank"
						rel="noreferrer"
					>
						GitHub Repository
					</a>
				</p>

				<h2>Photography</h2>
				<p>Images were taken or created by Mustaqim Arifin, if not stated otherwise.</p>

				<h2>Mockups</h2>
				<p>
					All mockups are by{" "}
					<a href="https://shots.so/" className={styles.link} target="_blank" rel="noreferrer">
						Shots
					</a>{" "}
					or{" "}
					<a href="https://supply.family/" className={styles.link} target="_blank" rel="noreferrer">
						Supply Family
					</a>
					.
				</p>

				<h2>Inspiration</h2>
				<ul>
					<li>
						<a href="https://linusrogge.com/" className={styles.link} target="_blank" rel="noreferrer">
							Linus Rogge
						</a>
					</li>
					<li>
						<a href="https://sdrn.co/" className={styles.link} target="_blank" rel="noreferrer">
							Siddharth Arun
						</a>
					</li>
					<li>
						<a href="https://www.wireframe.co/" className={styles.link} target="_blank" rel="noreferrer">
							Wireframe
						</a>
					</li>
					<li>
						<a href="https://www.studiolenzing.com/" className={styles.link} target="_blank" rel="noreferrer">
							Studio Lenzing
						</a>
					</li>
					<li>
						<a href="https://goods.wtf/" className={styles.link} target="_blank" rel="noreferrer">
							Goods
						</a>
					</li>
					<li>
						<a href="https://ollyevans.xyz/" className={styles.link} target="_blank" rel="noreferrer">
							Olly Evans
						</a>
					</li>
				</ul>

				<h2>Great humans</h2>
				<p>I am especially grateful for the support of the following humans:</p>
				<ul>
					<li>
						<a href="https://linusrogge.com/" className={styles.link} target="_blank" rel="noreferrer">
							Linus Rogge
						</a>
					</li>
					<li>
						<a href="https://floriankiem.com/" className={styles.link} target="_blank" rel="noreferrer">
							Florian Kiem
						</a>
					</li>
					<li>
						<a href="https://www.nilseller.com/" className={styles.link} target="_blank" rel="noreferrer">
							Nils Eller
						</a>
					</li>
				</ul>
			</section>
		</>
	);
}