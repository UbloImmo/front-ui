import { useMemo } from "react";
import styled from "styled-components";

import { contextLineStyles } from "./ContextLine.styles";
import { Badge } from "../Badge";
import { Text } from "../Text";

import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  ContextLineProps,
  ContextLineDefaultProps,
} from "./ContextLine.types";
import type { StyleProps, TestIdProps } from "@types";

const defaultContextLineProps: ContextLineDefaultProps = {
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

  if (!mergedProps.label) warn("Missing label prop");

  const label = useMemo(() => `${mergedProps.label}`, [mergedProps.label]);

  return (
    <ContextLineContainer data-testid={testId} {...styledProps}>
      <Text weight="medium" testId="context-line-label" overrideTestId>
        {label} :
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
