import { css, type RuleSet } from "styled-components";

import type { TooltipWrapperStyleProps } from "./Tooltip.types";

export const tooltipStyles = (): RuleSet => {
  return css`
    background: var(--gray-700);
    color: var(--gray-50);
    width: max-content;
    height: max-content;
    max-width: 12rem;
    padding: var(--s-05) var(--s-1);
    border-radius: var(--s-1);
  `;
};

export const tooltipWrapperStyles = ({
  $cursor,
}: TooltipWrapperStyleProps): RuleSet => css`
  position: relative;
  line-height: 0px;
  height: fit-content;
  width: fit-content;
  cursor: ${$cursor};
`;
