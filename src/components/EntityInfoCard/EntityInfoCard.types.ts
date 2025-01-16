import type { AccountBalanceProps } from "@/components/AccountBalance";
import type { ActionProps } from "@/components/Action";
import type { ActionIconProps } from "@/components/ActionIcon";
import type { BadgeProps } from "@/components/Badge";
import type { ContextMenuProps } from "@/components/ContextMenu";
import type {
  CopyClipboardInfoCardProps,
  OnCopiedFn,
} from "@/components/CopyClipboardInfoCard";
import type { InfoBoxProps } from "@/components/InfoBox";
import type { StateIndicatorProps } from "@/components/StateIndicator";
import type { Nullable, RequireAtLeastOne } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type EntityActionIcon = Omit<ActionIconProps, "size">;
export type EntityAction = Omit<ActionProps, "size">;

export type EntityStatusRow = {
  label: string;
  badge?: BadgeProps;
  content?: ReactNode;
};

type EntityStateProps = RequireAtLeastOne<{
  /**
   * The state to display above the entity's name and info
   */
  state: Nullable<StateIndicatorProps>;
  /**
   * The account balance to display
   */
  accountBalance: Nullable<AccountBalanceProps>;
}>;

export type EntityInfoCardProps = EntityStateProps & {
  /**
   * The entity's name
   */
  name?: Nullable<string>;
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
   * A context menu that can be displayed when the user right clicks on the entity
   *
   * @remarks Renders to the right of the card
   *
   * @default null
   */
  contextMenu?: Nullable<ContextMenuProps>;
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
   * @remarks rendered as `InfoBox`s in a 2 column grid. If provided with an odd number of boxes, the last one will take up 2 columns.
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
  /**
   * A custom element to display relavant information about the entity
   *
   * @remarks Rendered as the first element after the header.
   *
   * @default null
   */
  children?: ReactNode;
  /**
   * callback called when the user copies information
   * displayed in the `CopyClipboardInfoCard`
   *
   * @type {Nullable<OnCopiedFn>}
   * @default null
   */
  onInfoCopied?: Nullable<OnCopiedFn>;
};

export type EntityInfoCardDefaultProps = Required<EntityInfoCardProps>;
