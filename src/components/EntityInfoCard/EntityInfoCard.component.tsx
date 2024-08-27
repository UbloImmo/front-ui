import { useRef } from "react";
import styled from "styled-components";

import {
  entityCardActionsContainerStyles,
  entityCardContainerStyles,
  entityCardContentStyles,
  entityCardHeaderStyles,
  entityCardHeadingStyles,
  entityCardStatusRowContainerStyles,
  entityCardStatusRowListStyles,
} from "./EntityInfoCard.styles";

import { Action } from "@/components/Action";
import { ActionIcon } from "@/components/ActionIcon";
import { Badge } from "@/components/Badge";
import { ContextMenu } from "@/components/ContextMenu";
import { CopyClipboardInfoCard } from "@/components/CopyClipboardInfoCard";
import { Heading } from "@/components/Heading";
import { InfoBox } from "@/components/InfoBox";
import { StateIndicator } from "@/components/StateIndicator";
import { Text } from "@/components/Text";
import {
  FlexColumnLayout,
  FlexRowLayout,
  GridItem,
  GridLayout,
  type GridEndPosition,
} from "@layouts";
import { useTestId, useMergedProps } from "@utils";

import type {
  EntityInfoCardProps,
  EntityInfoCardDefaultProps,
} from "./EntityInfoCard.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

const defaultEntityInfoCardProps: EntityInfoCardDefaultProps = {
  name: null,
  infoCards: [],
  infoBoxes: [],
  statusRows: [],
  actions: [],
  state: {
    label: "[State]",
    icon: "Square",
  },
  actionIcon: null,
  children: null,
  onInfoCopied: null,
  contextMenu: null,
};

/**
 * Displays key information about an entity in a card.
 *
 * @version 0.0.4
 *
 * @param {EntityInfoCardProps & TestIdProps} props - EntityInfoCard component props
 * @returns {JSX.Element}
 */
const EntityInfoCard = (
  props: EntityInfoCardProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultEntityInfoCardProps, props);
  const testId = useTestId("entity-info-card", props);
  const elementRef = useRef<Nullable<HTMLDivElement>>(null);

  return (
    <EntityCardContainer testId={testId} overrideTestId fill ref={elementRef}>
      <EntityCardHeader
        testId={`${testId}-header`}
        overrideTestId
        fill
        gap="s-1"
      >
        <StateIndicator
          {...mergedProps.state}
          testId={`${testId}-state-indicator`}
          overrideTestId
        />
        {mergedProps.actionIcon && (
          <ActionIcon
            {...mergedProps.actionIcon}
            size="default"
            testId={`${testId}-action`}
            overrideTestId
          />
        )}
        {mergedProps.contextMenu && (
          <ContextMenu
            {...mergedProps.contextMenu}
            size="m"
            side="bottom"
            align="end"
            testId={`${testId}-context-menu`}
            overrideTestId
            collisionBoundary={elementRef.current}
          />
        )}
      </EntityCardHeader>
      <EntityCardContent fill gap="s-2">
        {mergedProps.children}
        {mergedProps.name && (
          <EntityCardHeading
            size="h3"
            weight="bold"
            color="primary-dark"
            align="center"
          >
            {mergedProps.name}
          </EntityCardHeading>
        )}
        {mergedProps.infoCards.map((infoCard, index) => {
          const cardTestId = `${testId}-info-card-${index}`;
          const propagateOnCopied = (content: string) => {
            if (mergedProps.onInfoCopied) {
              mergedProps.onInfoCopied(content);
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
        {!!mergedProps.infoBoxes.length && (
          <GridLayout columns={2} gap="s-2" fill>
            {mergedProps.infoBoxes.map((infoBox, index) => {
              const boxTestId = `${testId}-info-box-${index}`;
              const isLast = index === mergedProps.infoBoxes.length - 1;
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
        {!!mergedProps.statusRows.length && (
          <EntityCardStatusRowList gap={0} fill>
            {mergedProps.statusRows.map((statusRow, index) => {
              const rowTestId = `${testId}-status-row-${index}`;
              return (
                <EntityCardStatusRowContainer
                  key={rowTestId}
                  testId={rowTestId}
                  overrideTestId
                  fill
                  align="center"
                  justify="space-between"
                >
                  <Text size="m" color="gray-800" weight="medium">
                    {statusRow.label}
                  </Text>
                  <Badge {...statusRow.badge} />
                </EntityCardStatusRowContainer>
              );
            })}
          </EntityCardStatusRowList>
        )}
      </EntityCardContent>
      {!!mergedProps.actions.length && (
        <EntityCardActionsContainer
          testId={`${testId}-actions`}
          overrideTestId
          fill
          gap="s-1"
        >
          {mergedProps.actions.map((action, index) => {
            const actionTestId = `${testId}-action-${index}`;
            return (
              <Action
                key={actionTestId}
                testId={actionTestId}
                overrideTestId
                {...action}
              />
            );
          })}
        </EntityCardActionsContainer>
      )}
    </EntityCardContainer>
  );
};
EntityInfoCard.defaultProps = defaultEntityInfoCardProps;

export { EntityInfoCard };

const EntityCardContainer = styled(FlexColumnLayout)`
  ${entityCardContainerStyles}
`;

const EntityCardHeader = styled(FlexRowLayout)`
  ${entityCardHeaderStyles}
`;

const EntityCardContent = styled(FlexColumnLayout)`
  ${entityCardContentStyles}
`;

const EntityCardHeading = styled(Heading)`
  ${entityCardHeadingStyles}
`;

const EntityCardStatusRowContainer = styled(FlexRowLayout)`
  ${entityCardStatusRowContainerStyles}
`;

const EntityCardStatusRowList = styled(FlexColumnLayout)`
  ${entityCardStatusRowListStyles}
`;

const EntityCardActionsContainer = styled(FlexColumnLayout)`
  ${entityCardActionsContainerStyles}
`;
