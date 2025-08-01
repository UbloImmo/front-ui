import type { IconName } from "../Icon";
import type { FixedCssLength } from "@types";
import type { ToasterProps as SonnerToasterProps } from "sonner";

type ToasterPosition = SonnerToasterProps["position"];

export type ToasterIconOverrides = Partial<SonnerToasterProps["icons"]>;

export type ToasterProps = {
  /**
   * The theme of the toaster.
   *
   * @default "system"
   * @type {"light" | "dark" | "system"}
   */
  theme?: "light" | "dark" | "system";
  /**
   * The position of the toaster.
   *
   * @default "bottom-center"
   * @type {ToasterPosition}
   */
  position?: ToasterPosition;
  /**
   * The maximum number of visible toasts.
   *
   * Older toasts will be discarded if visible toasts exceed this limit.
   *
   * @default 3
   * @type {number}
   */
  visibleToasts?: number;
  /**
   * The lasting duration of regular toasts in milliseconds.
   *
   * @default 5000
   * @type {number}
   */
  duration?: number;
  /**
   * Whether to use rich colors.
   *
   * @default false
   * @type {boolean}
   */
  richColors?: boolean;
  /**
   * Offset of toasts from the edge of the screen.
   *
   * @default "s-3"
   * @type {FixedCssLength}
   */
  offset?: FixedCssLength;
  /**
   * Offset of toasts from the edge of the screen on mobile.
   *
   * @default "s-3"
   * @type {FixedCssLength}
   */
  mobileOffset?: FixedCssLength;
  /**
   * Whether to use dark theme in light mode and vice-versa.
   *
   * @default false
   * @type {boolean}
   */
  invert?: boolean;
  /**
   * Whether show visible toasts in a list instead of stacking them.
   *
   * @default false
   * @type {boolean}
   */
  expand?: boolean;
  /**
   * Whether to add a close button to all toasts.
   *
   * @default true
   * @type {boolean}
   */
  closeButton?: boolean;
  /**
   * A map of UI elements that should be rendered instead of the default icons.
   *
   * @type {ToasterIconOverrides}
   */
  iconOverrides?: ToasterIconOverrides;
};

export type ToasterDefaultProps = Required<ToasterProps>;

export type ToastStatus = "success" | "info" | "warning" | "error";

export type ToasterIconMap = Record<ToastStatus | "closed", IconName>;
