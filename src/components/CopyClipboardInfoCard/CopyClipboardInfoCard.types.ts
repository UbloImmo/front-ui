import type { InfoBoxProps } from "../InfoBox";
import type { StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

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
   *
   * @type {string}
   * @default "Copy to clipboard"
   */
  copyTooltipLabel?: string;
};

export type CopyClipboardInfoCardDefaultProps =
  Required<CopyClipboardInfoCardProps>;

export type CopyClipboardInfoCardStyleProps = StyleProps<{ isEmpty?: boolean }>;
