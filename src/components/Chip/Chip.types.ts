import { IconName } from "../Icon";

import type { DirectionHorizontal } from "@/types/global/direction.types";
import type { ColorKey } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

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
   * @default null
   * @type {Nullable<IconName>}
   */
  icon?: Nullable<IconName>;
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
  iconPlacement?: DirectionHorizontal;
  /**
   * Callback when clicking on the remove button
   * @type {VoidFn | null}
   * @default null
   */
  onDelete?: Nullable<VoidFn>;
  /**
   * The title to display when hovering over the remove button
   * @type {Nullable<string>}
   */
  deleteButtonTitle?: Nullable<string>;
  /**
   * Whether the Chip is disabled
   * @remarks Setting to `true` will hide the delete button
   *
   * @default false
   */
  disabled?: boolean;
};

export type DefaultChipProps = Required<ChipProps>;
