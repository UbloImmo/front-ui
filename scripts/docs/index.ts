import { $ } from "bun";

const runTypedoc = async () => {
  await $`bunx typedoc --options typedoc.config.json`;
};

const main = async () => {
  await runTypedoc();
};

main();
