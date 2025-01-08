import { $ } from "bun";

const runTypedoc = async () => {
  await $`bunx typedoc`;
};

const main = async () => {
  await runTypedoc();
};

main();
