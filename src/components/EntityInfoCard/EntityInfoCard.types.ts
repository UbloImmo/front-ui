import type { ContextInfoCardProps } from "../ContextInfoCard";
import type { ContextLineProps } from "../ContextLine";
import type { AccountBalanceProps } from "@/components/AccountBalance";
import type { ActionProps } from "@/components/Action";
import type { ActionIconProps } from "@/components/ActionIcon";
import type { ContextMenuProps } from "@/components/ContextMenu";
import type {
  CopyClipboardInfoCardProps,
  OnCopiedFn,
} from "@/components/CopyClipboardInfoCard";
import type { InfoBoxProps } from "@/components/InfoBox";
import type { StateIndicatorProps } from "@/components/StateIndicator";
import type { TestIdProps } from "@types";
import type { KeyOf, Nullable, RequireAtLeastOne } from "@ubloimmo/front-util";
import type { FC, ReactNode } from "react";

export type EntityActionIcon = Omit<ActionIconProps, "size">;
export type EntityAction = Omit<ActionProps, "size">;

/**
 * A single row of status information
 *
 * @see {@link ContextLineProps}
 */
export type EntityStatusRow = Omit<ContextLineProps, "children"> & {
  content?: ReactNode;
};

/**
 * Properties related to the entity info card's state or account balance
 */
export type EntityStateProps = RequireAtLeastOne<{
  /**
   * The state to display above the entity's name and info
   */
  state: Nullable<StateIndicatorProps>;
  /**
   * The account balance to display
   */
  accountBalance: Nullable<AccountBalanceProps>;
}>;

export type EntityInfoCardHeaderProps = EntityStateProps & {
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
};

/**
 * Properties related to the entity info card's section
 */
export type EntityInfoCardSectionInnerProps = {
  /**
   * The entity's name
   */
  name?: Nullable<string>;
  /**
   * A list of Info Cards
   *
   * @remarks
   * Rendered as `CopyClipboardInfoCard`s in a single column
   * Their `onCopied` callback gets propagated to `EntityInfoCard`'s `onInfoCopied` callback if provided
   *
   * @default []
   */
  infoCards?: CopyClipboardInfoCardProps[];
  /**
   * A list of ContextInfoCards
   *
   * @remarks rendered as `ContextInfoCard`s in a single column
   *
   * @default []
   */
  contextInfoCards?: ContextInfoCardProps[];
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
   * A custom element to display relavant information about the entity
   *
   * @remarks Rendered as the first element in the card / section.
   *
   * @default null
   */
  children?: ReactNode;
};

export type EntityInfoCardSectionItemName = KeyOf<
  EntityInfoCardSectionInnerProps,
  string
>;

export type EntityInfoCardSectionProps = EntityInfoCardSectionInnerProps &
  EntityInfoCardSectionOrderProps;

export type EntityInfoCardSectionOrderProps = {
  /**
   * The order of a section's items to be displayed in the section
   *
   * @default ["children","name","contextInfoCards","infoCards","infoBoxes","statusRows"]
   */
  order?: EntityInfoCardSectionItemName[];
};

export type EntityInfoCardFooterProps = {
  /**
   * A list of actions to be made available to the user
   *
   * @remarks rendered as an `Action`
   *
   * @default []
   */
  actions?: EntityAction[];
};

export type EntityInfoCardCallbackProps = {
  /**
   * callback called when the user copies information
   * displayed in the `CopyClipboardInfoCard`
   *
   * @type {Nullable<OnCopiedFn>}
   * @default null
   */
  onInfoCopied?: Nullable<OnCopiedFn>;
};

export type EntityInfoCardProps = EntityInfoCardHeaderProps &
  EntityInfoCardFooterProps &
  EntityInfoCardSectionProps &
  EntityInfoCardCallbackProps & {
    /**
     * A list of sections to be displayed separately in the card
     *
     * @remarks
     * Each section is rendered as a in a bordered, padded column.
     *
     * @default []
     */
    sections?: EntityInfoCardSectionProps[];
  };

export type EntityInfoCardSectionDefaultProps =
  Required<EntityInfoCardSectionProps>;

export type EntityInfoCardDefaultProps = Required<EntityInfoCardProps>;

export type EntityInfoCardHeaderDefaultProps =
  Required<EntityInfoCardHeaderProps>;

export type EntityInfoCardFooterDefaultProps =
  Required<EntityInfoCardFooterProps>;

export type EntityInfoCardSectionItemRendererProps =
  Required<EntityInfoCardSectionInnerProps> &
    TestIdProps &
    EntityInfoCardCallbackProps;

export type EntityInfoCardSectionItemRenderer =
  FC<EntityInfoCardSectionItemRendererProps>;

export type EntityInfoCardSectionItemRendererMap = {
  [ItemKey in EntityInfoCardSectionItemName]: EntityInfoCardSectionItemRenderer;
};
