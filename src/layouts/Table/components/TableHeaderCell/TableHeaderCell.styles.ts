import { css, type RuleSet } from "styled-components";

import { breakpointsPx } from "@/sizes";

export const tableHeaderCellStyles = (): RuleSet => css`
  text-align: left;
  padding-bottom: var(--s-2);

  & > div {
    background-color: var(--primary-light);
    width: 100%;
    padding: var(--s-1) var(--s-2);
    min-height: var(--s-8);
    height: 100%;
    border: 1px solid var(--primary-medium);
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    & > div {
      min-height: var(--s-10);
    }
  }

  &:not(:first-child) > div,
  :not(:last-child) > div {
    border-left: 0;
  }

  &:first-child > div {
    border-top-left-radius: var(--s-1);
    border-bottom-left-radius: var(--s-1);
  }

  &:last-child > div {
    border-top-right-radius: var(--s-1);
    border-bottom-right-radius: var(--s-1);
  }
`;
