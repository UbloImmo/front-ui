import { useMemo } from "react";
import styled from "styled-components";

import {
  staticIconIndicatorContainerStyle,
  staticIconSizeToIconSizeMap,
  staticIconStyle,
} from "./StaticIcon.styles";
import { Icon, type IconProps } from "../Icon";
import { Tooltip } from "../Tooltip";

import {
  useHtmlAttribute,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type {
  DefaultStaticIconProps,
  StaticIconProps,
} from "./StaticIcon.types";
import type { PaletteColor, StyleProps, TestIdProps } from "@types";

const defaultStaticIconProps: DefaultStaticIconProps = {
  color: "primary",
  size: "s",
  stroke: false,
  name: Icon.defaultProps.name,
  className: null,
  indicator: null,
};

/**
 * Wraps an `Icon` in a container of the same color, a shade lighter.
 *
 * @version 0.0.5
 *
 * @param {StaticIconProps & TestIdProps} props - The props for the static icon.
 * @return {JSX.Element} The static icon component.
 */
const StaticIcon = (props: StaticIconProps & TestIdProps) => {
  const mergedProps = useMergedProps(defaultStaticIconProps, props);

  const { color, size, name, indicator } = mergedProps;
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

  const testId = useTestId("static-icon", props);

  const className = useHtmlAttribute(mergedProps.className);

  return (
    <StaticIconContainer
      data-testid={testId}
      className={className}
      {...styledProps}
    >
      <Icon name={name} {...iconProps} />
      {indicator && (
        <StaticIconIndicatorContainer data-testid="static-icon-indicator">
          {indicator.tooltip ? (
            <Tooltip {...indicator.tooltip}>
              <Icon name={indicator.name} color={indicator.color} size="10px" />
            </Tooltip>
          ) : (
            <Icon name={indicator.name} color={indicator.color} size="10px" />
          )}
        </StaticIconIndicatorContainer>
      )}
    </StaticIconContainer>
  );
};

StaticIcon.defaultProps = defaultStaticIconProps;

export { StaticIcon };

const StaticIconContainer = styled.div<StyleProps<DefaultStaticIconProps>>`
  ${staticIconStyle}
`;

const StaticIconIndicatorContainer = styled.div`
  ${staticIconIndicatorContainerStyle}
`;
