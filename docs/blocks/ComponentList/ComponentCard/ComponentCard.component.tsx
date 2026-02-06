import { linkTo } from "@storybook/addon-links";
import { useMemo } from "react";

import { useComponentCardStyles } from "./ComponentCard.styles";
import { randomCellSize } from "./ComponentCard.utils";
import { hasDefaultProps, isDocumentedComponent } from "../ComponentList.utils";

import { SampleGridItems } from "@/layouts/Grid/Grid.stories";
import { Markdown } from "@docs/blocks/Markdown";
import { parseJsDoc } from "@docs/docs.utils";
import { FlexRowLayout, TableBody, TableCell, TableRow } from "@layouts";
import { capitalize, useStatic } from "@utils";

import { Badge, Button, Heading, Text } from "@components";

import type {
  ComponentCardCellSize,
  ComponentCardProps,
} from "./ComponentCard.types";
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
  TName extends ComponentName<TIndex>,
>({
  name,
  Component,
  randomSize,
  parent,
}: ComponentCardProps<TIndex, TName>): JSX.Element | null => {
  const size = useStatic<ComponentCardCellSize>(() =>
    randomSize ? randomCellSize() : "small"
  );

  const { classNames, style } = useComponentCardStyles(size);

  const { description, internal, todo, version } = useStatic<
    Partial<ParsedJsDoc>
  >(() => {
    if (!isDocumentedComponent(Component)) return {};
    const jsdoc = Component.__docgenInfo.description ?? null;

    if (!jsdoc) return {};
    return parseJsDoc(jsdoc);
  });

  const componentProps = useMemo(() => {
    const defaultProps = hasDefaultProps(Component)
      ? Component.defaultProps
      : {};

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
                ? { name: name }
                : name === "IconPicker"
                  ? { icons: ["Square", "Circle", "Triangle", "Star"] }
                  : name === "ComboBox"
                    ? {
                        options: [
                          { label: "Option 1", value: "Option 1" },
                          { label: "Option 2", value: "Option 2" },
                        ],
                      }
                    : name === "Collapsible"
                      ? {
                          children: <Text>{name}</Text>,
                        }
                      : name.endsWith("Layout")
                        ? {
                            children: SampleGridItems,
                          }
                        : name === "Popover"
                          ? {
                              children: (
                                <Button label="Button trigger" color="black" />
                              ),
                            }
                          : name === "Table"
                            ? {
                                children: (
                                  <TableBody>
                                    <TableRow>
                                      <TableCell padded>Data 1</TableCell>
                                      <TableCell padded>Data 2</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell padded>Data 3</TableCell>
                                      <TableCell padded>Data 4</TableCell>
                                    </TableRow>
                                  </TableBody>
                                ),
                              }
                            : {};

    return {
      ...defaultProps,
      ...additionalProps,
    };
  }, [Component, name]);

  const componentName = useMemo(() => {
    return name.endsWith("Layout") ? name.slice(0, -6) : name;
  }, [name]);

  const redirectToDocs = useMemo(() => {
    const parentPath = parent ? `/${capitalize(parent)}` : "";
    const componentOrLayoutPath = parent === "Layouts" ? "" : "Components";
    const url = `${componentOrLayoutPath}${parentPath}/${componentName}/Usage`;
    return linkTo(url);
  }, [componentName, parent]);

  if (!componentProps || !description) {
    return null;
  }
  const renderedComponent = Component(componentProps);

  if (!renderedComponent) {
    return null;
  }

  return (
    <article
      className={classNames.card}
      style={style}
      data-testid="component-card"
      title={componentName}
      onClick={redirectToDocs}
    >
      <div
        className={classNames.componentContainer}
        data-testid="component-card-component-container"
      >
        <div
          className={classNames.scaleContainer}
          data-testid="component-card-scale-container"
        >
          {renderedComponent}
        </div>
        {version && <Badge label={version} color="gray" />}
      </div>
      <div className={classNames.infoContainer}>
        <FlexRowLayout gap="s-2" align="center" justify="start">
          <Heading size="h3" weight="medium" color="gray-800" important>
            {componentName}
          </Heading>
          {internal && <Badge label="Internal" color="warning" />}
          {todo && <Badge label="WIP" color="pending" />}
        </FlexRowLayout>
        {description && (
          <Text size="s" color="gray-600" important>
            <Markdown>{description}</Markdown>
          </Text>
        )}
      </div>
    </article>
  );
};
