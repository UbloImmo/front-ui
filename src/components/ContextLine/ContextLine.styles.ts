import { css } from "styled-components";

export const contextLineStyles = () => {
  return css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    width: 100%;

    padding: var(--s-3) 0;
    box-shadow: var(--border-bottom);

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      box-shadow: none;
    }
  `;
};
