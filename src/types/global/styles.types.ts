import type { Nullish } from "@ubloimmo/front-util";
import type { SupportedHTMLElements } from "styled-components/dist/types";

export type StylePropName<TPropName extends string> = `$${TPropName}`;

export type StyleProps<TProps extends Record<string, unknown>> = {
  [TPropName in keyof TProps &
    string as StylePropName<TPropName>]: TPropName extends "className"
    ? never
    : TProps[TPropName];
};

export type StyleOverrideProps = {
  /**
   * Any additional css classes to apply
   *
   * @remarks Useful in case of usage with styled()
   *
   * @default undefined
   */
  className?: Nullish<string>;
  /**
   * The HTML element to render the component as
   *
   * @default undefined
   */
  as?: Nullish<SupportedHTMLElements>;
};
