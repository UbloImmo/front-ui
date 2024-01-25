import type { CssRem, SpacingLabel, Spacings } from "../types";
import { cssRem, pxToRem } from "../utils/";
import { objectFromEntries } from "@ubloimmo/front-util";

export const unitPx = 4 as const;

const scaleUnitByFactor = (factor: number, unit = unitPx) => unit * factor;

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
    .fill(unitPx)
    .map((_, factor): number => factor + 1);
  const scales = objectFromEntries(
    scalesArr.map((scale): [SpacingLabel, CssRem] => {
      return [`s${scale}`, cssRem(pxToRem(scaleUnitByFactor(scale)))];
    })
  );
  return {
    s05: cssRem(pxToRem(scaleUnitByFactor(0.5))),
    ...scales,
  };
};

export const spacings = buildSpacingMap();
