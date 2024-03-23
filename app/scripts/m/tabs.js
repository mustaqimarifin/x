(() => {
	const B = document.querySelectorAll("[data-tabs]");
	const I = function A(r) {
		return (r = r || window.event), r.target || r.srcElement;
	};
	B.forEach((A, r) => {
		let h = document.createElement("div");
		const y = A.querySelector("li:first-child [data-tab-target]");
		const f = y.cloneNode();
		(f.innerHTML = "-"),
			f.classList.remove("bg-inherit", "text-slate-700"),
			f.classList.add("bg-white", "text-white"),
			(f.style.animation = ".2s ease"),
			h.classList.add(
				"z-10",
				"absolute",
				"text-slate-700",
				"rounded-lg",
				"bg-inherit",
				"flex-auto",
				"text-center",
				"bg-none",
				"border-0",
				"block",
				"shadow",
			),
			h.setAttribute("moving-tab", ""),
			h.setAttribute("data-tab-target", ""),
			h.appendChild(f),
			A.appendChild(h);
		const w = A.getElementsByTagName("li").length;
		(h.style.padding = "0px"),
			(h.style.width = `${A.querySelector("li:nth-child(1)").offsetWidth}px`),
			(h.style.transform = "translate3d(0px, 0px, 0px)"),
			(h.style.transition = ".5s ease"),
			(A.onmouseover = (C) => {
				const D = I(C);
				const O = D.closest("li");
				if (O) {
					const q = Array.from(O.closest("ul").children);
					const G = q.indexOf(O) + 1;
					A.querySelector(`li:nth-child(${G}) [data-tab-target]`).onclick = () => {
						A.querySelectorAll("li").forEach((H) => {
							H.firstElementChild.removeAttribute("active"), H.firstElementChild.setAttribute("aria-selected", "false");
						}),
							O.firstElementChild.setAttribute("active", ""),
							O.firstElementChild.setAttribute("aria-selected", "true"),
							(h = A.querySelector("[moving-tab]"));
						let F = 0;
						if (A.classList.contains("flex-col")) {
							for (let z = 1; z <= q.indexOf(O); z++) F += A.querySelector(`li:nth-child(${z})`).offsetHeight;
							(h.style.transform = `translate3d(0px,${F}px, 0px)`),
								(h.style.height = A.querySelector(`li:nth-child(${z})`).offsetHeight);
						} else {
							for (let z = 1; z <= q.indexOf(O); z++) F += A.querySelector(`li:nth-child(${z})`).offsetWidth;
							(h.style.transform = `translate3d(${F}px, 0px, 0px)`),
								(h.style.width = `${A.querySelector(`li:nth-child(${G})`).offsetWidth}px`);
						}
					};
				}
			});
	}),
		window.addEventListener("resize", (A) => {
			if (
				(B.forEach((r, h) => {
					(r = r.parentElement.firstElementChild), r.querySelector("[moving-tab]").remove();
					const y = document.createElement("div");
					const f = r.querySelector("[data-tab-target][aria-selected='true']").cloneNode();
					(f.innerHTML = "-"),
						f.classList.remove("bg-inherit"),
						f.classList.add("bg-white", "text-white"),
						(f.style.animation = ".2s ease"),
						y.classList.add(
							"z-10",
							"absolute",
							"text-slate-700",
							"rounded-lg",
							"bg-inherit",
							"flex-auto",
							"text-center",
							"bg-none",
							"border-0",
							"block",
							"shadow",
						),
						y.setAttribute("moving-tab", ""),
						y.setAttribute("data-tab-target", ""),
						y.appendChild(f),
						r.appendChild(y),
						(y.style.padding = "0px"),
						(y.style.transition = ".5s ease");
					const w = r.querySelector("[data-tab-target][aria-selected='true']").parentElement;
					if (w) {
						const C = Array.from(w.closest("ul").children);
						const D = C.indexOf(w) + 1;
						let O = 0;
						if (r.classList.contains("flex-col")) {
							for (let q = 1; q <= C.indexOf(w); q++) O += r.querySelector(`li:nth-child(${q})`).offsetHeight;
							(y.style.transform = `translate3d(0px,${O}px, 0px)`),
								(y.style.width = `${r.querySelector(`li:nth-child(${D})`).offsetWidth}px`),
								(y.style.height = r.querySelector(`li:nth-child(${q})`).offsetHeight);
						} else {
							for (let q = 1; q <= C.indexOf(w); q++) O += r.querySelector(`li:nth-child(${q})`).offsetWidth;
							(y.style.transform = `translate3d(${O}px, 0px, 0px)`),
								(y.style.width = `${r.querySelector(`li:nth-child(${D})`).offsetWidth}px`);
						}
					}
				}),
				window.innerWidth < 991)
			)
				B.forEach((r, h) => {
					if (!r.classList.contains("flex-col")) r.classList.add("flex-col", "on-resize");
				});
			else
				B.forEach((r, h) => {
					if (r.classList.contains("on-resize")) r.classList.remove("flex-col", "on-resize");
				});
		});
	const B = document.querySelectorAll("[data-tab-content]");
	if (B[0])
		B.forEach((A) => {
			const r = A.parentElement.querySelectorAll("li a[data-tab-target]");
			r.forEach((h) => {
				h.addEventListener("click", () => {
					const y = document.querySelector(`#${h.getAttribute("aria-controls")}`);
					if (!y.classList.contains("block", "opacity-100")) {
						const f = y
							.closest("[data-tab-content]")
							.parentElement.querySelector("li a[data-tab-target][aria-selected='true']");
						const w = document.querySelector(`#${f.getAttribute("aria-controls")}`);
						w.classList.remove("block", "opacity-100"),
							w.classList.add("hidden", "opacity-0"),
							y.classList.add("block", "opacity-100"),
							y.classList.remove("hidden", "opacity-0");
					}
				});
			});
		});
})();
