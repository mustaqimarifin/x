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
				<h1 className={styles.title}>Credits</h1>
				<p className={styles.date}>Last updated Mar 23, 2024</p>
			</header>

			<section className={styles.content}>
				<h2>Typography</h2>
				<p>
					<a href="https://vercel.com/font" className={styles.link} target="_blank" rel="noreferrer">
						Geist
					</a>{" "}
					is a typeface designed and published by{" "}
					<a href="https://basement.studio/" className={styles.link} target="_blank" rel="noreferrer">
						Basement Studio
					</a>
				</p>

				<h2>Web Stack</h2>
				<p>
					Built with{" "}
					<a href="https://nextjs.org/" className={styles.link} target="_blank" rel="noreferrer">
						Next.js
					</a>{" "}
					and{" "}
					<a href="https://tailwindcss.com/" className={styles.link} target="_blank" rel="noreferrer">
						Tailwind CSS
					</a>
					. Sick Transitions thanks to{" "}
					<a href="https://swup.js.org" className={styles.link} target="_blank" rel="noreferrer">
						Swup
					</a>
					. Native JS wherever possible lol .
				</p>
				<p>
					<a href="https://github.com/mustaqimarifin/x" className={styles.link} target="_blank" rel="noreferrer">
						GitHub Repository
					</a>
				</p>

				{/* <h2>Photography</h2>
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
				</p> */}

				{/* <h2>Inspiration</h2>
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
				</ul> */}
			</section>
		</>
	);
}
