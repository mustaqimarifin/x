function _array_like_to_array(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (let i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _array_without_holes(arr) {
	if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
	if ((typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) || iter["@@iterator"] != null)
		return Array.from(iter);
}
function _non_iterable_spread() {
	throw new TypeError(
		"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
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
	const triggers = document.querySelectorAll("[data-popover-target]");
	const popovers = document.querySelectorAll("[data-popover]");
	if (triggers && popovers) {
		Array.from(triggers).forEach((trigger) =>
			Array.from(popovers).forEach((popover) => {
				if (trigger.dataset.popoverTarget === popover.dataset.popover) {
					let _popover_classList;
					let _popover_classList1;
					const setPosition = function setPosition() {
						computePosition(trigger, popover, {
							placement: placement,
							middleware: [flip(), inline(), shift(), offset(Number(offsetValue))],
						}).then((param) => {
							const x = param.x;
							const y = param.y;
							Object.assign(popover.style, { top: "".concat(y, "px"), left: "".concat(x, "px") });
						});
					};
					const mountPopover = function mountPopover() {
						let _popover_classList;
						let _popover_classList1;
						setPosition();
						(_popover_classList = popover.classList).remove.apply(
							_popover_classList,
							_to_consumable_array(unmountClasses),
						);
						(_popover_classList1 = popover.classList).add.apply(
							_popover_classList1,
							_to_consumable_array(mountClasses),
						);
					};
					const unmountPopover = function unmountPopover() {
						let _popover_classList;
						let _popover_classList1;
						setPosition();
						(_popover_classList = popover.classList).remove.apply(
							_popover_classList,
							_to_consumable_array(mountClasses),
						);
						(_popover_classList1 = popover.classList).add.apply(
							_popover_classList1,
							_to_consumable_array(unmountClasses),
						);
					};
					const closeAll = function closeAll() {
						Array.from(popovers).forEach((el) => (el.className.includes(mountValue) ? unmountPopover() : null));
					};
					const placement = popover.dataset.popoverPlacement || "top";
					const offsetValue = popover.dataset.popoverOffset || 5;
					const mountValue = popover.dataset.popoverMount || "opacity-1";
					const unmountValue = popover.dataset.popoverUnmount || "pointer-events-none opacity-0";
					const transitionValue = popover.dataset.popoverTransition || "transition-opacity duration-300";
					const mountClasses = mountValue.split(" ");
					const unmountClasses = unmountValue.split(" ");
					const transitionClasses = transitionValue.split(" ");
					(_popover_classList = popover.classList).add.apply(_popover_classList, _to_consumable_array(unmountClasses));
					if (!popover.hasAttribute("tabindex")) popover.setAttribute("tabindex", 0);
					if (transitionValue !== "false")
						(_popover_classList1 = popover.classList).add.apply(
							_popover_classList1,
							_to_consumable_array(transitionClasses),
						);
					trigger.addEventListener("click", (param) => {
						const target = param.target;
						if (popover.className.includes(unmountValue)) {
							mountPopover();
						} else {
							Array.from(popovers).forEach((el) => {
								let _target_dataset;
								if (
									el.className.includes(mountValue) &&
									(target === null || target === void 0
										? void 0
										: (_target_dataset = target.dataset) === null || _target_dataset === void 0
										  ? void 0
										  : _target_dataset.popoverNested)
								) {
									let _el_classList;
									let _el_classList1;
									(_el_classList = el.classList).remove.apply(_el_classList, _to_consumable_array(mountClasses));
									(_el_classList1 = el.classList).add.apply(_el_classList1, _to_consumable_array(unmountClasses));
								}
							});
							unmountPopover();
						}
					});
					document.addEventListener("click", (param) => {
						const target = param.target;
						let _target_dataset;
						let _target_offsetParent_dataset;
						let _target_offsetParent;
						let _target_offsetParent_dataset1;
						let _target_offsetParent1;
						if (
							!(target === null || target === void 0
								? void 0
								: (_target_dataset = target.dataset) === null || _target_dataset === void 0
								  ? void 0
								  : _target_dataset.popover) &&
							!((_target_offsetParent = target.offsetParent) === null || _target_offsetParent === void 0
								? void 0
								: (_target_offsetParent_dataset = _target_offsetParent.dataset) === null ||
									  _target_offsetParent_dataset === void 0
								  ? void 0
								  : _target_offsetParent_dataset.popover) &&
							!(target === null || target === void 0 ? void 0 : target.dataset.popoverTarget) &&
							!((_target_offsetParent1 = target.offsetParent) === null || _target_offsetParent1 === void 0
								? void 0
								: (_target_offsetParent_dataset1 = _target_offsetParent1.dataset) === null ||
									  _target_offsetParent_dataset1 === void 0
								  ? void 0
								  : _target_offsetParent_dataset1.popoverTarget)
						)
							closeAll();
					});
					document.addEventListener("keyup", (param) => {
						const key = param.key;
						return key === "Escape" ? closeAll() : null;
					});
				}
			}),
		);
	}
})();
