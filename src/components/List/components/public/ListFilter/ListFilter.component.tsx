import { Fragment, useCallback, type MouseEvent } from "react";

import { useListFilterClassNames } from "./ListFilter.styles";
import { ListFilterOptionChip } from "../ListFilterOptionChip/ListFilterOptionChip.component";
import { ListFilterOptionItem } from "../ListFilterOptionItem";
import { useListFilter } from "./ListFilter.utils";
import { ListFilterOptionDivider } from "../ListFilterOptionDivider/ListFilterOptionDivider.component";

import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { Text } from "@/components/Text";
import { FlexLayout } from "@/layouts/Flex";

import type { ListFilterProps } from "./ListFilter.types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * A component that displays a single filters
 * and allows interacting with it and its options.
 *
 * @version 0.1.0
 *
 * @param {ListFilterProps} props
 * @returns {Nullable<JSX.Element>}
 */
export const ListFilter = (props: ListFilterProps): Nullable<JSX.Element> => {
  const {
    filter,
    styleProps,
    renderMulti,
    queryInputRef,
    open,
    setQuery,
    filteredOptions,
    highlightSignature,
    openOptions,
    closeOptions,
    selectOptionOnEnter,
    getOptionDivider,
    isQuerying,
  } = useListFilter(props);

  const classNames = useListFilterClassNames(styleProps);

  const openOptionsOnClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      openOptions();
    },
    [openOptions]
  );

  if (filter.hidden) return null;

  return (
    <FlexLayout
      className={classNames.container}
      testId={filter.testId}
      overrideTestId
      fill
      direction="column"
    >
      {open && !filter.loading ? (
        <form className={classNames.query} onSubmit={selectOptionOnEnter}>
          <Input
            type="search-text"
            placeholder={filter.label}
            inputRef={queryInputRef}
            uncontrolled
            onChange={setQuery}
            testId="filter-query-input"
            overrideTestId
          />
        </form>
      ) : (
        <header
          className={classNames.header}
          data-testid="list-filter-label-container"
          onClick={openOptionsOnClick}
        >
          <FlexLayout
            direction={renderMulti ? "column" : "row"}
            align={renderMulti ? "start" : "center"}
            justify={renderMulti ? "start" : "space-between"}
            gap="s-1"
            fill
          >
            <Text color="gray-800" weight="medium">
              {filter.label}
            </Text>
            {filter.loading ? (
              <Loading
                animation="ProgressBar"
                color="primary-medium"
                size="s-3"
              />
            ) : filter.active ? (
              <FlexLayout
                className={classNames.chips}
                direction="row"
                gap="s-1"
                wrap
                align="start"
                justify="start"
              >
                {filter.selectedOptions
                  .filter(({ hidden }) => !hidden)
                  .map((option) => (
                    <ListFilterOptionChip
                      filterOption={option}
                      filterDisabled={filter.disabled}
                      key={option.signature}
                    />
                  ))}
              </FlexLayout>
            ) : (
              <FlexLayout align="center" gap="s-2" justify="end">
                <Text color="gray-600" testId="filter-empty-label">
                  {filter.emptyLabel}
                </Text>
                <Icon name="CircleDashed" color="gray-500" size="s-3" />
              </FlexLayout>
            )}
          </FlexLayout>
        </header>
      )}
      <ul
        className={classNames.options}
        data-testid="list-filter-options-list"
        role="listbox"
      >
        {filteredOptions.map((option, index) => {
          const key = [option.signature, index, option.selected].join("-");
          const optionKey = `option-${key}`;
          const dividerKey = `divider-${key}`;
          const highlighted = option.signature === highlightSignature;
          const divider = getOptionDivider(option.signature);
          return (
            <Fragment key={key}>
              {divider && !isQuerying && (
                <ListFilterOptionDivider
                  label={divider.label}
                  key={dividerKey}
                />
              )}
              <ListFilterOptionItem
                option={option}
                multi={filter.multi}
                closeFilter={closeOptions}
                highlighted={highlighted}
                key={optionKey}
              />
            </Fragment>
          );
        })}
      </ul>
    </FlexLayout>
  );
};
