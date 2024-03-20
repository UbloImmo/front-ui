import { useMemo } from "react";
import type { StyleProps, StylePropName } from "../types";
import {
  isUndefined,
  objectEntries,
  transformObject,
  objectFromEntries,
  isFunction,
} from "@ubloimmo/front-util";

/**
 * Merges the provided default props with the given props, prioritizing the props values when available.
 *
 * @param {TDefaultProps} defaultProps - the default properties to be merged
 * @param {TProps} [props = {}] - the properties to merge with the default props
 * @return {TDefaultProps} the merged default props with the given props
 */
export const mergeDefaultProps = <
  TDefaultProps extends Record<string, unknown>,
  TProps extends Partial<TDefaultProps>
>(
  defaultProps: TDefaultProps,
  props: TProps = {} as TProps
): TDefaultProps => {
  return objectFromEntries(
    objectEntries(defaultProps).map(([key, value]) => [
      key,
      isUndefined(props[key]) ? value : props[key],
    ])
  ) as TDefaultProps;
};

/**
 * Hook that merges the provided default props with the given props,
 * using {@link mergeDefaultProps}.
 *
 * @param {TDefaultProps} defaultProps - the default properties to be merged
 * @param {TProps} [props = {}] - the properties to merge with the default props
 * @return {TDefaultProps} the merged default props with the given props
 */
export const useMergedProps = <
  TDefaultProps extends Record<string, unknown>,
  TProps extends Partial<TDefaultProps>
>(
  defaultProps: TDefaultProps | (() => TDefaultProps),
  props: TProps = {} as TProps
): TDefaultProps => {
  return useMemo<TDefaultProps>(
    () =>
      mergeDefaultProps(
        isFunction<() => TDefaultProps>(defaultProps)
          ? defaultProps()
          : defaultProps,
        props
      ),
    [defaultProps, props]
  );
};

/**
 * Generate style props based on the input props object
 * by adding the dollar sign prefix to the keys.
 *
 * @remarks Inverse of {@link fromStyleProps}
 *
 * @param {TProps} props - The input props object.
 * @return {StyleProps<TProps>} The generated style props.
 */
export const toStyleProps = <TProps extends Record<string, unknown>>(
  props: TProps
): StyleProps<TProps> => {
  return transformObject(
    props,
    (value) => value,
    (key): StylePropName<typeof key> => `$${key}`
  ) as unknown as StyleProps<TProps>;
};

/**
 * Transforms the input objectby removing the dollar sign prefix from keys
 * and keeping the same values.
 *
 * @remarks Inverse of {@link toStyleProps}
 *
 * @param {StyleProps<TProps>} props - The input object with style properties.
 * @return {TProps} The transformed object with updated keys.
 */
export const fromStyleProps = <TProps extends Record<string, unknown>>(
  props: StyleProps<TProps>
): TProps => {
  return transformObject(
    props,
    (value) => value,
    (key): keyof TProps & string => (key[0] === "$" ? key.slice(1) : key)
  ) as unknown as TProps;
};

export const useStyleProps = <TProps extends Record<string, unknown>>(
  props: TProps
): StyleProps<TProps> => {
  return useMemo(() => toStyleProps(props), [props]);
};
