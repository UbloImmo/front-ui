import styles from "./ComponentList.module.scss";

import { useCssClasses } from "@utils";

export function useComponentListClassName() {
  return useCssClasses(styles["component-list"]);
}
