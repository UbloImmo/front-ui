import { Nullish } from "@ubloimmo/front-util";

import styles from "./ListSideHeader.module.scss";

import { cssClasses, useStatic } from "@utils";

export function useListSideHeaderClassNames(className: Nullish<string>) {
  return useStatic(() => ({
    container: cssClasses(styles["list-side-header"], className),
    titleContainer: cssClasses(styles["list-side-header-title-container"]),
  }));
}
