import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { ActionSize, DefaultActionProps } from "./Action.types";
import type { CssRem, SpacingLabel, StyleProps } from "@types";

const horizontalPaddings: Record<ActionSize, SpacingLabel> = {
  default: "s-2",
  large: "s-6",
};

const heights: Record<ActionSize, CssRem> = {
  default: "2.5rem",
  large: "5.25rem",
};

const borderRadii: Record<ActionSize, SpacingLabel> = {
  default: "s-1",
  large: "s-3",
};

/**
 * Generates the styles for the action component container button.
 *
 * @param {StyleProps<DefaultActionProps>} styleProps - Style props mapped from the action component's props.
 * @return {RuleSet} The generated CSS styles for the action container.
 */
export const actionContainerStyles = ({
  $size,
  $disabled,
}: StyleProps<DefaultActionProps>): RuleSet => {
  const paddingHorizontal = horizontalPaddings[$size];
  const height = heights[$size];
  const borderRadius = borderRadii[$size];
  const background = $disabled ? cssVarUsage("gray-50") : "#fff";
  return css`
    cursor: pointer;
    height: ${height};
    min-height: ${height};
    max-height: ${height};
    width: 100%;
    padding: var(--s-1) var(--${paddingHorizontal});
    display: flex;
    align-items: center;
    gap: var(--s-4);
    background: ${background};
    border: 1px solid transparent;
    box-shadow: var(--shadow-button);
    border-radius: var(--${borderRadius});

    transition: background 300ms ease-out 0s, border-color 300ms ease-out 0s,
      box-shadow 300ms ease-out 0s;

    span[data-testid="text action-label"] {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 100%;
      max-width: fit-content;
      -webkit-line-clamp: 2;
    }

    &:hover:not(:disabled) {
      transition-duration: 150ms;
      border-color: var(--primary-medium);
      box-shadow: var(--shadow-card-elevation-medium);
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: var(--shadow-card-default);
    }
  `;
};
