import type { InputProps } from "../Input.types";
import type { IconName } from "@/components/Icon";

/**
 * Props specific to the SearchTextInput component
 */
export type SearchTextInputProps = InputProps<"search-text"> & {
  /**
   * The icon to display in the input control
   * @default "Search"
   */
  controlIcon?: IconName;
};

/**
 * Default props for the SearchTextInput component
 */
export type DefaultSearchTextInputProps = Required<SearchTextInputProps>;
