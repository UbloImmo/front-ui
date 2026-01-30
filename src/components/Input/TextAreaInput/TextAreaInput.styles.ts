import { Nullish } from "@ubloimmo/front-util";

import { useInputClassName } from "../Input.styles";
import styles from "./TextAreaInput.module.scss";
import { CommonInputStyleProps } from "../Input.types";

import { useCssClasses } from "@utils";

export function useTextAreaInputClassName(
  props: CommonInputStyleProps,
  resize: Nullish<boolean>
) {
  const base = useInputClassName(props);
  return useCssClasses(base, styles["textarea-input"], [styles.resize, resize]);
}
