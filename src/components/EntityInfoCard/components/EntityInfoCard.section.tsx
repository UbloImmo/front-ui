import { isArray } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { entityCardContentStyles } from "../EntityInfoCard.styles";
import { entityInfoCardSectionItemRenderers } from "./EntityInfoCard.sectionItems";

import { FlexColumnLayout } from "@/layouts/Flex";
import { isNonEmptyString, useMergedProps, useTestId } from "@utils";

import type {
  EntityInfoCardCallbackProps,
  EntityInfoCardSectionDefaultProps,
  EntityInfoCardSectionProps,
} from "../EntityInfoCard.types";
import type { TestIdProps } from "@types";

export const defaultEntityInfoCardSectionProps: EntityInfoCardSectionDefaultProps &
  Required<EntityInfoCardCallbackProps> = {
  name: null,
  infoCards: [],
  infoBoxes: [],
  statusRows: [],
  contextInfoCards: [],
  children: null,
  onInfoCopied: null,
  order: [
    "children",
    "name",
    "contextInfoCards",
    "infoCards",
    "infoBoxes",
    "statusRows",
  ],
};

/**
 * A section of an `EntityInfoCard`
 *
 * Renders the section's content in a bordered, padded column.
 *
 * @version 0.0.11
 *
 * @param {EntityInfoCardSectionProps & EntityInfoCardCallbackProps & TestIdProps} props - the properties of the section
 */
export const EntityInfoCardSection = (
  props: EntityInfoCardSectionProps & EntityInfoCardCallbackProps & TestIdProps
) => {
  const mergedProps = useMergedProps(defaultEntityInfoCardSectionProps, props);
  const {
    name,
    infoBoxes,
    infoCards,
    statusRows,
    contextInfoCards,
    children,
    order,
    onInfoCopied,
  } = mergedProps;

  const testId = useTestId("entity-info-card", props);

  const hasContent = useMemo(() => {
    return (
      isNonEmptyString(name) ||
      !!infoBoxes.length ||
      !!infoCards.length ||
      !!statusRows.length ||
      !!contextInfoCards.length ||
      !!children
    );
  }, [name, infoBoxes, infoCards, statusRows, children, contextInfoCards]);

  const fullOrder = useMemo(() => {
    if (order.length === defaultEntityInfoCardSectionProps.order.length)
      return order;
    const newOrder = [...order];
    defaultEntityInfoCardSectionProps.order.forEach((item) => {
      if (newOrder.includes(item)) return;
      newOrder.push(item);
    });
    return newOrder;
  }, [order]);

  if (!hasContent) return null;

  return (
    <EntityCardContent fill gap="s-2">
      {fullOrder.map((item, index) => {
        const key = `${testId}-section-item-${index}`;
        const Renderer = entityInfoCardSectionItemRenderers[item];
        const itemData = mergedProps[item];
        if (!itemData || (isArray(itemData) && !itemData.length)) return null;
        return (
          <Renderer
            key={key}
            {...mergedProps}
            testId={testId}
            onInfoCopied={onInfoCopied}
          />
        );
      })}
    </EntityCardContent>
  );
};

const EntityCardContent = styled(FlexColumnLayout)`
  ${entityCardContentStyles}
`;
