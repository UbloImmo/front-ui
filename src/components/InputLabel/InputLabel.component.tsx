import styled from "styled-components";

import { DefaultInputLabelProps, InputLabelProps } from "./InputLabel.types";
import { isNonEmptyString, useLogger, useMergedProps } from "../../utils";
import { Text } from "../Text/Text.component";

export const defaultInputLabelProps: DefaultInputLabelProps = {
  label: "[Input label]",
  required: false,
};

/**
 * Renders an input label component, to be used in association with the Input component.
 * @version 0.0.1
 *
 * @param {InputLabelProps} props - The props for the InputLabel component.
 * @return {JSX.Element} The InputLabel component.
 */
const InputLabel = (props: InputLabelProps): JSX.Element => {
  const { warn } = useLogger("InputLabel");
  const mergedProps = useMergedProps<DefaultInputLabelProps, InputLabelProps>(
    defaultInputLabelProps,
    props
  );
  const { label, required } = mergedProps;

  if (!isNonEmptyString(label)) {
    warn("InputLabel must have a defined label.");
  }

  return (
    <InnerInputLabel data-testid="input-label" {...mergedProps}>
      <Text color="gray-600" size="s">
        {label}
      </Text>
      {required && (
        <Text color="warning-base" size="s" weight="semiBold">
          *
        </Text>
      )}
    </InnerInputLabel>
  );
};

InputLabel.defaultProps = defaultInputLabelProps;
export { InputLabel };

const InnerInputLabel = styled.label<DefaultInputLabelProps>`
  display: flex;
  gap: var(--s-05);
`;
