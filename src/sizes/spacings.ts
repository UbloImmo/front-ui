import {
  SPACING_PREFIX,
  UNIT_PX,
  type CssRem,
  type SpacingLabel,
  type Spacings,
} from "../types";
import { cssRem, pxToRem } from "../utils/css.utils";
import { objectFromEntries } from "@ubloimmo/front-util";

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
        `${SPACING_PREFIX}-${scale}`,
        cssRem(pxToRem(scaleUnitByFactor(scale))),
      ];
    })
  );
  return {
    "s-05": cssRem(pxToRem(scaleUnitByFactor(0.5))),
    ...scales,
  };
};
