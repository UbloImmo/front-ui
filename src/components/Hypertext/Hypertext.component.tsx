import styled from "styled-components";

import { hypertextStyle } from "./Hypertext.styles";
import { HypertextProps } from "./Hypertext.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { isEmptyString, useLogger, useMergedProps } from "@utils";

const defaultHypertextProps: HypertextProps = {
  children: "[Hypertext]",
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
  const { children, href } = mergedProps;

  if (isEmptyString(href)) {
    warn(
      `Missing required href, please provide a redirection link to the component`
    );
  }

  return (
    <HypertextContainer
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid="hypertext"
    >
      <Text size="s" weight="medium">
        {children}
      </Text>
      <Icon name="BoxArrowUpRight" size="s-3" />
    </HypertextContainer>
  );
};

Hypertext.defaultProps = defaultHypertextProps;

export { Hypertext };

const HypertextContainer = styled.a`
  ${hypertextStyle};
`;
