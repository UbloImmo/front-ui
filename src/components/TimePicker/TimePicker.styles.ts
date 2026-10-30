import styles from "./TimePicker.module.scss";

import { useCssClasses } from "@utils";

export function useTimePickerStyles() {
  const picker = useCssClasses(styles.picker);
  const column = useCssClasses(styles["picker-column"]);
  const separator = useCssClasses(styles["picker-separator"]);

  return { picker, column, separator };
}

export function useTimePickerItemClassName(selected: boolean) {
  return useCssClasses(styles["picker-item"], [styles.selected, selected]);
}

export function useTimePickerColumnClassNames() {
  const scroller = useCssClasses(styles["picker-scroller"]);
  const column = useCssClasses(styles["picker-column"]);

  return {
    column,
    scroller,
  };
}
