import { useMemo } from "react";

import {
  getStaticIconColors,
  staticIconSizeToIconSizeMap,
  useStaticIconStyles,
} from "./StaticIcon.styles";
import { Icon, type IconProps } from "../Icon";
import { Tooltip } from "../Tooltip";

import { useMergedProps, useTestId } from "@utils";

import type {
  DefaultStaticIconProps,
  StaticIconProps,
} from "./StaticIcon.types";
import type { TestIdProps } from "@types";

const defaultStaticIconProps: DefaultStaticIconProps = {
  color: "primary",
  size: "s",
  stroke: false,
  name: Icon.defaultProps.name,
  className: null,
  indicator: null,
  styleOverride: null,
};

/**
 * Wraps an `Icon` in a container of the same color, a shade lighter.
 * Optionally displays and additional indicator (icon + tooltip).
 *
 * @version 0.1.0
 *
 * @param {StaticIconProps & TestIdProps} props - The props for the static icon.
 * @return {JSX.Element} The static icon component.
 */
const StaticIcon = (props: StaticIconProps & TestIdProps) => {
  const mergedProps = useMergedProps(defaultStaticIconProps, props);

  const { color, size, name, indicator } = mergedProps;

  const colors = useMemo(() => getStaticIconColors(color), [color]);
  const { classNames, style } = useStaticIconStyles(colors, mergedProps);

  const iconProps = useMemo<Pick<IconProps, "color" | "size">>(() => {
    const iconSize = staticIconSizeToIconSizeMap[size];
    return {
      color: colors.icon,
      size: iconSize,
    };
  }, [colors.icon, size]);

  const testId = useTestId("static-icon", props);

  return (
    <div data-testid={testId} className={classNames.container} style={style}>
      <Icon name={name} {...iconProps} />
      {indicator && (
        <div
          className={classNames.indicator}
          data-testid="static-icon-indicator"
        >
          {indicator.tooltip ? (
            <Tooltip
              {...indicator.tooltip}
              testId="static-icon-indicator-tooltip"
            >
              <Icon name={indicator.name} color={indicator.color} size="10px" />
            </Tooltip>
          ) : (
            <Icon name={indicator.name} color={indicator.color} size="10px" />
          )}
        </div>
      )}
    </div>
  );
};

StaticIcon.defaultProps = defaultStaticIconProps;

export { StaticIcon };
