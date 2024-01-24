import type { CssRem } from "../global";

export type SpacingLabel = `s${number}`;

export type Spacings = {
  [k: SpacingLabel]: CssRem;
};
