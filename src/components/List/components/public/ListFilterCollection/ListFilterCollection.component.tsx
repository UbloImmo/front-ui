import styled from "styled-components";

import {
  listFilterCollectionClearButtonStyles,
  listFilterCollectionContainerStyles,
  listFilterCollectionFiltersContainerStyles,
  listFilterCollectionTitleContainerStyles,
} from "./ListFilterCollection.styles";
import { useListFilterCollection } from "./ListFilterCollection.utils";
import { ListFilter } from "../ListFilter/ListFilter.component";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { FlexLayout } from "@/layouts/Flex";
import { useClassName, useHtmlAttribute, useUikitTranslation } from "@utils";

import type { ListFilterCollectionProps } from "./ListFilterCollection.types";
import type { StyleOverrideProps, StyleProps, TestIdProps } from "@types";

/**
 * Displays a collection of registered filters
 * and allows selecting which to display.
 *
 * @version 0.0.3
 *
 * @param {ListFilterCollectionProps & TestIdProps & Omit<StyleOverrideProps, "as">} props - The props
 * @returns {JSX.Element}
 */
export const ListFilterCollection = (
  props: ListFilterCollectionProps &
    TestIdProps &
    Omit<StyleOverrideProps, "as">
) => {
  const {
    title,
    testId,
    listFilters,
    hasFilters,
    ref,
    id,
    clearDisplayedFilters,
    hasActiveFilters,
  } = useListFilterCollection(props);

  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  const tl = useUikitTranslation();

  return (
    <ListFilterCollectionContainer
      data-testid={testId}
      className={className}
      ref={ref}
      id={id}
      style={style}
    >
      <ListFilterCollectionTitleContainer
        fill
        align="center"
        justify="space-between"
      >
        <Heading size="h4" weight="medium" color="gray-800" ellipsis>
          {title}
        </Heading>
        <ListFilterCollectionClearButton
          icon="XCircle"
          color="clear"
          label={tl.action.reset()}
          secondary
          iconPlacement="right"
          onClick={clearDisplayedFilters}
          $hidden={!hasActiveFilters}
        />
      </ListFilterCollectionTitleContainer>
      {hasFilters && (
        <ListFilterCollectionFiltersContainer fill direction="column" gap="s-1">
          {listFilters.map(({ key, ...listFilterProps }) => {
            return <ListFilter key={key} {...listFilterProps} />;
          })}
        </ListFilterCollectionFiltersContainer>
      )}
    </ListFilterCollectionContainer>
  );
};

const ListFilterCollectionContainer = styled.aside`
  ${listFilterCollectionContainerStyles}
`;

const ListFilterCollectionTitleContainer = styled(FlexLayout)`
  ${listFilterCollectionTitleContainerStyles}
`;

const ListFilterCollectionFiltersContainer = styled(FlexLayout)`
  ${listFilterCollectionFiltersContainerStyles}
`;

const ListFilterCollectionClearButton = styled(Button)<
  StyleProps<{ hidden?: boolean }>
>`
  ${listFilterCollectionClearButtonStyles}
`;
