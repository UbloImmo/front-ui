import type { InfoBoxProps } from "../InfoBox";
import type { StyleProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

/**
 * Callback that gets called after the content is copied to the user's clipboard
 * @param {string} content - The content that was copied
 */
export type OnCopiedFn = VoidFn<[string]>;

export type CopyClipboardInfoCardProps = Omit<InfoBoxProps, "label"> & {
  /**
   * The data to be copied to a user's clipboard
   *
   * @remarks If missing, the label will be used instead
   *
   * @type {Nullable<string>}
   * @default null
   */
  copyData?: Nullable<string>;
  /**
   * The URL to be opened in a new tab when clicked
   *
   * @remarks If missing, clicking on the label will not act as a link
   *
   * @type {Nullable<string>}
   * @default null
   */
  href?: Nullable<string>;
  /**
   * The label to be displayed in the tooltip when hovering the copy icon
   *
   * @remarks If missing, the translated `copy-to-clipboard` label will be used
   *
   * @type {Nullable<string>}
   * @default null
   */
  copyTooltipLabel?: Nullable<string>;
  /**
   * Optional callback that gets called after the content is copied
   * to the user's clipboard
   *
   * @param {string} content - The content that was copied
   *
   *
   * @type {Nullable<VoidFn<[string]>}
   * @default null
   */
  onCopied?: Nullable<OnCopiedFn>;
};

export type CopyClipboardInfoCardDefaultProps =
  Required<CopyClipboardInfoCardProps>;

export type CopyClipboardInfoCardStyleProps = StyleProps<{ isEmpty?: boolean }>;
