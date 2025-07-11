import type {
  BreakpointLabel,
  CssLength,
  DirectionHorizontal,
  FixedCssLength,
  StyleOverrideProps,
  StyleProps,
} from "@types";
import type { Nullable } from "@ubloimmo/front-util";
import type { FC, ReactNode } from "react";

export type PaneDynamicContentProps = {
  isCollapsed: boolean;
};

export type PaneDynamicContent = FC<PaneDynamicContentProps>;

export type PaneProps = {
  /**
   * The width of the pane when expanded
   *
   * @type {FixedCssLength}
   * @default "15rem"
   */
  expandedWidth?: FixedCssLength;
  /**
   * The width of the pane when collapsed
   *
   * @type {FixedCssLength;}
   * @default "s-11"
   */
  collapsedWidth?: FixedCssLength;
  /**
   * The ratio at which we consider the pane to be expanded
   *
   * must be between 0 and 1
   * the greater the value, the earlier the pane will be considered expanded
   * @type {number}
   * @default 0.5
   *
   */
  expandedRatio?: number;
  /**
   * The pane's content, always gets rendered
   *
   * @type {ReactNode}
   * @default null
   */
  children?: ReactNode;
  /**
   * A dynamic content component that will be rendered and has access to the pane's collapsed state
   *
   * @type {Nullable<PaneDynamicContent>}
   * @default null
   */
  dynamicContent?: Nullable<PaneDynamicContent>;
  /**
   * An optional breakpoint at which the pane should be always expanded and take the full expanded width
   *
   * @type {Nullable<BreakpointLabel>}
   * @default null
   */
  expandedBreakpoint?: Nullable<BreakpointLabel>;
  /**
   * Whether the pane should be forced to be expanded or collapsed
   *
   * By default, it only expands when hovered and collapsed
   *
   * @type {boolean}
   * @default false
   */
  forceExpanded?: boolean;
  /**
   * Whether no styles should be applied to the pane
   *
   * @type {boolean}
   * @default false
   */
  headLess?: boolean;
  /**
   * The direction in which the pane should be anchored
   *
   * @type {DirectionHorizontal}
   * @default "left"
   */
  anchor?: DirectionHorizontal;
  /**
   * The sticky top position of the pane
   *
   * @type {CssLength}
   * @default 0
   */
  top?: CssLength;
  /**
   * The sticky bottom position of the pane
   *
   * @type {CssLength | "unset"}
   * @default "unset"
   */
  bottom?: CssLength | "unset";
} & Omit<StyleOverrideProps, "as">;

export type PaneDefaultProps = Required<PaneProps>;

export type PaneStyleProps = StyleProps<
  Pick<
    PaneDefaultProps,
    | "expandedWidth"
    | "collapsedWidth"
    | "expandedBreakpoint"
    | "anchor"
    | "headLess"
    | "forceExpanded"
    | "top"
    | "bottom"
  >
>;
