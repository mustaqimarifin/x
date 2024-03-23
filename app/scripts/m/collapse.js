(() => {
	const d = document.querySelectorAll("[data-collapse-target]");
	const f = document.querySelectorAll("[data-collapse]");
	if (d && f)
		Array.from(d).forEach((b) =>
			Array.from(f).forEach((n) => {
				if (b.dataset.collapseTarget === n.dataset.collapse)
					b.addEventListener("click", () => {
						if (n.style.height && n.style.height !== "0px")
							(n.style.height = 0), (n.style.overflow = "hidden"), b.removeAttribute("open");
						else
							(n.style.height = "".concat(n.children[0].clientHeight, "px")),
								(n.style.overflow = "visible"),
								b.setAttribute("open", "");
					});
			}),
		);
})();
