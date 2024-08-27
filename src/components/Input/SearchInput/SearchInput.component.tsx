import { NullishPrimitives } from "@ubloimmo/front-util";

import { SelectInput } from "..";
import { defaultCommonInputProps } from "../Input.common";

import { useLogger, useTestId, useMergedProps } from "@utils";

import type {
  SearchInputDefaultProps,
  SearchInputProps,
} from "./SearchInput.types";
import type { TestIdProps } from "@types";

const defaultSearchInputProps: SearchInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  options: [],
  Option: null,
  SelectedOption: null,
};

/**
 * An input to select a value from a list of options by typing.
 *
 * @version 0.0.1
 *
 * @param {SearchInputProps & TestIdProps} props - SearchInput component props
 * @returns {JSX.Element}
 */
const SearchInput = <
  TValue extends NullishPrimitives = NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  props: SearchInputProps<TValue, TExtraData> & TestIdProps
): JSX.Element => {
  const { log } = useLogger("SearchInput");
  const mergedProps = useMergedProps(props);
  const testId = useTestId("input-search", props);

  log(testId);

  return (
    <SelectInput
      {...mergedProps}
      testId={testId}
      overrideTestId
      searchable
      controlIcon="Search"
    />
  );
};
SearchInput.defaultProps = defaultSearchInputProps;

export { SearchInput };
