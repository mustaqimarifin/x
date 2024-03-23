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

			{thoughts.map((post) => (
				<Link id={post.slug} key={post.date} className={styles.thought} href={{ pathname: `/thoughts/${post.slug}` }}>
					<IKImage src={`/thoughts/${post.image}`} alt={post.title} width={593} height={305} className={styles.image} />
					<h3 className={styles.title}>{post.title}</h3>
					<time className={styles.year}>{formatDate(post.date)}</time>
				</Link>
			))}
		</>
	);
}
