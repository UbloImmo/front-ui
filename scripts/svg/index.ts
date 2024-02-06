import { exportSvgFiles } from "./svg.exporter";
import { transformSvgs } from "./svg.transformer";

const main = async () => {
  const { bootstrapIcons, customIcons } = await transformSvgs();
  await exportSvgFiles(bootstrapIcons, customIcons);
};

main();
