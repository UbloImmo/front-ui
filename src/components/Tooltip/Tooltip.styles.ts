import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { TooltipWrapperStyleProps } from "./Tooltip.types";
import type { Direction } from "@types";

const TOOLTIP_OFFSET = cssVarUsage("s-2");

export const tooltipStyles = (): RuleSet => {
  return css`
    background: var(--gray-700);
    color: var(--gray-50);
    width: max-content;
    height: max-content;
    max-width: 12rem;
    padding: var(--s-05) var(--s-1);
    border-radius: var(--s-1);
    z-index: 1;
  `;
};

const containerStyles = {
  top: css`
    bottom: calc(100% - ${TOOLTIP_OFFSET});
    left: 50%;
    transform: translateX(-50%);
  `,
  bottom: css`
    top: calc(100% - ${TOOLTIP_OFFSET});
    left: 50%;
    transform: translateX(-50%);
  `,
  left: css`
    right: calc(100% - ${TOOLTIP_OFFSET});
    top: 50%;
    transform: translateY(-50%);
  `,
  right: css`
    left: calc(100% - ${TOOLTIP_OFFSET});
    top: 50%;
    transform: translateY(-50%);
  `,
};

export const tooltipPlaceholderStyles = ($direction: Direction): RuleSet => {
  return css`
    position: absolute;
    &,
    & * {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
    width: max-content;
    height: max-content;
    padding: calc(${TOOLTIP_OFFSET} + var(--s-1))
      calc(${TOOLTIP_OFFSET} + var(--s-1));

    ${containerStyles[$direction]}
  `;
};

export const tooltipWrapperStyles = ({
  $cursor,
  $innerTestId,
}: TooltipWrapperStyleProps): RuleSet => css`
  position: relative;
  line-height: 0px;
  height: fit-content;
  width: fit-content;
  cursor: ${$cursor};

  &:hover [data-testid="${$innerTestId}"],
  &:focus [data-testid="${$innerTestId}"] {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
`;
