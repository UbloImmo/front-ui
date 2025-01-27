import styled from "styled-components";

import { entityCardHeaderStyles } from "../EntityInfoCard.styles";

import { AccountBalance } from "@/components/AccountBalance";
import { ActionIcon } from "@/components/ActionIcon";
import { ContextMenu } from "@/components/ContextMenu";
import { StateIndicator } from "@/components/StateIndicator";
import { FlexRowLayout } from "@layouts";
import { useLogger, useMergedProps, useTestId } from "@utils";

import type {
  EntityInfoCardHeaderDefaultProps,
  EntityInfoCardHeaderProps,
} from "../EntityInfoCard.types";
import type { TestIdProps } from "@types";

export const defaultEntityInfoCardHeaderProps: EntityInfoCardHeaderDefaultProps =
  {
    accountBalance: null,
    state: {
      label: "[State]",
      icon: "Circle",
    },
    actionIcon: null,
    contextMenu: null,
  };

/**
 * Displays the header of an entity info card.
 *
 * @version 0.0.10
 *
 * @param {EntityInfoCardHeaderProps & TestIdProps} props - EntityInfoCardHeader component props
 * @returns {JSX.Element}
 */
export const EntityInfoCardHeader = (
  props: EntityInfoCardHeaderProps & TestIdProps,
) => {
  const mergedProps = useMergedProps(defaultEntityInfoCardHeaderProps, props);
  const logger = useLogger("EntityInfoCard");

  const testId = useTestId("entity-info-card-header", {
    testId: props.testId,
    overrideTestId: props.overrideTestId,
  });

  const hasState = Boolean(props.state);
  const hasAccountBalance = Boolean(props.accountBalance);

  if (!hasState && !hasAccountBalance) {
    logger.error("Either state or accountBalance must be provided");
    return null;
  }

  if (hasState && hasAccountBalance) {
    logger.error(
      "You provided both state and accountBalance, only state will render",
    );
  }

  return (
    <EntityCardHeader testId={`${testId}-header`} overrideTestId fill gap="s-1">
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
          {...mergedProps.actionIcon}
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
  );
};

const EntityCardHeader = styled(FlexRowLayout)`
  ${entityCardHeaderStyles}
`;
