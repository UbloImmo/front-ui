import type { IconName } from "../Icon";
import type { Nullable } from "@ubloimmo/front-util";

export type InputAssistiveTextProps = {
  /**
   * The text content to be displayed as assistive text
   * @type {Nullable<string>}
   * @default null
   */
  assistiveText?: Nullable<string>;
  /**
   * The text content to be displayed as error text
   * @type {Nullable<string>}
   * @default null
   */
  errorText?: Nullable<string>;
  /**
   * Whether to display the error text
   * @default false
   * @type {boolean}
   */
  error?: boolean;
  /**
   * An optional icon to display before the assistive text
   *
   * @remarks
   * If `true`, the default `SquircleInfo` icon will be displayed
   *
   * @type {Nullable<IconName | boolean>}
   * @default false
   */
  showAssistiveTextIcon?: boolean;
  /**
   * The name of the icon to display before the assistive text
   *
   * @type {IconName}
   * @default "SquircleInfo"
   */
  assistiveTextIcon?: IconName;
};

export type DefaultInputAssistiveTextProps = Required<InputAssistiveTextProps>;
