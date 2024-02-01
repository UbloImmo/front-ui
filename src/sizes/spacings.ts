import type { CssRem, SpacingLabel, Spacings } from "../types";
import { cssRem, pxToRem } from "../utils/css.utils";
import { isString, isUndefined, objectFromEntries } from "@ubloimmo/front-util";

export const UNIT_PX = 4 as const;

const SPACING_PREFIX = "s" as const;

const scaleUnitByFactor = (factor: number, unit = UNIT_PX) => unit * factor;

export const defaultSpacingMapConfig = {
  /**
   * Maximum factor for the generated spacing map.
   * Affects number of generated spacing keys and values
   */
  maxScale: 16, // 16*4 = 64px = 4rem
} as const;

/**
 * Constructs a spacing map based on the maximum scale.
 *
 * @param {number} maxScale - the maximum scale for the spacing map - defaults to {@link defaultSpacingMapConfig.maxScale}
 * @return {Spacings} the constructed spacing map
 */
export const buildSpacingMap = (
  maxScale = defaultSpacingMapConfig.maxScale
): Spacings => {
  // construct factors array based on min / max factors
  // add +1 to offset added 0.5 scale
  const scalesArr = Array(maxScale)
    .fill(UNIT_PX)
    .map((_, factor): number => factor + 1);
  const scales = objectFromEntries(
    scalesArr.map((scale): [SpacingLabel, CssRem] => {
      return [
        `${SPACING_PREFIX}${scale}`,
        cssRem(pxToRem(scaleUnitByFactor(scale))),
      ];
    })
  );
  return {
    s05: cssRem(pxToRem(scaleUnitByFactor(0.5))),
    ...scales,
  };
};

/**
 * Checks if the given value is a {@link SpacingLabel} by validating its format and scale.
 *
 * @param {unknown} value - the value to be checked
 * @return {boolean} true if the value is a {@link SpacingLabel}, false otherwise
 */
export const isSpacingLabel = (value: unknown): value is SpacingLabel => {
  if (!isString(value) || !value.startsWith(SPACING_PREFIX)) return false;

  const scaleStr = value.split(SPACING_PREFIX)[1];
  if (isUndefined(scaleStr)) return false;
  const scale = parseInt(scaleStr);

  if (isNaN(scale)) return false;

  return true;
};
