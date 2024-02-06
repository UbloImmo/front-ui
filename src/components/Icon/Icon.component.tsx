import { DefaultIconProps, GeneratedIcon, IconProps } from "./Icon.types";
import { Nullable } from "@ubloimmo/front-util";
import { mergeDefaultProps } from "../../utils";
import { useMemo } from "react";
import * as generatedIcons from "./__generated__";

const defaultIconProps: DefaultIconProps = {
  size: "1rem",
  color: "primary-base",
  name: "Circle",
};

export const Icon = (props: IconProps) => {
  const { name } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );
  const IconComponent = useMemo<Nullable<GeneratedIcon>>(
    () => generatedIcons[name] ?? null,
    [name]
  );

  if (!IconComponent) return null;
  return <IconComponent size={props.size} color={props.color} />;
};
