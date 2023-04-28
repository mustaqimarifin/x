import { ProjectDatabaseItem, getProjectsDatabase } from "app/data"
import PageViews from "components/PageViews"
import ViewCounter from "components/view-counter"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Projects",
  description: "Read my thoughts on software development, design, and more.",
}

export default async function Projectsindex () {
  const works: ProjectDatabaseItem[] = await getProjectsDatabase()

  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Projects</h1>
      { works &&
        works.map((post) => (
          <Link
            key={ post.id }
            className="mb-4 flex flex-col space-y-1"
            href={ `/projects/${post.pageId}` }
          >
            <div className="flex w-full flex-col">
              <p>{ post.title }</p>
              <PageViews slug={ post.pageId } trackView={ false } />
            </div>
          </Link>
        )) }
    </section>
  )
}
