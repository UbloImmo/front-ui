import { DefaultIconProps, GeneratedIcon, IconProps } from "./Icon.types";
import { Nullable, isNumber } from "@ubloimmo/front-util";
import {
  cssVarName,
  isSpacingLabel,
  isCssRem,
  mergeDefaultProps,
  cssRem,
} from "../../utils";
import { useMemo } from "react";
import * as generatedIcons from "./__generated__";
import { UNIT_PX } from "../../types";

export const defaultIconProps: DefaultIconProps = {
  size: "s-4",
  color: "primary-base",
  name: "Circle",
};

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
  if (!props.name) console.warn("Missing name prop for `Icon` component.");
  const { name, color, size } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );

  const IconComponent = useMemo<Nullable<GeneratedIcon>>(
    () => generatedIcons[name] ?? null,
    [name]
  );

  const parsedSize = useMemo(() => {
    // TODO: handle first render if css not loaded
    if (isSpacingLabel(size)) {
      const propValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(cssVarName(size));
      // use rem is available
      if (isCssRem(propValue)) return propValue;
      // compute rem when variables have not yet loaded
      if (size === "s-05") return cssRem(0.125);
      const sizeMultiplier = parseInt(size.split("s-")[1]);
      // default to 1 if not computable
      if (!isNumber(sizeMultiplier)) {
        console.warn("unsupported spacing provided to `Icon` component");
        return cssRem(1);
      }
      return cssRem(sizeMultiplier / UNIT_PX);
    }
    return size;
  }, [size]);

  if (!IconComponent) return null;
  return <IconComponent size={parsedSize} color={color} />;
};
