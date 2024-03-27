import { css, keyframes } from "styled-components";

const cssAnim = (range: number, offset = 0) => keyframes`
  from {
    transform: translateY(calc(${offset}%));
  }
  to {
    transform: translateY(calc(${range}%));
  }
`;

const RANGE = 40;
const OFFSET = 0;

export const bouncingBallsStyle = css`
  display: block;
  background: none;
  border: none;
  cursor: progress;
  transition: fill 300ms ease-out 0s;

  g {
    transform: translateY(-20%);
  }

  circle {
    transform: translateY(${OFFSET}%);
    animation-name: ${cssAnim(RANGE - OFFSET, OFFSET)};
    animation-duration: 600ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
  }

  circle {
    &:nth-child(1) {
      animation-delay: 0ms;
    }
    &:nth-child(2) {
      animation-delay: 150ms;
    }
    &:nth-child(3) {
      animation-delay: 300ms;
    }
  }
`;
