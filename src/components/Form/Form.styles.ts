import { css, type RuleSet } from "styled-components";

import { modalSizeToWidthMap } from "../Modal/Modal.styles";

import { breakpointsPx } from "@/sizes";

import type {
  FormContainerStyleProps,
  FormDebugPreStyleProps,
  FormEditBannerStyleProps,
  FormEditButtonStyleProps,
} from "./Form.types";

export const formContainerStyles = ({
  $isEditing,
  $size,
  $asModal,
}: FormContainerStyleProps): RuleSet => {
  const asModalWidth = $size ? modalSizeToWidthMap[$size] : null;
  return css`
    background: white;
    box-shadow: var(--shadow-card-default);
    border-radius: var(--s-2);
    position: relative;
    height: fit-content;
    transition: height 150ms ease-out 0s;

    ${$asModal &&
    asModalWidth &&
    css`
      max-width: ${asModalWidth};
      width: ${asModalWidth};
      max-width: 100%;
    `}

    ${$isEditing &&
    css`
      box-shadow: var(--shadow-card-elevation-low);
    `}
  `;
};

export const formHeaderStyles = (): RuleSet => {
  return css`
    padding: var(--s-8);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 5.5rem;

    span[data-testid="heading form-title"],
    h3[data-testid="heading form-title"] {
      margin: 0 !important;
    }

    @media only screen and (max-width: ${breakpointsPx.XS}) {
      padding-right: var(--s-5);
    }
  `;
};

export const formEditButtonStyles = ({
  $hidden,
}: FormEditButtonStyleProps): RuleSet => {
  return css`
    scale: 1;
    transform-origin: center;
    opacity: 1;
    transition: color 300ms ease-out 0s, background-color 300ms ease-out 0s,
      border-color 300ms ease-out 0s, opacity 150ms ease-in 0s,
      scale 150ms ease-in 0s;

    ${$hidden &&
    css`
      opacity: 0;
      pointer-events: none;
      cursor: none;
      user-select: none;
      scale: 0;
    `}
  `;
};

export const formEditBannerStyles = ({
  $isEditing,
}: FormEditBannerStyleProps): RuleSet => {
  return css`
    background: var(--primary-light-30);
    padding: var(--s-4) var(--s-6);
    box-shadow: var(--shadow-card-default);
    border-bottom-right-radius: var(--s-2);
    border-bottom-left-radius: var(--s-2);
    height: auto;
    opacity: 1;
    overflow: hidden;
    transition: opacity 150ms ease-out 0s, height 150ms ease-out 0s,
      padding 300ms ease-out 0s;

    ${!$isEditing &&
    css`
      height: 0;
      max-height: 0;
      opacity: 0;
      padding: 0 var(--s-6);

      &,
      & * {
        pointer-events: none;
        user-select: none;
      }
    `}
  `;
};

export const formFieldListContainerStyles = ({
  $isLoading,
}: {
  $isLoading: boolean;
}): RuleSet => {
  return css`
    padding: 0 var(--s-8) var(--s-8);
    transition: opacity 300ms var(--bezier) 0s;
    opacity: 1;

    ${$isLoading &&
    css`
      opacity: 0;

      &,
      & * {
        cursor: wait;
      }
    `}
  `;
};

export const formDebugContainerStyles = (): RuleSet => {
  return css`
    padding: 0 var(--s-8);
  `;
};

export const formDebugPreStyles = ({
  $color,
}: FormDebugPreStyleProps): RuleSet => {
  return css`
    flex: 1;
    padding: var(--s-4);
    background: var(--${$color}-light-50);
    color: var(--${$color}-dark);
    border-radius: var(--s-1);
    display: flex;
    flex-direction: column;
    gap: var(--s-4);
    width: 100%;
    height: 100%;
    overflow: auto;

    div,
    pre {
      height: auto;
    }

    details {
      &[open] > summary {
        margin-bottom: var(--s-2);
      }
      summary {
        list-style-position: inside;
        user-select: none;
        cursor: pointer;

        [data-testid="heading"] {
          user-select: none;
          display: inline-block;
          padding-left: var(--s-1);
        }

        &::marker {
          color: var(--${$color}-medium);
          font-size: var(--text-s);
          list-style-position: inside;
          margin-top: calc(var(--s-1) * -1);
        }
      }

      & > div:not(:last-child) {
        margin-bottom: var(--s-2);
      }
    }

    span {
      color: inherit;

      code {
        background: none !important;
        border: none !important;
        padding: 0 !important;
        line-height: inherit;
      }
    }
  `;
};
