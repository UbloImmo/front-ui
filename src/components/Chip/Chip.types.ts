import { IconName } from "../Icon";

import type { ColorKey } from "@types";
import type { Enum, Nullable, VoidFn } from "@ubloimmo/front-util";

const iconPlacement = ["left", "right"] as const;
export type IconPlacement = Enum<typeof iconPlacement>;

export type ChipProps = {
  /**
   * The label of the Chip
   *
   * @required
   * @type {string}
   */
  label: string;
  /**
   * The icon to display next to the label of the Chip
   * @required
   * @type {IconName}
   */
  icon: IconName;
  /**
   * The dominant color of the Chip
   *
   * @default "primary"
   */
  color?: ColorKey;
  /**
   * Whether to display the icon on the left or on the right of the label
   * @default "left"
   */
  iconPlacement?: IconPlacement;
  /**
   * Callback when clicking on the remove button
   * @type {VoidFn | null}
   * @default null
   */
  onDelete?: Nullable<VoidFn>;
};

export type DefaultChipProps = Required<ChipProps>;
