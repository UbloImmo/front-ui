import { useInputClassName, useInputContainerClassName } from "../Input.styles";
import styles from "./MultiSelectInput.module.scss";
import {
  useSelectInputContainerClassName,
  useSelectInputWrapperClassName,
} from "../SelectInput/SelectInput.styles";

import { useCssClasses } from "@utils";

import type { CommonInputStyleProps } from "../Input.types";

export function useMultiSelectWrapperClassName(props: CommonInputStyleProps) {
  const base = useSelectInputWrapperClassName(props);
  return useCssClasses(base, styles["multi-select-input-wrapper"]);
}

export function useMultiSelectInputElementClassName(
  props: CommonInputStyleProps
) {
  const base = useInputClassName(props);
  return useCssClasses(base, styles["multi-select-input-element"], [
    styles.table,
    props.$table,
  ]);
}

export function useMultiSelectInputContainerClassName(
  props: CommonInputStyleProps
) {
  const base = useInputContainerClassName(props);
  const select = useSelectInputContainerClassName(props);
  return useCssClasses(base, select);
}
