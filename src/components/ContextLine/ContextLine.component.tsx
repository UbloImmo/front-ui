import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  ContextLineProps,
  ContextLineDefaultProps,
} from "./ContextLine.types";
import type { StyleProps, TestIdProps } from "@types";
import styled from "styled-components";
import { contextLineStyles } from "./ContextLine.styles";
import { Text } from "../Text";
import { Badge } from "../Badge";

const defaultContextLineProps: ContextLineDefaultProps = {
  first: "default",
  label: "[label]",
  children: <Badge label="Children" color="primary" />,
};

/**
 *
 * Use ContextLine inside contextual areas to display current state of something.
 *
 * @version 0.0.1
 *
 * @param {ContextLineProps & TestIdProps} props - ContextLine component props
 * @returns {JSX.Element}
 */
const ContextLine = (props: ContextLineProps & TestIdProps): JSX.Element => {
  const { log, warn } = useLogger("ContextLine", { hideLogs: true });
  const mergedProps = useMergedProps(defaultContextLineProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("context-line", props);

  log(mergedProps);

  if (!props.label) warn("Missing label prop");

  return (
    <ContextLineContainer data-testid={testId} {...styledProps}>
      <Text weight="medium" testId="context-line-label" overrideTestId>
        {mergedProps.label} :
      </Text>
      {mergedProps.children}
    </ContextLineContainer>
  );
};

ContextLine.defaultProps = defaultContextLineProps;

export { ContextLine };

const ContextLineContainer = styled.div<StyleProps<ContextLineProps>>`
  ${contextLineStyles}
`;
