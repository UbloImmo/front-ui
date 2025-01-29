import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { DefaultActionProps, ActionVariant } from "./Action.types";
import type { CssRem, SpacingLabel, StyleProps } from "@types";

const horizontalPaddings: Record<ActionVariant, SpacingLabel> = {
  default: "s-2",
  centered: "s-2",
  chunky: "s-6",
  card: "s-4",
};

const heights: Record<ActionVariant, CssRem> = {
  default: "2.5rem",
  centered: "2.5rem",
  chunky: "5.25rem",
  card: "8rem",
};

const borderRadii: Record<ActionVariant, SpacingLabel> = {
  default: "s-1",
  centered: "s-1",
  chunky: "s-3",
  card: "s-3",
};

export const actionTextWrappingStyles = () => css`
  overflow-y: hidden;
  overflow-wrap: break-word;
  display: block;
  display: -moz-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
`;

/**
 * Generates the styles for the action component container button.
 *
 * @param {StyleProps<DefaultActionProps>} styleProps - Style props mapped from the action component's props.
 * @return {RuleSet} The generated CSS styles for the action container.
 */
export const actionContainerStyles = ({
  $variant,
  $disabled,
}: StyleProps<DefaultActionProps>): RuleSet => {
  const paddingHorizontal = horizontalPaddings[$variant];
  const height = heights[$variant];
  const borderRadius = borderRadii[$variant];
  const background = $disabled ? cssVarUsage("gray-50") : "#fff";
  const disabledShadow = cssVarUsage(
    $variant === "chunky" || $variant === "card"
      ? "shadow-card-elevation-low"
      : "shadow-button"
  );

  return css`
    cursor: pointer;
    height: ${height};
    min-height: ${height};
    max-height: ${$variant === "card" ? "none" : height};
    width: 100%;
    padding: var(--s-05) var(--${paddingHorizontal});
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
      ${$variant === "default" &&
      css`
        flex: 1;
      `}
      text-overflow: ellipsis;
      max-height: 100%;
      max-width: fit-content;
      ${actionTextWrappingStyles}
    }

    ${$variant === "centered" &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--s-05) var(--${paddingHorizontal});

      > div:first-child {
        display: flex;
        align-items: center;
        gap: var(--s-2);
        margin: 0 auto;
      }

      span[data-testid="text action-label"] {
        white-space: nowrap;
      }

      *[data-testid="badge action-badge"] {
        display: none;
      }
    `}

    ${$variant === "card" &&
    css`
      padding: var(--s-4);

      > div {
        gap: var(--s-4);
      }
    `}

    *[data-testid="badge action-badge"] span {
      max-width: max-content;
      min-width: max-content;
      white-space: nowrap;
    }

    &:hover:not(:disabled) {
      transition-duration: 150ms;
      border-color: var(--primary-medium);
      box-shadow: var(--shadow-card-elevation-medium);
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: ${disabledShadow};
    }
  `;
};

export const actionLabelContainerStyles = () => css`
  overflow: hidden;
  flex: 1;
  height: min-content;
  width: unset;
  flex: unset;
`;
