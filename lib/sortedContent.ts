import { compareDesc } from "@/components/_date";
import { allProjects, allThoughts } from "contentlayer/generated";
import { pick } from "./utils";

export const projectParam = allProjects.map((p) => pick(p, ["slug"]));
export const thoughtParam = allThoughts.map((p) => pick(p, ["slug"]));

export const thoughts = allThoughts
	.filter((t) => !t.draft)
	.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const projects = allProjects
	.filter((p) => !p.playground && !p.draft)
	.sort((a, b) => compareDesc(new Date(a.year), new Date(b.year)));
