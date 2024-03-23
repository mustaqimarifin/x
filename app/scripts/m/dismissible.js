(() => {
	const n = document.querySelectorAll("[data-dismissible]");
	const E = document.querySelectorAll("[data-dismissible-target]");
	if (n && E)
		n.forEach((c) =>
			E.forEach((f) => {
				if (c.dataset.dismissible === f.dataset.dismissibleTarget)
					f.addEventListener("click", () => {
						c.classList.toggle("hidden");
					});
			}),
		);
})();
