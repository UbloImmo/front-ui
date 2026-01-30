import { Nullish } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { useInputClassName } from "../Input.styles";
import styles from "./SelectInput.module.scss";

import { cssClasses, useCssClasses } from "@utils";

import type { CommonInputStyleProps } from "../Input.types";

export function useSelectInputClassName({
  $table,
}: Pick<CommonInputStyleProps, "$table">) {
  return useCssClasses(styles["select-input"], [styles.table, $table]);
}

export function useSelectInputButtonClassName(props: CommonInputStyleProps) {
  const inputClassName = useSelectInputClassName(props);
  return useInputClassName({ ...props, className: inputClassName });
}

export function useSelectInputSelectedOptionClassName({
  $table,
}: Pick<CommonInputStyleProps, "$table">) {
  return useCssClasses(styles["select-input-selected-option"], [
    styles.table,
    $table,
  ]);
}
export function useSelectInputSelectedCustomOptionClassName({
  $table,
}: Pick<CommonInputStyleProps, "$table">) {
  return useCssClasses(styles["select-input-selected-custom-option"], [
    styles.table,
    $table,
  ]);
}

export function useSelectInputClearButtonClassName() {
  return useCssClasses(styles["select-input-clear-button"]);
}
export function useSelectInputOptionListClassNames() {
  const list = useCssClasses(styles["select-input-option-list"]);
  const assistive = useCssClasses(
    styles["select-input-option-list-assistive-text-wrapper"]
  );

  return {
    list,
    assistive,
  };
}

export function useSelectInputWrapperClassName({
  $table,
}: Pick<CommonInputStyleProps, "$table">) {
  return useCssClasses(styles["select-input-wrapper"], [styles.table, $table]);
}

export function useSelectInputContainerClassName({
  $table,
}: Pick<CommonInputStyleProps, "$table">) {
  return useCssClasses(styles["select-input-container"], [
    styles.table,
    $table,
  ]);
}

export function useSelectInputOptionClassNames(active: Nullish<boolean>) {
  return useMemo(
    () => ({
      option: cssClasses(styles["select-input-option"]),
      custom: cssClasses(styles["select-input-custom-option"]),
      value: cssClasses(styles["select-input-option-value"], [
        styles.active,
        active,
      ]),
      label: cssClasses(styles["select-input-option-label"]),
    }),
    [active]
  );
}

export function useSelectInputOptionGroupLabelClassName() {
  return useCssClasses(styles["select-input-option-group-label"]);
}
