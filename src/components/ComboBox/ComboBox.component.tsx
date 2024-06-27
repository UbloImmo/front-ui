import { useState } from "react";

import {
  type ComboBoxProps,
  type ComboBoxDefaultProps,
} from "./ComboBox.types";
import { ComboBoxButton } from "../ComboBoxButton";

import { FlexLayout } from "@layouts";
import { useTestId, useMergedProps, useLogger } from "@utils";

import type { TestIdProps } from "@types";

const defaultComboBoxProps: ComboBoxDefaultProps = {
  options: null,
  direction: "column",
  multi: false,
};

/**
 * A group of ComboButtons that act as a select or radio input.
 *
 * @version 0.0.1
 *
 * @param {ComboBoxProps & TestIdProps} props - ComboBox component props
 * @returns {JSX.Element}
 */
const ComboBox = (props: ComboBoxProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("ComboBox");
  const mergedProps = useMergedProps(defaultComboBoxProps, props);
  const { options, multi } = mergedProps;
  const testId = useTestId("combo-box", props);

  const [selection, setSelection] = useState<string[]>([]);
  const isOptionActive = (option: string) => selection.includes(option);

  const handleSelectOption = (option: string) => {
    console.log(multi);
    if (multi) {
      if (isOptionActive(option)) {
        const newSelection = [...selection].filter((value) => value !== option);
        setSelection(newSelection);
      } else {
        setSelection([...selection, option]);
      }
    } else {
      if (isOptionActive(option)) {
        setSelection([]);
      } else {
        setSelection([option]);
      }
    }
  };

  if (!props.options) {
    warn(`Missing required labels`);
  }

  return (
    <FlexLayout testId={testId} overrideTestId {...mergedProps} gap="s-2">
      {(options ?? []).map((option) => (
        <ComboBoxButton
          label={option}
          key={option}
          active={isOptionActive(option)}
          multi={multi}
          onSelect={() => handleSelectOption(option)}
        />
      ))}
    </FlexLayout>
  );
};
ComboBox.defaultProps = defaultComboBoxProps;

export { ComboBox };
