import { css, type RuleSet } from "styled-components";

export const iconPickerContainerStyles = (): RuleSet => css`
  overflow-x: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;
