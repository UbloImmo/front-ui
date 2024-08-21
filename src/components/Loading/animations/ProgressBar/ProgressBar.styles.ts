import { StyleFunction, css, keyframes } from "styled-components";

import { parseFixedLength } from "@/sizes/size.utils";
import { StyleProps } from "@types";
import { cssRem, cssVarUsage, extractRem } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";

const cssAnim = keyframes`
  0% {
    left: 0;
    transform: translateX(-100%);
  }
  15% {
    width: 10%;
  }
  50% {
    width: 60%;
  }
  100% {
    width: 10%;
    left: 100%;
    transform: translateX(0%);
  }
`;

export const ProgressBarStyle: StyleFunction<
  StyleProps<LoadingAnimationProps>
> = ({ $size, $color }) => {
  const size = parseFixedLength($size);
  const sizeRem = extractRem(size);
  return css`
    width: ${size};
    min-width: ${cssRem(Math.max(sizeRem, 1))};
    border-radius: var(--s-2);
    height: var(--s-1);
    position: relative;
    background: white;
    overflow: hidden;
    cursor: progress;

    &:before {
      content: "";
      position: absolute;
      inset: 0;
      background: ${`var(--${$color}-20)`};
    }

    &:after {
      content: "";
      height: var(--s-1);
      background: ${cssVarUsage($color)};
      border-radius: var(--s-2);
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      animation: ${cssAnim} 1400ms cubic-bezier(0.6, 0, 0.22, 1) infinite
        running;
    }
  `;
};
