import styles from "../EntityInfoCard.module.scss";

import { AccountBalance } from "@/components/AccountBalance";
import { ActionIcon } from "@/components/ActionIcon";
import { ContextMenu } from "@/components/ContextMenu";
import { StateIndicator } from "@/components/StateIndicator";
import { FlexRowLayout } from "@/layouts/Flex";
import { useCssClasses, useLogger, useMergedProps, useTestId } from "@utils";

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
 * @version 0.1.0
 *
 * @param {EntityInfoCardHeaderProps & TestIdProps} props - EntityInfoCardHeader component props
 */
export const EntityInfoCardHeader = (
  props: EntityInfoCardHeaderProps & TestIdProps
) => {
  const mergedProps = useMergedProps(defaultEntityInfoCardHeaderProps, props);
  const logger = useLogger("EntityInfoCard");

  const testId = useTestId("entity-info-card-header", {
    testId: props.testId,
    overrideTestId: props.overrideTestId,
  });
  const className = useCssClasses(styles["entity-info-card-header"]);

  const hasState = Boolean(mergedProps.state);
  const hasAccountBalance = Boolean(mergedProps.accountBalance);

  if (!hasState && !hasAccountBalance) {
    logger.error("Either state or accountBalance must be provided");
    return null;
  }

  return (
    <FlexRowLayout
      as="header"
      className={className}
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
    </FlexRowLayout>
  );
};
