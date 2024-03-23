import Card from "@/components/card";
import type { Metadata } from "next";

import { getYear } from "@/components/_date";
import { playgroundProjects } from "@/lib/sortedContent";
import styles from "@/styles/views/playground.module.scss";

export const metadata: Metadata = {
	title: "Playground",
	description: "Marketing Manager",
};

export default function Playground() {
	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>Playground</h1>
				<p className={styles.count}>{playgroundProjects.length} concepts</p>
				<p className={styles.intro}>
					Besides my main projects, I explore different areas of interest in my free time. This is the best way to
					discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.
				</p>
			</header>

			<section className={styles.projects}>
				{playgroundProjects.map((project) => (
					<Card
						title={project.title}
						imageSrc={`/projects/${project.slug}/${project.image}`}
						imageAlt={`${project.title} · Mustaqim Arifin`}
						description={project.description}
						year={getYear(project.year)}
						link={`/projects/${project.slug}`}
						key={project.year}
					/>
				))}
			</section>
		</>
	);
}
