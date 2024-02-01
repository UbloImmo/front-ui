import {
  CustomIconName,
  DefaultIconProps,
  IconName,
  IconProps,
  customIconNames,
  BootstrapIcon,
} from "./Icon.types";
import { Nullable } from "@ubloimmo/front-util";
import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../utils";
import { useMemo } from "react";
import * as bootstrapIcons from "react-bootstrap-icons";

const defaultIconProps: DefaultIconProps = {
  size: "1rem",
  color: "primary-base",
  name: "Circle",
};

const isCustomIconName = (name: IconName): name is CustomIconName => {
  return customIconNames.includes(name);
};

export const Icon = (props: IconProps) => {
  const mergedProps = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );
  const { size, color } = useMemo(
    () => ({
      size: cssLengthUsage(mergedProps.size),
      color: cssVarUsage(mergedProps.color),
    }),
    [mergedProps]
  );

  const IconComponent = useMemo<Nullable<BootstrapIcon>>(() => {
    if (isCustomIconName(mergedProps.name)) {
      // TODO: implement support for custom icons
      return null;
    }
    return bootstrapIcons[mergedProps.name];
  }, [mergedProps]);

  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} />;
};
