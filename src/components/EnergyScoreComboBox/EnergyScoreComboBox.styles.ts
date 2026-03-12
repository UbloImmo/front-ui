import { useCallback } from "react";

import styles from "./EnergyScoreComboBox.module.scss";
import { getEnergyLabelBackgroundColor } from "../EnergyLabel/EnergyLabel.colors";

import { cssClasses, cssVariables, useCssClasses } from "@utils";

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
      return (
        cssClasses(styles["energy-score-option"], [styles.active, isActive]) ??
        ""
      );
    },
    [value]
  );

  const getOptionStyle = useCallback(
    (optionValue: EnergyLabelValue): CSSProperties | undefined => {
      const isActive = value === optionValue;

      if (!isActive) {
        return cssVariables({
          "energy-label-background": "var(--white)",
          "energy-label-border": "var(--primary-medium)",
          "energy-label-foreground": "var(--gray-800)",
        });
      }

      const backgroundColor = getEnergyLabelBackgroundColor(type, optionValue);

      if (!backgroundColor) return undefined;

      return cssVariables({
        "energy-label-background": backgroundColor,
      });
    },
    [type, value]
  );

  return { container, getOptionClass, getOptionStyle };
}
