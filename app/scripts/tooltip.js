function _array_like_to_array(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (let i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _array_with_holes(arr) {
	if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
	if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
	if ((typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) || iter["@@iterator"] != null)
		return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
	let _i = arr == null ? null : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) || arr["@@iterator"];
	if (_i == null) return;
	const _arr = [];
	let _n = true;
	let _d = false;
	let _s;
	let _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i.return != null) _i.return();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _non_iterable_rest() {
	throw new TypeError(
		"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
}
function _non_iterable_spread() {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
}
function _sliced_to_array(arr, i) {
	return (
		_array_with_holes(arr) ||
		_iterable_to_array_limit(arr, i) ||
		_unsupported_iterable_to_array(arr, i) ||
		_non_iterable_rest()
	);
}
function _to_consumable_array(arr) {
	return (
		_array_without_holes(arr) ||
		_iterable_to_array(arr) ||
		_unsupported_iterable_to_array(arr) ||
		_non_iterable_spread()
	);
}
function _unsupported_iterable_to_array(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _array_like_to_array(o, minLen);
	let n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(n);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import {
	computePosition,
	flip,
	inline,
	offset,
	shift,
} from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm";
(() => {
	const triggers = document.querySelectorAll("[data-tooltip-target]");
	const tooltips = document.querySelectorAll("[data-tooltip]");
	if (triggers && tooltips) {
		Array.from(triggers).forEach((trigger) =>
			Array.from(tooltips).forEach((tooltip) => {
				if (trigger.dataset.tooltipTarget === tooltip.dataset.tooltip) {
					let _tooltip_classList;
					let _tooltip_classList1;
					const setPosition = function setPosition() {
						computePosition(trigger, tooltip, {
							placement: placement,
							middleware: [flip(), inline(), shift(), offset(Number(offsetValue))],
						}).then((param) => {
							const x = param.x;
							const y = param.y;
							Object.assign(tooltip.style, { top: "".concat(y, "px"), left: "".concat(x, "px") });
						});
					};
					const mountTooltip = function mountTooltip() {
						let _tooltip_classList;
						let _tooltip_classList1;
						setPosition();
						(_tooltip_classList = tooltip.classList).remove.apply(
							_tooltip_classList,
							_to_consumable_array(unmountClasses),
						);
						(_tooltip_classList1 = tooltip.classList).add.apply(
							_tooltip_classList1,
							_to_consumable_array(mountClasses),
						);
					};
					const unmountTooltip = function unmountTooltip() {
						let _tooltip_classList;
						let _tooltip_classList1;
						setPosition();
						(_tooltip_classList = tooltip.classList).remove.apply(
							_tooltip_classList,
							_to_consumable_array(mountClasses),
						);
						(_tooltip_classList1 = tooltip.classList).add.apply(
							_tooltip_classList1,
							_to_consumable_array(unmountClasses),
						);
					};
					const placement = tooltip.dataset.tooltipPlacement || "top";
					const offsetValue = tooltip.dataset.tooltipOffset || 5;
					const mountValue = tooltip.dataset.tooltipMount || "opacity-1";
					const unmountValue = tooltip.dataset.tooltipUnmount || "pointer-events-none opacity-0";
					const transitionValue = tooltip.dataset.tooltipTransition || "transition-opacity duration-300";
					const mountClasses = mountValue.split(" ");
					const unmountClasses = unmountValue.split(" ");
					const transitionClasses = transitionValue.split(" ");
					(_tooltip_classList = tooltip.classList).add.apply(_tooltip_classList, _to_consumable_array(unmountClasses));
					if (!tooltip.hasAttribute("tabindex")) tooltip.setAttribute("tabindex", 0);
					if (transitionValue !== "false")
						(_tooltip_classList1 = tooltip.classList).add.apply(
							_tooltip_classList1,
							_to_consumable_array(transitionClasses),
						);
					[
						["mouseenter", mountTooltip],
						["mouseleave", unmountTooltip],
						["focus", mountTooltip],
						["blur", unmountTooltip],
					].forEach((param) => {
						const _param = _sliced_to_array(param, 2);
						const event = _param[0];
						const listener = _param[1];
						trigger.addEventListener(event, listener);
					});
				}
			}),
		);
	}
})();
