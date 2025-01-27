import { css, type RuleSet } from "styled-components";

import { cssDimensions } from "@/utils/styles.utils";

import type { ListTableHeaderFilterStyleProps } from "./ListTableHeaderFilter.types";

export const listTableHeaderFilterStyles = ({
  $hideLabel,
}: ListTableHeaderFilterStyleProps): RuleSet => css`
  cursor: pointer;

  div > button > svg[data-testid="icon"] {
    &,
    & path {
      transition:
        fill 300ms var(--beizer),
        opacity 150ms var(--beizer);
      fill: var(--primary-medium);
    }
  }

  &:hover div > button > svg[data-testid="icon"] {
    &,
    & path {
      transition-duration: 150ms;
      fill: var(--primary-base);
    }
  }

  & [data-list-filter] {
    width: var(--radix-popover-trigger-width);
  }

  ${$hideLabel &&
  css`
    width: var(--s-10);
  `}
`;

export const listTableHeaderFilterLabelStyles = (): RuleSet => css`
  min-width: max-content;
`;

export const listTableHeaderFilterButtonStyles = ({
  $active,
}: {
  $active?: boolean;
}): RuleSet => css`
  all: unset;
  cursor: pointer;
  cursor: pointer;
  position: relative;
  ${cssDimensions("s-4", "s-4", true)};

  & > svg[data-testid="icon"] {
    position: absolute;
    inset: 0;
  }

  & > svg[data-testid="icon"]:first-child {
    opacity: 1;
  }
  & > svg[data-testid="icon"]:last-child {
    opacity: 0;
  }

  ${$active &&
  css`
    & > svg[data-testid="icon"]:first-child {
      opacity: 0;
    }
    & > svg[data-testid="icon"]:last-child {
      opacity: 1;
      &,
      & path {
        fill: var(--primary-base);
      }
    }
  `}
`;
