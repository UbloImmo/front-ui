import { useCallback } from "react";

import styles from "./EnergyScoreComboBox.module.scss";
import { getEnergyLabelBackgroundColor } from "../EnergyLabel/EnergyLabel.colors";

import { useCssClasses } from "@utils";

import type { EnergyScoreComboBoxDefaultProps } from "./EnergyScoreComboBox.types";
import type { EnergyLabelValue } from "../EnergyLabel/EnergyLabel.types";
import type { CSSProperties } from "react";

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
      return [styles["energy-score-option"], isActive ? styles.active : null]
        .filter(Boolean)
        .join(" ");
    },
    [value]
  );

  const getOptionStyle = useCallback(
    (optionValue: EnergyLabelValue): CSSProperties | undefined => {
      if (value !== optionValue) return undefined;

      const backgroundColor = getEnergyLabelBackgroundColor(type, optionValue);

      if (!backgroundColor) return undefined;

      return { "--option-background": backgroundColor } as CSSProperties;
    },
    [type, value]
  );

  return { container, getOptionClass, getOptionStyle };
}
