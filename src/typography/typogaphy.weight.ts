import { texts } from "@ubloimmo/front-tokens";
import { transformObject } from "@ubloimmo/front-util";

import type { FontWeight, TypographyWeight } from "@types";

/**
 * Builds a typography weight map based on the generated text styles.
 *
 * @return {Record<TypographyWeight, string>} The typography weight map.
 */
export const buildTypographyWeightMap = (): Record<
  TypographyWeight,
  FontWeight
> => {
  return transformObject(
    texts.desktop.m,
    (token) => token.css.style.fontWeight
  );
};

export const typographyWeightMap = buildTypographyWeightMap();
