import { useMemo } from "react";
import styled from "styled-components";

import { GridLayout } from "./Grid.layout";
import { GridFlow, GridGap, GridLayoutProps, GridTemplate } from "./Grid.types";
import { ComponentVariants } from "../../../docs/blocks/ComponentVariants";

import { arrayOf } from "@/utils/array.utils";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: GridLayout,
  title: "Layouts/Grid/Stories",
} satisfies Meta<typeof GridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = styled.div`
  background-color: var(--primary-medium);
  box-shadow: var(--shadow-button);
  border-radius: var(--s-1);
  min-width: var(--s-10);
  min-height: var(--s-10);
`;

const GridItemSpans = styled(GridItem)`
  grid-column: span 4;
  &:first-child {
    grid-row: span 2;
    height: 100%;
  }

  &:nth-child(4) {
    grid-column: span 8;
  }
`;

export const SampleGridItems = arrayOf(4, (index) => <GridItem key={index} />);

export const Default: Story = {
  args: {
    children: SampleGridItems,
  },
};

const gaps: GridGap[] = ["s-1", "24px", "3rem", 4];
export const Gap = (props: Partial<GridLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...GridLayout.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={gaps}
      for="gap"
      of={GridLayout}
      scaling={1.1}
      fill="row"
    />
  );
};
Gap.args = {
  children: SampleGridItems,
};

const columns: GridTemplate[] = [2, 4, ["1fr", "2fr"], "unset"];
export const Columns = (props: Partial<GridLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...GridLayout.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={columns}
      for="columns"
      of={GridLayout}
      scaling={1.1}
      fill="row"
    />
  );
};

Columns.args = {
  children: SampleGridItems,
  justify: "center",
};

const rows: GridTemplate[] = [2, "unset"];

export const Rows = (props: Partial<GridLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...GridLayout.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={rows}
      for="rows"
      of={GridLayout}
      scaling={1.1}
      fill="row"
    />
  );
};

Rows.args = {
  columns: 3,
  flow: "column",
  children: SampleGridItems,
};

const flow: GridFlow[] = ["row", "column"];

export const Flow = (props: Partial<GridLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...GridLayout.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={flow}
      for="flow"
      of={GridLayout}
      scaling={1.1}
      align="center"
      justify="center"
    />
  );
};
Flow.args = {
  children: arrayOf(2, (index) => <GridItem key={index} />),
  rows: 2,
};

export const Spans: Story = {
  args: {
    children: arrayOf(4, (index) => <GridItemSpans key={index} />),
    rows: 2,
  },
};
