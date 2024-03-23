import type { Metadata } from "next";
import Image from "next/image";

import { getMnY, isAfter } from "@/components/_date";
import styles from "@/styles/views/about.module.scss";
import { avatar, fire, sg, vv } from "../images";

export const metadata: Metadata = {
	title: "About",
	description: "Marketing Manager",
};

interface Experience {
	company: string;
	role?: string;
	start: Date;
	end?: Date;
	description?: string;
	url?: string;
}

const experiences: Experience[] = [
	{
		company: "Saman Collective",
		description: "The combined efforts of Linus Rogge and me, forming intuitive and reflective software and brands.",
		url: "https://saman.design",
		start: new Date("2023-10-01"),
	},
	{
		company: "Freelance",
		start: new Date("2023-06-15"),
		description: "Available for world-changing projects.",
		url: "mailto:hi@antonstallboerger.com",
	},
	{
		company: "Essentry",
		role: "Internship",
		start: new Date("2023-08-01"),
		end: new Date("2024-01-31"),
		description: "Streamlining the company’s visual appearance and crafting a versatile and sustainable design system.",
		url: "https://essentry.com",
	},
	{
		company: "CREATE Education",
		role: "Internship",
		start: new Date("2021-02-01"),
		end: new Date("2021-06-30"),
	},
	{
		company: "UP Design",
		role: "Internship",
		start: new Date("2018-08-01"),
		end: new Date("2018-09-01"),
	},
];

export default function AboutPage() {
	return (
		<>
			<figure className={styles.figure}>
				<Image
					src={fire}
					alt={`Mustaqim Arifin`}
					width="1656"
					height="1300"
					sizes="(max-width: 768px) 213px, 33vw"
					className={styles.image}
					priority
				/>
			</figure>
			<figure className={styles.figure}>
				<Image
					src={avatar}
					alt={`Mustaqim Arifin`}
					width="1080"
					height="1080"
					sizes="(max-width: 768px) 213px, 33vw"
					className={styles.image}
					priority
				/>
			</figure>
			<figure className={styles.figure}>
				<Image
					src={vv}
					alt={`Mustaqim Arifin`}
					width="640"
					height="852"
					sizes="(max-width: 768px) 213px, 33vw"
					className={styles.image}
					priority
				/>
			</figure>
			<figure className={styles.figure}>
				<Image
					src={sg}
					alt={`Mustaqim Arifin`}
					width="1920"
					height="305"
					sizes="(max-width: 768px) 213px, 33vw"
					className={styles.image}
					priority
				/>
			</figure>

			<header className={styles.header}>
				<h1 className={styles.title}>Mustaqim Arifin</h1>
				<p>B. 1986</p>
			</header>

			<section className={styles.content}>
				<p>
					{/* I am a passionate designer and developer who is driven by a love for great, high-quality and thoughtful
					design. Design is an integral part of my everyday life, and I believe that it has the power to shape and
					improve the world around us. */}
				</p>
				<p>
					{/* Pushing the boundaries of design and striving to create something truly unique and meaningful is a constant
					pursuit of mine. In addition to my work, I also value meaningful conversations and good music, which help to
					inspire and motivate me in my creative process. */}
				</p>
			</section>

			<section className={styles.like}>
				<h2>Things I like</h2>
				<ul>
					<li>
						<a
							href="https://www.cosmos.so/stallboerger/goods"
							className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
							target="_blank"
							rel="noreferrer"
						>
							Quality goods
						</a>
					</li>
					<li>Wearing black</li>
					<li>
						<a
							href="https://music.apple.com/de/playlist/con-amore/pl.u-r2yBDE4tdN97Zo?l=en-GB"
							className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
							target="_blank"
							rel="noreferrer"
						>
							Piano music
						</a>
					</li>
					<li>Good food</li>
					<li>Mountains</li>
					<li>
						<a
							href="https://www.cosmos.so/stallboerger/architecture"
							className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
							target="_blank"
							rel="noreferrer"
						>
							Architecture
						</a>
					</li>
					<li>
						<a
							href="https://www.cosmos.so/stallboerger/interior"
							className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
							target="_blank"
							rel="noreferrer"
						>
							Interior Design
						</a>
					</li>
				</ul>
			</section>
			<section className={styles.dislike}>
				<h2>Things I don’t like</h2>
				<ul>
					<li>Waiting for food</li>
					<li>Smalltalk</li>
					<li>Sparkling water</li>
					<li>Alcohol</li>
					<li>Crowds</li>
				</ul>
			</section>

			<section className={styles.experience}>
				<h2 className={styles.title}>Experience</h2>

				{experiences.map((experience) => (
					<div className={styles.position} key={experience.start.toString()}>
						<div className={styles.meta}>
							<h3 className={styles.title}>
								{experience.url ? (
									<a href={`${experience.url}`} target="_blank" className={styles.link} rel="noreferrer">
										{experience.role && `${experience.role} at`} {experience.company}
									</a>
								) : (
									<>
										{experience.role && `${experience.role} at`} {experience.company}
									</>
								)}
							</h3>
							<span className={styles.timeframe}>
								{(experience.end && isAfter(experience.end, new Date())) || !experience.end
									? `${getMnY(experience.start)} – Ongoing`
									: `${getMnY(experience.start)} – ${getMnY(experience.end)}`}
								{/* {
								(experience.end && experience.end > new Date()) || !experience.end
								? `${(getMnY(experience.start))} – Ongoing`
								: `${getMnY(experience.start)} – ${getMnY(experience.end)}`
							} */}
							</span>
						</div>

						{experience.description && <p className={styles.description}>{experience.description}</p>}
					</div>
				))}
			</section>
		</>
	);
}
