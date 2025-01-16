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
import { AccountBalance } from "../AccountBalance";

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
import { useTestId, useMergedProps, useLogger } from "@utils";

import type {
  EntityInfoCardProps,
  EntityInfoCardDefaultProps,
} from "./EntityInfoCard.types";
import type { TestIdProps } from "@types";

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
  accountBalance: null,
  actionIcon: null,
  children: null,
  onInfoCopied: null,
  contextMenu: null,
};

/**
 * Displays key information about an entity in a card.
 *
 * @version 0.0.8
 *
 * @param {EntityInfoCardProps & TestIdProps} props - EntityInfoCard component props
 * @returns {JSX.Element}
 */
const EntityInfoCard = (
  props: EntityInfoCardProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultEntityInfoCardProps, props);
  const { testId: testIdProp } = props;
  const testId = useTestId("entity-info-card", {
    testId: testIdProp,
  });
  const logger = useLogger("EntityInfoCard");

  const hasState = Boolean(props.state);
  const hasAccountBalance = Boolean(props.accountBalance);

  if (!hasState && !hasAccountBalance) {
    logger.error("Either state or accountBalance must be provided");
  }

  if (hasState && hasAccountBalance) {
    logger.error(
      "You provided both state and accountBalance, only state will render"
    );
  }

  const infoCards = mergedProps.infoCards ?? [];
  const infoBoxes = mergedProps.infoBoxes ?? [];
  const statusRows = mergedProps.statusRows ?? [];
  const actions = mergedProps.actions ?? [];

  return (
    <EntityCardContainer testId={testId} overrideTestId fill>
      <EntityCardHeader
        testId={`${testId}-header`}
        overrideTestId
        fill
        gap="s-1"
      >
        {mergedProps.accountBalance ? (
          <AccountBalance
            {...mergedProps.accountBalance}
            testId={`${testId}-account-balance`}
            overrideTestId
          />
        ) : mergedProps.state ? (
          <StateIndicator
            {...mergedProps.state}
            testId={`${testId}-state-indicator`}
            overrideTestId
          />
        ) : null}
        {mergedProps.actionIcon && (
          <ActionIcon
            {...props.actionIcon}
            size="l"
            testId={`${testId}-action`}
            overrideTestId
          />
        )}
        {mergedProps.contextMenu && (
          <ContextMenu
            size="m"
            side="bottom"
            align="end"
            testId={`${testId}-context-menu`}
            overrideTestId
            collisionBoundary={null}
            {...mergedProps.contextMenu}
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
        {infoCards.map((infoCard, index) => {
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
        {infoBoxes.length > 0 && (
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
        {statusRows.length && (
          <EntityCardStatusRowList gap={0} fill>
            {statusRows.map((statusRow, index) => {
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
                  {statusRow.content ? (
                    statusRow.content
                  ) : statusRow.badge ? (
                    <Badge {...statusRow.badge} />
                  ) : null}
                </EntityCardStatusRowContainer>
              );
            })}
          </EntityCardStatusRowList>
        )}
      </EntityCardContent>
      {actions.length && (
        <EntityCardActionsContainer
          testId={`${testId}-actions`}
          overrideTestId
          fill
          gap="s-1"
        >
          {actions.map((action, index) => {
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
