import path from "node:path";

import { Logger } from "@ubloimmo/front-util";
import { $ } from "bun";
import dedent from "ts-dedent";

const logger = Logger();

logger.info("Building for production", "Build");

await $`vite build --config vite.config.build.ts`;

logger.info("Overwriting index.d.ts file", "Build");
const INDEX_DTS_CONTENT = dedent`
  export * from "./components";
  export * from "./fonts";
  export * from "./layouts";
  export * from "./sizes";
  export * from "./themes";
  export * from "./types";
  export * from "./utils";
`;
const INDEX_DTS_PATH = path.resolve(
  process.cwd(),
  "dist",
  "types",
  "index.d.ts"
);

await Bun.write(INDEX_DTS_PATH, INDEX_DTS_CONTENT);

logger.info("Done!", "Build");
