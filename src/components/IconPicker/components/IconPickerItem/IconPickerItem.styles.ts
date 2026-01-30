import styles from "../../IconPicker.module.scss";

import { useCssClasses } from "@utils";

import type { IconPickerItemDefaultProps } from "./IconPickerItem.types";

export function useIconPickerItemStyles({
  active,
  readonly,
}: Pick<IconPickerItemDefaultProps, "active" | "readonly">) {
  const className = useCssClasses(
    styles["icon-picker-item"],
    [styles.active, active],
    [styles.readonly, readonly]
  );

  return { className };
}
