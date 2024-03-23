export default async function sitemap() {
	const routes = ["", "/about", "/thoughts", "/playground"].map((route) => ({
		url: `https://mstqmarfn.vercel.app${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes];
}
