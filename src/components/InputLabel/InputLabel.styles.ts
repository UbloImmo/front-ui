import { useMemo } from "react";

import styles from "./InputLabel.module.scss";

import { cssClasses, useCssClasses } from "@utils";

import type { Nullish } from "@ubloimmo/front-util";

export function getInputLabelTextClassName(required: Nullish<boolean>) {
  return cssClasses(styles["input-label-text"], [styles.required, required]);
}

export function useInputLabelClassNames(
  required: Nullish<boolean>,
  className: Nullish<string>
) {
  const label = useCssClasses(styles["input-label"], className);
  const text = useMemo(() => getInputLabelTextClassName(required), [required]);

  return { label, text };
}
