import { Meta, StoryObj } from "@storybook/react";

import { ContextInfoCard } from "./ContextInfoCard.component";

const meta = {
  component: ContextInfoCard,
  title: "Components/Entity/ContextInfoCard/Stories",
} satisfies Meta<typeof ContextInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: ContextInfoCard.defaultProps,
};

export const WithLabel: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    label: "Context Label",
    staticIcon: ContextInfoCard.defaultProps.staticIcon,
  },
};

export const WithDescription: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    description: "This is a description of the context",
    staticIcon: ContextInfoCard.defaultProps.staticIcon,
  },
};

export const WithDetails: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    details: "This is a details of the context",
    staticIcon: ContextInfoCard.defaultProps.staticIcon,
  },
};

export const WithAllProps: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    label: "Context Label",
    description: "This is a description of the context",
    details: "This is a details of the context",
    staticIcon: ContextInfoCard.defaultProps.staticIcon,
  },
};

export const DifferentIcon: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    staticIcon: {
      name: "InvoiceClock",
      color: "pending",
    },
  },
};
