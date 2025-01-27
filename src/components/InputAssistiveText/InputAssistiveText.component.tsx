import { isNull } from "@ubloimmo/front-util";
import styled from "styled-components";

import { Text } from "../Text/Text.component";

import { isNonEmptyString, useLogger, useMergedProps, useTestId } from "@utils";

import type {
  DefaultInputAssistiveTextProps,
  InputAssistiveTextProps,
} from "./InputAssistiveText.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultInputAssistiveTextProps: DefaultInputAssistiveTextProps = {
  assistiveText: null,
  errorText: null,
  error: false,
};

/**
 * Renders an assistive text for the Input component based on the provided props.
 *
 * @version 0.0.3
 *
 * @param {InputAssistiveTextProps & TestIdProps} props - The properties for the assistive text.
 * @return {Nullable<JSX.Element>} The JSX element representing the assistive text.
 */
const InputAssistiveText = (
  props: InputAssistiveTextProps & TestIdProps,
): Nullable<JSX.Element> => {
  const mergedProps = useMergedProps<
    DefaultInputAssistiveTextProps,
    InputAssistiveTextProps
  >(defaultInputAssistiveTextProps, props);

  const { assistiveText, errorText, error } = mergedProps;
  const { warn } = useLogger("InputAssistiveText");
  const testId = useTestId("assistive-text", props);

  if (
    (isNull(assistiveText) || !isNonEmptyString(assistiveText)) &&
    (isNull(errorText) || !isNonEmptyString(errorText))
  ) {
    warn("InputAssistiveText must have a defined assistiveText or errorText.");
    return null;
  }

  if (error && !isNonEmptyString(errorText)) {
    warn("errorText is missing. If error is true, errorText must be defined.");
  }
  return (
    <InnerAssistiveText data-testid={testId}>
      {error && isNonEmptyString(errorText) ? (
        <Text size="s" color="error-base">
          {errorText}
        </Text>
      ) : (
        <Text size="s" color="gray-400">
          {assistiveText}
        </Text>
      )}
    </InnerAssistiveText>
  );
};

InputAssistiveText.defaultProps = defaultInputAssistiveTextProps;
export { InputAssistiveText };

const InnerAssistiveText = styled.div`
  display: flex;
  flex-direction: column;
`;
