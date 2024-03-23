const S = (q, b) => {
	if (!(q instanceof b)) throw new TypeError("Cannot call a class as a function");
};
const M = (q, b) => {
	for (let w = 0; w < b.length; w++) {
		const x = b[w];
		if (((x.enumerable = x.enumerable || !1), (x.configurable = !0), "value" in x)) x.writable = !0;
		Object.defineProperty(q, x.key, x);
	}
};
const T = (q, b, w) => {
	if (b) M(q.prototype, b);
	if (w) M(q, w);
	return q;
};
const U = (() => {
	function q() {
		S(this, q), (this.x = 0), (this.y = 0), (this.z = 0);
	}
	return (
		T(q, [
			{
				key: "findFurthestPoint",
				value: function b(w, x, y, j, A, z) {
					return (
						(this.x = w - y > x / 2 ? 0 : x),
						(this.y = j - z > A / 2 ? 0 : A),
						(this.z = Math.hypot(this.x - (w - y), this.y - (j - z))),
						this.z
					);
				},
			},
			{
				key: "appyStyles",
				value: function b(w, x, y, j, A) {
					w.classList.add("ripple"),
						(w.style.backgroundColor = x === "dark" ? "rgba(0,0,0, 0.2)" : "rgba(255,255,255, 0.3)"),
						(w.style.borderRadius = "50%"),
						(w.style.pointerEvents = "none"),
						(w.style.position = "absolute"),
						(w.style.left = `${A.clientX - y.left - j}px`),
						(w.style.top = `${A.clientY - y.top - j}px`),
						(w.style.width = w.style.height = `${j * 2}px`);
				},
			},
			{
				key: "applyAnimation",
				value: function b(w) {
					w.animate(
						[
							{ transform: "scale(0)", opacity: 1 },
							{ transform: "scale(1.5)", opacity: 0 },
						],
						{ duration: 500, easing: "linear" },
					);
				},
			},
			{
				key: "create",
				value: function b(w, x) {
					const y = w.currentTarget;
					(y.style.position = "relative"), (y.style.overflow = "hidden");
					const j = y.getBoundingClientRect();
					const A = this.findFurthestPoint(w.clientX, y.offsetWidth, j.left, w.clientY, y.offsetHeight, j.top);
					const z = document.createElement("span");
					this.appyStyles(z, x, j, A, w), this.applyAnimation(z), y.appendChild(z), setTimeout(() => z.remove(), 500);
				},
			},
		]),
		q
	);
})();
(function q() {
	const b = new U();
	const w = document.querySelectorAll('[data-ripple-light="true"]');
	const x = document.querySelectorAll('[data-ripple-dark="true"]');
	if (w) {
		let y = !0;
		let j = !1;
		let A = void 0;
		try {
			for (let z = w[Symbol.iterator](), G; !(y = (G = z.next()).done); y = !0) {
				const O = G.value;
				O.addEventListener("mouseup", (B) => {
					b.create(B, "light");
				});
			}
		} catch (B) {
			(j = !0), (A = B);
		} finally {
			try {
				if (!y && z.return != null) z.return();
			} finally {
				if (j) throw A;
			}
		}
	}
	if (x) {
		let D = !0;
		let J = !1;
		let K = void 0;
		try {
			for (let F = x[Symbol.iterator](), L; !(D = (L = F.next()).done); D = !0) {
				const Q = L.value;
				Q.addEventListener("mouseup", (B) => {
					b.create(B, "dark");
				});
			}
		} catch (B) {
			(J = !0), (K = B);
		} finally {
			try {
				if (!D && F.return != null) F.return();
			} finally {
				if (J) throw K;
			}
		}
	}
})();
