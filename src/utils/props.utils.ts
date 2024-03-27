import {
  isFunction,
  isUndefined,
  objectEntries,
  objectFromEntries,
  transformObject,
} from "@ubloimmo/front-util";
import { useMemo } from "react";

import type { StylePropName, StyleProps } from "@/types";

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

/**
 * Returns a memoized object of style props based on the provided props object.
 *
 * @template {Record<string, unknown>} TProps - The type of the props object.
 * @param {TProps} props - The props object used to generate the style props.
 * @returns {StyleProps<TProps>} - The memoized object of style props.
 */
export const useStyleProps = <TProps extends Record<string, unknown>>(
  props: TProps
): StyleProps<TProps> => {
  return useMemo(() => toStyleProps(props), [props]);
};

/**
 * Returns a memoized, static version of the input data.
 *
 * @param {TData} data - The input data to be memoized.
 * @return {TData} The memoized version of the input data.
 */
export const useStatic = <TData>(data: TData) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => data, []);
};
