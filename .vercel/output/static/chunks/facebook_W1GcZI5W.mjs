async function getMod() {
  return import("./facebook_CZwbe59V.mjs");
}
const collectedLinks = "@@ASTRO-LINKS@@";
const collectedStyles = "@@ASTRO-STYLES@@";
const collectedScripts = "@@ASTRO-SCRIPTS@@";
const defaultMod = {
  __astroPropagation: true,
  getMod,
  collectedLinks,
  collectedStyles,
  collectedScripts,
};

export { defaultMod as default };
