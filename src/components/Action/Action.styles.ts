import { css, type RuleSet } from "styled-components";

import { cssVarUsage } from "@utils";

import type { ActionSize, ActionStyledProps } from "./Action.types";
import type { CssRem, SpacingLabel } from "@types";

const heights: Record<ActionSize, CssRem | "unset"> = {
  default: "2.5rem",
  centered: "2.5rem",
  large: "5.25rem",
  card: "unset",
};

const borderRadii: Record<ActionSize, SpacingLabel> = {
  default: "s-1",
  centered: "s-1",
  large: "s-3",
  card: "s-3",
};

const paddings: Record<ActionSize, [SpacingLabel, SpacingLabel]> = {
  default: ["s-1", "s-2"],
  centered: ["s-1", "s-2"],
  large: ["s-4", "s-6"],
  card: ["s-4", "s-6"],
};

const actionTextWrappingStyles = () => css`
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
  $size,
  $color,
  $testId,
}: ActionStyledProps): RuleSet => {
  const height = heights[$size];
  const borderRadius = borderRadii[$size];
  const padding = paddings[$size].map(cssVarUsage).join(" ");
  const disabledShadow =
    $size === "large" || $size === "card"
      ? cssVarUsage("shadow-card-default")
      : "none";

  const borderColor = `${$color}-medium`;
  const borderColorTransparent = `${borderColor}-00`;

  const hoverShadow = cssVarUsage(
    $color === "error"
      ? "shadow-input-error-focus"
      : "shadow-card-elevation-medium"
  );

  return css`
    cursor: pointer;
    min-height: ${height};
    width: 100%;
    padding: ${padding};

    background: var(--white);
    border: 1px solid ${cssVarUsage(borderColorTransparent)};
    box-shadow: var(--shadow-button);
    border-radius: var(--${borderRadius});

    transition:
      background 300ms var(--bezier) 0s,
      border-color 300ms var(--bezier) 0s,
      box-shadow 300ms var(--bezier) 0s;

    span[data-testid="${$testId}-label"] {
      text-overflow: ellipsis;
      max-height: 100%;
      max-width: fit-content;
      transition: color 150ms var(--bezier) 0s;
      ${actionTextWrappingStyles}
    }

    &:hover:not(:disabled) {
      transition-duration: 150ms;
      border-color: ${cssVarUsage(borderColor)};
      box-shadow: ${hoverShadow};

      ${$size === "centered" &&
      css`
        background: var(--${$color}-light);
      `}
    }

    &:disabled {
      cursor: not-allowed;
      box-shadow: ${disabledShadow};
      background: var(--gray-50);
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
