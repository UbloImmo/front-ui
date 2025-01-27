import { css, type RuleSet } from "styled-components";

import { fontFamilySets } from "@/typography";

import type { ComponentCardContainerProps } from "./ComponentCard.types";

export const componentCardStyle = ({
  $size,
}: ComponentCardContainerProps): RuleSet => {
  return css`
    --cell-size: var(--cell-size-${$size});
    padding: var(--s-2);
    background: var(--primary-light-30);
    border-radius: var(--s-3);
    display: flex;
    flex-direction: column;
    gap: var(--s-3);
    grid-column-end: span var(--cell-size);
    grid-row-end: span var(--cell-size);
    height: 100%;
    border: 1px solid var(--primary-light-00);
    opacity: 1;
    transition:
      border-color 300ms ease-out 0s,
      background 300ms ease-out 0s,
      box-shadow 300ms ease-out 0s,
      opacity 150ms ease-in 0ms;

    &,
    & * {
      cursor: pointer;
    }

    &:hover {
      border-color: var(--primary-medium-40);
      background: var(--primary-light-60);
      transition-duration: 150ms;
      box-shadow: var(--shadow-card-elevation-medium);

      [data-testid="component-card-component-container"] {
        background: var(--gray-50-50);
        border-color: var(--primary-light);

        [data-testid="component-card-scale-container"] {
          transform: scale(1);
          transition: transform 600ms ease-in-out 0s;
        }

        & > [data-testid="badge"]:last-child {
          opacity: 1;
          transition-delay: 300ms;
        }
      }
    }
  `;
};

export const componentCardContainerStyle = (): RuleSet => {
  return css`
    background: white;
    padding: var(--s-10) var(--s-4);
    border-radius: var(--s-1);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 300ms ease-out 0s;
    overflow: hidden;
    border: 1px solid var(--primary-light-00);
    position: relative;

    & > * {
      transform: scale(0.95);
      transition: transform 300ms ease-out 0s;
    }

    & > [data-testid="badge"]:last-child {
      position: absolute;
      right: var(--s-1);
      bottom: var(--s-1);
      opacity: 0;
      transition: opacity 300ms ease-out 0s;
      pointer-events: none;
    }
  `;
};

export const componentCardScaleContainerStyle = (): RuleSet => {
  return css`
    transform: scale(0.95);
    transition: transform 300ms ease-out 0s;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
};

export const componentCardInfoContainerStyle = (): RuleSet => {
  return css`
    padding-bottom: var(--s-3);

    h3 {
      margin: 0;
    }

    [data-testid="badge"] {
      margin-top: var(--s-05);
      padding: 0 var(--s-1);
      max-height: var(--s-4);
      min-height: var(--s-4);
      height: var(--s-4);

      span {
        font-family: ${fontFamilySets.code};
        font-size: var(--text-s);
        font-weight: var(--text-weight-medium);
      }
    }
  `;
};
