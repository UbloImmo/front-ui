import styled, { css } from "styled-components";

import type { ParsedPropInfo } from "@docs/docs.types";
import type { StyleProps } from "@types";

export const TableRow = styled.tr<
  Partial<StyleProps<Pick<ParsedPropInfo, "todo" | "required">>>
>`
  ${({ $todo }) =>
    $todo
      ? css`
          & > td {
            opacity: 0.5;
            background: none;
          }
        `
      : css`
          &:hover td {
            background: var(--primary-light-50);
            transition-duration: 150ms;

            &:first-child {
              background: var(--primary-light);
            }
          }
        `}
  ${({ $required }) =>
    $required &&
    css`
      & > td {
        background: #fff;
      }
    `}

  background: none !important;
`;
