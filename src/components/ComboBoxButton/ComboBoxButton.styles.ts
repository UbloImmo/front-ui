import { type RuleSet, css } from "styled-components";

import { breakpointsPx } from "@/sizes";
import { cssDimensions } from "@/utils/styles.utils";
import { cssVarUsage } from "@utils";

import type {
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";
import type { StyleProps, TestIdProps } from "@types";

export const ComboBoxButtonWrapperStyles = ({
  $active,
  $fill,
  $description,
  $testId,
}: StyleProps<ComboBoxButtonDefaultProps & TestIdProps>): RuleSet => css`
  --combobox-button-background: ${cssVarUsage(
    $active ? "primary-light" : "white"
  )};
  --combobox-button-border-color: var(--primary-medium);
  --combobox-button-min-height: var(--s-8);
  --combobox-button-height: ${$description
    ? "fit-content"
    : cssVarUsage("combobox-button-min-height")};

  display: inline-grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  background: none;
  border-radius: var(--s-1);

  ${$fill &&
  css`
    flex: 1;

    button:first-child {
      flex: 1;
      width: 100%;
      height: 100%;
      max-height: 100%;
    }
  `}

  &:not(:has(button[data-testid="${$testId}"]:disabled:first-child)) {
    box-shadow: var(--shadow-button);
  }

  &:has(button[data-testid="${$testId}"]:disabled:first-child) {
    --combobox-button-background: var(--gray-50);
    --combobox-button-border-color: var(--gray-300);
  }

  &:not(:has([data-testid="${$testId}"]:disabled:first-child)):hover {
    --combobox-button-border-color: var(--primary-base);
  }

  &:has(div[type="button"]) {
    & > button[data-testid="${$testId}"]:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    & > div[type="button"] {
      min-height: var(--combobox-button-min-height);
      height: 100%;
    }
  }

  &:not(:has(div[type="button"])) > button[data-testid="${$testId}"] {
    grid-column-end: -1;
  }

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    --combobox-button-height: var(--s-10);
  }
`;

export const ComboBoxButtonStyles = (): RuleSet => {
  return css`
    min-height: var(--combobox-button-min-height);
    height: var(--combobox-button-height);
    max-height: var(--combobox-button-height);
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-2);
    cursor: pointer;
    background: var(--combobox-button-background);
    padding: var(--s-2) var(--s-4);
    border-radius: var(--s-1);
    border: 1px solid var(--combobox-button-border-color);
    transition:
      300ms background ease-out 0s,
      300ms border-color ease-out 0s;
    overflow: hidden;
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;

    span[data-testid="combo-box-button-label"] {
      overflow: hidden;
    }

    div[data-testid="combo-box-button-content"] {
      flex: 1;
      overflow: hidden;
    }

    &:disabled {
      cursor: not-allowed;
    }
  `;
};

export const ComboBoxIconContainerStyle = ({
  $active,
}: ComboButtonIconContainerStyleProps) => {
  return css`
    position: relative;
    ${cssDimensions("s-4", "s-4", true)}

    & > svg[data-testid="icon"] {
      position: absolute;
      inset: 0;

      &:first-child {
        opacity: ${$active ? 1 : 0};
      }

      &:last-child {
        opacity: ${$active ? 0 : 1};
      }
    }
  `;
};

export const ComboBoxContextMenuTriggerStyles = (): RuleSet => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: var(--s-8);
  min-width: var(--s-8);
  max-width: var(--s-8);
  min-height: var(--combobox-button-min-height);
  border: 1px solid var(--combobox-button-border-color);
  border-left: none;
  background: var(--combobox-button-background);
  border-top-right-radius: var(--s-1);
  border-bottom-right-radius: var(--s-1);
  transition:
    300ms background ease-out 0s,
    300ms border-color ease-out 0s;

  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  cursor: pointer;
`;
