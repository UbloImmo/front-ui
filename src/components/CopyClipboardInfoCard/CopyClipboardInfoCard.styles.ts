import { css, type RuleSet } from "styled-components";

import type { CopyClipboardInfoCardStyleProps } from "./CopyClipboardInfoCard.types";

export const copyClipboardInfoCardContainerStyles = ({
  $isEmpty,
}: CopyClipboardInfoCardStyleProps): RuleSet => css`
  min-height: var(--s-10);
  padding: var(--s-2) var(--s-3);
  background: var(--gray-50);
  border-radius: var(--s-1);
  border: 1px solid var(--primary-medium-00);
  position: relative;
  transition: border-color 300ms ease-out 0s;
  padding-right: var(--s-8);

  ${!$isEmpty &&
  css`
    &:hover {
      border-color: var(--primary-medium);
      transition-duration: 150ms;

      // target copy icon
      div[data-testid="copy-clipboard-info-card-icon-container"] {
        transition-duration: 150ms;
        pointer-events: all;
        opacity: 1;
        cursor: pointer;
      }
    }
  `}
`;

export const copyClipboardInfoCardIconContainerStyles = (): RuleSet => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--s-3);
  opacity: 0;
  transition: opacity 300ms ease-out 0s;
  pointer-events: none;
  height: var(--s-4);
  width: var(--s-4);

  &:hover svg[data-testid="icon"] {
    fill: var(--primary-dark);
  }
`;

export const copyClipboardInfoCardLinkStyles = (): RuleSet => css`
  text-decoration: none;
  color: inherit;
  text-align: center;
  font-size: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  max-width: 100%;
  width: max-content;
  cursor: pointer;

  span:has(&) {
    transition: color 300ms ease-out 0s, text-decoration-color 300ms ease-out 0s;

    &:has(a:hover) {
      transition-duration: 150ms;
      color: var(--primary-base);
      text-decoration-color: var(--primary-medium);
    }
  }
`;
