import { css } from "styled-components";

export const accountBalanceStyle = () => {
  return css`
    max-width: 356px;
    width: 100%;
    height: var(--s-10);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: var(--s-1);
    border: 1px solid var(--gray-100);
    padding: var(--s-2) var(--s-4) var(--s-2) var(--s-4);
  `;
};
