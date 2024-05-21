import { useMemo } from "react";
import styled from "styled-components";

import {
  componentCardStyle,
  componentCardContainerStyle,
  componentCardInfoContainerStyle,
} from "./ComponentCard.styles";
import {
  ComponentCardContainerProps,
  type ComponentCardCellSize,
  type ComponentCardProps,
} from "./ComponentCard.types";
import { randomCellSize } from "./ComponentCard.utils";
import { hasDefaultProps, isDocumentedComponent } from "../ComponentList.utils";

import { parseJsDoc } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";
import { useStatic } from "@utils";

import { Badge, Heading, Text } from "@components";

import type { AnyIndex, ComponentName } from "../ComponentList.types";
import type { ParsedJsDoc } from "@docs/docs.types";

export const ComponentCard = <
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
>({
  name,
  Component,
  randomSize,
}: ComponentCardProps<TIndex, TName>) => {
  const size = useStatic<ComponentCardCellSize>(() =>
    randomSize ? randomCellSize() : "small"
  );

  const { description, internal, todo } = useStatic<Partial<ParsedJsDoc>>(
    () => {
      if (!isDocumentedComponent(Component)) return {};

      const jsdoc = Component.__docgenInfo.description ?? null;

      if (!jsdoc) return {};
      return parseJsDoc(jsdoc);
    }
  );

  const componentProps = useMemo(() => {
    if (!hasDefaultProps(Component)) return null;

    const { defaultProps } = Component;
    const additionalProps =
      name === "Text" || name === "Heading"
        ? {
            children: `Global ${name}`,
            color: "primary-dark",
            weight: "medium",
            important: true,
          }
        : {};

    return {
      ...defaultProps,
      ...additionalProps,
    };
  }, [Component, name]);

  if (!componentProps || !description) return null;
  const renderedComponent = Component(componentProps);

  if (!renderedComponent) {
    return null;
  }

  return (
    <CardContainer $size={size} data-testid="component-card">
      <ComponentContainer data-testid="component-card-component-container">
        {renderedComponent}
      </ComponentContainer>
      <InfoContainer>
        <FlexRowLayout gap="s-2" align="baseline" justify="start">
          <Heading size="h3" weight="medium" color="gray-800" important>
            {name}
          </Heading>
          {todo && <Badge label="WIP" color="pending" />}
          {internal && <Badge label="Internal" color="warning" />}
        </FlexRowLayout>
        {description && (
          <Text size="s" color="gray-600" important>
            {description}
          </Text>
        )}
      </InfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.article<ComponentCardContainerProps>`
  ${componentCardStyle}
`;

const ComponentContainer = styled.div`
  ${componentCardContainerStyle}
`;

const InfoContainer = styled.div`
  ${componentCardInfoContainerStyle}
`;
