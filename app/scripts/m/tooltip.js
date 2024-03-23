const O = (j, A) => {
	if (A == null || A > j.length) A = j.length;
	for (let q = 0, z = new Array(A); q < A; q++) z[q] = j[q];
	return z;
};
const $ = (j) => {
	if (Array.isArray(j)) return j;
};
const v = (j) => {
	if (Array.isArray(j)) return O(j);
};
const x = (j) => {
	if ((typeof Symbol !== "undefined" && j[Symbol.iterator] != null) || j["@@iterator"] != null) return Array.from(j);
};
const w = (j, A) => {
	let q = j == null ? null : (typeof Symbol !== "undefined" && j[Symbol.iterator]) || j["@@iterator"];
	if (q == null) return;
	const z = [];
	let E = !0;
	let G = !1;
	let H;
	let I;
	try {
		for (q = q.call(j); !(E = (H = q.next()).done); E = !0) if ((z.push(H.value), A && z.length === A)) break;
	} catch (J) {
		(G = !0), (I = J);
	} finally {
		try {
			if (!E && q.return != null) q.return();
		} finally {
			if (G) throw I;
		}
	}
	return z;
};
const k = () => {
	throw new TypeError(
		"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
};
const P = () => {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
};
const h = (j, A) => $(j) || w(j, A) || S(j, A) || k();
const F = (j) => v(j) || x(j) || S(j) || P();
const S = (j, A) => {
	if (!j) return;
	if (typeof j === "string") return O(j, A);
	let q = Object.prototype.toString.call(j).slice(8, -1);
	if (q === "Object" && j.constructor) q = j.constructor.name;
	if (q === "Map" || q === "Set") return Array.from(q);
	if (q === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(q)) return O(j, A);
};
import {
	computePosition as d,
	flip as f,
	inline as T,
	offset as V,
	shift as b,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm";
(() => {
	const j = document.querySelectorAll("[data-tooltip-target]");
	const A = document.querySelectorAll("[data-tooltip]");
	if (j && A)
		Array.from(j).forEach((q) =>
			Array.from(A).forEach((z) => {
				if (q.dataset.tooltipTarget === z.dataset.tooltip) {
					let E;
					let G;
					const H = function K() {
						d(q, z, { placement: U, middleware: [f(), T(), b(), V(Number(W))] }).then((B) => {
							const { x: D, y: N } = B;
							Object.assign(z.style, { top: "".concat(N, "px"), left: "".concat(D, "px") });
						});
					};
					const I = function K() {
						let B;
						let D;
						H(), (B = z.classList).remove.apply(B, F(M)), (D = z.classList).add.apply(D, F(R));
					};
					const J = function K() {
						let B;
						let D;
						H(), (B = z.classList).remove.apply(B, F(R)), (D = z.classList).add.apply(D, F(M));
					};
					const U = z.dataset.tooltipPlacement || "top";
					const W = z.dataset.tooltipOffset || 5;
					const X = z.dataset.tooltipMount || "opacity-1";
					const Y = z.dataset.tooltipUnmount || "pointer-events-none opacity-0";
					const Q = z.dataset.tooltipTransition || "transition-opacity duration-300";
					const R = X.split(" ");
					const M = Y.split(" ");
					const Z = Q.split(" ");
					if (((E = z.classList).add.apply(E, F(M)), !z.hasAttribute("tabindex"))) z.setAttribute("tabindex", 0);
					if (Q !== "false") (G = z.classList).add.apply(G, F(Z));
					[
						["mouseenter", I],
						["mouseleave", J],
						["focus", I],
						["blur", J],
					].forEach((K) => {
						const B = h(K, 2);
						const D = B[0];
						const N = B[1];
						q.addEventListener(D, N);
					});
				}
			}),
		);
})();
