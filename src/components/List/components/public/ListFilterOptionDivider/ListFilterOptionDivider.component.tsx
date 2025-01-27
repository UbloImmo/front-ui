import styled from "styled-components";

import {
  listFilterOptionDividerLabelContainerStyles,
  listFilterOptionDividerStyles,
} from "./ListFilterOptionDivider.styles";

import { Text } from "@/components/Text";
import { useLogger, useMergedProps } from "@utils";

import type { ListFilterOptionDividerProps } from "./ListFilterOptionDivider.types";

const defaultListFilterOptionDivider: Required<ListFilterOptionDividerProps> = {
  label: "[Divider label]",
};

/**
 * Renders a divider with a label between list filter options
 *
 * @version 0.0.2
 *
 * @param {ListFilterOptionDividerProps} props - The component props
 * @param {string} props.label - The text label to display in the divider
 * @returns {JSX.Element} The rendered divider component
 */
export const ListFilterOptionDivider = (
  props: ListFilterOptionDividerProps,
) => {
  const { warn } = useLogger("ListFilterOptionDivider");

  const mergedProps = useMergedProps(defaultListFilterOptionDivider, props);

  if (!props.label) {
    warn(
      `Missing label, defaulting to ${defaultListFilterOptionDivider.label}`,
    );
  }

  return (
    <DividerContainer
      data-testid="list-filter-option-divider"
      data-divider-label={mergedProps.label}
      role="heading"
    >
      <DividerLabelContainer>
        <Text
          size="s"
          weight="bold"
          color="gray-600"
          fill
          ellipsis
          uppercase
          testId="list-filter-option-divider-label"
          overrideTestId
        >
          {mergedProps.label}
        </Text>
      </DividerLabelContainer>
    </DividerContainer>
  );
};

const DividerContainer = styled.li`
  ${listFilterOptionDividerStyles}
`;

const DividerLabelContainer = styled.div`
  ${listFilterOptionDividerLabelContainerStyles}
`;
