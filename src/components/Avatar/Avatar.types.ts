import type { RequiredNonNever } from "@/types/global/object.types";
import type { ExtendedComponentSize } from "@/types/themes/sizes/sizes.types";
import type { Nullable } from "@ubloimmo/front-util";

export type AvatarSize = Extract<ExtendedComponentSize, "m" | "xl">;

export type AvatarPropsFullName = {
  /**
   * The size of the Avatar
   *
   * @type {AvatarSize}
   * @default "m"
   */
  size?: AvatarSize;

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

export type AvatarPropsFirstLastName = {
  /**
   * The size of the Avatar
   *
   * @type {AvatarSize}
   * @default "m"
   */
  size?: AvatarSize;

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

export type AvatarPropsCount = {
  /**
   * The size of the Avatar
   *
   * @type {AvatarSize}
   * @default "m"
   */
  size?: AvatarSize;

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
