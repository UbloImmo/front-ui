import { css } from "styled-components";

import { cssDimensions } from "@/utils/styles.utils";
import { cssVarName, cssVarUsage, normalizeToPaletteColor } from "@utils";

import type { ListFilterPresetStyleProps } from "./ListFilterPreset.types";
import type { PaletteColorOrWhite } from "@types";
import type { RuleSet } from "styled-components";

export const listFilterPresetButtonStyles = ({
  $active,
  $disabled,
  $colorKey,
}: ListFilterPresetStyleProps): RuleSet => {
  const backgroundColor: PaletteColorOrWhite = $active
    ? "white"
    : $disabled
      ? "gray-100"
      : "gray-50";
  const borderColor: PaletteColorOrWhite = $active
    ? normalizeToPaletteColor($colorKey, "medium")
    : backgroundColor;
  return css`
    ${cssDimensions("fit-content", cssVarName("input-height"), true)};
    flex-wrap: nowrap;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;

    background: ${cssVarUsage(backgroundColor)};
    padding: var(--s-3);
    padding-left: var(--s-4);
    border-radius: var(--s-1);
    border: 1px solid ${cssVarUsage(borderColor)};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--s-2);
    box-shadow: var(--shadow-button);

    transition-property: background, border;
    transition-duration: 300ms;
    transition-timing-function: var(--bezier);

    &:hover:not(:disabled) {
      background: var(--white);
      transition-duration: 150ms;
    }
  `;
};
