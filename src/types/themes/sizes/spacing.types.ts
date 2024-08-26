export const UNIT_PX = 4 as const;

export const SPACING_PREFIX = "s" as const;

export type SpacingLabel = `${typeof SPACING_PREFIX}-${number}`;

export type Spacings = {
  [k: SpacingLabel]: `${number}rem`;
};
