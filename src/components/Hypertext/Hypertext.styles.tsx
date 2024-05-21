import { css } from "styled-components";

export const hypertextStyle = css`
  font-size: inherit;
  font-weight: inherit;
  color: var(--primary-base);
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  text-decoration: none;
  width: min-content;
  min-width: min-content;
  white-space: nowrap;
  cursor: pointer;

  & > span {
    color: var(--primary-base);
    transition: color 300ms ease-out 0s;
  }

  & > svg,
  & > svg > path {
    transition: fill 300ms ease-out 0s;
  }

  &:hover {
    span {
      color: var(--primary-dark);
    }

    svg,
    svg > path {
      fill: var(--primary-dark);
    }
  }
`;
