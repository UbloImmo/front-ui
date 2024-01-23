import type { CssRem } from "@/types";
import type {
  SpacingLabel,
  SpacingLabelSuffix,
  SpacingLabelPrefix,
  Spacings,
} from "@/types/themes/spacing.types";
import { cssRem, pxToRem } from "@/utils/css.utils";
import { objectFromEntries } from "@ubloimmo/front-util";

const unitPx = 4 as const;

const scaleUnitByFactor = (factor: number) => unitPx * factor;

/**
 * Function to build a spacing label based on factor and medium factor.
 * Computes offsets based on mediumFactor - defaults to 4 (4*4 = 16px = 1rem)
 *
 * @param {number} factorPx - The factor in pixels
 * @param {number} mediumFactor - The medium factor
 * @return {SpacingLabel} The built spacing label
 */
const buildSpacingLabel = (
  factorPx: number,
  mediumFactor: number
): SpacingLabel => {
  const scaledMediumFactor = scaleUnitByFactor(mediumFactor);
  let suffix: SpacingLabelSuffix = "large";
  let exponents = 0;
  const factorDiff = Math.round(
    Math.abs(scaledMediumFactor - factorPx) / unitPx
  );
  // medium
  if (factorDiff === 0) {
    suffix = "medium";
    return suffix;
  }
  // assign suffix based on factor
  suffix = factorPx < scaledMediumFactor ? "small" : "large";
  exponents = Math.max(0, factorDiff - 1);
  // exit early if factor diff is 1 (no need for exponents)
  if (!exponents) return suffix;
  const prefix: SpacingLabelPrefix = Array(exponents)
    .fill("x")
    .join("") as SpacingLabelPrefix;
  return `${prefix}_${suffix}`;
};

/**
 * Builds a spacing map based on the provided minimum, maximum, and medium factors.
 *
 * @param {number} minFactor - the minimum factor for spacing map
 * @param {number} maxFactor - the maximum factor for spacing map
 * @param {number} mediumFactor - the medium factor for spacing map
 * @return {Spacings} the constructed spacing map
 */
export const buildSpacingMap = (
  minFactor = 1,
  maxFactor = 16,
  mediumFactor = 4
): Spacings => {
  // construct factors array based on min / max factors
  // add +1 to offset added 0.5 scale
  const pxFactors = Array(maxFactor + 1 - minFactor)
    .fill(unitPx)
    .map((_, factor): number => scaleUnitByFactor(factor + minFactor));

  // add half unit
  pxFactors.unshift(scaleUnitByFactor(0.5));

  // convert factors to object
  return objectFromEntries(
    pxFactors.map((pxFactor): [SpacingLabel, CssRem] => {
      return [
        buildSpacingLabel(pxFactor, mediumFactor),
        cssRem(pxToRem(pxFactor)),
      ];
    })
  );
};

export const spacings = buildSpacingMap();
