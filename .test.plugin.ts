import { plugin } from "bun";
import nameMapper from "bun-module-name-mapper";

plugin(
  nameMapper({
    "\\.css$": "identity-obj-proxy",
    "\\.scss$": "identity-obj-proxy",
  })
);
