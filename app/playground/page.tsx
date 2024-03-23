import Card from "@/components/card";
import type { Metadata } from "next";

import { compareDesc, getYear } from "@/components/_date";
import styles from "@/styles/views/playground.module.scss";
import { allProjects } from "contentlayer/generated";

export const metadata: Metadata = {
	title: "Playground",
	description: "Marketing Manager",
};

const projects = allProjects
	.filter((project) => project.playground)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

/* const projects = allProjects
.filter((project) => project.playground)
.sort((a, b) => 
  new Date(a.year).getTime() - new Date(b.year).getTime())
.reverse()
 */
export default function Playground() {
	return (
		<>
			<header className={styles.header}>
				<h1 className={styles.title}>Playground</h1>
				<p className={styles.count}>{projects.length} concepts</p>
				<p className={styles.intro}>
					Besides my main projects, I explore different areas of interest in my free time. This is the best way to
					discover useful solutions, train my eyes for details, and develop more specific insights in certain topics.
				</p>
			</header>

			<section className={styles.projects}>
				{projects.map((project) => (
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
