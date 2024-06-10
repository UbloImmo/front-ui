import {
  isBoolean,
  isFunction,
  isNullish,
  isObject,
  transformObject,
} from "@ubloimmo/front-util";
import { useMemo, type ReactNode } from "react";

import { parseFixedLengthToPx } from "@/sizes/size.utils";
import { useLogger } from "@utils";

import type {
  PopoverContentFn,
  PopoverOnOpenChangeFn,
  ControlledPopoverDefaultProps,
  ControlledPopoverPropsExtension,
  PopoverDefaultProps,
  UncontrolledPopoverDefaultProps,
  PopoverCollisionPadding,
  PopoverPrimitiveCollisionPadding,
} from "./Popover.types";
import type { FixedCssLength } from "@types";

/**
 * Checks if the given mergedProps object represents a controlled popover.
 *
 * @param {PopoverDefaultProps} mergedProps - The merged props object.
 * @return {mergedProps is ControlledPopoverDefaultProps} Returns true if the mergedProps object is a controlled popover, false otherwise.
 */
const isControlledPopover = (
  mergedProps: PopoverDefaultProps
): mergedProps is ControlledPopoverDefaultProps => {
  return (
    "open" in mergedProps &&
    isBoolean(mergedProps.open) &&
    "onOpenChange" in mergedProps &&
    isFunction<PopoverOnOpenChangeFn>(mergedProps.onOpenChange)
  );
};

/**
 * Checks if the given mergedProps object represents a partially controlled popover.
 *
 * @param {PopoverDefaultProps} mergedProps - The merged props object.
 * @return {mergedProps is UncontrolledPopoverDefaultProps & Partial<ControlledPopoverPropsExtension>} Returns true if the mergedProps object is a partially controlled popover, false otherwise.
 */
const isPartiallyControlledPopover = (
  mergedProps: PopoverDefaultProps
): mergedProps is UncontrolledPopoverDefaultProps &
  Partial<ControlledPopoverPropsExtension> => {
  return (
    ("open" in mergedProps && !("onOpenChange" in mergedProps)) ||
    ("onOpenChange" in mergedProps && !("open" in mergedProps))
  );
};

/**
 * A react hook that extracts the extra controlled popover props
 * if all necessary props are provided and logs and error if some are missing.
 *
 * @param {PopoverDefaultProps} mergedProps - The merged props object.
 * @return {ControlledPopoverPropsExtension | Record<string, never>} The controlled popover props or an empty object.
 */
export const useControlledPopoverProps = (
  mergedProps: PopoverDefaultProps
): ControlledPopoverPropsExtension | Record<string, never> => {
  const { error } = useLogger("Popover");

  return useMemo<
    ControlledPopoverPropsExtension | Record<string, never>
  >(() => {
    if (isPartiallyControlledPopover(mergedProps)) {
      error(
        "Popover is partially controlled. Either include both `open` and `onOpenChange` props or none."
      );
    }
    if (isControlledPopover(mergedProps))
      return {
        open: mergedProps.open,
        onOpenChange: mergedProps.onOpenChange,
      };
    return {} as Record<string, never>;
  }, [mergedProps, error]);
};

/**
 * A react hook that renders the content of a popover component based on the merged props.
 *
 * Basically runs the `content` prop if it is a function, otherwise returns it.
 *
 * @param {PopoverDefaultProps} mergedProps - The merged props of the popover component.
 * @return {ReactNode} The content of the popover component.
 */
export const usePopoverContent = (
  mergedProps: PopoverDefaultProps
): ReactNode => {
  return useMemo<ReactNode>(() => {
    if (isFunction<PopoverContentFn>(mergedProps.content))
      return mergedProps.content();
    return mergedProps.content;
  }, [mergedProps]);
};

/**
 * Converts the side offset (px number) of a popover component
 * based on the provided side offset (fixed css length).
 *
 * @param {FixedCssLength} offset - The offset to convert.
 * @return {number} The convert offset in pixels.
 */
export const usePopoverOffset = (offset: FixedCssLength): number => {
  return useMemo<number>(() => {
    return parseFixedLengthToPx(offset);
  }, [offset]);
};

/**
 * A react hook that that parses a popover's collision padding
 * for it to be compatible with radix-ui's `Popover.Content`'s `collisionPadding` prop.
 *
 * @param {PopoverCollisionPadding} padding - The padding object to convert.
 * @return {PopoverPrimitiveCollisionPadding} The converted collision padding object.
 */
export const usePopoverCollisionPadding = (
  padding: PopoverCollisionPadding
): PopoverPrimitiveCollisionPadding => {
  return useMemo<PopoverPrimitiveCollisionPadding>(() => {
    if (!isObject(padding)) return parseFixedLengthToPx(padding);
    return transformObject(padding, (length): number =>
      isNullish(length) ? 0 : parseFixedLengthToPx(length)
    );
  }, [padding]);
};
