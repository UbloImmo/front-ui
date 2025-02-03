import { useMemo } from "react";
import styled from "styled-components";

import {
  defaultEntityInfoCardFooterProps,
  defaultEntityInfoCardHeaderProps,
  defaultEntityInfoCardSectionProps,
  EntityInfoCardFooter,
  EntityInfoCardHeader,
  EntityInfoCardSection,
} from "./components";
import { entityCardContainerStyles } from "./EntityInfoCard.styles";

import { FlexColumnLayout } from "@layouts";
import { useTestId, useMergedProps, useLogger } from "@utils";

import type {
  EntityInfoCardProps,
  EntityInfoCardDefaultProps,
  EntityInfoCardSectionProps,
} from "./EntityInfoCard.types";
import type { TestIdProps } from "@types";

const defaultEntityInfoCardProps: EntityInfoCardDefaultProps = {
  ...defaultEntityInfoCardSectionProps,
  ...defaultEntityInfoCardFooterProps,
  ...defaultEntityInfoCardHeaderProps,
  sections: [],
};

/**
 * Displays key information about an entity in a card.
 *
 * @version 0.0.12
 *
 * @param {EntityInfoCardProps & TestIdProps} props - EntityInfoCard component props
 * @returns {JSX.Element}
 */
const EntityInfoCard = (
  props: EntityInfoCardProps & TestIdProps
): JSX.Element => {
  const logger = useLogger("EntityInfoCard");
  const mergedProps = useMergedProps(defaultEntityInfoCardProps, props);
  const { testId: testIdProp, overrideTestId } = props;
  const testId = useTestId("entity-info-card", {
    testId: testIdProp,
    overrideTestId,
  });

  const sections = useMemo<EntityInfoCardSectionProps[]>(() => {
    const {
      name,
      children,
      infoBoxes,
      infoCards,
      statusRows,
      contextInfoCards,
      order,
    } = mergedProps;
    return [
      {
        name,
        children,
        infoBoxes,
        infoCards,
        statusRows,
        contextInfoCards,
        order,
      },
      ...mergedProps.sections,
    ];
  }, [mergedProps]);

  const hasState = Boolean(props.state);
  const hasAccountBalance = Boolean(props.accountBalance);

  if (hasState && hasAccountBalance) {
    logger.error(
      "You provided both state and accountBalance, only state will render"
    );
  }

  return (
    <EntityCardContainer testId={testId} overrideTestId fill>
      <EntityInfoCardHeader {...mergedProps} testId={testId} overrideTestId />
      {sections.map((section, index) => (
        <EntityInfoCardSection
          key={`${testId}-section-${index}`}
          onInfoCopied={mergedProps.onInfoCopied}
          {...section}
          testId={`${testId}-section-${index}`}
          overrideTestId
        />
      ))}
      <EntityInfoCardFooter {...mergedProps} testId={testId} overrideTestId />
    </EntityCardContainer>
  );
};
EntityInfoCard.defaultProps = defaultEntityInfoCardProps;

export { EntityInfoCard };

const EntityCardContainer = styled(FlexColumnLayout)`
  ${entityCardContainerStyles}
`;
