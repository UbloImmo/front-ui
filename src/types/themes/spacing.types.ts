import type { CssRem, Enum } from "../global";

export type SpacingLabelSuffix = "small" | "medium" | "large";

const unitLabelPrefixes = [
  "x",
  "xx",
  "xxx",
  "xxxx",
  "xxxxx",
  "xxxxxx",
  "xxxxxxx",
  "xxxxxxxx",
  "xxxxxxxxx",
  "xxxxxxxxxx",
  "xxxxxxxxxxx",
  "xxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxx",
] as const;

export type SpacingLabelPrefix = Enum<typeof unitLabelPrefixes>;

export type SpacingLabel =
  | `${SpacingLabelPrefix}_${SpacingLabelSuffix}`
  | SpacingLabelSuffix;

export type Spacings = Record<SpacingLabel, CssRem>;
