import { isNumber, isString } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { useListSideHeaderClassNames } from "./ListSideHeader.styles";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { useListContext } from "@/components/List/context";
import { FlexLayout } from "@/layouts/Flex";
import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  ListSideHeaderDefaultProps,
  ListSideHeaderProps,
} from "./ListSideHeader.types";
import type { StyleOverrideProps, TestIdProps } from "@types";

const listSideHeaderDefaultProps: ListSideHeaderDefaultProps = {
  title: "List",
  displayCount: true,
  overrideCount: null,
  children: null,
};

/**
 * A list's side header component
 *
 * Renders a title and a count of items
 *
 * @version 0.1.0
 */
export const ListSideHeader = (
  props: ListSideHeaderProps & TestIdProps & Omit<StyleOverrideProps, "as">
) => {
  const mergedProps = useMergedProps(listSideHeaderDefaultProps, props);
  const testId = useTestId("list-side-header", props);
  const classNames = useListSideHeaderClassNames(props.className);
  const style = useHtmlAttribute(props.styleOverride);

  const { itemCount } = useListContext();

  const count = useMemo(() => {
    if (!mergedProps.displayCount) return null;
    if (
      isNumber(mergedProps.overrideCount) ||
      isString(mergedProps.overrideCount)
    )
      return String(mergedProps.overrideCount);
    return String(itemCount);
  }, [itemCount, mergedProps.overrideCount, mergedProps.displayCount]);

  return (
    <header className={classNames.container} data-testid={testId} style={style}>
      <FlexLayout
        className={classNames.titleContainer}
        align="center"
        gap="s-2"
        justify="space-between"
        fill
        testId={`${testId}-title`}
        overrideTestId
      >
        <Heading size="h4" weight="medium" color="gray-800" ellipsis>
          {mergedProps.title}
        </Heading>
        {isString(count) && <Badge label={`${count}`} color="primary" />}
      </FlexLayout>
      {mergedProps.children}
    </header>
  );
};
