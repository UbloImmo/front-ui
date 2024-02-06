import { exportSvgFiles } from "./svg.exporter";
import { transformSvgs } from "./svg.transformer";

/**
 * Asynchronous function that fetches and transforms SVG icons, then exports the resulting SVG files.
 *
 * Runs when `bun icons:generate` is called
 *
 * @return {Promise<void>} Resolves when the SVG files are successfully exported
 */
const main = async () => {
  const { bootstrapIcons, customIcons } = await transformSvgs();
  await exportSvgFiles(bootstrapIcons, customIcons);
};

main();
