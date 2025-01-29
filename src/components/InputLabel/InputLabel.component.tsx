import { useMemo } from "react";
import styled from "styled-components";

import {
  isNonEmptyString,
  useClassName,
  useHtmlAttribute,
  useLogger,
  useMergedProps,
  useTestId,
} from "../../utils";
import { Text } from "../Text/Text.component";
import { Tooltip } from "../Tooltip";
import { inputLabelStyles, inputLabelTextStyles } from "./InputLabel.styles";

import { FlexRowLayout } from "@layouts";

import type {
  DefaultInputLabelProps,
  InputLabelProps,
} from "./InputLabel.types";
import type { StyleProps, TestIdProps } from "@types";

const defaultInputLabelProps: DefaultInputLabelProps = {
  label: "[Input label]",
  required: false,
  children: null,
  className: null,
  tooltip: null,
  compact: false,
  htmlFor: null,
};

/**
 * Renders an input label component, to be used in association with the Input component.
 * @version 0.0.7
 *
 * @param {InputLabelProps} props - The props for the InputLabel component.
 * @return {JSX.Element} The InputLabel component.
 */
const InputLabel = (props: InputLabelProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("InputLabel");
  const mergedProps = useMergedProps<DefaultInputLabelProps, InputLabelProps>(
    defaultInputLabelProps,
    props,
  );
  const testId = useTestId("input-label", props);
  const className = useClassName(mergedProps);
  const { label, required } = mergedProps;

  if (!isNonEmptyString(label)) {
    warn("InputLabel must have a defined label.");
  }

  const justify = useMemo(() => {
    if (mergedProps.compact) return "start";
    return "space-between";
  }, [mergedProps.compact]);

  const htmlFor = useHtmlAttribute(mergedProps.htmlFor);

  return (
    <InnerInputLabel
      htmlFor={htmlFor}
      className={className}
      data-testid={testId}
      data-required={String(required)}
    >
      <FlexRowLayout align="center" gap="s-2" justify={justify}>
        <InputLabelText
          color="gray-600"
          size="s"
          testId="input-label-text"
          $required={required}
        >
          {label}
        </InputLabelText>
        {mergedProps.tooltip && <Tooltip {...mergedProps.tooltip} />}
      </FlexRowLayout>
      {mergedProps.children}
    </InnerInputLabel>
  );
};

InputLabel.defaultProps = defaultInputLabelProps;
export { InputLabel };

const InnerInputLabel = styled.label`
  ${inputLabelStyles}
`;

export const InputLabelText = styled(Text)<
  StyleProps<Pick<InputLabelProps, "required">>
>`
  ${inputLabelTextStyles}
`;
