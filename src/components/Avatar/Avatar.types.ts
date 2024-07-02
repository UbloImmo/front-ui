import type { RequiredNonNever } from "@/types/global/object.types";
import type { ExtendedComponentSize } from "@/types/themes/sizes/sizes.types";
import type { Nullable } from "@ubloimmo/front-util";

export type AvatarSize = Extract<ExtendedComponentSize, "m" | "xl">;

export type AvatarPropsFullName = {
  /**
   * @default "m"
   *
   * The size of the Avatar
   */
  size?: AvatarSize;

  /**
   * The full name of the user (Name variant)
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
   */
  avatarUrl?: Nullable<string>;
};

export type AvatarPropsFirstLastName = {
  /**
   * @default "m"
   *
   * The size of the Avatar
   */
  size?: AvatarSize;

  /**
   * The full name of the user (Name variant)
   */
  name?: never;

  /**
   * The first name of the user (Name variant)
   */
  firstName: string;

  /**
   * The first name of the user (Name version)
   */
  lastName: string;

  /**
   * The number to be displayed in the Avatar (Number variant)
   */
  count?: never;

  /**
   * The image URL to be displayed in the Avatar (Picture variant)
   */
  avatarUrl?: Nullable<string>;
};

export type AvatarPropsCount = {
  /**
   * @default "m"
   *
   * The size of the Avatar
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
