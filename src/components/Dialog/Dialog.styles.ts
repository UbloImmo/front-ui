import { css, keyframes } from "styled-components";

const Z_INDEX = 1;
const INIT_SCALE = 0.8;

const overlayAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const contentAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(${INIT_SCALE});
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const dialogOverlayStyles = css`
  opacity: 0;
  animation: ${overlayAnimation} 200ms ease-out forwards;
  pointer-events: all;
  position: fixed;
  inset: 0;
  z-index: ${Z_INDEX};
  background: var(--gray-50-75);
  -webkit-backdrop-filter: blur(var(--s-2));
  backdrop-filter: blur(var(--s-2));
`;

export const dialogWrapperStyles = css`
  transform: scale(${INIT_SCALE});
  opacity: 0;
  animation: ${contentAnimation} 200ms ease-out forwards;
  pointer-events: none;
  position: fixed;
  padding: var(--s-8) var(--s-4);
  inset: 0;
  z-index: ${Z_INDEX};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
`;

export const dialogContentStyles = css`
  min-height: 100%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
