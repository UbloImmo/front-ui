import { useMemo } from "react";
import styled from "styled-components";

import { FlexLayout } from "./Flex.layout";

import { ComponentVariants } from "@docs/blocks";

import { FlexAlignment, FlexDirection, FlexGap, FlexLayoutProps } from ".";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: FlexLayout,
  title: "Layouts/Flex/Stories",
} satisfies Meta<typeof FlexLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlexItem = styled.div`
  background-color: var(--primary-medium);
  width: var(--s-10);
  height: var(--s-10);
  border-radius: var(--s-1);
  box-shadow: var(--shadow-button);
`;

const flexItems = Array.from({ length: 3 }, (_, index) => (
  <FlexItem key={index} className="flex-item-story" />
));

export const Default: Story = {
  args: {
    children: flexItems,
    gap: "s-4",
    wrap: true,
  },
};

export const Direction = (props: Partial<FlexLayoutProps>) => {
  const directions: FlexDirection[] = ["row", "column"];
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.defaultProps,
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

export const Gap = (props: Partial<FlexLayoutProps>) => {
  const gaps: FlexGap[] = ["s-1", "24px", "3rem", 5];
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.defaultProps,
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

export const Justify = (props: Partial<FlexLayoutProps>) => {
  const justify: FlexAlignment[] = [
    "start",
    "center",
    "space-between",
    "end",
    "space-evenly",
  ];
  const defaultProps = useMemo(() => {
    return {
      ...FlexLayout.defaultProps,
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
      direction="column"
      align="center"
      fill="row"
    />
  );
};
Justify.args = { children: flexItems, gap: "s-1" };
