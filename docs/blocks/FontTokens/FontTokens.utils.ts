import { cssRemToCssPx, cssPxToCssRem } from "@utils";

import type { CssRem, HeadingSize, TypographySize } from "@types";

/**
 * Checks if the given size is a valid heading size.
 *
 * @param {TypographySize} size - The size to check.
 * @return {size is HeadingSize} - True if the size is a valid heading size, false otherwise.
 */
export const isHeadingSize = (size: TypographySize): size is HeadingSize => {
  return ["h1", "h2", "h3", "h4"].includes(size);
};

export const formatCssLength = (rem: CssRem) => {
  const lenghtPx = cssRemToCssPx(rem, 2);
  const lengthRem = cssPxToCssRem(lenghtPx, 2);
  return `${lenghtPx} / ${lengthRem}`;
};
