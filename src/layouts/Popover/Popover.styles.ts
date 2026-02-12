import { isNumber, Nullable, transformObject } from "@ubloimmo/front-util";
import { useMemo } from "react";

import styles from "./Popover.module.scss";

import {
  cssClasses,
  cssPx,
  cssStyles,
  cssVariables,
  useCssClasses,
} from "@utils";

import type { PopoverDefaultProps } from "./Popover.types";
import type { Vec2 } from "@types";

export function usePopoverLayoutStyles(
  props: PopoverDefaultProps,
  offset: Nullable<Vec2>
) {
  const popoverContent = useMemo(() => {
    const className = cssClasses(
      styles["popover-content"],
      [styles["fit-trigger-width"], props.fitTriggerWidth],
      [styles["override-content-width"], props.allowContentWidthOverride]
    );
    const cssOffset = transformObject(offset ?? { x: null, y: null }, (px) =>
      isNumber(px) ? cssPx(px) : ("unset" as const)
    );
    const style = cssStyles(
      cssVariables({
        "popover-trigger-left": cssOffset.x,
        "popover-trigger-top": cssOffset.y,
      })
    );

    return { className, style };
  }, [offset, props.allowContentWidthOverride, props.fitTriggerWidth]);

  const popoverTrigger = useCssClasses(styles["popover-trigger"]);
  const popoverTriggerInner = useCssClasses(
    styles["popover-trigger-inner"],
    [styles.fill, props.fill],
    [styles["fill-height"], props.fillHeight]
  );
  const popoverContentWrapper = useCssClasses(
    styles["popover-content-wrapper"]
  );

  return {
    popoverContent,
    popoverContentWrapper,
    popoverTrigger,
    popoverTriggerInner,
  };
}
