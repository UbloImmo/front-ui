import { type RuleSet, css } from "styled-components";

import { cssDimensions } from "@/utils/styles.utils";

export const listFilterCollectionContainerStyles = (): RuleSet => css`
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-card-default);
  border-radius: var(--s-2);
  overflow: hidden;
  width: 100%;
`;

export const listFilterCollectionTitleContainerStyles = (): RuleSet => css`
  padding: var(--s-4) var(--s-4) var(--s-3);

  &:last-child {
    padding-bottom: var(--s-4);
  }
`;

export const listFilterCollectionFiltersContainerStyles = (): RuleSet => css`
  padding: 0 var(--s-1) var(--s-1);
`;

export const listFilterCollectionClearButtonStyles = (): RuleSet => css`
  padding: 0 !important;
  ${cssDimensions("fit-content", "fit-content", true)};
`;
