import { useCallback } from "react";

import styles from "./EnergyScoreComboBox.module.scss";

import { useCssClasses } from "@utils";

import type { EnergyScoreComboBoxDefaultProps } from "./EnergyScoreComboBox.types";
import type { EnergyLabelValue } from "../EnergyLabel/EnergyLabel.types";

export function useEnergyScoreComboBoxStyles(
  props: EnergyScoreComboBoxDefaultProps
) {
  const { error, type, value } = props;

  const container = useCssClasses(styles["energy-score-combo-box"], [
    styles.error,
    error,
  ]);

  const getOptionClass = useCallback(
    (optionValue: EnergyLabelValue): string => {
      const isActive = value === optionValue;
      return [
        styles["energy-score-option"],
        styles[type],
        styles[optionValue],
        isActive ? styles.active : null,
      ]
        .filter(Boolean)
        .join(" ");
    },
    [type, value]
  );

  return { container, getOptionClass };
}
