import { css, keyframes, type StyleFunction } from "styled-components";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssVarUsage } from "@utils";

import type { LoadingAnimationProps } from "../../Loading.types";
import type { StyleProps } from "@types";

const cssAnim = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
`;

export const spinnerStyle: StyleFunction<StyleProps<LoadingAnimationProps>> = ({
  $size,
  $color,
}) => {
  const size = parseFixedLength($size);
  return css`
    width: ${size};
    min-width: ${size};
    max-width: ${size};
    height: ${size};
    min-height: ${size};
    max-height: ${size};
    display: inline-block;
    position: relative;
    background: none;
    cursor: progress;
    border-radius: 50%;

    &::after,
    &:before {
      content: "";
      position: absolute;
      inset: 0;
      box-sizing: border-box;
      border-radius: 50%;
      background: ${cssVarUsage($color)};
      opacity: 0;
      animation: ${cssAnim} 1800ms ease-in-out infinite running;
    }
    &:after {
      animation-duration: 900ms;
      animation-delay: 900ms;
    }
  `;
};
