import type { IconName } from "../Icon/Icon.types";
import type { FixedCssLength, StyleOverrideProps, TestIdProps } from "@types";
import type { Extract, Nullable, VoidFn } from "@ubloimmo/front-util";

export type SideEntityMenuLink = {
  /**
   * The title of the menu item
   */
  title: string;
  /**
   * The icon to display for the menu item
   * For backlinks, defaults to "ArrowLeftShort" if not provided
   */
  icon?: IconName;
  /**
   * The URL or path to navigate to
   */
  to: string;
  /**
   * Whether this item is pinned (shown at the top with spacing after)
   */
  pinned?: boolean;
  /**
   * Whether this is a header item
   */
  head?: boolean;
  /**
   * Whether this item has an error state
   */
  error?: boolean;
  /**
   * Whether this item is hidden (f.e. can be the case when feature flagged)
   */
  hidden?: boolean;
  /**
   * Whether this item is disabled (f.e. can be the case when creating a invoice model)
   */
  disabled?: boolean;
  /**
   * Whether this item should have a border bottom (typically used for backlinks)
   */
  borderBottom?: boolean;
  /**
   * Click handler for the menu item
   */
  onClick?: VoidFn;
};

type OmittedKeys = Extract<
  keyof SideEntityMenuLink,
  "to" | "onClick" | "pinned" | "disabled" | "error"
>;

export type SideEntityMenuTitle = Partial<Record<OmittedKeys, never>> &
  Omit<SideEntityMenuLink, OmittedKeys> & {
    isTitle: true;
  };

export type SideEntityMenuProps = StyleOverrideProps & {
  /**
   * The title to display in the menu header (this is only to give info about the entity)
   */
  title?: Nullable<string>;
  /**
   * The icon to display next to the title (this is only to give info about the entity)
   */
  titleIcon?: Nullable<IconName>;
  /**
   * Array of menu links to display
   */
  menuLinks: SideEntityMenuLink[];
  /**
   * Array of back links to display in the header
   * Note: If no icon is provided for a backlink, "ArrowLeftShort" will be used as default
   */
  backLinks?: SideEntityMenuLink[];
  /**
   * Expanded width for the menu (when text is visible)
   * @default "15.5rem"
   */
  width?: FixedCssLength;
  /**
   * Collapsed width for the menu (icons only)
   * @default "2.75rem"
   */
  collapsedWidth?: FixedCssLength;
  /**
   * Whether the menu should be forced to be expanded
   * @default false
   */
  forceExpanded?: boolean;
  /**
   * The currently active menu item (by 'to' value)
   * When provided, this takes precedence over URL-based active detection
   */
  activeItem?: Nullable<string>;
  /**
   * A callback to navigate to a given URL
   */
  navigate?: ((url: string) => void) | null;
};

export type SideEntityMenuDefaultProps = Required<
  Pick<
    SideEntityMenuProps,
    "menuLinks" | "backLinks" | "width" | "collapsedWidth" | "forceExpanded"
  >
> & {
  title?: Nullable<string>;
  titleIcon?: Nullable<IconName>;
  activeItem?: Nullable<string>;
  navigate?: ((url: string) => void) | null;
};

export type SideEntityMenuItemProps = {
  /**
   * The menu link data
   */
  link: SideEntityMenuLink | SideEntityMenuTitle;
  /**
   * The currently active menu item (by 'to' value)
   * When provided, this takes precedence over URL-based active detection
   */
  activeItem?: Nullable<string>;
  /**
   * A callback to navigate to a given URL
   */
  navigate?: ((url: string) => void) | null;
  isBacklink?: boolean;
} & TestIdProps;
