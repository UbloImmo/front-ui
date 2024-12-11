import { css, type RuleSet } from "styled-components";

export const listFilterOptionDividerStyles = (): RuleSet => css`
  padding: var(--s-1) var(--s-3);
  border-radius: var(--s-05);
  background: var(--gray-50);
  width: 100%;
  overflow: hidden;
  height: fit-content;
  min-height: fit-content;
  max-height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
  margin: 0;
`;
