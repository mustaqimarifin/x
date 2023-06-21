import { ProjectDatabaseItem, getProjectsDatabase } from "app/data";
import { PageViews } from "components/PageViews";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "*IN PROGRESS*",
};

export const revalidate = 14400;

export default async function Projectsindex() {
  const works: ProjectDatabaseItem[] = await getProjectsDatabase();

  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Projects</h1>
      {works
        .sort((a, b) => {
          if (new Date(a.date) > new Date(b.date)) {
            return -1;
          }
          return 1;
        })
        .map((project) => (
          <Link
            key={project.id}
            className="mb-4 flex flex-col space-y-1"
            href={`/projects/${project.pageId}`}
          >
            <div className="w-full flex-none flex-col">
              <div className="font-bold">{project.title}</div>
              <PageViews slug={project.pageId} trackView={false} />
            </div>
          </Link>
        ))}
    </section>
  );
}
