import { css } from "styled-components";

export const hypertextStyle = css`
  display: inline;
  width: min-content;
  min-width: min-content;
  cursor: pointer;
  text-decoration: none;

  &,
  & > span[data-testid="text"] {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  & > span[data-testid="text"] {
    text-decoration-color: var(--primary-base-00);
    display: inherit;
    transition: color 300ms var(--bezier),
      text-decoration-color 300ms var(--bezier);
  }

  & > span,
  & > svg,
  & > svg > path {
    transition-duration: 300ms;
    transition-property: color, fill;
    transition-timing-function: var(--bezier);
  }

  & > svg[data-testid="icon"]:last-child {
    margin-left: var(--s-1);
    display: inline-block;
  }

  &:hover {
    & > span[data-testid="text"],
    & > svg[data-testid="icon"]:last-child,
    & > svg[data-testid="icon"]:last-child > path {
      transition-duration: 150ms;
    }

    & > span[data-testid="text"] {
      color: var(--primary-dark);
      text-decoration-color: var(--primary-base);
    }

    & > svg[data-testid="icon"]:last-child,
    & > svg[data-testid="icon"]:last-child > path {
      fill: var(--primary-dark);
    }
  }
`;
