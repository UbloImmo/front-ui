import { isBoolean } from "@ubloimmo/front-util";
import { css } from "styled-components";

import { cssVarUsage } from "@utils";

import type { ContextLineProps } from "./ContextLine.types";
import type { StyleProps } from "@types";

export const contextLineStyles = ({
  $borderBottom,
  $paddingHorizontal,
  $compact,
}: StyleProps<ContextLineProps>) => {
  const paddingHorizontal = $paddingHorizontal ? cssVarUsage("s-3") : 0;
  const paddingVertical = cssVarUsage($compact ? "s-2" : "s-3");
  const displayBorder = !(isBoolean($borderBottom) && !$borderBottom);

  return css`
    background: var(--white);
    flex: 1;
    padding: ${paddingVertical} ${paddingHorizontal};
    ${displayBorder &&
    css`
      box-shadow: var(--border-bottom);
    `}

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      box-shadow: none;
    }
  `;
};
