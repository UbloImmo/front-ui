import { rm } from "node:fs/promises";

const ROOT_DIR_PATH = "src/typography/__generated__";
const CSS_PATH = `${ROOT_DIR_PATH}/typography-tokens.module.scss`;

export async function exportTypographyRules(ruleStr: string) {
  // clear directory
  await rm(ROOT_DIR_PATH, { recursive: true, force: true });

  // write
  await Bun.write(CSS_PATH, ruleStr);
}
