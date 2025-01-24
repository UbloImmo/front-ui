import { isBoolean } from "@ubloimmo/front-util";
import { css } from "styled-components";

import type { ContextLineProps } from "./ContextLine.types";
import type { StyleProps } from "@types";

export const contextLineStyles = ({
  $borderBottom: border,
}: StyleProps<ContextLineProps>) => {
  return css`
    background: white;
    flex: 1;
    padding: var(--s-3) 0;
    ${!(isBoolean(border) && !border) &&
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
