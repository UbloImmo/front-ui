import { isNumber, isString } from "@ubloimmo/front-util";
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
import {
  useClassName,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
} from "@utils";

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
 * @version 0.0.4
 */
export const ListSideHeader = (
  props: ListSideHeaderProps & TestIdProps & Omit<StyleOverrideProps, "as">
) => {
  const mergedProps = useMergedProps(listSideHeaderDefaultProps, props);
  const testId = useTestId("list-side-header", props);
  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  const { itemCount } = useListContext();

  const count = useMemo(() => {
    if (!mergedProps.displayCount) return null;
    if (isNumber(mergedProps.overrideCount)) return mergedProps.overrideCount;
    return itemCount;
  }, [itemCount, mergedProps.overrideCount, mergedProps.displayCount]);

  return (
    <HeaderContainer className={className} data-testid={testId} style={style}>
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
        {(isNumber(count) || isString(count)) && (
          <Badge label={`${count}`} color="primary" />
        )}
      </HeaderTitleContainer>
      {mergedProps.children}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  ${headerContainerStyles}
`;

const HeaderTitleContainer = styled(FlexLayout)`
  ${headerTitleContainerStyles}
`;
