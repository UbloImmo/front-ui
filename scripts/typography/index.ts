import { exportTypographyRules } from "./typography.exporter";
import {
  formatColorRules,
  formatRules,
  parseRules,
} from "./typography.transformer";

async function main() {
  const rules = parseRules();
  const baseRules = formatRules(rules);
  const colorRules = formatColorRules();

  const allRules = [baseRules, colorRules].join("\n\n");

  await exportTypographyRules(allRules);
}

main();
