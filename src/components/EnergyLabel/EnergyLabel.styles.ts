import { isNull } from "@ubloimmo/front-util";
import { useMemo } from "react";

import styles from "./EnergyLabel.module.scss";
import { EnergyLabelDefaultProps } from "./EnergyLabel.types";

import { useCssClasses } from "@utils";

export function useEnergyLabelStyles(props: EnergyLabelDefaultProps) {
  const box = useCssClasses(
    styles["energy-label"],
    styles[props.type],
    styles[props.value ?? "A"],
    [styles.active, props.state === "active" && !isNull(props.value)]
  );

  const label = useCssClasses(styles["energy-label-value"]);

  return useMemo(() => ({ classNames: { box, label } }), [box, label]);
}
