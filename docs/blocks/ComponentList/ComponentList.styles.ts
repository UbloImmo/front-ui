import { css, type RuleSet } from "styled-components";

import { breakpointsPx } from "@/sizes";

export const componentListStyle = (): RuleSet => {
  return css`
    [data-testid="grid"] {
      --cell-size-large: 2;
      --cell-size-small: 1;
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
