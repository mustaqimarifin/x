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
(() => {
	const triggers = document.querySelectorAll("[data-dialog-target]");
	const dialogs = document.querySelectorAll("[data-dialog]");
	const backdrops = document.querySelectorAll("[data-dialog-backdrop]");
	const closeTriggers = document.querySelectorAll("[data-dialog-close]");
	if (triggers && dialogs && backdrops) {
		Array.from(triggers).forEach((trigger) =>
			Array.from(dialogs).forEach((dialog) =>
				Array.from(backdrops).forEach((backdrop) => {
					if (
						trigger.dataset.dialogTarget === dialog.dataset.dialog &&
						backdrop.dataset.dialogBackdrop === dialog.dataset.dialog
					) {
						let _dialog_classList;
						let _dialog_classList1;
						const mountDialog = function mountDialog() {
							let _dialog_classList;
							let _dialog_classList1;
							isDialogOpen = true;
							backdrop.classList.toggle("pointer-events-none");
							backdrop.classList.toggle("opacity-0");
							(_dialog_classList = dialog.classList).remove.apply(
								_dialog_classList,
								_to_consumable_array(unmountClasses),
							);
							(_dialog_classList1 = dialog.classList).add.apply(_dialog_classList1, _to_consumable_array(mountClasses));
						};
						const unmountDialog = function unmountDialog() {
							let _dialog_classList;
							let _dialog_classList1;
							isDialogOpen = false;
							backdrop.classList.toggle("pointer-events-none");
							backdrop.classList.toggle("opacity-0");
							(_dialog_classList = dialog.classList).remove.apply(
								_dialog_classList,
								_to_consumable_array(mountClasses),
							);
							(_dialog_classList1 = dialog.classList).add.apply(
								_dialog_classList1,
								_to_consumable_array(unmountClasses),
							);
						};
						const mountValue = dialog.dataset.dialogMount || "opacity-1 translate-y-0";
						const unmountValue = dialog.dataset.dialogUnmount || "opacity-0 -translate-y-14";
						const transitionValue = dialog.dataset.dialogTransition || "transition-all duration-300";
						const mountClasses = mountValue.split(" ");
						const unmountClasses = unmountValue.split(" ");
						const transitionClasses = transitionValue.split(" ");
						let isDialogOpen = false;
						(_dialog_classList = dialog.classList).add.apply(_dialog_classList, _to_consumable_array(unmountClasses));
						if (!backdrop.hasAttribute("tabindex")) backdrop.setAttribute("tabindex", 0);
						if (transitionValue !== "false")
							(_dialog_classList1 = dialog.classList).add.apply(
								_dialog_classList1,
								_to_consumable_array(transitionClasses),
							);
						if (
							dialog.className.includes(unmountValue) &&
							!backdrop.className.includes("pointer-events-none opacity-0")
						) {
							backdrop.classList.add("pointer-events-none");
							backdrop.classList.add("opacity-0");
						}
						trigger.addEventListener("click", () =>
							dialog.className.includes(unmountValue) ? mountDialog() : unmountDialog(),
						);
						backdrop.addEventListener("click", (param) => {
							const target = param.target;
							let _target_dataset;
							let _target_dataset1;
							if (
								(target === null || target === void 0
									? void 0
									: (_target_dataset = target.dataset) === null || _target_dataset === void 0
									  ? void 0
									  : _target_dataset.dialogBackdrop) &&
								(target === null || target === void 0
									? void 0
									: (_target_dataset1 = target.dataset) === null || _target_dataset1 === void 0
									  ? void 0
									  : _target_dataset1.dialogBackdropClose)
							)
								unmountDialog();
						});
						document.addEventListener("keyup", (param) => {
							const key = param.key;
							return key === "Escape" && isDialogOpen ? unmountDialog() : null;
						});
						Array.from(closeTriggers).forEach((close) =>
							close.addEventListener("click", () => (isDialogOpen ? unmountDialog() : null)),
						);
					}
				}),
			),
		);
	}
})();
