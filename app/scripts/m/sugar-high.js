const P = (e) => /^[^\S\r\n]+$/g.test(e);
const b = (e) => Y.has(e);
const ee = (e) =>
	e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const I = (e) => /^[\w_]+$/.test(e) || U(e);
const ne = (e) => {
	const i = e[0];
	return (I(i) && i === i.toUpperCase()) || e === "null";
};
const U = (e) => /[^\u0000-\u007f]/.test(e);
const F = (e) => /^[a-zA-Z]$/.test(e);
const H = (e) => F(e) || U(e);
const se = (e) => H(e[0]) && (e.length === 1 || I(e.slice(1)));
const G = (e) => e === "`";
const E = (e) => e === '"' || e === "'";
const ie = (e) => E(e) || G(e);
const z = (e) => ((e = e.slice(0, 2)), e === "//" || e === "/*");
const oe = (e) => e[0] === "/" && !z(e[0] + e[1]);
const re = (e) => {
	let i = "";
	let x = -1;
	let _ = [null, null];
	const h = [];
	let t = !1;
	let r = 0;
	let u = !1;
	let j = 0;
	const d = () => t && !u && !r;
	const p = () => r && !d();
	const R = () => !r && d() && !u && j > 0;
	let g = null;
	let m = 0;
	let Q = 0;
	const K = () => g !== null;
	const v = () => Q > m;
	const X = () => Q > 0 && Q === m;
	function $(s) {
		const n = s === "\n";
		if (p() && K()) return S;
		if (R()) return ce;
		if (K()) return S;
		if (ae.has(s)) return _[1] === "." ? C : he;
		if (n) return L;
		if (P(s)) return O;
		if (s.split("").every(b)) return c;
		if (ne(s)) return p() ? C : ue;
		return se(s) && !v() && !E(g) ? C : S;
	}
	const o = (s, n) => {
		if (n) i = n;
		if (i) {
			x = s || $(i);
			const l = [x, i];
			if (x !== O && x !== L) _ = l;
			h.push(l);
		}
		i = "";
	};
	for (let s = 0; s < e.length; s++) {
		const n = e[s];
		const l = e[s - 1];
		const k = e[s + 1];
		const B = l + n;
		const a = n + k;
		if (E(n) && !R()) {
			if ((o(), l !== "\\")) {
				if (g && n === g) g = null;
				else if (!g) g = n;
			}
			o(S, n);
			continue;
		}
		if (!v()) {
			if (l !== "\\n" && G(n)) {
				o(), o(S, n), Q++;
				continue;
			}
		}
		if (v()) {
			if (l !== "\\n" && G(n)) {
				if (Q > 0) {
					o(), Q--, o(S, n);
					continue;
				}
			}
			if (a === "${") {
				m++, o(S), o(c, a), s++;
				continue;
			}
		}
		if (X() && n === "}") {
			o(), m--, o(c, n);
			continue;
		}
		if (d()) {
			if (n === "{") {
				o(), o(c, n), (u = !0);
				continue;
			}
		}
		if (t) {
			if (!r && n === "<") {
				if ((o(), k === "/")) (r = 2), (i = a), s++;
				else (r = 1), (i = n);
				o(c);
				continue;
			}
			if (r) {
				if (n === ">" && !"/=".includes(l)) {
					if ((o(), r === 1)) (r = 0), j++;
					else (r = 0), (t = !1);
					o(c, n);
					continue;
				}
				if (a === "/>" || a === "</") {
					if (i !== "<" && i !== "/") o();
					if (a === "/>") r = 0;
					else j--;
					if (!j) t = !1;
					(i = a), s++, o(c);
					continue;
				}
				if (n === "<") {
					o(), (i = n), o(c);
					continue;
				}
			}
		}
		if (!r && ((n === "<" && H(k)) || a === "</")) {
			if (((r = k === "/" ? 2 : 1), n === "<" && (k === "/" || F(k)))) t = !0;
		}
		const V = ie(n);
		const Z = v();
		const A = !t && oe(a);
		const M = R();
		if (V || Z || E(g)) i += n;
		else if (A) {
			o();
			const [T, q] = _;
			if (A && T && !((T === c && q !== ")") || T === D)) {
				(i = n), o();
				continue;
			}
			const y = s++;
			const w = () => s >= e.length;
			const W = () => w() || e[s] === "\n";
			let f = !1;
			for (; !W(); s++)
				if (e[s] === "/" && e[s - 1] !== "\\") {
					f = !0;
					while (y !== s && /^[a-z]$/.test(e[s + 1]) && !W()) s++;
					break;
				}
			if (y !== s && f) (i = e.slice(y, s + 1)), o(S);
			else (i = n), o(), (s = y);
		} else if (z(a)) {
			o();
			const T = s;
			if (k === "/") for (; s < e.length && e[s] !== "\n"; s++);
			else for (; s < e.length && e[s - 1] + e[s] !== "*/"; s++);
			(i = e.slice(T, s + 1)), o(D);
		} else if (n === " " || n === "\n")
			if (n === " " && (P(i) || !i || M)) {
				if (((i += n), k === "<")) o();
			} else o(), (i = n), o();
		else if (u && n === "}") o(), (i = n), o(), (u = !1);
		else if ((M && !J.has(n)) || ((I(n) === I(i[i.length - 1]) || d()) && !Y.has(n))) i += n;
		else {
			if (B === "</") i = B;
			if ((o(), B !== "</")) i = n;
			if (a === "</" || a === "/>") (i = a), o(), s++;
			else if (J.has(n)) o();
		}
	}
	return o(), h;
};
const te = (e) => {
	const i = [];
	const x = (t) => `<span class="sh__line">${t}</span>`;
	function _(t) {
		i.push(
			x(
				t.map(([r, u]) => `<span class="sh__token--${N[r]}" style="color: var(--sh-${N[r]})">${ee(u)}</span>`).join(""),
			),
		);
	}
	const h = [];
	for (let t = 0; t < e.length; t++) {
		const r = e[t];
		const [u, j] = r;
		if (u !== L)
			if (j.includes("\n")) {
				const d = j.split("\n");
				for (let p = 0; p < d.length; p++) if ((h.push([u, d[p]]), p < d.length - 1)) _(h), (h.length = 0);
			} else h.push(r);
		else h.push([u, ""]), _(h), (h.length = 0);
	}
	if (h.length) _(h);
	return i;
};
const de = (e) => {
	const i = re(e);
	return te(i).join("\n");
};
const J = new Set(["<", ">", "{", "}", "[", "]"]);
const ae = new Set([
	"for",
	"do",
	"while",
	"if",
	"else",
	"return",
	"function",
	"var",
	"let",
	"const",
	"true",
	"false",
	"undefined",
	"this",
	"new",
	"delete",
	"typeof",
	"in",
	"instanceof",
	"void",
	"break",
	"continue",
	"switch",
	"case",
	"default",
	"throw",
	"try",
	"catch",
	"finally",
	"debugger",
	"with",
	"yield",
	"async",
	"await",
	"class",
	"extends",
	"super",
	"import",
	"export",
	"from",
	"static",
]);
const Y = new Set([
	"+",
	"-",
	"*",
	"/",
	"%",
	"=",
	"!",
	"&",
	"|",
	"^",
	"~",
	"!",
	"?",
	":",
	".",
	",",
	";",
	"'",
	'"',
	".",
	"(",
	")",
	"[",
	"]",
	"#",
	"@",
	"\\",
	...J,
]);
const N = ["identifier", "keyword", "string", "class", "sign", "comment", "break", "space", "jsxliterals"];
const [C, he, S, ue, c, D, L, O, ce] = N.map((e, i) => i);
const ge = { TokenTypes: N };
export { re as tokenize, de as highlight, ge as SugarHigh };
