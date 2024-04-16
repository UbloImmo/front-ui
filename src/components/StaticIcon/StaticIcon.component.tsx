import { useMemo } from "react";
import styled from "styled-components";

import {
  staticIconSizeToIconSizeMap,
  staticIconStyle,
} from "./StaticIcon.styles";
import { DefaultStaticIconProps, StaticIconProps } from "./StaticIcon.types";
import { Icon, IconProps } from "../Icon";

import { PaletteColor, StyleProps } from "@types";
import { mergeDefaultProps, useStyleProps } from "@utils";

const defaultStaticIconProps: DefaultStaticIconProps = {
  color: "primary",
  size: "s",
  stroke: false,
  name: Icon.defaultProps.name,
};

/**
 * Wraps an `Icon` in a container of the same color, a shade lighter.
 *
 * @version 0.0.2
 *
 * @param {StaticIconProps} props - The props for the static icon.
 * @return {JSX.Element} The static icon component.
 */
const StaticIcon = (props: StaticIconProps) => {
  const mergedProps = useMemo(
    () => mergeDefaultProps(defaultStaticIconProps, props),
    [props]
  );

  const { color, size, name } = mergedProps;
  const styledProps = useStyleProps(mergedProps);
  const iconProps = useMemo<Pick<IconProps, "color" | "size">>(() => {
    const iconSize = staticIconSizeToIconSizeMap[size];
    const iconColor: PaletteColor =
      color === "gray"
        ? "gray-600"
        : color === "white"
        ? "gray-500"
        : `${color}-base`;

    return {
      color: iconColor,
      size: iconSize,
    };
  }, [color, size]);

  return (
    <StaticIconContainer data-testid="static-icon" {...styledProps}>
      <Icon name={name} {...iconProps}></Icon>
    </StaticIconContainer>
  );
};

StaticIcon.defaultProps = defaultStaticIconProps;

export { StaticIcon };

const StaticIconContainer = styled.div<StyleProps<DefaultStaticIconProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${staticIconStyle}
`;
