import styled from "styled-components";

import { listFilterOptionDividerStyles } from "./ListFilterOptionDivider.styles";

import { Text } from "@/components/Text";

import type { ListFilterOptionDividerProps } from "./ListFilterOptionDivider.types";

/**
 * A component that renders a divider with a label between filter options
 *
 * @version 0.0.1
 * @param {ListFilterOptionDividerProps} props - The component props
 * @param {string} props.label - The text label to display in the divider
 * @returns {JSX.Element} The rendered divider component
 */
export const ListFilterOptionDivider = ({
  label,
}: ListFilterOptionDividerProps) => {
  return (
    <DividerContainer
      data-testid="list-filter-option-divider"
      data-divider-label={label}
      role="heading"
    >
      <Text size="s" weight="bold" color="gray-600" fill ellipsis uppercase>
        {label}
      </Text>
    </DividerContainer>
  );
};

const DividerContainer = styled.li`
  ${listFilterOptionDividerStyles}
`;
