import type { IconName } from "../Icon";
import type { GenericFn, Nullable, VoidFn } from "@ubloimmo/front-util";

/**
 * A function that navigates to a given URL
 *
 * @param {string} to - The URL to navigate to
 * @returns {void}
 */
export type MenuItemNavigateFn = VoidFn<[to: string]>;

/**
 * A function that returns the current location's pathname
 *
 * @returns {string} The current location's pathname
 */
export type MenuItemGetLocationFn = GenericFn<[], string>;

export type MenuItemRouterProps = {
  /**
   * An optional function that navigates to a given URL.
   * If missing, the default `window.location.assign()` native API is used.
   *
   * @type {Nullable<MenuItemNavigateFn>}
   * @default {window.location.assign}
   */
  setLocation?: MenuItemNavigateFn;
  /**
   * An optional function that returns the current location's pathname.
   * If missing, the default `window.location.pathname` native API is used.
   *
   * @type {Nullable<MenuItemGetLocationFn>}
   * @default {window.location.pathname}
   */
  getLocation?: MenuItemGetLocationFn;
  /**
   * Whether the menu item should match nested location pathnames and display its active state.
   *
   * @type {boolean}
   * @default {false}
   *
   * @remarks
   * Assuming the current location is `/users/123` and the menu item's `to` is `/users/123/details`:
   * - The menu item will match if `matchNestedRoutes` is true
   * - The menu item will not match if `matchNestedRoutes` is false
   */
  matchNestedLocations?: boolean;
  /**
   * An optional array of routes that the menu item should match.
   *
   * @type {string[]}
   * @default {[]}
   */
  matchOtherRoutes?: string[];
};

export type MenuItemProps = {
  /**
   * The URL the menu item should navigate to
   *
   * @required
   * @type {string}
   */
  to: string;
  /**
   * The label of the menu item
   *
   * @required
   * @type {string}
   */
  label: string;
  /**
   * The icon of the menu item, displayed on the left of the label
   *
   * @required
   * @type {IconName}
   * @default "Square"
   */
  icon: IconName;
  /**
   * An optional custom HTML title attribute for the menu item
   *
   * @remarks
   * If not provided, the `label` will be used as the title.
   *
   * @type {Nullable<string>}
   * @default {null}
   */
  title?: Nullable<string>;
};

export type MenuItemDefaultProps = Required<MenuItemProps>;
