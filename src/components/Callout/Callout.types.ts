import type { HypertextProps } from "../Hypertext";
import type { IconName } from "../Icon";
import type { ColorKey, StyleOverrideProps, StyleProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type CalloutColor = Exclude<ColorKey, "success">;

export type CalloutIcon = IconName | "auto";

export const calloutSizes = ["m", "l"] as const;

export type CalloutSize = Enum<typeof calloutSizes>;

export type CalloutProps = StyleOverrideProps & {
  /**
   * The callout's text message
   *
   * @type {NonNullable<ReactNode>}
   * @required
   * @default "[label]"
   */
  children: NonNullable<ReactNode>;

  /**
   * The callout's main color
   *
   * Determines its background, icon & label colors
   *
   * @type {CalloutColor}
   * @default "primary"
   */
  color?: CalloutColor;

  /**
   * The callout's custom icon
   *
   * @type {Nullable<CalloutIcon>}
   * @default "auto"
   */
  icon?: Nullable<CalloutIcon>;

  /**
   * The callout's optional title to display before the label
   *
   * @type {string}
   * @default null
   */
  title?: Nullable<string>;

  /**
   * The callout's link to another page/content
   *
   * @type {Nullable<Omit<HypertextProps, "color">>}
   * @see {Hypertext}
   * @default null
   */
  hyperText?: Nullable<Omit<HypertextProps, "color">>;

  /**
   * The callout's size
   *
   * @type {CalloutSize}
   * @default "m"
   */
  size?: CalloutSize;
};

export type CalloutDefaultProps = Required<CalloutProps>;

export type CalloutStyleProps = StyleProps<CalloutDefaultProps>;
