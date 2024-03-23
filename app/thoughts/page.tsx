import { allThoughts } from "contentlayer/generated";
import type { Metadata } from "next";
import Link from "next/link";

import { formatDate } from "@/components/_date";
import IKImage from "@/components/coverpix";
import { thoughts } from "@/lib/sortedContent";
import styles from "@/styles/views/thoughts.module.scss";

export const metadata: Metadata = {
	title: "Thoughts",
	description: "Marketing Manager | Music Production | Noob Developer.",
};

export default function ThoughtsPage() {
	return (
		<>
			<header className={styles.header}>
				<div className={styles.content}>
					<h1 className={styles.title}>Thoughts</h1>
					<p className={styles.count}>{allThoughts.length} articles</p>
				</div>
			</header>

			{thoughts.map((t) => (
				<Link id={t.slug} key={t.date} className={styles.thought} href={{ pathname: `/thoughts/${t.slug}` }}>
					<IKImage src={`/thoughts/${t.image}`} alt={t.title} width={593} height={305} className={styles.image} />
					<h3 className={styles.title}>{t.title}</h3>
					<time className={styles.year}>{formatDate(t.date)}</time>
				</Link>
			))}
		</>
	);
}
