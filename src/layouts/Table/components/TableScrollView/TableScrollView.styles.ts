import { css, type RuleSet } from "styled-components";

export const tableScrollViewStyles = (): RuleSet => {
  return css`
    display: block;
    overflow-x: auto;
    width: 100%;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  `;
};
