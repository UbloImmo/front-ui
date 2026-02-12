import { useMemo } from "react";

import styles from "./Checkbox.module.scss";
import { CheckboxDefaultProps } from "./Checkbox.types";

import { useStatic } from "@utils";

export function useCheckboxStyle(props: CheckboxDefaultProps) {
  const classNames = useStatic({
    checkbox: styles.checkbox,
    iconContainer: styles["checkbox-icon-container"],
  });

  const attrs = useMemo(
    () => ({
      "data-active":
        props.active === true
          ? "true"
          : props.active === "mixed"
            ? "mixed"
            : "false",
    }),
    [props.active]
  );

  return {
    classNames,
    attrs,
  };
}
