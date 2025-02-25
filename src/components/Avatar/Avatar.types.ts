import type { RequiredNonNever } from "@/types/global/object.types";
import type { ExtendedComponentSize } from "@/types/themes/sizes/sizes.types";
import type { Direction } from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type AvatarSize = Extract<ExtendedComponentSize, "m" | "l" | "xl">;

type CommonAvatarProps = {
  /**
   * The size of the Avatar
   *
   * @type {AvatarSize}
   * @default "m"
   */
  size?: AvatarSize;
  /**
   * Whether the Avatar is for an organization
   *
   * @remarks Organization avatars render as squircles
   *
   * @type {boolean}
   * @default false
   */
  organization?: boolean;

  /**
   * Whether to wrap the Avatar in a tooltip
   *
   * @remarks
   * - If `true`, the Avatar will be we wrapped with a tooltip
   *   displaying its `name`, `firstName` & `lastName` properties.
   *   If only provided with the `count` property, no tooltip will be displayed even if `true`.
   * - If `false`, no tooltip will be displayed.
   * - If a `ReactNode`, its content will be used as the tooltip text.
   *
   * @type {ReactNode | boolean}
   * @default false
   */
  tooltip?: ReactNode | boolean;
  /**
   * The direction of the tooltip
   *
   * @remarks
   * Will get overridden if no space is available in the given direction
   *
   * @type {Direction}
   * @default "right"
   */
  tooltipDirection?: Direction;
};

export type AvatarPropsFullName = CommonAvatarProps & {
  /**
   * The full name of the user (Name variant)
   *
   * @type {string}
   * @required
   * @default ""
   */
  name: string;

  /**
   * The first name of the user (Name variant)
   */
  firstName?: never;

  /**
   * The first name of the user (Name version)
   */
  lastName?: never;

  /**
   * The number to be displayed in the Avatar (Number variant)
   */
  count?: never;

  /**
   * The image URL to be displayed in the Avatar (Picture variant)
   *
   * @type {Nullable<string>}
   */
  avatarUrl?: Nullable<string>;
};

export type AvatarPropsFirstLastName = CommonAvatarProps & {
  /**
   * The full name of the user (Name variant)
   */
  name?: never;

  /**
   * The first name of the user (Name variant)
   *
   * @type {string}
   * @required
   */
  firstName: string;

  /**
   * The first name of the user (Name version)
   *
   * @type {string}
   * @required
   */
  lastName: string;

  /**
   * The number to be displayed in the Avatar (Number variant)
   */
  count?: never;

  /**
   * The image URL to be displayed in the Avatar (Picture variant)
   *
   * @type {Nullable<string>}
   */
  avatarUrl?: Nullable<string>;
};

export type AvatarPropsCount = CommonAvatarProps & {
  /**
   * The full name of the user (Name variant)
   */
  name?: never;

  /**
   * The first name of the user (Name variant)
   */
  firstName?: never;

  /**
   * The first name of the user (Name variant)
   */
  lastName?: never;

  /**
   * The number to be displayed in the Avatar (Number variant)
   *
   * @type {number}
   * @required
   */
  count: number;

  /**
   * The image URL to be displayed in the Avatar (Picture variant)
   */
  avatarUrl?: never;
};

export type AvatarProps =
  | AvatarPropsFullName
  | AvatarPropsFirstLastName
  | AvatarPropsCount;

export type AvatarDefaultProps =
  | RequiredNonNever<AvatarPropsFullName>
  | RequiredNonNever<AvatarPropsFirstLastName>
  | RequiredNonNever<AvatarPropsCount>;
