import { Nullable } from "@ubloimmo/front-util";

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
};

export type DefaultInputAssistiveTextProps = Required<InputAssistiveTextProps>;
