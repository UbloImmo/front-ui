import { useMemo } from "react";
import styled from "styled-components";

import { hypertextStyle } from "./Hypertext.styles";
import { DefaultHypertextProps, HypertextProps } from "./Hypertext.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

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
};

/**
 * Renders a hyperlink component with a text and an icon.
 *
 * @version 0.0.3
 *
 * @param {HypertextProps} props - The hypertext's props
 * @return {JSX.Element} The rendered hypertext
 */
const Hypertext = (props: HypertextProps): JSX.Element => {
  const { warn } = useLogger("Hypertext");

  const mergedProps = useMergedProps(defaultHypertextProps, props);
  const testId = useTestId("hypertext");
  const styleProps = useStyleProps(mergedProps);
  const { children, href, title, color } = mergedProps;

  if (isEmptyString(href)) {
    warn(`Missing required href, please provide a redirection link`);
  }

  if (isEmptyString(title)) {
    warn(
      `Missing required title, please provide a title for better accessibility`,
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

  return (
    <HypertextContainer
      title={title}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
      {...styleProps}
    >
      <Text size="m" weight="medium" color={textColor} underline>
        {children}
      </Text>
      <Icon name="BoxArrowUpRight" size="s-3" color={iconColor} />
    </HypertextContainer>
  );
};

Hypertext.defaultProps = defaultHypertextProps;

export { Hypertext };

const HypertextContainer = styled.a<StyleProps<DefaultHypertextProps>>`
  ${hypertextStyle};
`;
