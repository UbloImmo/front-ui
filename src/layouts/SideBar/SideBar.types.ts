import type { ReactNode } from "react";
import type { CssLength, StyleProps } from "@types";

export type SideBarLayoutProps = {
  /**
   * The children to display
   * 
   * @default null
   */
  children?: ReactNode;
  /**
   * The width to use when resting
   * @default "auto"
   */
  restingWidth?: CssLength;
} 

export type SideBarLayoutDefaultProps = Required<SideBarLayoutProps>;

export type SideBarLayoutStyleProps = StyleProps<Pick<SideBarLayoutProps, "restingWidth">>