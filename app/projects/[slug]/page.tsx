import { Mdx } from "components/mdx";
import { allProjects } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

import { getYear } from "@/components/_date";
import { projectParam } from "@/lib/sortedContent";
import styles from "@/styles/views/project.module.scss";

export const generateStaticParams = async () => projectParam.map((project) => ({ slug: project.slug }));

export const generateMetadata = ({ params: { slug } }) => {
	const project = allProjects.find((project) => project.slug === slug);
	return { title: project?.title };
};

export default async function ProjectLayout({ params: { slug } }) {
	const project = allProjects.find((project) => project.slug === slug);

	if (project) {
		return (
			<>
				<header className={styles.header}>
					<h1 className={styles.title}>{project?.title}</h1>
					<time className={styles.year} dateTime={project?.year}>
						{getYear(project.year)}
					</time>
					<p className={styles.description}>{project?.description}</p>
				</header>

				<aside className={styles.meta}>
					{project.links && (
						<div className={styles.links}>
							<h2 className={styles.title}>Visit live</h2>
							{/* 							{project.links.map((url, idx) => (
								<Link href={url.url} target="_blank" className={styles.url} key={idx}>
									{url.title}
								</Link>
							))} */}
							{project.links.map((url) => (
								<Link href={url.url} target="_blank" className={styles.url} key={url._id}>
									{url.title}
								</Link>
							))}
						</div>
					)}

					{project.collaborators && (
						<>
							<div className={styles.collaborators}>
								<h2 className={styles.title}>Collaborators</h2>
								{/* {project.collaborators?.map((collaborator, idx) => (
									<Link href={collaborator.url} target="_blank" className={styles.collaborator} key={idx}>
										<Image
											src={collaborator.avatar}
											alt={collaborator.name}
											width={240}
											height={240}
											className={styles.avatar}
										/>
										{collaborator.name}
									</Link>
								))} */}
								{project.collaborators?.map((c) => (
									<Link href={c.url} target="_blank" className={styles.collaborator} key={c._id}>
										<Image src={c.avatar} alt={c.name} width={240} height={240} className={styles.avatar} />
										{c.name}
									</Link>
								))}
							</div>
						</>
					)}
				</aside>

				<section className={styles.content}>
					<Mdx code={project.body.code} />
				</section>
			</>
		);
	}
	return <h1>Project could not be found</h1>;
}
