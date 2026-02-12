import { useMemo } from "react";

import { GridLayout } from "./Grid.layout";
import { GridFlow, GridGap, GridLayoutProps, GridTemplate } from "./Grid.types";
import { ComponentVariants } from "../../../docs/blocks/ComponentVariants";

import { arrayOf } from "@/utils/array.utils";
import { useCssStyles } from "@utils";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: GridLayout,
  title: "Layouts/Grid/Stories",
} satisfies Meta<typeof GridLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({
  first,
  last,
  span,
}: {
  first?: boolean;
  last?: boolean;
  span?: boolean;
}) => {
  const style = useCssStyles(
    {
      backgroundColor: "var(--primary-medium)",
      boxShadow: "var(--shadow-button)",
      borderRadius: "var(--s-1)",
      minWidth: "var(--s-10)",
      minHeight: "var(--s-10)",
    },
    span
      ? {
          gridColumn: "span 4",
        }
      : null,
    first
      ? {
          gridRow: "span 2",
          height: "100%",
        }
      : null,
    last
      ? {
          gridColumn: "span 8",
        }
      : null
  );

  return <div style={style} />;
};

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
      ...GridLayout.__DEFAULT_PROPS,
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
      ...GridLayout.__DEFAULT_PROPS,
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
      ...GridLayout.__DEFAULT_PROPS,
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
      ...GridLayout.__DEFAULT_PROPS,
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
    children: arrayOf(4, (index) => (
      <GridItem span first={!index} last={index === 3} key={index} />
    )),
    rows: 2,
  },
};
