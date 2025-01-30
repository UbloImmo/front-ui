import { useMemo } from "react";
import styled from "styled-components";

import {
  entityCardContentStyles,
  entityCardHeadingStyles,
  entityCardStatusRowListStyles,
} from "../EntityInfoCard.styles";

import { ContextInfoCard } from "@/components/ContextInfoCard";
import { ContextLine } from "@/components/ContextLine";
import { CopyClipboardInfoCard } from "@/components/CopyClipboardInfoCard";
import { Heading } from "@/components/Heading";
import { InfoBox } from "@/components/InfoBox";
import {
  FlexColumnLayout,
  GridItem,
  GridLayout,
  type GridEndPosition,
} from "@layouts";
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
};

/**
 * A section of an `EntityInfoCard`
 *
 * Renders the section's content in a bordered, padded column.
 *
 * @version 0.0.10
 *
 * @param {EntityInfoCardSectionProps & EntityInfoCardCallbackProps & TestIdProps} props - the properties of the section
 */
export const EntityInfoCardSection = (
  props: EntityInfoCardSectionProps & EntityInfoCardCallbackProps & TestIdProps
) => {
  const {
    name,
    infoBoxes,
    infoCards,
    statusRows,
    contextInfoCards,
    children,
    onInfoCopied,
  } = useMergedProps(defaultEntityInfoCardSectionProps, props);

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

  if (!hasContent) return null;

  return (
    <EntityCardContent fill gap="s-2">
      {children}
      {name && (
        <EntityCardHeading
          size="h3"
          weight="bold"
          color="primary-dark"
          align="center"
        >
          {name}
        </EntityCardHeading>
      )}
      {!!contextInfoCards.length && (
        <FlexColumnLayout gap="s-3" fill>
          {contextInfoCards.map((contextInfoCard, index) => {
            const cardTestId = `${testId}-context-info-card-${index}`;
            return (
              <ContextInfoCard
                key={cardTestId}
                testId={cardTestId}
                overrideTestId
                {...contextInfoCard}
              />
            );
          })}
        </FlexColumnLayout>
      )}
      {infoCards.map((infoCard, index) => {
        const cardTestId = `${testId}-info-card-${index}`;
        const propagateOnCopied = (content: string) => {
          if (onInfoCopied) {
            onInfoCopied(content);
          }
          if (infoCard.onCopied) {
            infoCard.onCopied(content);
          }
        };
        return (
          <CopyClipboardInfoCard
            key={cardTestId}
            testId={cardTestId}
            overrideTestId
            {...infoCard}
            onCopied={propagateOnCopied}
          />
        );
      })}
      {!!infoBoxes.length && (
        <GridLayout columns={2} gap="s-2" fill>
          {infoBoxes.map((infoBox, index) => {
            const boxTestId = `${testId}-info-box-${index}`;
            const isLast = index === infoBoxes.length - 1;
            const isEven = index % 2 === 0;
            const columnEnd: GridEndPosition = `span ${
              isLast && isEven ? 2 : 1
            }`;
            return (
              <GridItem
                key={boxTestId}
                testId={boxTestId}
                columnEnd={columnEnd}
                fill="force"
              >
                <InfoBox {...infoBox} testId={boxTestId} overrideTestId />
              </GridItem>
            );
          })}
        </GridLayout>
      )}
      {!!statusRows.length && (
        <EntityCardStatusRowList gap={0} fill>
          {statusRows.map(({ badge, content, ...statusRow }, index) => {
            const rowTestId = `${testId}-status-row-${index}`;

            return (
              <ContextLine
                key={rowTestId}
                {...statusRow}
                badge={badge}
                testId={testId}
                overrideTestId
              >
                {badge ? null : content}
              </ContextLine>
            );
          })}
        </EntityCardStatusRowList>
      )}
    </EntityCardContent>
  );
};

const EntityCardContent = styled(FlexColumnLayout)`
  ${entityCardContentStyles}
`;

const EntityCardHeading = styled(Heading)`
  ${entityCardHeadingStyles}
`;

const EntityCardStatusRowList = styled(FlexColumnLayout)`
  ${entityCardStatusRowListStyles}
`;
