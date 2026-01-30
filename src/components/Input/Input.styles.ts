import styles from "./Input.module.scss";

import { useCssClasses } from "@utils";

import type {
  CommonInputStyleProps,
  InputControlAnchorProps,
  InputControlStyleProps,
} from "./Input.types";
import type { ClassNameOverrideProps } from "@types";

export function useInputContainerClassName({
  $error,
  $disabled,
  $table,
  className,
}: CommonInputStyleProps & ClassNameOverrideProps) {
  return useCssClasses(
    styles["input-container"],
    [styles.error, $error],
    [styles.disabled, $disabled],
    [styles.table, $table],
    className
  );
}

export function useInputControlGroupClassName({
  $anchor = "right",
  $noFocus,
  className,
}: InputControlAnchorProps & ClassNameOverrideProps) {
  return useCssClasses(
    styles["input-control-group"],
    styles[`anchor-${$anchor}`],
    [styles["no-focus"], $noFocus],
    className
  );
}

export function useInputControlClassName({
  $anchor = "right",
  onClick,
  $disabled,
  className,
}: InputControlStyleProps & ClassNameOverrideProps) {
  return useCssClasses(
    styles["input-control"],
    styles[`anchor-${$anchor}`],
    [styles.clickable, !!onClick],
    [styles.disabled, $disabled],
    className
  );
}

export function useInputGroupedControlClassName({
  $anchor = "right",
  onClick,
  $disabled,
  className,
}: InputControlStyleProps & ClassNameOverrideProps) {
  return useCssClasses(
    styles["input-grouped-control"],
    styles[`anchor-${$anchor}`],
    [styles.clickable, !!onClick],
    [styles.disabled, $disabled],
    className
  );
}

export function useInputClassName({
  $error,
  $table,
  $disabled,
  className,
}: CommonInputStyleProps & ClassNameOverrideProps) {
  return useCssClasses(
    styles.input,
    [styles.error, $error],
    [styles.table, $table],
    [styles.disabled, $disabled],
    className
  );
}
