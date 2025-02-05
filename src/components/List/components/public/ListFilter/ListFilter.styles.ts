import { css, type RuleSet } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { parseFixedLength } from "@/sizes/size.utils";
import { cssDimensions } from "@/utils/styles.utils";
import { cssVarName, cssVarUsage, fromStyleProps } from "@utils";

import type { ListFilterStyleProps } from "./ListFilter.types";

const OPTION_HEIGHT = cssVarUsage("input-height");
const MAX_VISIBLE_ELEMENTS = 7;
const OPTION_GAP = cssVarUsage("s-1"); // px
const OPTIONS_LIST_PADDING = cssVarUsage("s-1");

const HEADER_HEIGHT = parseFixedLength("s-10");
const HEADER_HEIGHT_MOBILE = parseFixedLength("s-12");
const MAX_OPTIONS_HEIGHT = `calc(${OPTION_HEIGHT} * ${MAX_VISIBLE_ELEMENTS} + ${OPTION_GAP} * ${
  MAX_VISIBLE_ELEMENTS - 1
} + ${OPTIONS_LIST_PADDING} * 2)`;
const HEADER_HEIGHT_VAR_NAME = "filter-header-height";

const computeMaxHeight = (props: ListFilterStyleProps) => {
  const { open, active, multi } = fromStyleProps(props);
  if (open)
    return `calc(${cssVarUsage(
      HEADER_HEIGHT_VAR_NAME
    )} + ${MAX_OPTIONS_HEIGHT})`;
  if (active && multi) return "calc-size(fit-content, size)";
  return HEADER_HEIGHT;
};

export const listFilterContainerStyles = (
  props: ListFilterStyleProps
): RuleSet => {
  const maxHeight = computeMaxHeight(props);
  const borderRadius = cssVarUsage(`s-${props.$open ? 2 : 1}`);
  const background = props.$open ? "white" : cssVarUsage("gray-50");
  return css`
    background: ${background};
    border-radius: ${borderRadius};
    min-height: var(--filter-header-height);
    min-width: 17rem !important;
    max-height: ${maxHeight};
    transition-property: background, box-shadow, max-height, height, margin-top,
      margin-bottom;
    transition-duration: 300ms;
    transition-timing-function: var(--bezier);
    margin: 0;
    ${cssVarName(HEADER_HEIGHT_VAR_NAME)}: ${HEADER_HEIGHT};

    ${!props.$disabled &&
    !props.$open &&
    css`
      cursor: pointer;
      &:hover {
        background: var(--primary-light-50);
        transition-duration: 150ms;
        box-shadow: var(--shadow-card-elevation-low);
      }
    `}

    ${props.$open &&
    css`
      transition-duration: 150ms;
      box-shadow: var(--shadow-card-elevation-medium);
      &:not(:first-child) {
        margin-top: var(--s-1);
      }
      &:not(:last-child) {
        margin-bottom: var(--s-1);
      }
    `}

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      ${cssVarName(HEADER_HEIGHT_VAR_NAME)}: ${HEADER_HEIGHT_MOBILE};
    }
  `;
};

export const listFilterHeaderStyles = (
  props: ListFilterStyleProps
): RuleSet => {
  const { multi } = fromStyleProps(props);
  const height = multi ? "fit-content" : cssVarName(HEADER_HEIGHT_VAR_NAME);
  return css`
    background: none;
    border: none;
    cursor: pointer;

    padding: var(--s-3) var(--s-4);
    ${cssDimensions("100%", height, true)}
    min-height: var(--filter-header-height);
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: var(--s-1);
  `;
};

export const listFilterOptionChipsStyles = (
  _props: ListFilterStyleProps
): RuleSet => {
  return css`
    max-width: 100%;
  `;
};

export const listFilterOptionsListStyles = (
  props: ListFilterStyleProps
): RuleSet => {
  const { open } = fromStyleProps(props);

  const overflowY = open ? "auto" : "hidden";
  const maxHeight = open ? MAX_OPTIONS_HEIGHT : 0;
  const padding = open ? cssVarUsage("s-1") : 0;
  const opacity = open ? 1 : 0;
  const pointerEvents = open ? "auto" : "none";

  return css`
    overflow-y: ${overflowY};
    max-height: ${maxHeight};
    height: calc-size(max-content, size);
    width: 100%;
    padding: ${padding};
    opacity: ${opacity};
    pointer-events: ${pointerEvents};

    transition-property: height, padding, opacity;
    transition-duration: 300ms;
    transition-timing-function: var(--bezier);

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: var(--s-1);

    scrollbar-width: thin;
  `;
};

export const listFilterQueryInputContainerStyles = (): RuleSet => css`
  border-bottom: 1px solid var(--primary-light);

  &,
  & > div,
  & > div > input[type="text"] {
    ${cssDimensions("100%", cssVarName(HEADER_HEIGHT_VAR_NAME), true)}
  }

  & input[type="text"] {
    background: none;
    padding-left: var(--s-4);
    padding-right: var(--s-4);

    &,
    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: none;
      border: none;
      outline: none;
    }
  }

  [data-testid="filter-query-input-control"] {
    right: var(--s-4);
  }
`;
