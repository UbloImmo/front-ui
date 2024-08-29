import { transformObject } from "@ubloimmo/front-util";
import { css, type RuleSet } from "styled-components";

import { cssVarUsage, isCssVarName, isFixedCssLength } from "./css.utils";

import { parseFixedLength } from "@/sizes/size.utils";

import type { CssLength, CssVarName } from "@types";

/**
 * Utility function to generate a styled-component CSS rule set for a given width and height.
 *
 * @param {CssLength | CssVarName | "auto"} width - The width value, can be a string with a unit (e.g. '100px', '50%') or a number (e.g. 100, 50)
 * @param {CssLength | CssVarName | "auto"} height - The height value, can be a string with a unit (e.g. '100px', '50%') or a number (e.g. 100, 50)
 * @param {boolean} [includeMinMax=false] - If true, will also generate min-width, max-width, min-height and max-height rules.
 * @returns {RuleSet} The generated CSS rule set.
 */
export const cssDimensions = (
  width: CssLength | CssVarName | "auto",
  height: CssLength | CssVarName | "auto",
  includeMinMax = false
): RuleSet => {
  const parsedSize = transformObject({ width, height }, (length) => {
    if (isFixedCssLength(length)) return parseFixedLength(length);
    if (isCssVarName(length)) return cssVarUsage(length.substring(2));
    return length;
  });

  return css`
    width: ${parsedSize.width};
    height: ${parsedSize.height};
    ${includeMinMax &&
    css`
      min-width: ${parsedSize.width};
      max-width: ${parsedSize.width};
      min-height: ${parsedSize.height};
      max-height: ${parsedSize.height};
    `}
  `;
};
