import { EpcTagType } from "./EnergyScoreInput.utils";

import type { CommonInputStyleProps, InputProps } from "../Input.types";
import type { StyleProps } from "@types";

export type EnergyScoreInputProps = InputProps<"energy-score"> & {
  /**
   * The type of energy score to display.
   *
   * @default "energy"
   */
  type: "energy" | "climate";
  /**
   * The function to call when the label changes.
   */
  onLabelChange?: (label: EpcTagType | null) => void;
  /**
   * The minimum value of the energy score.
   *
   * @default 0
   */
  min?: number;
  /**
   * The maximum value of the energy score.
   *
   * @default 999
   */
  max?: number;
};

export type DefaultEnergyScoreInputProps = Required<EnergyScoreInputProps>;

export type EnergyScoreInputStyleProps = CommonInputStyleProps &
  StyleProps<Pick<EnergyScoreInputProps, "type">>;
