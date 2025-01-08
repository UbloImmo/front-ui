import { $ } from "bun";

const runTypedoc = async () => {
  await $`bunx typedoc --options ./typedoc.json`;
};

const main = async () => {
  await runTypedoc();
};

main();
