import styled from "styled-components";

import { hypertextStyle } from "./Hypertext.styles";
import { DefaultHypertextProps, HypertextProps } from "./Hypertext.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { isEmptyString, useLogger, useMergedProps } from "@utils";

const defaultHypertextProps: DefaultHypertextProps = {
  children: "[Hypertext]",
  title: "",
  href: "",
};

/**
 * Renders a hyperlink component with a text and an icon.
 *
 * @version 0.0.1
 *
 * @param {HypertextProps} props - The hypertext's props
 * @return {JSX.Element} The rendered hypertext
 */
const Hypertext = (props: HypertextProps): JSX.Element => {
  const { warn } = useLogger("Hypertext");

  const mergedProps = useMergedProps(defaultHypertextProps, props);
  const { children, href, title } = mergedProps;

  if (isEmptyString(href)) {
    warn(`Missing required href, please provide a redirection link`);
  }

  if (isEmptyString(title)) {
    warn(
      `Missing required title, please provide a title for better accessibility`
    );
  }

  return (
    <HypertextContainer
      title={title}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="hypertext"
    >
      <Text size="m" weight="medium" color="primary-base" underline>
        {children}
      </Text>
      <Icon name="BoxArrowUpRight" size="s-3" color="primary-base" />
    </HypertextContainer>
  );
};

Hypertext.defaultProps = defaultHypertextProps;

export { Hypertext };

const HypertextContainer = styled.a`
  ${hypertextStyle};
`;
