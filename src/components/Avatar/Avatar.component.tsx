import { useMemo } from "react";
import styled from "styled-components";

import { avatarStyles } from "./Avatar.styles";
import {
  isAvatarPropsCount,
  isAvatarPropsFirstLastName,
  isAvatarPropsFullName,
  isAvatarPropsWithUrl,
} from "./Avatar.utils";

import { useTestId, useMergedProps, useStyleProps, useLogger } from "@utils";

import { Heading, Text } from "@components";

import type { AvatarProps, AvatarDefaultProps } from "./Avatar.types";
import type { PaletteColor, StyleProps, TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultAvatarProps: AvatarDefaultProps = {
  size: "m",
  firstName: "",
  lastName: "",
  name: "",
  avatarUrl: null,
};

/**
 *
 * A visual reference for the user's profile, using its image or its initials.
 *
 * @version 0.0.1
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

  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("avatar", props as TestIdProps);

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
        .join("");
    }

    return null;
  }, [mergedProps, warn]);

  const textColor = useMemo<PaletteColor>(() => {
    return isAvatarPropsCount(mergedProps) ? "gray-600" : "primary-base";
  }, [mergedProps]);

  if (!textContent) {
    error("Unable to compute text content");
    return null;
  }

  return (
    <AvatarContainer data-testid={testId} {...styledProps}>
      {isAvatarPropsWithUrl(mergedProps) ? (
        <img
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
          color={textColor}
        >
          {textContent}
        </Text>
      ) : (
        <Heading
          size="h1"
          weight="bold"
          testId="avatar-text"
          overrideTestId
          color={textColor}
        >
          {textContent}
        </Heading>
      )}
    </AvatarContainer>
  );
};
Avatar.defaultProps = defaultAvatarProps;

export { Avatar };

const AvatarContainer = styled.div<StyleProps<AvatarDefaultProps>>`
  ${avatarStyles}
`;
