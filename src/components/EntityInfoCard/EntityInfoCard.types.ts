import type {
  StateIndicatorProps,
  CopyClipboardInfoCardProps,
  InfoBoxProps,
  ActionIconProps,
  BadgeProps,
} from "@components";

import type { Nullable } from "@ubloimmo/front-util";

export type EntityAction = Omit<ActionIconProps, "size">;

export type EntityStatusRow = {
  label: string;
  badge: BadgeProps;
};

export type EntityInfoCardProps = {
  /**
   * The entity's name
   *
   * @required
   */
  name: string;
  /**
   * The state to display above the entity's name and info
   *
   * @required
   */
  state: StateIndicatorProps;
  /**
   * An action made available to the user to interact with the whole entity.
   * Usually is deletion.
   *
   * @remarks Rendered as an `Action`
   *
   * @default null
   */
  action?: Nullable<EntityAction>;
  /**
   * A list of Info Cards
   *
   * @remarks rendered as `CopyClipboardInfoCard`s in a single column
   *
   * @default []
   */
  infoCards?: CopyClipboardInfoCardProps[];
  /**
   * A list of Info Boxes
   *
   * @remarks rendered as `InfoBox`s in a 2 column grid.
   * @remarks If provided with an odd number of boxes, the last one will take up 2 columns.
   *
   * @default []
   */
  infoBoxes?: InfoBoxProps[];
  // statusRows?: EntityStatusRow[];
};

export type EntityInfoCardDefaultProps = Required<EntityInfoCardProps>;
