import { NullishPrimitives, type Nullable } from "@ubloimmo/front-util";
import { useCallback } from "react";

import { defaultCommonInputProps } from "../Input.common";
import { SelectInput } from "../SelectInput";

import { useTestId, useMergedProps } from "@utils";

import type {
  SearchInputDefaultProps,
  SearchInputProps,
} from "./SearchInput.types";
import type { TestIdProps } from "@types";

const defaultSearchInputProps: SearchInputDefaultProps<NullishPrimitives> = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  results: null,
  placeholder: "",
  Option: null,
  filterOption: null,
  SelectedOption: null,
  controlIcon: "Search",
};

/**
 * An input designed for querying and retrieving information from a dataset by typing
 *
 * @version 0.0.2
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
  const { results, ...mergedProps } = useMergedProps(
    defaultSearchInputProps as SearchInputDefaultProps<TValue, TExtraData>,
    props
  );
  const testId = useTestId("input-search", props);

  const getResults = useCallback(
    async (query: Nullable<string>) => {
      if (!results) return [];
      return await results(query);
    },
    [results]
  );

  return (
    <SelectInput
      options={getResults}
      {...mergedProps}
      testId={testId}
      overrideTestId
      searchable
      controlIcon={mergedProps.controlIcon}
    />
  );
};
SearchInput.defaultProps = defaultSearchInputProps;

export { SearchInput };
