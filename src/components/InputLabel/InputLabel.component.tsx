import { useMemo } from "react";

import {
  isNonEmptyString,
  useHtmlAttribute,
  useLogger,
  useMergedProps,
  useTestId,
} from "../../utils";
import { Text } from "../Text/Text.component";
import { Tooltip } from "../Tooltip";
import { useInputLabelClassNames } from "./InputLabel.styles";

import { FlexRowLayout } from "@/layouts/Flex";

import type {
  DefaultInputLabelProps,
  InputLabelProps,
} from "./InputLabel.types";
import type { TestIdProps } from "@types";

const defaultInputLabelProps: DefaultInputLabelProps = {
  label: "[Input label]",
  required: false,
  children: null,
  className: null,
  tooltip: null,
  compact: false,
  htmlFor: null,
  styleOverride: null,
};

/**
 * Renders an input label component, to be used in association with the Input component.
 *
 * @version 0.1.0
 *
 * @param {InputLabelProps} props - The props for the InputLabel component.
 * @return {JSX.Element} The InputLabel component.
 */
const InputLabel = (props: InputLabelProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("InputLabel");
  const mergedProps = useMergedProps<DefaultInputLabelProps, InputLabelProps>(
    defaultInputLabelProps,
    props
  );
  const testId = useTestId("input-label", props);
  const { label, required } = mergedProps;
  const style = useHtmlAttribute(props.styleOverride);
  const classNames = useInputLabelClassNames(required, mergedProps.className);

  if (!isNonEmptyString(label)) {
    warn("InputLabel must have a defined label.");
  }

  const justify = useMemo(() => {
    if (mergedProps.compact) return "start";
    return "space-between";
  }, [mergedProps.compact]);

  const htmlFor = useHtmlAttribute(mergedProps.htmlFor);

  return (
    <label
      htmlFor={htmlFor}
      className={classNames.label}
      data-testid={testId}
      data-required={String(required)}
      style={style}
    >
      <FlexRowLayout align="center" gap="s-2" justify={justify}>
        <Text
          className={classNames.text}
          color="gray-600"
          size="s"
          testId="input-label-text"
        >
          {label}
        </Text>
        {mergedProps.tooltip && <Tooltip {...mergedProps.tooltip} />}
      </FlexRowLayout>
      {mergedProps.children}
    </label>
  );
};

InputLabel.__DEFAULT_PROPS = defaultInputLabelProps;
export { InputLabel };
