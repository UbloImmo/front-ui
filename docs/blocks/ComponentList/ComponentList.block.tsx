import styled from "styled-components";

import { ComponentCard } from "./ComponentCard/ComponentCard.component";
import { componentListStyle } from "./ComponentList.styles";
import {
  componentIndexToEntries,
  extractComponentsFromIndex,
} from "./ComponentList.utils";

import { GridLayout } from "@layouts";
import { useStatic } from "@utils";

import type { AnyIndex, ComponentListProps } from "./ComponentList.types";
import type { Nullable } from "@ubloimmo/front-util";
/**
 * Renders a list of components based on the given props.
 *
 * @template {AnyIndex} TIndex - The shape of an index.ts file containing the components to render
 * @param {ComponentListProps<TIndex>} props - The props for the component list.
 * @returns {Nullable<JSX.Element>} - The rendered component list or null if componentEntries is falsy.
 */

export const ComponentList = <TIndex extends AnyIndex>(
  props: ComponentListProps<TIndex>,
): Nullable<JSX.Element> => {
  const index = useStatic(extractComponentsFromIndex(props.index));

  const componentEntries = useStatic(
    componentIndexToEntries(index, props.exclude, props.include),
  );

  if (!componentEntries) return null;

  return (
    <ComponentListContainer>
      <GridLayout columns={props.columns ?? 4} gap="s-3" flow="dense">
        {componentEntries.map(({ name, Component }, index) => (
          <ComponentCard
            key={name + index}
            name={name}
            Component={Component}
            randomSize={props.randomSize}
            parent={props.parent}
          />
        ))}
      </GridLayout>
    </ComponentListContainer>
  );
};

const ComponentListContainer = styled.section`
  ${componentListStyle}
`;
