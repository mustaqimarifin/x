import type { Options } from "rehype-pretty-code";

export const readingTime = (text: string): string => {
	// Step 2: Determine the average reading speed (words per minute)
	const wordsPerMinute = 200;
	// Step 3: Calculate the word count
	const noOfWords = text.split(/\s/g).length;
	// Step 4: Calculate the estimated reading time (in minutes)
	const minutes = noOfWords / wordsPerMinute;
	const readTime = Math.ceil(minutes).toString();
	// Step 5: Format the output
	return `${readTime} min read`;
};

export const codeOptions: Options = {
	keepBackground: false,
	theme: "one-dark-pro",
	filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
	onVisitLine(node) {
		// Prevent lines from collapsing in `display: grid` mode, and
		// allow empty lines to be copy/pasted
		if (node.children.length === 0) {
			node.children = [{ type: "text", value: " " }];
		}
		node.properties.className?.push("line");
	},
	onVisitTitle(node) {
		node.properties.className = ["title"];
	},
	// Feel free to add classNames that suit your docs
	onVisitHighlightedLine(node) {
		node.properties.className?.push("highlighted");
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ["word"];
	},
};

export const cx = (...classes: any[]) => classes.filter(Boolean).join(" ");

type ConvertUndefined<T> = OrUndefined<{
	[K in keyof T as undefined extends T[K] ? K : never]-?: T[K];
}>;
type OrUndefined<T> = { [K in keyof T]: T[K] | undefined };
type PickRequired<T> = {
	[K in keyof T as undefined extends T[K] ? never : K]: T[K];
};
type ConvertPick<T> = ConvertUndefined<T> & PickRequired<T>;

export const pick = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): ConvertPick<{ [K in Keys]: Obj[K] }> => {
	return keys.reduce((acc, key) => {
		acc[key] = obj[key];
		return acc;
	}, {} as any);
};
