import { isNullish } from "@ubloimmo/front-util";
import { css, type RuleSet } from "styled-components";

import { cssLengthUsage, cssVarUsage } from "@utils";

import type { TableScrollViewStyleProps } from "./TableScrollView.types";

const CONTROLS_VISIBLE_WIDTH = cssVarUsage("s-6"); // 16px width + 8px margin

export const tableScrollViewStyles = ({
  $overflowDirection,
  $maxHeight,
  $style,
}: TableScrollViewStyleProps): RuleSet => {
  return css`
    display: block;

    ${($overflowDirection === "x" || $overflowDirection === "both") &&
    css`
      overflow-x: auto;
      overflow-y: ${$overflowDirection === "both" ? "auto" : "visible"};
    `}
    ${($overflowDirection === "y" || $overflowDirection === "both") &&
    css`
      overflow-y: auto;
      overflow-x: ${$overflowDirection === "both" ? "auto" : "visible"};
    `}
    ${!isNullish($maxHeight) &&
    css`
      max-height: ${cssLengthUsage($maxHeight)};
    `}
    width: 100%;
    ${$style === "form" &&
    css`
      margin: 0 calc(-1 * ${CONTROLS_VISIBLE_WIDTH});
      padding: 0 ${CONTROLS_VISIBLE_WIDTH};
      width: calc(100% + ${CONTROLS_VISIBLE_WIDTH} * 2);
    `}
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  `;
};
