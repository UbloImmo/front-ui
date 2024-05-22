import { css } from "styled-components";

export const hypertextStyle = css`
  font-size: inherit;
  font-weight: inherit;
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  text-decoration: none;
  width: min-content;
  min-width: min-content;
  white-space: nowrap;
  cursor: pointer;

  & > span,
  & > svg,
  & > svg > path {
    transition-duration: 150ms;
  }
`;
