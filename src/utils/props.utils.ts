import {
  isFunction,
  isNull,
  isUndefined,
  objectEntries,
  objectFromEntries,
  transformObject,
  type GenericFn,
  type Nullish,
  type Optional,
  type Primitives,
} from "@ubloimmo/front-util";
import { useMemo, useRef, type MutableRefObject } from "react";

import { isNonEmptyString } from "./string.utils";

import type {
  StyleOverrideProps,
  StylePropName,
  StyleProps,
  TestIdProps,
} from "@types";

/**
 * Merges the provided default props with the given props, prioritizing the props values when available.
 *
 * @param {TDefaultProps} defaultProps - the default properties to be merged
 * @param {TProps} [props = {}] - the properties to merge with the default props
 * @param {boolean} [pruneExtraProps = false] - whether to only keep the props that are present in the default props
 * @return {TDefaultProps} the merged default props with the given props
 */
export const mergeDefaultProps = <
  TDefaultProps extends Record<string, unknown>,
  TProps extends Partial<TDefaultProps>,
>(
  defaultProps: TDefaultProps,
  props: TProps = {} as TProps,
  pruneExtraProps = false
): TDefaultProps => {
  const mergedProps = objectFromEntries(
    objectEntries(defaultProps).map(([key, value]) => [
      key,
      isUndefined(props[key]) ? value : props[key],
    ])
  ) as TDefaultProps;
  if (pruneExtraProps) return mergedProps;
  return {
    ...props,
    ...mergedProps,
  };
};

/**
 * Hook that merges the provided default props with the given props,
 * using {@link mergeDefaultProps}.
 *
 * @param {TDefaultProps} defaultProps - the default properties to be merged
 * @param {TProps} [props = {}] - the properties to merge with the default props
 * @param {boolean} [pruneExtraProps = false] - whether to only keep the props that are present in the default props
 * @return {TDefaultProps} the merged default props with the given props
 */
export const useMergedProps = <
  TDefaultProps extends Record<string, unknown>,
  TProps extends Partial<TDefaultProps>,
>(
  defaultProps: TDefaultProps | (() => TDefaultProps),
  props: TProps = {} as TProps,
  pruneExtraProps = false
): TDefaultProps => {
  return useMemo<TDefaultProps>(
    () =>
      mergeDefaultProps(
        isFunction<() => TDefaultProps>(defaultProps)
          ? defaultProps()
          : defaultProps,
        props,
        pruneExtraProps
      ),
    [defaultProps, props, pruneExtraProps]
  );
};

/**
 * Generate style props based on the input props object
 * by adding the dollar sign prefix to the keys.
 *
 * @remarks Inverse of {@link fromStyleProps}
 *
 * @example
 * const props = {
 *   width: "100px",
 *   height: "100px",
 * }
 *
 * const styleProps = toStyleProps(props);
 * // styleProps === { $width: "100px", $height: "100px" }
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
 * @example
 * const styleProps = {
 *   $width: "100px",
 *   $height: "100px",
 * }
 *
 * const props = fromStyleProps(styleProps);
 * // props === { width: "100px", height: "100px" }
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
 * Uses {@link toStyleProps} to generate the style props.
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
 * @template {unknown} TData - The type of the input data.
 * @param {TData | GenericFn<[], TData>} data - The input data to be memoized.
 * @return {TData} The memoized version of the input data.
 *
 * @example
 * const Counter = () => {
 *   const [reactiveData, setReactiveData] = useState(1);
 *   // staticData will always be 1
 *   const staticData = useStatic(() => reactiveData);
 *
 *   const increment = () => setReactiveData(reactiveData + 1);
 *
 *   return (
 *     <>
 *       <div>{staticData} {reactiveData}</div>
 *       <button onClick={increment}>Increment</button>
 *     </>
 *   )
 * }
 */
export const useStatic = <TData>(data: TData | GenericFn<[], TData>): TData => {
  return useMemo<TData>(
    () => (isFunction<GenericFn<[], TData>>(data) ? data() : data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};
/**
 * Returns a memoized, static version of the input data.
 *
 * @template {unknown} TData - The type of the input data.
 * @param {TData | GenericFn<[], TData>} data - The input data to be memoized.
 * @return {MutableRefObject<TData>} The memoized version of the input data.
 */
export const useStaticRef = <TData>(
  data: TData | GenericFn<[], TData>
): MutableRefObject<TData> => {
  return useRef<TData>(isFunction<GenericFn<[], TData>>(data) ? data() : data);
};

/**
 * Concatenates a test id based on the provided baseTestId and additional testId.
 *
 * Extracts the {@link TestIdProps} from the provided props and concatenates the test id if provided.
 * Returns the provided `baseTestId` otherwise.
 *
 * @template {Record<string, unknown>} TProps - The component's base props
 *
 * @param {string} baseTestId - The base test id to start with.
 * @param {TProps & TestIdProps} props - Component props that could contain a custom test id to append to the base test id.
 * @return {string} The generated test id.
 */
export const useTestId = <TProps extends Record<string, unknown>>(
  baseTestId: string,
  props?: TProps & TestIdProps
): string => {
  return useMemo((): string => {
    if (!props) return baseTestId;
    const { testId } = props;
    if (!testId || !isNonEmptyString(testId)) return baseTestId;
    if (props?.overrideTestId) return testId;
    return `${baseTestId} ${testId}`;
  }, [props, baseTestId]);
};

/**
 * Returns the given `attribute`'s value, or `undefined` if it is `null`.
 *
 * @template {Primitives} TAttributeValue - The type of the attribute value.
 *
 * @param {Nullish<TArttributeValue>} attribute - The attribute value or null.
 * @returns {Optional<TAttributeValue>} The given attribute value, or `undefined` if it is `null`.
 */
export const useHtmlAttribute = <TAttributeValue extends Primitives>(
  attribute: Nullish<TAttributeValue>
): Optional<NonNullable<TAttributeValue>> =>
  useMemo<Optional<TAttributeValue>>(() => {
    if (isNull(attribute)) return undefined;
    return attribute;
  }, [attribute]);

/**
 * Returns the `className` prop from the given `props` object, or `undefined` if it is not provided or is an empty string.
 *
 * @template {StyleOverrideProps} TProps - The object containing the `className` prop.
 *
 * @param {TProps} props - The object containing the `className` prop.
 * @return {Optional<string>} The `className` prop, or `undefined` if it is not provided.
 */
export const useClassName = <TProps extends StyleOverrideProps>(
  props?: TProps
): Optional<string> => {
  return useMemo((): Optional<string> => {
    if (!props || !("className" in props)) return undefined;
    return props?.className ?? undefined;
  }, [props]);
};
