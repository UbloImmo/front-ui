import styled from "styled-components";

import {
  entityCardActionsContainerStyles,
  entityCardContainerStyles,
  entityCardContentStyles,
  entityCardHeaderStyles,
  entityCardHeadingStyles,
  entityCardStatusRowContainerStyles,
} from "./EntityInfoCard.styles";

import {
  FlexColumnLayout,
  FlexRowLayout,
  GridItem,
  GridLayout,
  type GridEndPosition,
} from "@layouts";
import { useLogger, useTestId, useMergedProps } from "@utils";

import {
  StateIndicator,
  Heading,
  InfoBox,
  CopyClipboardInfoCard,
  ActionIcon,
  Text,
  Badge,
  Action,
} from "@components";

import type {
  EntityInfoCardProps,
  EntityInfoCardDefaultProps,
} from "./EntityInfoCard.types";
import type { TestIdProps } from "@types";

const defaultEntityInfoCardProps: EntityInfoCardDefaultProps = {
  name: "[Name]",
  infoCards: [],
  infoBoxes: [],
  statusRows: [],
  actions: [],
  state: {
    label: "[State]",
    icon: "Square",
  },
  actionIcon: null,
};

/**
 * EntityInfoCard component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {EntityInfoCardProps & TestIdProps} props - EntityInfoCard component props
 * @returns {JSX.Element}
 */
const EntityInfoCard = (
  props: EntityInfoCardProps & TestIdProps
): JSX.Element => {
  const { log, warn } = useLogger("EntityInfoCard");
  const mergedProps = useMergedProps(defaultEntityInfoCardProps, props);
  const testId = useTestId("entity-info-card", props);
  // TODO

  log(mergedProps);

  if (!props.name) {
    warn(
      `Missing required name, using "${defaultEntityInfoCardProps.name}" as default`
    );
  }

  return (
    <EntityCardContainer testId={testId} overrideTestId fill>
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
            {...props.actionIcon}
            size="default"
            testId={`${testId}-action`}
            overrideTestId
          />
        )}
      </EntityCardHeader>
      <EntityCardContent fill gap="s-2">
        <EntityCardHeading
          size="h3"
          weight="bold"
          color="primary-dark"
          align="center"
        >
          {mergedProps.name}
        </EntityCardHeading>
        {mergedProps.infoCards.map((infoCard, index) => {
          const cardTestId = `${testId}-info-card-${index}`;
          return (
            <CopyClipboardInfoCard
              key={cardTestId}
              testId={cardTestId}
              overrideTestId
              {...infoCard}
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
          <FlexColumnLayout gap={0} fill>
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
          </FlexColumnLayout>
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

const EntityCardActionsContainer = styled(FlexColumnLayout)`
  ${entityCardActionsContainerStyles}
`;
