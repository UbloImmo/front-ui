import type {
  StateIndicatorProps,
  CopyClipboardInfoCardProps,
  InfoBoxProps,
  ActionIconProps,
  BadgeProps,
  ActionProps,
} from "@components";

import type { Nullable } from "@ubloimmo/front-util";

export type EntityActionIcon = Omit<ActionIconProps, "size">;
export type EntityAction = Omit<ActionProps, "size">;

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
   * @remarks Rendered as an `ActionIcon`
   *
   * @default null
   */
  actionIcon?: Nullable<EntityActionIcon>;
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
  /**
   * A list of Status Rows
   *
   * @remarks renderes as a list of rows containing a `Text`s and a `Badge`.
   *
   * @default []
   */
  statusRows?: EntityStatusRow[];
  /**
   * A list of actions to be made available to the user
   *
   * @remarks rendered as an `Action`
   *
   * @default []
   */
  actions?: EntityAction[];
};

export type EntityInfoCardDefaultProps = Required<EntityInfoCardProps>;
