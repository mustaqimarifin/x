import Card from "@/components/card";
import Link from "next/link";

import { getYear } from "@/components/_date";
import { projects } from "@/lib/sortedContent";

export default function Home() {
	return (
		<>
			<section className="col-span-full md:col-span-12 lg:col-span-5 lg:sticky lg:top-[calc(53px_+_32px)] lg:self-start mb-20 lg:mb-0">
				<p className="mb-8">
					<span className="font-bold">Mustaqim Arifin</span>
					<br />
					Marketing Manager
				</p>
				<p className="">
					Driven by curiosity and a love for great, high-quality and thoughtful design. Pushing the boundaries and
					striving to create something truly unique and meaningful.
					<br />
					<br />
					Currently building icons for{" "}
					<a
						href="https://icons.saman.design"
						className="text-black underline dark:text-white hover:decoration-titan-200 dark:decoration-titan-800"
					>
						Saman Icons
					</a>{" "}
					and exploring different{" "}
					<Link
						href="/playground"
						className="text-black underline dark:text-white hover:decoration-titan-200 dark:hover:decoration-titan-800"
					>
						side projects
					</Link>
					.
				</p>
			</section>

			<section className="grid grid-cols-1 gap-4 col-span-full lg:col-start-9 lg:col-span-8 sm:grid-cols-2 lg:grid-cols-1">
				{projects.map((project) => (
					<Card
						title={project.title}
						imageSrc={`/projects/${project.slug}/${project.image}`}
						imageAlt={project.title}
						description={project.description}
						year={getYear(project.year)}
						link={`/projects/${project.slug}`}
						key={project._id}
					/>
				))}
			</section>
		</>
	);
}
