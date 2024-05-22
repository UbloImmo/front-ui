import styled from "styled-components";

import { ComponentCard } from "./ComponentCard/ComponentCard.component";
import { componentListStyle } from "./ComponentList.styles";
import {
  componentIndexToEntries,
  extractComponentsFromIndex,
} from "./ComponentList.utils";

import { GridLayout } from "@layouts";
import { useStatic } from "@utils";

import * as componentsIndexRaw from "@components";

export const ComponentsListRenderer = () => {
  const index = useStatic(extractComponentsFromIndex(componentsIndexRaw));
  const componentEntries = useStatic(componentIndexToEntries(index));

  if (!componentEntries) return null;

  return (
    <GridLayout columns={3} gap="s-3" flow="dense">
      {componentEntries.map(({ name, Component }, index) => (
        <ComponentCard
          key={name + index}
          name={name}
          Component={Component}
          randomSize
        />
      ))}
    </GridLayout>
  );
};

export const ComponentList = () => {
  return (
    <ComponentListContainer>
      <ComponentsListRenderer />
    </ComponentListContainer>
  );
};

const ComponentListContainer = styled.section`
  ${componentListStyle}
`;
