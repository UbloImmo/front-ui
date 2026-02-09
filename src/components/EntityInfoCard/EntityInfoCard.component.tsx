import { useMemo } from "react";

import {
  defaultEntityInfoCardFooterProps,
  defaultEntityInfoCardHeaderProps,
  defaultEntityInfoCardSectionProps,
  EntityInfoCardFooter,
  EntityInfoCardHeader,
  EntityInfoCardSection,
} from "./components";
import styles from "./EntityInfoCard.module.scss";

import { FlexColumnLayout } from "@/layouts/Flex";
import { useTestId, useMergedProps, useCssClasses } from "@utils";

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
 * @version 0.0.13
 *
 * @param {EntityInfoCardProps & TestIdProps} props - EntityInfoCard component props
 * @returns {JSX.Element}
 */
const EntityInfoCard = (
  props: EntityInfoCardProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultEntityInfoCardProps, props);
  const { testId: testIdProp, overrideTestId } = props;
  const testId = useTestId("entity-info-card", {
    testId: testIdProp,
    overrideTestId,
  });
  const className = useCssClasses(styles["entity-info-card"]);

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

  return (
    <FlexColumnLayout
      as="section"
      className={className}
      testId={testId}
      overrideTestId
      fill
    >
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
    </FlexColumnLayout>
  );
};
EntityInfoCard.__DEFAULT_PROPS = defaultEntityInfoCardProps;

export { EntityInfoCard };
