import { linkTo } from "@storybook/addon-links";
import { useMemo } from "react";
import styled from "styled-components";

import {
  componentCardStyle,
  componentCardContainerStyle,
  componentCardInfoContainerStyle,
  componentCardScaleContainerStyle,
} from "./ComponentCard.styles";
import {
  ComponentCardContainerProps,
  type ComponentCardCellSize,
  type ComponentCardProps,
} from "./ComponentCard.types";
import { randomCellSize } from "./ComponentCard.utils";
import { hasDefaultProps, isDocumentedComponent } from "../ComponentList.utils";

import { Markdown } from "@docs/blocks/Markdown";
import { parseJsDoc } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";
import { capitalize, useStatic } from "@utils";

import { Badge, Heading, Text } from "@components";

import type { AnyIndex, ComponentName } from "../ComponentList.types";
import type { ParsedJsDoc } from "@docs/docs.types";

/**
 * Renders a component card for a given component in the documentation.
 *
 * @remarks Used in ComponentList
 *
 * @template {AnyIndex} TIndex - The shape of an index.ts file containing the component
 * @template {ComponentName<TIndex>} TName - The name of the component as exported in <TIndex>
 *
 * @param {ComponentCardProps<TIndex, TName>} props - The props for the component card.
 * @param {TIndex} props.name - The name of the component.
 * @param {React.ComponentType<TComponentProps>} props.Component - The component to render.
 * @param {boolean} props.randomSize - Whether to randomly generate the size of the card.
 * @param {string} props.parent - The parent of the component.
 * @return {JSX.Element | null} The rendered component card or null if componentProps or description is falsy.
 */
export const ComponentCard = <
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
>({
  name,
  Component,
  randomSize,
  parent,
}: ComponentCardProps<TIndex, TName>) => {
  const size = useStatic<ComponentCardCellSize>(() =>
    randomSize ? randomCellSize() : "small"
  );

  const { description, internal, todo, version } = useStatic<
    Partial<ParsedJsDoc>
  >(() => {
    if (!isDocumentedComponent(Component)) return {};
    const jsdoc = Component.__docgenInfo.description ?? null;

    if (!jsdoc) return {};
    return parseJsDoc(jsdoc);
  });

  const componentProps = useMemo(() => {
    if (!hasDefaultProps(Component)) return {};

    const { defaultProps } = Component;
    const additionalProps =
      name === "Text" || name === "Heading"
        ? {
            children: `Global ${name}`,
            weight: "medium",
            important: true,
          }
        : name === "Badge"
        ? { label: "Badge" }
        : name === "InputAssistiveText"
        ? { assistiveText: "Input assistive text" }
        : name === "Avatar"
        ? { name: "Mathilde Carbonet" }
        : name === "EntityInfoCard"
        ? { name: "Entity" }
        : name === "IconPicker"
        ? { icons: ["Square", "Circle", "Triangle", "Star"] }
        : name === "ComboBox"
        ? {
            options: [
              { label: "Option 1", value: "Option 1" },
              { label: "Option 2", value: "Option 2" },
            ],
          }
        : {};

    return {
      ...defaultProps,
      ...additionalProps,
    };
  }, [Component, name]);

  const redirectToDocs = useMemo(() => {
    const parentPath = parent ? `/${capitalize(parent)}` : "";
    const url = `Components${parentPath}/${name}/Usage`;
    return linkTo(url);
  }, [name, parent]);

  if (!componentProps || !description) {
    return null;
  }
  const renderedComponent = Component(componentProps);

  if (!renderedComponent) {
    return null;
  }

  return (
    <CardContainer
      $size={size}
      data-testid="component-card"
      title={name}
      onClick={redirectToDocs}
    >
      <ComponentContainer data-testid="component-card-component-container">
        <ComponentScaleContainer data-testid="component-card-scale-container">
          {renderedComponent}
        </ComponentScaleContainer>
        {version && <Badge label={version} color="gray" />}
      </ComponentContainer>
      <InfoContainer>
        <FlexRowLayout gap="s-2" align="center" justify="start">
          <Heading size="h3" weight="medium" color="gray-800" important>
            {name}
          </Heading>
          {internal && <Badge label="Internal" color="warning" />}
          {todo && <Badge label="WIP" color="pending" />}
        </FlexRowLayout>
        {description && (
          <Text size="s" color="gray-600" important>
            <Markdown>{description}</Markdown>
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

const ComponentScaleContainer = styled.div`
  ${componentCardScaleContainerStyle}
`;

const InfoContainer = styled.div`
  ${componentCardInfoContainerStyle}
`;
