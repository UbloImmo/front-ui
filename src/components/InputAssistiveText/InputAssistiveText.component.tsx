import { isNull } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { Icon } from "../Icon";
import { Text } from "../Text/Text.component";

import { FlexRowLayout } from "@layouts";
import { isNonEmptyString, useLogger, useMergedProps, useTestId } from "@utils";

import type {
  DefaultInputAssistiveTextProps,
  InputAssistiveTextProps,
} from "./InputAssistiveText.types";
import type { PaletteColor, TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultInputAssistiveTextProps: DefaultInputAssistiveTextProps = {
  assistiveText: null,
  assistiveTextIcon: "SquircleInfo",
  showAssistiveTextIcon: false,
  errorText: null,
  error: false,
};

/**
 * Renders an assistive text for the Input component based on the provided props.
 *
 * @version 0.0.5
 *
 * @param {InputAssistiveTextProps & TestIdProps} props - The properties for the assistive text.
 * @return {Nullable<JSX.Element>} The JSX element representing the assistive text.
 */
const InputAssistiveText = (
  props: InputAssistiveTextProps & TestIdProps
): Nullable<JSX.Element> => {
  const mergedProps = useMergedProps<
    DefaultInputAssistiveTextProps,
    InputAssistiveTextProps
  >(defaultInputAssistiveTextProps, props);

  const {
    assistiveText,
    errorText,
    error,
    showAssistiveTextIcon,
    assistiveTextIcon,
  } = mergedProps;
  const { warn } = useLogger("InputAssistiveText");
  const testId = useTestId("assistive-text", props);

  const iconColor = useMemo<PaletteColor>(
    () => (error ? "error-base" : "gray-400"),
    [error]
  );

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
    <FlexRowLayout
      testId={testId}
      overrideTestId
      fill
      justify="start"
      align="center"
      gap="s-1"
    >
      {showAssistiveTextIcon && (
        <Icon name={assistiveTextIcon} size="s-3" color={iconColor} />
      )}
      {error && isNonEmptyString(errorText) ? (
        <Text size="xs" color="error-base" testId="error-text" fill>
          {errorText}
        </Text>
      ) : (
        <Text size="xs" color="gray-400" testId="assistive-text" fill>
          {assistiveText}
        </Text>
      )}
    </FlexRowLayout>
  );
};

InputAssistiveText.defaultProps = defaultInputAssistiveTextProps;
export { InputAssistiveText };
