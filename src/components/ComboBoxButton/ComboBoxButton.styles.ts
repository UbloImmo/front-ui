import { useMemo } from "react";

import styles from "./ComboboxButton.module.scss";

import { cssClasses, isNonEmptyString } from "@utils";

import type { ComboBoxButtonDefaultProps } from "./ComboBoxButton.types";
import type { IconName } from "../Icon";

export function useComboBoxButtonStyles({
  active,
  description,
  fill,
  multi,
}: ComboBoxButtonDefaultProps) {
  const classNames = useMemo(
    () => ({
      wrapper: cssClasses(
        styles["combobox-button-wrapper"],
        [styles.active, active],
        [styles["has-description"], isNonEmptyString(description)],
        [styles.fill, fill]
      ),
      button: styles["combobox-button"],
      content: styles["combobox-button-content"],
      icons: styles["combobox-button-icons"],
      label: styles["combobox-button-label"],
      trigger: styles["combobox-button-menu-trigger"],
    }),
    [active, description, fill]
  );

  const icons = useMemo<Record<"active" | "inactive", IconName>>(() => {
    if (multi)
      return {
        active: "CheckSquareFill",
        inactive: "Square",
      };
    return {
      active: "CheckCircleFill",
      inactive: "Circle",
    };
  }, [multi]);

  return { classNames, icons };
}
