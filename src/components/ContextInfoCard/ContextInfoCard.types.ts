import { Nullable } from "@ubloimmo/front-util";
import { ReactNode } from "react";

import { StaticIconProps } from "../StaticIcon/StaticIcon.types";

type ContextInfoCardStaticIconProps = Omit<StaticIconProps, "stroke" | "size">;

export type ContextInfoCardProps = {
  /**
   * The main text content of the card
   *
   * @default "[Title]"
   */
  title: string;

  /**
   * Additional text displayed above the title
   *
   * @default null
   */
  label?: Nullable<string>;

  /**
   * Supplementary text displayed below the title
   *
   * @default null
   */
  description?: Nullable<ReactNode>;

  /**
   * Additional information displayed below the description in smaller text (xs size)
   *
   * @default null
   */
  details?: Nullable<ReactNode>;

  /**
   * Configuration object for the icon
   *
   * @default { name: "Circle" }
   */
  staticIcon: ContextInfoCardStaticIconProps;
};
