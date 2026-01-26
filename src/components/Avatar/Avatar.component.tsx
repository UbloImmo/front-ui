import { isBoolean, isString, type Nullable } from "@ubloimmo/front-util";
import { isValidElement, useMemo, type ReactNode } from "react";

import {
  isAvatarPropsCount,
  isAvatarPropsFirstLastName,
  isAvatarPropsFullName,
  isAvatarPropsWithUrl,
} from "./Avatar.utils";
import { Tooltip } from "../Tooltip";
import styles from "./Avatar.module.scss";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useTestId, useMergedProps, useLogger, useCssClasses } from "@utils";

import type { AvatarProps, AvatarDefaultProps } from "./Avatar.types";
import type { PaletteColor, TestIdProps } from "@types";

const defaultAvatarProps: AvatarDefaultProps = {
  size: "m",
  firstName: "",
  lastName: "",
  avatarUrl: null,
  organization: false,
  tooltip: false,
  tooltipDirection: "right",
};

/**
 *
 * A visual reference for the user's profile, using its image or its initials.
 *
 * @version 0.1.0
 *
 * @param {AvatarProps & TestIdProps} props - Avatar component props
 * @returns {Nullable<JSX.Element>}
 */
const Avatar = (props: AvatarProps & TestIdProps): Nullable<JSX.Element> => {
  const { error, warn } = useLogger("Avatar");
  const mergedProps = useMergedProps<AvatarDefaultProps, AvatarProps>(
    { ...props, ...defaultAvatarProps },
    props
  );

  const testId = useTestId("avatar", props as TestIdProps);

  /**
   * The avatar's text content
   */
  const textContent = useMemo<Nullable<string>>(() => {
    if (isAvatarPropsCount(mergedProps, warn)) {
      return `+${mergedProps.count}`;
    }

    if (isAvatarPropsFirstLastName(mergedProps)) {
      return `${mergedProps.firstName
        .charAt(0)
        .toUpperCase()}${mergedProps.lastName.charAt(0).toUpperCase()}`;
    }

    if (isAvatarPropsFullName(mergedProps)) {
      if (!mergedProps.name.includes(" ")) {
        return mergedProps.name.charAt(0).toUpperCase();
      }
      return mergedProps.name
        .split(" ")
        .map((char) => char.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("");
    }

    return null;
  }, [mergedProps, warn]);

  /**
   * The avatar's text color
   */
  const textColor = useMemo<PaletteColor>(() => {
    return isAvatarPropsCount(mergedProps) ? "gray-600" : "primary-base";
  }, [mergedProps]);

  const isCount = useMemo(() => isAvatarPropsCount(mergedProps), [mergedProps]);

  const className = useCssClasses(
    styles.avatar,
    [styles.organization, mergedProps.organization],
    [styles.count, isCount]
  );

  /**
   * The avatar's rendered content
   */
  const AvatarContent = useMemo(
    () => (
      <div
        className={className}
        data-size={mergedProps.size}
        data-testid={testId}
      >
        {isAvatarPropsWithUrl(mergedProps) && textContent ? (
          <img
            className={styles["avatar-image"]}
            data-testid="avatar-image"
            src={mergedProps.avatarUrl}
            alt={textContent}
          />
        ) : mergedProps.size === "m" ? (
          <Text
            size="s"
            weight="bold"
            testId="avatar-text"
            overrideTestId
            align="center"
            color={textColor}
          >
            {textContent}
          </Text>
        ) : (
          <Heading
            size={mergedProps.size === "l" ? "h3" : "h1"}
            weight="bold"
            testId="avatar-text"
            align="center"
            overrideTestId
            color={textColor}
          >
            {textContent}
          </Heading>
        )}
      </div>
    ),
    [className, mergedProps, testId, textContent, textColor]
  );

  const tooltipContent = useMemo<Nullable<ReactNode>>(() => {
    // abort if falsy
    if (!mergedProps.tooltip) return null;
    // render custom tooltip content if provided and renderable
    if (isString(mergedProps.tooltip) || isValidElement(mergedProps.tooltip)) {
      return mergedProps.tooltip;
    }
    // abort if not a boolean
    if (!isBoolean(mergedProps.tooltip)) return null;
    // abort if `count` variant
    if (isAvatarPropsCount(mergedProps)) return null;
    // render name if provided
    if (isAvatarPropsFirstLastName(mergedProps))
      return `${mergedProps.firstName} ${mergedProps.lastName}`;
    if (isAvatarPropsFullName(mergedProps)) return mergedProps.name;
    return null;
  }, [mergedProps]);

  if (!textContent) {
    error("Unable to compute text content");
    return null;
  }

  // render content inside a tooltip if provided
  if (tooltipContent) {
    return (
      <Tooltip
        direction={mergedProps.tooltipDirection}
        content={tooltipContent}
      >
        {AvatarContent}
      </Tooltip>
    );
  }

  return AvatarContent;
};
Avatar.defaultProps = defaultAvatarProps;

export { Avatar };
