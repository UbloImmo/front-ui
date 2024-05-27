import { css } from "styled-components";

import { cssVarUsage } from "@utils";

import type { TooltipDirection } from "./Tooltip.types";

const TOOLTIP_OFFSET = cssVarUsage("s-2");

const directionStyles = {
  top: css`
    bottom: calc(100% + ${TOOLTIP_OFFSET});
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--gray-700) transparent transparent transparent;
    }
  `,
  bottom: css`
    top: calc(100% + ${TOOLTIP_OFFSET});
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent var(--gray-700) transparent;
    }
  `,
  right: css`
    left: calc(100% + ${TOOLTIP_OFFSET});
    top: 50%;
    transform: translateY(-50%);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent var(--gray-700) transparent transparent;
    }
  `,
  left: css`
    right: calc(100% + ${TOOLTIP_OFFSET});
    top: 50%;
    transform: translateY(-50%);

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent var(--gray-700);
    }
  `,
};

export const getTooltipStyles = ($direction: TooltipDirection) => {
  return css`
    position: absolute;
    background: var(--gray-700);
    color: var(--gray-50);
    width: max-content;
    height: max-content;
    padding: var(--s-1);
    border-radius: var(--s-05);
    transition: visibility 0s, opacity 0.2s ease-out;
    visibility: hidden;
    opacity: 0;
    ${directionStyles[$direction]}
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

export const tooltipPlaceholderStyles = ($direction: TooltipDirection) => {
  return css`
    position: absolute;
    &,
    & * {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
    transition: visibility 0s, opacity 0.2s ease-out;
    width: max-content;
    height: max-content;
    padding: calc(${TOOLTIP_OFFSET} + var(--s-05))
      calc(${TOOLTIP_OFFSET} + var(--s-1));

    ${containerStyles[$direction]}
  `;
};

export const tooltipWrapperStyles = css`
  position: relative;
  // display: inline-flex; // needed to fit around content without being affected by default line height
  line-height: 0px;
  height: fit-content;
  width: fit-content;
  cursor: help;

  &:hover [data-testid="tooltip"] {
    visibility: visible;
    opacity: 1;
  }
`;
