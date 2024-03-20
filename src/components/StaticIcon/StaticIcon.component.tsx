import styled from "styled-components";
import { Icon, IconProps } from "../Icon";
import { DefaultStaticIconProps, StaticIconProps } from "./StaticIcon.types";
import { useMemo } from "react";
import { PaletteColor } from "../../types";
import { defaultIconProps } from "../Icon/Icon.component";
import { mergeDefaultProps } from "../../utils";
import {
  staticIconSizeToIconSizeMap,
  staticIconStyle,
} from "./StaticIcon.styles";

const defaultStaticIconProps: DefaultStaticIconProps = {
  color: "primary",
  size: "s",
  stroke: false,
  name: defaultIconProps.name,
};

/**
 * Renders a static icon based on the provided props.
 *
 * @param {StaticIconProps} props - The props for the static icon.
 * @return {JSX.Element} The static icon component.
 */
export const StaticIcon = (props: StaticIconProps) => {
  const mergedProps = useMemo(
    () => mergeDefaultProps(defaultStaticIconProps, props),
    [props]
  );

  const { color, size, name } = mergedProps;
  const iconProps = useMemo<Pick<IconProps, "color" | "size">>(() => {
    const iconSize = staticIconSizeToIconSizeMap[size];
    const iconColor: PaletteColor =
      color === "gray" ? "gray-600" : `${color}-base`;

    return {
      color: iconColor,
      size: iconSize,
    };
  }, [color, size]);

  return (
    <StaticIconContainer data-testid="static-icon" {...mergedProps}>
      <Icon name={name} {...iconProps}></Icon>
    </StaticIconContainer>
  );
};

const StaticIconContainer = styled.div<DefaultStaticIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${staticIconStyle}
`;
