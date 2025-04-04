import { MouseEventHandler, useCallback, useMemo } from "react";
import styled from "styled-components";

import { hypertextStyle } from "./Hypertext.styles";
import { DefaultHypertextProps, HypertextProps } from "./Hypertext.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexRowLayout } from "@layouts";
import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { PaletteColor, StyleProps } from "@types";

const defaultHypertextProps: DefaultHypertextProps = {
  children: "[Hypertext]",
  title: "",
  href: "",
  color: "primary",
  onClick: null,
};

/**
 * Renders a hyperlink component with a text and an icon.
 *
 * @version 0.0.5
 *
 * @param {HypertextProps} props - The hypertext's props
 * @return {JSX.Element} The rendered hypertext
 */
const Hypertext = (props: HypertextProps): JSX.Element => {
  const { warn } = useLogger("Hypertext");
  const mergedProps = useMergedProps(defaultHypertextProps, props);
  const testId = useTestId("hypertext");
  const styleProps = useStyleProps(mergedProps);
  const { children, href, title, color, onClick } = mergedProps;

  // Only warn about missing href if onClick is not provided
  if (isEmptyString(href || "") && !onClick) {
    warn(
      `Missing required href, please provide a redirection link or an onClick handler`
    );
  }

  if (isEmptyString(title)) {
    warn(
      `Missing required title, please provide a title for better accessibility`
    );
  }

  const textColor = useMemo<PaletteColor>(() => {
    if (color) {
      return color !== "gray" ? `${color}-base` : `gray-700`;
    }

    return "primary-base";
  }, [color]);

  const iconColor = useMemo<PaletteColor>(() => {
    if (color) {
      return color !== "gray"
        ? color === "pending"
          ? `${color}-dark`
          : `${color}-base`
        : `gray-700`;
    }

    return "primary-base";
  }, [color]);

  const handleClick = useCallback<MouseEventHandler>(
    (event) => {
      // If onClick is provided, use it and prevent default link behavior
      if (onClick) {
        event.preventDefault();
        onClick();
      }
      // Otherwise, let the default link behavior happen (href is used)
    },
    [onClick]
  );

  const content = useMemo(
    () => (
      <FlexRowLayout align="center" gap="s-1" inline>
        <Text size="m" weight="medium" color={textColor} underline>
          {children}
        </Text>
        <Icon name="BoxArrowUpRight" size="s-3" color={iconColor} />
      </FlexRowLayout>
    ),
    [children, iconColor, textColor]
  );

  if (onClick) {
    return (
      <HypertextButton
        title={title}
        onClick={handleClick}
        data-testid={testId}
        type="button"
        {...styleProps}
      >
        {content}
      </HypertextButton>
    );
  }

  return (
    <HypertextContainer
      title={title}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
      {...styleProps}
    >
      {content}
    </HypertextContainer>
  );
};

Hypertext.defaultProps = defaultHypertextProps;

export { Hypertext };

const HypertextContainer = styled.a<StyleProps<DefaultHypertextProps>>`
  ${hypertextStyle};
`;

const HypertextButton = styled.button<StyleProps<DefaultHypertextProps>>`
  ${hypertextStyle};
`;
