import styles from "./BouncingBalls.module.scss";

import { useCssClasses } from "@utils";

import type { Nullish } from "@ubloimmo/front-util";

export function useBouncingBallsClassName(className: Nullish<string>) {
  return useCssClasses(styles["bouncing-balls"], className);
}
