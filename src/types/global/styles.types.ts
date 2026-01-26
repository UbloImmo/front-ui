import type { KeyOf, Nullish } from "@ubloimmo/front-util";
import type { ElementType, CSSProperties } from "react";

export type StylePropName<TPropName extends string> = `$${TPropName}`;

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
  as?: ElementType;
  /**
   * Any additional css properties to apply
   *
   * @remarks Gets applied as `element.style` when provided
   *
   * @default undefined
   */
  styleOverride?: Nullish<CSSProperties>;
};

/**
 * Converts any props object into a styled props object
 * by preprending a dollar sign to the keys.
 *
 * @remarks
 * Omits the `styleOverride` property present in {@link StyleOverrideProps}
 *
 * @example
 * const props = {
 *   width: "100px",
 *   height: "100px",
 *   styleOverride: {
 *     backgroundColor: "red",
 *   },
 * }
 *
 * const styleProps = toStyleProps(props);
 * // styleProps === { $width: "100px", $height: "100px" }
 */
export type StyleProps<TProps extends Record<string, unknown>> = {
  [TPropName in Exclude<
    keyof TProps,
    Extract<KeyOf<StyleOverrideProps, string>, "styleOverride">
  > &
    string as StylePropName<TPropName>]: TPropName extends "className"
    ? never
    : TProps[TPropName];
};
