import { css } from "styled-components";

// import { AccountBalanceProps } from "./AccountBalance.types";

// import { StyleProps } from "@types";

// export const accountBalanceStyle = (props: StyleProps<AccountBalanceProps>) => {
export const accountBalanceStyle = () => {
  return css`
    width: 356px;
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
