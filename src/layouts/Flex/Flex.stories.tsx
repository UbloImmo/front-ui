import { CSSProperties, useMemo } from "react";

import { FlexLayout } from "./Flex.layout";

import { arrayOf } from "@/utils/array.utils";
import { ComponentVariants } from "@docs/blocks";
import { useCssStyles } from "@utils";

import { FlexAlignment, FlexDirection, FlexGap, FlexLayoutProps } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: FlexLayout,
  title: "Layouts/Flex/Stories",
} satisfies Meta<typeof FlexLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlexItem = () => {
  const style = useCssStyles({
    background: "var(--primary-medium)",
    width: "var(--s-10)",
    height: "var(--s-10)",
    borderRadius: "var(--s-1)",
    boxShadow: "var(--shadow-button)",
  });
  return <div style={style} className="flex-item-story" />;
};

const flexItems = arrayOf(3, (index) => <FlexItem key={index} />);

export const Default: Story = {
  args: {
    children: flexItems,
    gap: "s-4",
    wrap: true,
  },
};

const directions: FlexDirection[] = ["row", "column"];
export const Direction = (props: Partial<FlexLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={directions}
      for="direction"
      of={FlexLayout}
      scaling={1.1}
      direction="column"
      align="center"
    />
  );
};
Direction.args = {
  children: flexItems,
  gap: "s-4",
  justify: "center",
  align: "center",
};

const gaps: FlexGap[] = ["s-1", "24px", "3rem", 5];

export const Gap = (props: Partial<FlexLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={gaps}
      for="gap"
      of={FlexLayout}
      scaling={1.1}
      direction="column"
      align="center"
    />
  );
};

Gap.args = { children: flexItems, justify: "center" };

const justify: FlexAlignment[] = [
  "start",
  "center",
  "space-between",
  "end",
  "space-evenly",
  "space-around",
  "stretch",
  "baseline",
];

const showcaseStyles: CSSProperties = {
  padding: "var(--s-2)",
  borderRadius: "var(--s-3)",
  height: "6rem",
  border: "1px solid var(--primary-medium)",
};

export const Justify = (props: Partial<FlexLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={justify}
      for="justify"
      of={FlexLayout}
      scaling={1.1}
      columns={2}
      // direction="column"
      align="center"
      fill="row"
    />
  );
};
Justify.args = {
  children: flexItems,
  gap: "s-1",
  styleOverride: showcaseStyles,
  align: "center",
};

export const Align = (props: Partial<FlexLayoutProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.__DEFAULT_PROPS,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={justify}
      for="align"
      of={FlexLayout}
      scaling={1.1}
      columns={2}
      align="center"
      // fill="row"
    />
  );
};
Align.args = {
  children: flexItems,
  gap: "s-1",
  styleOverride: showcaseStyles,
  justify: "center",
};
