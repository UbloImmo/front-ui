import type { IconName } from "../Icon";
import type { Enum } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

const actionSizes = ["default", "large"] as const;

export type ActionSize = Enum<typeof actionSizes>;

/**
 * Action component props
 */
export type ActionProps = {
  /**
   * The action button's label.
   *
   * @type {string}
   * @required
   */
  label: string;
  /**
   * The icon name to be used by Action to display its icon.
   *
   * @type {IconName}
   * @required
   */
  icon: IconName;
  /**
   * The action button's onClick callback.
   *
   * @type {Nullable<VoidFn>}
   */
  onClick?: Nullable<VoidFn>;
  /**
   * Whether the Action button is disabled.
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The Action button's size variant.
   * @type {ActionSize}
   * @default "default"
   */
  size?: ActionSize;
  /**
   * Optional badge label.
   *
   * @remarks No `Badge` will render if this is missing.
   *
   * @type {Nullable<string>}
   * @default null
   */
  badgeLabel?: Nullable<string>;
  /**
   * The accessible title to assign to the Action button.
   *
   * @remarks if missing, the label will be used.
   *
   * @type {Nullable<string>}
   * @default string;
   */
  title?: Nullable<string>;
};

export type DefaultActionProps = Required<ActionProps>;
