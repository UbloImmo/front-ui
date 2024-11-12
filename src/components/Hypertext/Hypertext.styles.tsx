import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { DefaultHypertextProps } from "./Hypertext.types";
import type { StyleProps } from "@types";

export const hypertextStyle = ({
  $color,
}: StyleProps<DefaultHypertextProps>): RuleSet => {
  const textDecorationColor = cssVarUsage(
    $color === "gray" ? `${$color}-700-00` : `${$color}-base-00`
  );

  const hoverColor = cssVarUsage(
    $color === "gray" ? `${$color}-900` : `${$color}-dark`
  );

  return css`
    display: inline;
    width: min-content;
    min-width: min-content;
    cursor: pointer;
    text-decoration: none;

    &,
    & > span[data-testid="text"] {
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
    }

    & > span[data-testid="text"] {
      text-decoration-color: ${textDecorationColor};
      display: inherit;
      transition: color 300ms var(--bezier),
        text-decoration-color 300ms var(--bezier);
    }

    & > span,
    & > svg,
    & > svg > path {
      transition-duration: 300ms;
      transition-property: color, fill;
      transition-timing-function: var(--bezier);
    }

    & > svg[data-testid="icon"]:last-child {
      margin-left: var(--s-1);
      display: inline-block;
    }

    &:hover {
      & > span[data-testid="text"],
      & > svg[data-testid="icon"]:last-child,
      & > svg[data-testid="icon"]:last-child > path {
        transition-duration: 150ms;
      }

      & > span[data-testid="text"] {
        color: ${hoverColor};
        text-decoration-color: ${hoverColor};
      }

      & > svg[data-testid="icon"]:last-child,
      & > svg[data-testid="icon"]:last-child > path {
        fill: ${hoverColor};
      }
    }
  `;
};
