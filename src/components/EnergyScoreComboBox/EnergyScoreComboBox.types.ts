import type {
  EnergyLabelType,
  EnergyLabelValue,
} from "../EnergyLabel/EnergyLabel.types";
import type { Nullable } from "@ubloimmo/front-util";

export type EnergyScoreComboBoxProps = {
  /**
   * The type of energy label (DPE or GES)
   *
   * @required
   * @type {EnergyLabelType}
   */
  type: EnergyLabelType;

  /**
   * The currently selected value (A–G)
   *
   * @type {Nullable<EnergyLabelValue>}
   * @default null
   */
  value?: Nullable<EnergyLabelValue>;

  /**
   * Callback fired when the user selects a value
   *
   * @type {Nullable<(value: EnergyLabelValue) => void>}
   * @default null
   */
  onChange?: Nullable<(value: EnergyLabelValue) => void>;

  /**
   * Whether the selector is read-only. When true, only the selected value
   * (or the empty badge) is displayed — no interaction is possible.
   *
   * @type {boolean}
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether the selector is in an error state
   *
   * @type {boolean}
   * @default false
   */
  error?: boolean;
};

export type EnergyScoreComboBoxDefaultProps =
  Required<EnergyScoreComboBoxProps>;
