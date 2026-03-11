import { isNull } from "@ubloimmo/front-util";
import { useCallback } from "react";

import { Text } from "../Text";
import styles from "./EnergyScoreComboBox.module.scss";
import { useEnergyScoreComboBoxStyles } from "./EnergyScoreComboBox.styles";

import { useLogger, useMergedProps, useTestId } from "@utils";

import type {
  EnergyScoreComboBoxDefaultProps,
  EnergyScoreComboBoxProps,
} from "./EnergyScoreComboBox.types";
import type { EnergyLabelValue } from "../EnergyLabel/EnergyLabel.types";
import type { TestIdProps } from "@types";

const ENERGY_LABEL_VALUES: EnergyLabelValue[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
];

const defaultEnergyScoreComboBoxProps: EnergyScoreComboBoxDefaultProps = {
  type: "DPE",
  value: null,
  onChange: null,
  readOnly: false,
  error: false,
};

/**
 * An interactive selector for energy scores (DPE or GES).
 * Renders a row of clickable A–G options; the selected one is highlighted.
 *
 * @version 0.1.0
 *
 * @param {EnergyScoreComboBoxProps & TestIdProps} props
 * @returns {JSX.Element}
 */
const EnergyScoreComboBox = (
  props: EnergyScoreComboBoxProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("EnergyScoreComboBox");
  const mergedProps = useMergedProps(defaultEnergyScoreComboBoxProps, props);
  const testId = useTestId("energy-score-combo-box", props);
  const { type, value, onChange, readOnly, error } = mergedProps;

  if (!props.type) warn("Missing required type prop");

  const { container, getOptionClass, getOptionStyle } =
    useEnergyScoreComboBoxStyles(mergedProps);

  const handleSelect = useCallback(
    (optionValue: EnergyLabelValue) => {
      if (isNull(onChange)) return;
      onChange(optionValue);
    },
    [onChange]
  );

  const isEmpty = readOnly && isNull(value) && !error;
  const isViewOnly = readOnly && !isNull(value);

  return (
    <div
      className={container}
      data-testid={testId}
      role="group"
      aria-label={`${type} energy score selector`}
    >
      {isEmpty ? (
        <div className={styles["energy-score-empty"]} aria-hidden="true">
          <Text weight="bold" align="center" color="gray-600">
            -
          </Text>
        </div>
      ) : isViewOnly ? (
        <div
          className={getOptionClass(value)}
          aria-label={`${type} ${value}`}
          style={getOptionStyle(value)}
        >
          <Text
            weight="bold"
            align="center"
            className={styles["energy-score-option-label"]}
          >
            {value}
          </Text>
        </div>
      ) : (
        ENERGY_LABEL_VALUES.map((optionValue) => (
          <button
            key={optionValue}
            type="button"
            className={getOptionClass(optionValue)}
            style={getOptionStyle(optionValue)}
            onClick={() => handleSelect(optionValue)}
            aria-pressed={value === optionValue}
            aria-label={`${type} ${optionValue}`}
          >
            <Text
              weight="bold"
              align="center"
              className={styles["energy-score-option-label"]}
            >
              {optionValue}
            </Text>
          </button>
        ))
      )}
    </div>
  );
};

EnergyScoreComboBox.__DEFAULT_PROPS = defaultEnergyScoreComboBoxProps;
export { EnergyScoreComboBox };
