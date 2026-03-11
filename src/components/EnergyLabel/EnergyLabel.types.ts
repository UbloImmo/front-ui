import { ENERGY_LABEL_VALUES } from "./EnergyLabel.utils";

import type { Enum, Nullable } from "@ubloimmo/front-util";

export type EnergyLabelType = "DPE" | "GES";

export type EnergyLabelValue = Enum<typeof ENERGY_LABEL_VALUES>;

export type EnergyLabelState = "active" | "inactive";

export type EnergyLabelProps = {
  /**
   * The type of the EnergyLabel (DPE or GES)
   *
   * @required
   * @type {EnergyLabelType}
   * @default null
   */
  type: EnergyLabelType;

  /**
   * The value of the EnergyLabel (A, B, C, D, E, F or G)
   *
   * @type {Nullable<EnergyLabelValue>}
   * @default null
   */
  value?: Nullable<EnergyLabelValue>;

  /**
   * The state of the EnergyLabel (active or inactive)
   *
   * @type {EnergyLabelState}
   * @default "inactive"
   */
  state?: EnergyLabelState;
};

export type EnergyLabelDefaultProps = Required<EnergyLabelProps>;
