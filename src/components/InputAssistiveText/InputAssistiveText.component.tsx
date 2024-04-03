import { Nullable } from "@ubloimmo/front-util";
import styled from "styled-components";

import {
  DefaultInputAssistiveTextProps,
  InputAssistiveTextProps,
} from "./InputAssistiveText.types";
import { Text } from "../Text/Text.component";

import { isNonEmptyString, useLogger, useMergedProps } from "@utils";

const defaultInputAssistiveTextProps: DefaultInputAssistiveTextProps = {
  assistiveText: "[Assistive text]",
  errorText: "[Error text]",
  error: false,
};

/**
 * Generate the assistive text for the input based on the provided props.
 *
 * @version 0.0.1
 * @param {DefaultInputAssistiveTextProps} props - The properties for the assistive text.
 * @return {Nullable<JSX.Element>} The JSX element representing the assistive text.
 */
const InputAssistiveText = (
  props: InputAssistiveTextProps
): Nullable<JSX.Element> => {
  const mergedProps = useMergedProps<
    DefaultInputAssistiveTextProps,
    InputAssistiveTextProps
  >(defaultInputAssistiveTextProps, props);

  const { assistiveText, errorText, error } = mergedProps;
  const { warn } = useLogger("InputAssistiveText");

  if (!isNonEmptyString(assistiveText) && !isNonEmptyString(errorText)) {
    warn("InputAssistiveText must have a defined assistiveText or errorText.");
    return null;
  }

  if (error && !isNonEmptyString(errorText)) {
    warn("errorText is missing. If error is true, errorText must be defined.");
  }
  return (
    <InnerAssistiveText data-testid="assistive-text">
      <Text size="xs" color="gray-400">
        {assistiveText}
      </Text>
      {error && isNonEmptyString(errorText) && (
        <Text size="xs" color="error-base">
          {errorText}
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
