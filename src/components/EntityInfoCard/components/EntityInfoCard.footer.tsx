import styled from "styled-components";

import { entityCardActionsContainerStyles } from "../EntityInfoCard.styles";

import { Action } from "@/components/Action";
import { FlexColumnLayout } from "@layouts";
import { useMergedProps, useTestId } from "@utils";

import type {
  EntityInfoCardFooterDefaultProps,
  EntityInfoCardFooterProps,
} from "../EntityInfoCard.types";
import type { TestIdProps } from "@types";

export const defaultEntityInfoCardFooterProps: EntityInfoCardFooterDefaultProps =
  {
    actions: [],
  };

/**
 * The footer of an `EntityInfoCard`.
 * Renders the card's footer's content (actions only for now).
 *
 * @version 0.0.10
 *
 * @param {EntityInfoCardFooterProps & TestIdProps} props - the properties of the footer
 */
export const EntityInfoCardFooter = (
  props: EntityInfoCardFooterProps & TestIdProps,
) => {
  const { testId: testIdProp, overrideTestId } = props;
  const { actions } = useMergedProps(defaultEntityInfoCardFooterProps, props);
  const testId = useTestId("entity-info-card-footer", {
    testId: testIdProp,
    overrideTestId,
  });

  return (
    <>
      {!!actions.length && (
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
    </>
  );
};

const EntityCardActionsContainer = styled(FlexColumnLayout)`
  ${entityCardActionsContainerStyles}
`;
