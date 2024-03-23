const Q = (j, E) => {
	if (E == null || E > j.length) E = j.length;
	for (let B = 0, z = new Array(E); B < E; B++) z[B] = j[B];
	return z;
};
const h = (j) => {
	if (Array.isArray(j)) return Q(j);
};
const k = (j) => {
	if ((typeof Symbol !== "undefined" && j[Symbol.iterator] != null) || j["@@iterator"] != null) return Array.from(j);
};
const A = () => {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
};
const H = (j) => h(j) || k(j) || b(j) || A();
const b = (j, E) => {
	if (!j) return;
	if (typeof j === "string") return Q(j, E);
	let B = Object.prototype.toString.call(j).slice(8, -1);
	if (B === "Object" && j.constructor) B = j.constructor.name;
	if (B === "Map" || B === "Set") return Array.from(B);
	if (B === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(B)) return Q(j, E);
};
import {
	computePosition as d,
	flip as C,
	inline as V,
	offset as y,
	shift as P,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm";
(() => {
	const j = document.querySelectorAll("[data-popover-target]");
	const E = document.querySelectorAll("[data-popover]");
	if (j && E)
		Array.from(j).forEach((B) =>
			Array.from(E).forEach((z) => {
				if (B.dataset.popoverTarget === z.dataset.popover) {
					let R;
					let S;
					const T = function F() {
						d(B, z, { placement: $, middleware: [C(), V(), P(), y(Number(w))] }).then((q) => {
							const { x: D, y: G } = q;
							Object.assign(z.style, { top: "".concat(G, "px"), left: "".concat(D, "px") });
						});
					};
					const Z = function F() {
						let q;
						let D;
						T(), (q = z.classList).remove.apply(q, H(K)), (D = z.classList).add.apply(D, H(N));
					};
					const U = function F() {
						let q;
						let D;
						T(), (q = z.classList).remove.apply(q, H(N)), (D = z.classList).add.apply(D, H(K));
					};
					const W = function F() {
						Array.from(E).forEach((q) => (q.className.includes(M) ? U() : null));
					};
					const $ = z.dataset.popoverPlacement || "top";
					const w = z.dataset.popoverOffset || 5;
					const M = z.dataset.popoverMount || "opacity-1";
					const X = z.dataset.popoverUnmount || "pointer-events-none opacity-0";
					const Y = z.dataset.popoverTransition || "transition-opacity duration-300";
					const N = M.split(" ");
					const K = X.split(" ");
					const x = Y.split(" ");
					if (((R = z.classList).add.apply(R, H(K)), !z.hasAttribute("tabindex"))) z.setAttribute("tabindex", 0);
					if (Y !== "false") (S = z.classList).add.apply(S, H(x));
					B.addEventListener("click", (F) => {
						const q = F.target;
						if (z.className.includes(X)) Z();
						else
							Array.from(E).forEach((D) => {
								let G;
								if (
									D.className.includes(M) &&
									(q === null || q === void 0
										? void 0
										: (G = q.dataset) === null || G === void 0
										  ? void 0
										  : G.popoverNested)
								) {
									let I;
									let J;
									(I = D.classList).remove.apply(I, H(N)), (J = D.classList).add.apply(J, H(K));
								}
							}),
								U();
					}),
						document.addEventListener("click", (F) => {
							const q = F.target;
							let D;
							let G;
							let I;
							let J;
							let O;
							if (
								!(q === null || q === void 0
									? void 0
									: (D = q.dataset) === null || D === void 0
									  ? void 0
									  : D.popover) &&
								!((I = q.offsetParent) === null || I === void 0
									? void 0
									: (G = I.dataset) === null || G === void 0
									  ? void 0
									  : G.popover) &&
								!(q === null || q === void 0 ? void 0 : q.dataset.popoverTarget) &&
								!((O = q.offsetParent) === null || O === void 0
									? void 0
									: (J = O.dataset) === null || J === void 0
									  ? void 0
									  : J.popoverTarget)
							)
								W();
						}),
						document.addEventListener("keyup", (F) => {
							const q = F.key;
							return q === "Escape" ? W() : null;
						});
				}
			}),
		);
})();
