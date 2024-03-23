import { compareDesc } from "@/components/_date";
import { allProjects, allThoughts } from "contentlayer/generated";
import { pick } from "./utils";

export const projectParam = allProjects.map((p) => pick(p, ["slug"]));
export const thoughtParam = allThoughts.map((p) => pick(p, ["slug"]));

export const thoughts = allThoughts
	.filter((t) => t.draft === false)
	.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const projects = allProjects
	.filter((p) => !p.playground && p.draft === false)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

export const playgroundProjects = allProjects
	.filter((p) => p.playground && p.draft === false)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));

/* const projects = allProjects
.filter((project) => project.playground)
.sort((a, b) => 
  new Date(a.year).getTime() - new Date(b.year).getTime())
.reverse()
 */
