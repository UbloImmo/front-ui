import { Nullish } from "@ubloimmo/front-util";

import styles from "./SumLine.module.scss";

import { useCssClasses } from "@utils";

import type { SumLineSize } from "./SumLine.types";

export function useSumLineClassNames(
  size: SumLineSize,
  className: Nullish<string>
) {
  const container = useCssClasses(
    styles["sum-line"],
    styles[`size-${size}`],
    className
  );

  const heading = useCssClasses(styles["sum-line-heading"]);

  return { container, heading };
}
