import styled from "styled-components";
import { Icon } from "../Icon/Icon.component";
import { Text } from "../Text/Text.component";
import {
  badgeShadeStyleMap,
  badgeStyle,
  grayBadgeShadeStyleMap,
} from "./Badge.styles";
import { BadgeProps, DefaultBadgeProps } from "./Badge.types";
import { mergeDefaultProps, useStyleProps } from "../../utils";
import { useMemo } from "react";
import { PaletteColor, StyleProps } from "../../types";

export const defaultBadgeProps: DefaultBadgeProps = {
  label: "label",
  icon: "Square",
  color: "primary",
  shade: "light",
};

const Badge = (props: BadgeProps) => {
  const mergedProps = useMemo(
    () => mergeDefaultProps(defaultBadgeProps, props),
    [props]
  );
  const { color, shade, label, icon } = mergedProps;
  const styledProps = useStyleProps(mergedProps);
  const { iconColor, textColor } =
    color === "gray"
      ? grayBadgeShadeStyleMap[shade]
      : badgeShadeStyleMap[shade];

  const iconColorStyle = `${color}-${iconColor}` as PaletteColor;
  const textColorStyle = `${color}-${textColor}` as PaletteColor;

  return (
    <BadgeContainer data-testid="badge" {...styledProps}>
      {icon && (
        <Icon data-testid="badge-icon" color={iconColorStyle} name={icon} />
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
  ${badgeStyle}
`;
