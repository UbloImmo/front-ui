import { css } from "styled-components";

import styles from "./Modal.module.scss";

import { useCssClasses } from "@utils";

import type { ModalSize } from "./Modal.types";

export const modalButtonStyles = () => css`
  position: absolute;
  top: var(--s-6);
  right: var(--s-6);
`;

export function useModalClassNames(size: ModalSize) {
  const card = useCssClasses(styles["modal-card"], styles[`size-${size}`]);
  const button = useCssClasses(styles["modal-button"]);

  return {
    card,
    button,
  };
}
