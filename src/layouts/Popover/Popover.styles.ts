import { isNumber, transformObject } from "@ubloimmo/front-util";
import { css, keyframes } from "styled-components";

import { cssPx } from "@utils";

import type {
  PopoverContentStyleProps,
  PopoverTriggerStyleProps,
} from "./Popover.types";
import type { RuleSet } from "styled-components";

export const popoverTriggerStyles = (): RuleSet => {
  return css`
    background: none;
    border: none;
    border-radius: unset;
    padding: 0;
    margin: 0;
  `;
};

export const popoverInnerTriggerStyles = ({
  $fill,
  $fillHeight,
}: PopoverTriggerStyleProps): RuleSet => {
  return css`
    width: fit-content;
    height: fit-content;
    ${$fill &&
    css`
      width: 100%;
    `}

    ${$fillHeight &&
    css`
      min-height: 100%;
      height: inherit;
    `}
  `;
};

const scaleIn = keyframes`
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
`;

export const popoverContentStyles = ({
  $fitTriggerWidth,
  $allowContentWidthOverride,
  $anchorOffset,
}: PopoverContentStyleProps): RuleSet => {
  const cssOffset = transformObject(
    $anchorOffset ?? { x: null, y: null },
    (px) => (isNumber(px) ? cssPx(px) : ("unset" as const))
  );
  return css`
    --popover-trigger-left: ${cssOffset.x};
    --popover-trigger-top: ${cssOffset.y};
    width: fit-content;
    height: fit-content;
    &:focus {
      outline: none;
    }

    &,
    & > *:first-child {
      z-index: 10;
    }

    transform-origin: var(--radix-popover-content-transform-origin);
    animation: ${scaleIn} 300ms var(--bezier);

    ${$fitTriggerWidth &&
    $allowContentWidthOverride &&
    css`
      & > *:first-child {
        min-width: var(--radix-popover-trigger-width);
        width: fit-content;
        max-width: calc(100vw - var(--popover-trigger-left) - var(--s-3));
      }
    `}

    ${$fitTriggerWidth &&
    !$allowContentWidthOverride &&
    css`
      & > *:first-child {
        min-width: var(--radix-popover-trigger-width);
        width: var(--radix-popover-trigger-width);
        max-width: var(--radix-popover-trigger-width);
      }
    `};
  `;
};

export const popoverContentWrapperStyles = (): RuleSet => {
  return css`
    background: var(--white);
    padding: var(--s-3) var(--s-4);
    border-radius: var(--s-2);
    box-shadow: var(--shadow-card-elevation-medium);
    width: fit-content;
    z-index: 1;
  `;
};
