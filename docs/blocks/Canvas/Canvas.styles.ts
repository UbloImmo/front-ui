import styles from "./Canvas.block.module.scss";
import { CanvasBlockProps } from "./Canvas.types";

import { useCssClasses } from "@utils";

export function useCanvasClassName(props: CanvasBlockProps) {
  return useCssClasses(
    styles.canvas,
    [styles.horizontal, props.horizontal],
    [styles["in-header"], props.inHeader],
    [styles["overflow-hidden"], props.overflowHidden],
    [styles["fill-width"], props.fillWidth]
  );
}
