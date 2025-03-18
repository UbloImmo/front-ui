import type { InputProps, InputValue } from "../Input.types";
import type {
  EnergyLabelType,
  EnergyLabelValue,
} from "@/components/EnergyLabel";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

export type EnergyScoreInputOnLabelChangeFn = VoidFn<
  [label: Nullable<EnergyLabelValue>]
>;

export type EnergyScoreInputProps = InputProps<"energy-score"> & {
  /**
   * The type of energy score to display.
   *
   * @type {EnergyScoreType}
   * @required
   * @default "DPE"
   */
  scoreType?: EnergyLabelType;
  /**
   * The function to call when the label changes.
   *
   * @type {EnergyScoreInputOnLabelChangeFn}
   * @default null
   */
  onLabelChange?: Nullable<EnergyScoreInputOnLabelChangeFn>;
  /**
   * The minimum value of the energy score.
   *
   * @default 0
   */
  min?: InputValue<"energy-score">;
  /**
   * The maximum value of the energy score.
   *
   * @default 999
   */
  max?: InputValue<"energy-score">;
  /**
   * The unit of the energy score.
   *
   * @remarks
   * Only gets parsed and displayed within a Form in `read` mode.
   *
   * @type {Nullable<string>}
   * @default null
   */
  unit?: Nullable<string>;
};

export type DefaultEnergyScoreInputProps = Required<EnergyScoreInputProps>;
