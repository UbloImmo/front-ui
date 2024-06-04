import { RuleSet, css } from "styled-components";

import { ChipProps } from "./Chip.types";
import { commonBadgeStyles } from "../Badge/Badge.styles";

import { fromStyleProps, isGrayColor } from "@utils";

import type { PaletteColor, StyleProps } from "@types";

export const buildChipContainerStyles = (
  props: StyleProps<ChipProps>
): RuleSet => {
  const { iconPlacement, color } = fromStyleProps(props);

  const borderColorShade = isGrayColor(color) ? "300" : "medium";
  const borderColor = `${color}-${borderColorShade}` as PaletteColor;
  const backgroundColor = isGrayColor(color) ? "50" : "light";
  const background = `${color}-${backgroundColor}` as PaletteColor;

  return css`
    ${commonBadgeStyles}
    flex-direction: ${iconPlacement === "left" ? "row" : "row-reverse"};
    border: 1px solid var(--${borderColor});
    background-color: var(--${background});
    border-radius: var(--s-1) 0 0 var(--s-1);
  `;
};

export const buildChipButtonStyles = ({
  $color,
}: StyleProps<ChipProps>): RuleSet => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--s-5);
  width: var(--s-5);
  max-width: var(--s-5);
  min-width: var(--s-5);
  max-height: var(--s-5);
  min-height: var(--s-5);
  border-radius: 0 var(--s-1) var(--s-1) 0;
  margin-left: -1px;
  border: 1px solid var(--${$color}-${isGrayColor($color) ? "300" : "medium"});
  background-color: var(--${$color}-light);
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  transition-property: background-color, fill;

  &:hover {
    background-color: var(
      --${$color}-${isGrayColor($color) ? "300" : "medium"}
    );
    transition-duration: 150ms;

    svg {
      fill: var(--${$color}-${isGrayColor($color) ? "800" : "dark"});
    }
  }
`;
