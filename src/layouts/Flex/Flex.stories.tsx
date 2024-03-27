import type { Meta, StoryObj } from "@storybook/react";
import { FlexLayout } from "./Flex.layout";
import styled from "styled-components";

const meta = {
  component: FlexLayout,
  title: "Layouts/Flex",
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

const flexItems = Array.from({ length: 5 }, (_, index) => (
  <FlexItem key={index} />
));

export const Default: Story = {
  args: {
    children: flexItems,
    gap: "s-4",
    wrap: true,
  },
};

export const Row: Story = {
  args: {
    children: flexItems,
    gap: "s-8",
    justify: "space-between",
    wrap: true,
  },
};

export const Column: Story = {
  args: {
    children: flexItems,
    gap: "s-4",
    direction: "column",
  },
};
