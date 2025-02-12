import { type RuleSet, css } from "styled-components";

import { cssDimensions } from "@/utils/styles.utils";

import type { StyleProps } from "@types";

export const listFilterCollectionContainerStyles = (): RuleSet => css`
  background: var(--white);
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

export const listFilterCollectionClearButtonStyles = ({
  $hidden,
}: StyleProps<{ hidden?: boolean }>): RuleSet => css`
  padding: 0 !important;
  ${cssDimensions("fit-content", "fit-content", true)};

  transition: opacity 150ms var(--bezier) 0s;

  ${$hidden &&
  css`
    opacity: 0;
    pointer-events: none;
    cursor: default;
  `}
`;
