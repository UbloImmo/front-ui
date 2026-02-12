import styles from "../EntityInfoCard.module.scss";

import { Action } from "@/components/Action";
import { FlexColumnLayout } from "@/layouts/Flex";
import { useCssClasses, useMergedProps, useTestId } from "@utils";

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
  props: EntityInfoCardFooterProps & TestIdProps
) => {
  const { testId: testIdProp, overrideTestId } = props;
  const { actions } = useMergedProps(defaultEntityInfoCardFooterProps, props);
  const testId = useTestId("entity-info-card-footer", {
    testId: testIdProp,
    overrideTestId,
  });
  const className = useCssClasses(styles["entity-info-card-actions"]);

  return (
    <>
      {!!actions.length && (
        <FlexColumnLayout
          as="footer"
          className={className}
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
        </FlexColumnLayout>
      )}
    </>
  );
};
