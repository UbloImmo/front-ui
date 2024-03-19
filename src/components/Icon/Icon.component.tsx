import { DefaultIconProps, GeneratedIcon, IconProps } from "./Icon.types";
import { Nullable, isNumber, Logger } from "@ubloimmo/front-util";
import {
  cssVarName,
  isSpacingLabel,
  isCssRem,
  mergeDefaultProps,
  cssRem,
  isCssLenthUsage,
} from "../../utils";
import { useMemo } from "react";
import * as generatedIcons from "./__generated__";
import { UNIT_PX, type SpacingLabel } from "../../types";

export const defaultIconProps: DefaultIconProps = {
  size: "s-4",
  color: "primary-base",
  name: "Circle",
};

const { warn } = Logger();

/**
 * Renders the appropriate icon component based on the provided props.
 *
 * This function first determines the icon name based on the provided props,
 * then looks up the corresponding icon component. If the icon component is
 * found, it is rendered with the provided size and color props. If the icon
 * component is not found, null is returned.
 *
 * @param {IconProps} props - The props for the icon component.
 * @return {JSX.Element | null} The rendered icon component or null if the icon component is not found.
 */
export const Icon = (props: IconProps) => {
  if (!props.name) warn("Missing name prop", "Icon");
  const { name, color, size } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );

  const IconComponent = useMemo<Nullable<GeneratedIcon>>(
    () => generatedIcons[name] ?? null,
    [name]
  );

  // sanitize size before passing it as svg width & height
  const parsedSize = useMemo(() => {
    if (!isCssLenthUsage(size)) {
      warn(`unsupported size (${size}) provided`, "Icon");
      return cssRem(1);
    }
    if (isSpacingLabel(size)) {
      const propValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(cssVarName(size));
      // use rem is available
      if (isCssRem(propValue)) return propValue;
      if (size === ("s-05" as SpacingLabel))
        // compute rem when variables have not yet loaded
        return cssRem(0.125);
      const sizeMultiplier = Number(size.split("s-")[1]);
      // default to 1 if not computable
      if (!isNumber(sizeMultiplier)) {
        warn(`unsupported size (${size}) provided`, "Icon");
        return cssRem(1);
      }
      return cssRem(sizeMultiplier / UNIT_PX);
    }
    return size;
  }, [size]);

  if (!IconComponent) {
    warn(`No icon component found for name "${name}"`, "Icon");
    return null;
  }
  return <IconComponent size={parsedSize} color={color} />;
};
