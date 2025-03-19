import styled from "styled-components";

import {
  entityCardHeadingStyles,
  entityCardStatusRowListStyles,
} from "../EntityInfoCard.styles";

import { ContextInfoCard } from "@/components/ContextInfoCard";
import { ContextLine } from "@/components/ContextLine";
import { CopyClipboardInfoCard } from "@/components/CopyClipboardInfoCard";
import { Heading } from "@/components/Heading";
import { InfoBox } from "@/components/InfoBox";
import { FlexColumnLayout } from "@/layouts/Flex";
import { GridLayout } from "@/layouts/Grid";
import { GridItem, type GridEndPosition } from "@/layouts/GridItem";

import type {
  EntityInfoCardSectionItemRendererMap,
  EntityInfoCardSectionItemRendererProps,
} from "../EntityInfoCard.types";

/**
 * Renders children passed to the section
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} Children wrapper
 */
const EntityInfoCardSectionChildren = ({
  children,
}: EntityInfoCardSectionItemRendererProps) => {
  return <>{children}</>;
};

/**
 * Renders the section name as a styled heading
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} Styled heading
 */
const EntityInfoCardSectionName = ({
  name,
}: EntityInfoCardSectionItemRendererProps) => {
  return (
    <EntityCardHeading
      size="h3"
      weight="bold"
      color="primary-dark"
      align="center"
    >
      {name}
    </EntityCardHeading>
  );
};

/**
 * Renders a list of context info cards in a column layout
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} Column of context info cards
 */
const EntityInfoCardSectionContextInfoCards = ({
  contextInfoCards,
  testId,
}: EntityInfoCardSectionItemRendererProps) => {
  return (
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
  );
};

/**
 * Renders a list of copyable info cards in a column layout
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} Column of copyable info cards
 */
const EntityInfoCardSectionInfoCards = ({
  infoCards,
  testId,
  onInfoCopied,
}: EntityInfoCardSectionItemRendererProps) => {
  return (
    <FlexColumnLayout gap="s-3" fill>
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
    </FlexColumnLayout>
  );
};

/**
 * Renders a grid of info boxes with responsive layout
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} Grid of info boxes
 */
const EntityInfoCardSectionInfoBoxes = ({
  infoBoxes,
  testId,
}: EntityInfoCardSectionItemRendererProps) => {
  return (
    <GridLayout columns={2} gap="s-2" fill>
      {infoBoxes.map((infoBox, index) => {
        const boxTestId = `${testId}-info-box-${index}`;
        const isLast = index === infoBoxes.length - 1;
        const isEven = index % 2 === 0;
        const columnEnd: GridEndPosition = `span ${isLast && isEven ? 2 : 1}`;
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
  );
};

/**
 * Renders a list of status rows with badges and content
 * @param {EntityInfoCardSectionItemRendererProps} props - Component props
 * @returns {JSX.Element} List of status rows
 */
const EntityInfoCardSectionStatusRows = ({
  statusRows,
  testId,
}: EntityInfoCardSectionItemRendererProps) => {
  return (
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
  );
};

/**
 * Map of section item renderers for different section types
 * @type {EntityInfoCardSectionItemRendererMap}
 */
export const entityInfoCardSectionItemRenderers: EntityInfoCardSectionItemRendererMap =
  {
    children: EntityInfoCardSectionChildren,
    name: EntityInfoCardSectionName,
    contextInfoCards: EntityInfoCardSectionContextInfoCards,
    infoCards: EntityInfoCardSectionInfoCards,
    infoBoxes: EntityInfoCardSectionInfoBoxes,
    statusRows: EntityInfoCardSectionStatusRows,
  };

/**
 * Styled heading component with entity card styles
 */
const EntityCardHeading = styled(Heading)`
  ${entityCardHeadingStyles}
`;

/**
 * Styled flex column layout with status row list styles
 */
const EntityCardStatusRowList = styled(FlexColumnLayout)`
  ${entityCardStatusRowListStyles}
`;
