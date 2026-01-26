import styles from "./Badge.module.scss";
import { useBadgeStyle } from "./Badge.styles";
import { Icon } from "../Icon/Icon.component";
import { Text } from "../Text/Text.component";

import {
  isEmptyString,
  useHtmlAttribute,
  useLogger,
  useMergedProps,
  useTestId,
} from "@utils";

import type { BadgeProps, DefaultBadgeProps } from "./Badge.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultBadgeProps: DefaultBadgeProps = {
  label: null,
  icon: null,
  color: "primary",
  shade: "light",
  className: null,
  styleOverride: null,
};

/**
 * Renders a Badge component, with an optionnal Icon and a required Text.
 *
 * @remarks Badge shades are based on two sets of colors, light and dark, depending on the shade prop.
 *
 * @version 0.1.0
 *
 * @param {BadgeProps} props - the props for the Badge component
 * @return {Nullable<JSX.Element>} the Badge component
 */

const Badge = (props: BadgeProps & TestIdProps): Nullable<JSX.Element> => {
  const { warn } = useLogger("Badge");
  const mergedProps = useMergedProps(defaultBadgeProps, props);
  const testId = useTestId<TestIdProps>("badge", props);
  const { label, icon } = mergedProps;

  const { className, style, iconColor, textColor } = useBadgeStyle(mergedProps);

  const title = useHtmlAttribute(label);

  if ((!label || isEmptyString(label)) && !icon) {
    warn("Both label and icon are missing, please provide at least one");
    return null;
  }

  return (
    <div
      className={className}
      style={style}
      data-testid={testId}
      role="status"
      title={title}
    >
      {icon && (
        <Icon
          data-testid="badge-icon"
          color={iconColor}
          name={icon}
          size="s-3"
        />
      )}
      {label && !isEmptyString(label) && (
        <Text
          className={styles["badge-text"]}
          size="s"
          color={textColor}
          weight="medium"
          fill
          ellipsis
        >
          {label}
        </Text>
      )}
    </div>
  );
};

Badge.defaultProps = defaultBadgeProps;
export { Badge };
