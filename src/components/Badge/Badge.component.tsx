import { useMemo } from "react";
import styled from "styled-components";
import { PaletteColor, StyleProps } from "../../types";
import { useMergedProps, useStyleProps } from "../../utils";
import { Icon } from "../Icon/Icon.component";
import { Text } from "../Text/Text.component";
import {
  backgroundShade,
  badgeShadeStyleMap,
  grayBadgeShadeStyleMap,
} from "./Badge.styles";
import { BadgeProps, DefaultBadgeProps } from "./Badge.types";

export const defaultBadgeProps: DefaultBadgeProps = {
  label: "label",
  icon: "Square",
  color: "primary",
  shade: "light",
};
/**
 * Renders a Badge component, with an optionnal Icon and a required Text.
 * Badge shades are based on two sets of colors, light and dark, depending on the shade prop.
 *
 * @version 0.0.1
 *
 * @param {BadgeProps} props - the props for the Badge component
 * @return {JSX.Element} the Badge component
 */

const Badge = (props: BadgeProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultBadgeProps, props);
  const { color, shade, label, icon } = mergedProps;
  const styledProps = useStyleProps(mergedProps);
  const { iconColorStyle, textColorStyle } = useMemo(() => {
    const { iconColor, textColor } =
      color === "gray"
        ? grayBadgeShadeStyleMap[shade]
        : badgeShadeStyleMap[shade];

    const iconColorStyle = `${color}-${iconColor}` as PaletteColor;
    const textColorStyle = `${color}-${textColor}` as PaletteColor;

    return { iconColorStyle, textColorStyle };
  }, [color, shade]);

  return (
    <BadgeContainer data-testid="badge" {...styledProps}>
      {icon && (
        <Icon
          data-testid="badge-icon"
          color={iconColorStyle}
          name={icon}
          size="s-3"
        />
      )}
      <Text size="s" color={textColorStyle}>
        {label}
      </Text>
    </BadgeContainer>
  );
};

Badge.defaultProps = defaultBadgeProps;
export { Badge };

const BadgeContainer = styled.div<StyleProps<DefaultBadgeProps>>`
  ${backgroundShade}
`;
