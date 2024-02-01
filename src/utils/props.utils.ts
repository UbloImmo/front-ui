import {
  isUndefined,
  objectEntries,
  objectFromEntries,
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
) => {
  return objectFromEntries(
    objectEntries(defaultProps).map(([key, value]) => [
      key,
      isUndefined(props[key]) ? value : props[key],
    ])
  ) as TDefaultProps;
};
