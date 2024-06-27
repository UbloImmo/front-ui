import styled, { RuleSet, css } from "styled-components";
import {
  ComboBoxButtonContainerStyleProps,
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";
import { StyleProps } from "@types";
import { cssVarUsage } from "@utils";

export const ComboBoxButtonStyles = ({
  $active,
}: StyleProps<ComboBoxButtonDefaultProps>): RuleSet => {
  return css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--s-2);
    cursor: pointer;
    background-color: ${$active ? cssVarUsage("primary-light") : "white"};
    padding: var(--s-2) var(--s-4);
    border-radius: var(--s-1);
    border: 1px solid var(--primary-medium);

    &:disabled {
      background-color: var(--gray-50);
      border-color: var(--gray-300);
    }
  `;
};

export const ComboBoxIconContainerStyle = ({
  $active,
}: ComboButtonIconContainerStyleProps) => {
  return css`
    position: relative;
    height: var(--s-4);
    min-height: var(--s-4);
    max-height: var(--s-4);
    width: var(--s-4);
    min-width: var(--s-4);
    max-width: var(--s-4);

    & > svg[data-testid="icon"] {
      position: absolute;
      inset: 0;

      &:first-child {
        opacity: ${$active ? 1 : 0};
      }

      &:last-child {
        opacity: ${$active ? 0 : 1};
      }
    }
  `;
};

export const ComboBoxIconContainer = styled.div<ComboButtonIconContainerStyleProps>`
  ${ComboBoxIconContainerStyle}
`;
