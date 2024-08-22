import { css } from "styled-components";
import { ContextLineFirst } from "./ContextLine.types";

export const contextLineStyles = css<{ first?: ContextLineFirst }>`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  width: 100%;

  ${({ first }) => {
    switch (first) {
      case "first":
        return css`
          align-items: flex-start;
          height: var(--s-8);
          box-shadow: var(--border-bottom);
        `;
      case "default":
        return css`
          align-items: center;
          height: var(--s-11);
          box-shadow: var(--border-bottom);
        `;
      case "last":
        return css`
          align-items: flex-end;
          height: var(--s-8);
        `;
    }
  }}
`;
