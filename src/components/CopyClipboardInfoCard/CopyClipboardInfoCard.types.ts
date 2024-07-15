import type { InfoBoxProps } from "../InfoBox";
import type { StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export type CopyClipboardInfoCardProps = Omit<InfoBoxProps, "label"> & {
  /**
   * The data to be copied to a user's clipboard
   *
   * @remarks If missing, the label will be used instead
   */
  copyData?: Nullable<string>;
  /**
   * The URL to be opened in a new tab when clicked
   *
   * @remarks If missing, clicking on the label will not act as a link
   */
  href?: Nullable<string>;
};

export type CopyClipboardInfoCardDefaultProps =
  Required<CopyClipboardInfoCardProps>;

export type CopyClipboardInfoCardStyleProps = StyleProps<{ isEmpty?: boolean }>;
