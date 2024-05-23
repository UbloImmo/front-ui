import { css, type RuleSet } from "styled-components";

import { breakpointsPx } from "@/sizes";

export const componentListStyle = (): RuleSet => {
  return css`
    margin-bottom: var(--s-6);

    [data-testid="grid"] {
      --cell-size-large: 2;
      --cell-size-small: 1;
    }

    [data-testid="grid"]:has([data-testid="component-card"]:hover)
      [data-testid="component-card"]:not(:hover) {
      opacity: 0.5;
      transition: border-color 300ms ease-out 0s, background 300ms ease-out 0s,
        box-shadow 300ms ease-out 0s, opacity 300ms ease-in 600ms;
    }

    @media only screen and (max-width: ${breakpointsPx.SM}) {
      [data-testid="grid"] {
        grid-template-columns: repeat(2, 1fr);
        --cell-size-large: 1;
        --cell-size-small: 1;
      }
    }
  `;
};
