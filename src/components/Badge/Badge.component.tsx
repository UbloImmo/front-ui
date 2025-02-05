import { useMemo } from "react";
import styled from "styled-components";

import {
  badgeStyle,
  badgeShadeStyleMap,
  grayBadgeShadeStyleMap,
} from "./Badge.styles";
import { Icon } from "../Icon/Icon.component";
import { Text } from "../Text/Text.component";

import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { BadgeProps, DefaultBadgeProps } from "./Badge.types";
import type { PaletteColor, StyleProps, TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultBadgeProps: DefaultBadgeProps = {
  label: null,
  icon: null,
  color: "primary",
  shade: "light",
};
/**
 * Renders a Badge component, with an optionnal Icon and a required Text.
 *
 * @remarks Badge shades are based on two sets of colors, light and dark, depending on the shade prop.
 *
 * @version 0.0.8
 *
 * @param {BadgeProps} props - the props for the Badge component
 * @return {Nullable<JSX.Element>} the Badge component
 */

const Badge = (props: BadgeProps & TestIdProps): Nullable<JSX.Element> => {
  const { warn } = useLogger("Badge");
  const mergedProps = useMergedProps(defaultBadgeProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId<TestIdProps>("badge", props);
  const { color, shade, label, icon } = mergedProps;
  const { iconColorStyle, textColorStyle } = useMemo(() => {
    const { iconColor, textColor } =
      color === "gray"
        ? grayBadgeShadeStyleMap[shade]
        : badgeShadeStyleMap[shade];

    const iconColorStyle = `${color}-${iconColor}` as PaletteColor;
    const textColorStyle = `${color}-${textColor}` as PaletteColor;

    return { iconColorStyle, textColorStyle };
  }, [color, shade]);

  if ((!label || isEmptyString(label)) && !icon) {
    warn("Both label and icon are missing, please provide at least one");
    return null;
  }

  return (
    <BadgeContainer data-testid={testId} {...styledProps} role="status">
      {icon && (
        <Icon
          data-testid="badge-icon"
          color={iconColorStyle}
          name={icon}
          size="s-3"
        />
      )}
      {label && !isEmptyString(label) && (
        <Text size="s" color={textColorStyle} weight="medium" fill ellipsis>
          {label}
        </Text>
      )}
    </BadgeContainer>
  );
};

Badge.defaultProps = defaultBadgeProps;
export { Badge };

const BadgeContainer = styled.div<StyleProps<DefaultBadgeProps>>`
  ${badgeStyle}
`;
