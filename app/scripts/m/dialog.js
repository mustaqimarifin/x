const M = (f, q) => {
	if (q == null || q > f.length) q = f.length;
	for (let v = 0, F = new Array(q); v < q; v++) F[v] = f[v];
	return F;
};
const Y = (f) => {
	if (Array.isArray(f)) return M(f);
};
const Z = (f) => {
	if ((typeof Symbol !== "undefined" && f[Symbol.iterator] != null) || f["@@iterator"] != null) return Array.from(f);
};
const $ = () => {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
};
const B = (f) => Y(f) || Z(f) || w(f) || $();
const w = (f, q) => {
	if (!f) return;
	if (typeof f === "string") return M(f, q);
	let v = Object.prototype.toString.call(f).slice(8, -1);
	if (v === "Object" && f.constructor) v = f.constructor.name;
	if (v === "Map" || v === "Set") return Array.from(v);
	if (v === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v)) return M(f, q);
};
(() => {
	const f = document.querySelectorAll("[data-dialog-target]");
	const q = document.querySelectorAll("[data-dialog]");
	const v = document.querySelectorAll("[data-dialog-backdrop]");
	const F = document.querySelectorAll("[data-dialog-close]");
	if (f && q && v)
		Array.from(f).forEach((N) =>
			Array.from(q).forEach((j) =>
				Array.from(v).forEach((x) => {
					if (N.dataset.dialogTarget === j.dataset.dialog && x.dataset.dialogBackdrop === j.dataset.dialog) {
						let P;
						let Q;
						const U = function A() {
							let E;
							let z;
							(H = !0),
								x.classList.toggle("pointer-events-none"),
								x.classList.toggle("opacity-0"),
								(E = j.classList).remove.apply(E, B(J)),
								(z = j.classList).add.apply(z, B(S));
						};
						const G = function A() {
							let E;
							let z;
							(H = !1),
								x.classList.toggle("pointer-events-none"),
								x.classList.toggle("opacity-0"),
								(E = j.classList).remove.apply(E, B(S)),
								(z = j.classList).add.apply(z, B(J));
						};
						const W = j.dataset.dialogMount || "opacity-1 translate-y-0";
						const I = j.dataset.dialogUnmount || "opacity-0 -translate-y-14";
						const R = j.dataset.dialogTransition || "transition-all duration-300";
						const S = W.split(" ");
						const J = I.split(" ");
						const X = R.split(" ");
						let H = !1;
						if (((P = j.classList).add.apply(P, B(J)), !x.hasAttribute("tabindex"))) x.setAttribute("tabindex", 0);
						if (R !== "false") (Q = j.classList).add.apply(Q, B(X));
						if (j.className.includes(I) && !x.className.includes("pointer-events-none opacity-0"))
							x.classList.add("pointer-events-none"), x.classList.add("opacity-0");
						N.addEventListener("click", () => (j.className.includes(I) ? U() : G())),
							x.addEventListener("click", (A) => {
								const E = A.target;
								let z;
								let K;
								if (
									(E === null || E === void 0
										? void 0
										: (z = E.dataset) === null || z === void 0
										  ? void 0
										  : z.dialogBackdrop) &&
									(E === null || E === void 0
										? void 0
										: (K = E.dataset) === null || K === void 0
										  ? void 0
										  : K.dialogBackdropClose)
								)
									G();
							}),
							document.addEventListener("keyup", (A) => {
								const E = A.key;
								return E === "Escape" && H ? G() : null;
							}),
							Array.from(F).forEach((A) => A.addEventListener("click", () => (H ? G() : null)));
					}
				}),
			),
		);
})();
