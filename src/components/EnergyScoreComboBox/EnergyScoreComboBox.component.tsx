import { isNull } from "@ubloimmo/front-util";
import { useCallback } from "react";

import { EnergyLabel } from "../EnergyLabel";
import styles from "./EnergyScoreComboBox.module.scss";
import { useEnergyScoreComboBoxStyles } from "./EnergyScoreComboBox.styles";
import {
  ENERGY_LABEL_VALUES,
  type EnergyLabelValue,
} from "../EnergyLabel/EnergyLabel.types";
import { Text } from "../Text";

import { useMergedProps, useTestId } from "@utils";

import type {
  EnergyScoreComboBoxDefaultProps,
  EnergyScoreComboBoxProps,
} from "./EnergyScoreComboBox.types";
import type { TestIdProps } from "@types";

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
  const mergedProps = useMergedProps(defaultEnergyScoreComboBoxProps, props);
  const testId = useTestId("energy-score-combo-box", props);
  const { type, value, onChange, readOnly } = mergedProps;

  const { container, getOptionClass, getOptionStyle } =
    useEnergyScoreComboBoxStyles(mergedProps);

  const handleSelect = useCallback(
    (optionValue: EnergyLabelValue) => {
      if (isNull(onChange)) return;
      onChange(optionValue);
    },
    [onChange]
  );

  const isEmpty = readOnly && isNull(value);
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
          <EnergyLabel type={type} value={value} state="active" />
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
            <EnergyLabel
              type={type}
              value={optionValue}
              state={value === optionValue ? "active" : "inactive"}
            />
          </button>
        ))
      )}
    </div>
  );
};

EnergyScoreComboBox.__DEFAULT_PROPS = defaultEnergyScoreComboBoxProps;
export { EnergyScoreComboBox };
