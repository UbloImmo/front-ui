import { css } from "styled-components";

import { cssPxToCssRem } from "@utils";

import type { ModalSize, ModalStyleProps } from "./Modal.types";
import type { CssPx } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const modalSizeToWidthMap: ValueMap<ModalSize, CssPx> = {
  s: "600px",
  m: "740px",
  l: "960px",
  xl: "1280px",
};

export const modalCardStyles = ({ $size }: ModalStyleProps) => {
  const width = cssPxToCssRem(modalSizeToWidthMap[$size]);
  return css`
    max-width: ${width};
    width: ${width};
    max-width: 100%;
    background: white;
    padding: var(--s-6);
    border-radius: var(--s-2);
    position: relative;
    box-shadow: var(--shadow-card-elevation-high);

    [data-testid="modal"]:has(&) {
      overflow: unset;
    }
  `;
};

export const modalButtonStyles = () => css`
  position: absolute;
  top: var(--s-6);
  right: var(--s-6);
`;
