import { useMemo } from "react";
import styled from "styled-components";

import { avatarStyles } from "./Avatar.styles";
import { Text } from "../Text";

import { StyleProps, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, isNonEmptyString } from "@utils";

import type { AvatarProps, AvatarDefaultProps } from "./Avatar.types";

const defaultAvatarProps: AvatarDefaultProps = {
  size: "m",
  name: "",
  firstName: "",
  lastName: "",
  count: 2,
  avatarUrl: "https://t.ly/JSRp6",
};

/**
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {AvatarProps & TestIdProps} props - Avatar component props
 * @returns {JSX.Element}
 */
const Avatar = (props: AvatarProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("Avatar");
  const mergedProps = useMergedProps(defaultAvatarProps, props);
  const { name, firstName, lastName, count } = mergedProps;
  const testId = useTestId("avatar", props);
  // TODO

  const textContent = useMemo(() => {
    if (isNonEmptyString(firstName) && isNonEmptyString(lastName)) {
      return `${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`;
    } else if (count) {
      return `+${count}`;
    }

    return name.charAt(0).toUpperCase();
  }, [firstName, lastName, name, count]);
  log(mergedProps);

  return (
    <AvatarContainer data-testid={testId} {...mergedProps}>
      {/* <img src={avatarUrl} alt={name} /> */}
      <Text color="primary-base" weight="bold" size="s">
        {textContent}
      </Text>
    </AvatarContainer>
  );
};
Avatar.defaultProps = defaultAvatarProps;

export { Avatar };

const AvatarContainer = styled.div<StyleProps<AvatarProps>>`
  ${avatarStyles}
`;
