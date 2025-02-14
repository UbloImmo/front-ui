import { css, type RuleSet } from "styled-components";

export const listFilterOptionDividerStyles = (): RuleSet => css`
  width: 100%;
  height: var(--s-6);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    top: calc(var(--s-1) * -1);
    background: var(--white);
    z-index: unset;
  }
`;

export const listFilterOptionDividerLabelContainerStyles = (): RuleSet => css`
  padding: var(--s-1) var(--s-3);
  border-radius: var(--s-05);
  background: var(--gray-50);
  width: 100%;
  overflow: hidden;
  height: var(--s-6);
  min-height: var(--s-6);
  max-height: var(--s-6);
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
