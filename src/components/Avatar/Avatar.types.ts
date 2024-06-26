import { Enum } from "@ubloimmo/front-util";

const avatarPropsSizes = ["m", "xl"] as const;
export type AvatarSize = Enum<typeof avatarPropsSizes>;

export type AvatarProps = {
  /**
   * @default "m"
   *
   * The size of the avatar
   */
  size?: AvatarSize;

  /**
   * The full name of the user (Initials version)
   */
  name: string;

  /**
   * The first name of the user (Initials version)
   */
  firstName?: string;

  /**
   * The first name of the user (Initials version)
   */
  lastName?: string;

  /**
   * The count of the user (Number version)
   */

  count?: number;

  /**
   * The image URL to be displayed in the Avatar (Image version)
   */
  avatarUrl?: string;
};

export type AvatarDefaultProps = Required<AvatarProps>;
