import { isNumber } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import {
  headerContainerStyles,
  headerTitleContainerStyles,
} from "./ListSideHeader.styles";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { useListContext } from "@/components/List/context";
import { FlexLayout } from "@layouts";
import { useClassName, useMergedProps, useTestId } from "@utils";

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
 * @version 0.0.1
 */
export const ListSideHeader = (
  props: ListSideHeaderProps & TestIdProps & Omit<StyleOverrideProps, "as">
) => {
  const mergedProps = useMergedProps(listSideHeaderDefaultProps, props);
  const testId = useTestId("list-side-header", props);
  const className = useClassName(props);
  const { itemCount } = useListContext();

  const count = useMemo(() => {
    if (!mergedProps.displayCount) return null;
    if (isNumber(mergedProps.overrideCount)) return mergedProps.overrideCount;
    return itemCount;
  }, [itemCount, mergedProps.overrideCount, mergedProps.displayCount]);

  return (
    <HeaderContainer className={className} data-testid={testId}>
      <HeaderTitleContainer
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
        {isNumber(count) && <Badge label={count.toString()} color="primary" />}
      </HeaderTitleContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${headerContainerStyles}
`;

const HeaderTitleContainer = styled(FlexLayout)`
  ${headerTitleContainerStyles}
`;
