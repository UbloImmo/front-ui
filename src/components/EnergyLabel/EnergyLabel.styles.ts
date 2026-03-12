import { isNull } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { getEnergyLabelBackgroundColor } from "./EnergyLabel.colors";
import styles from "./EnergyLabel.module.scss";
import { EnergyLabelDefaultProps } from "./EnergyLabel.types";

import { cssVariables, useCssClasses } from "@utils";

import type { CSSProperties } from "react";

export function useEnergyLabelStyles(props: EnergyLabelDefaultProps) {
  const box = useCssClasses(styles["energy-label"], [
    styles.active,
    props.state === "active" && !isNull(props.value),
  ]);

  const label = useCssClasses(styles["energy-label-value"]);

  const style = useMemo<CSSProperties | undefined>(() => {
    const backgroundColor =
      props.state === "active"
        ? getEnergyLabelBackgroundColor(props.type, props.value)
        : null;

    if (!backgroundColor) return undefined;

    return cssVariables({
      "label-background": backgroundColor,
    });
  }, [props.state, props.type, props.value]);

  return useMemo(
    () => ({ classNames: { box, label }, style }),
    [box, label, style]
  );
}
