async function getMod() {
  return import("./index_DUe6eV6t.mjs");
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
