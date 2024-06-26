import { css } from "styled-components";

export const avatarStyles = css`
  border-radius: var(--s-4);
  overflow: hidden;
  width: 28px;
  height: 28px;
  background-color: var(--primary-light);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
