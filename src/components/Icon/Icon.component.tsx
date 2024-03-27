import { useMemo } from "react";

import * as generatedIcons from "./__generated__";
import { DefaultIconProps, GeneratedIcon, IconProps } from "./Icon.types";
import { useIconSize } from "./Icon.utils";
import { mergeDefaultProps, useLogger } from "../../utils";

import type { Nullable } from "@ubloimmo/front-util";

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
 * @version 0.0.1
 *
 * @param {IconProps} props - The props for the icon component.
 * @return {JSX.Element | null} The rendered icon component or null if the icon component is not found.
 */
const Icon = (props: IconProps) => {
  const { warn } = useLogger("Icon");

  if (!props.name) warn("Missing name prop");
  const { name, color, size } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );

  const IconComponent = useMemo<Nullable<GeneratedIcon>>(
    () => generatedIcons[name] ?? null,
    [name]
  );

  // sanitize size before passing it as svg width & height
  const parsedSize = useIconSize(size, warn);

  if (!IconComponent) {
    warn(`No icon component found for name "${name}"`);
    return null;
  }
  return <IconComponent size={parsedSize} color={color} />;
};

Icon.defaultProps = defaultIconProps;

export { Icon };
