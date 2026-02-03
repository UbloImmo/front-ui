import { useListFilterCollectionClassNames } from "./ListFilterCollection.styles";
import { useListFilterCollection } from "./ListFilterCollection.utils";
import { ListFilter } from "../ListFilter/ListFilter.component";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { FlexLayout } from "@/layouts/Flex";
import { useHtmlAttribute, useUikitTranslation } from "@utils";

import type { ListFilterCollectionProps } from "./ListFilterCollection.types";
import type { StyleOverrideProps, TestIdProps } from "@types";

/**
 * Displays a collection of registered filters
 * and allows selecting which to display.
 *
 * @version 0.1.0
 *
 * @param {ListFilterCollectionProps & TestIdProps & Omit<StyleOverrideProps, "as">} props - The props
 * @returns {JSX.Element} List of rendered filters
 */
export const ListFilterCollection = (
  props: ListFilterCollectionProps &
    TestIdProps &
    Omit<StyleOverrideProps, "as">
): JSX.Element => {
  const {
    title,
    testId,
    listFilters,
    hasFilters,
    ref,
    id,
    clearDisplayedFilters,
    clearBtnHidden,
  } = useListFilterCollection(props);

  const classNames = useListFilterCollectionClassNames(
    props.className,
    clearBtnHidden
  );
  const style = useHtmlAttribute(props.styleOverride);

  const tl = useUikitTranslation();

  return (
    <aside
      data-testid={testId}
      className={classNames.container}
      ref={ref}
      id={id}
      style={style}
    >
      <FlexLayout
        className={classNames.titleContainer}
        fill
        align="center"
        justify="space-between"
      >
        <Heading size="h4" weight="medium" color="gray-800" ellipsis>
          {title}
        </Heading>
        <Button
          className={classNames.clearButton}
          icon="XCircle"
          color="clear"
          label={tl.action.reset()}
          secondary
          iconPlacement="right"
          onClick={clearDisplayedFilters}
        />
      </FlexLayout>
      {hasFilters && (
        <FlexLayout
          className={classNames.filters}
          fill
          direction="column"
          gap="s-1"
        >
          {listFilters.map(({ key, ...listFilterProps }) => {
            return <ListFilter key={key} {...listFilterProps} />;
          })}
        </FlexLayout>
      )}
    </aside>
  );
};
