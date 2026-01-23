import { Meta, StoryObj } from "@storybook/react-vite";

import { ContextInfoCard } from "./ContextInfoCard.component";
import { Text } from "../Text";

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
    icon: ContextInfoCard.defaultProps.icon,
  },
};

export const WithDescription: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    description: "This is a description of the context",
    icon: ContextInfoCard.defaultProps.icon,
  },
};

export const WithDetails: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    details: "This is a details of the context",
    icon: ContextInfoCard.defaultProps.icon,
  },
};

export const WithAllProps: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    label: "Context Label",
    description: "This is a description of the context",
    details: "This is a details of the context",
    icon: ContextInfoCard.defaultProps.icon,
  },
};

export const DifferentIcon: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    icon: {
      name: "InvoiceClock",
      color: "pending",
    },
  },
};

export const WithHref: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    icon: ContextInfoCard.defaultProps.icon,
    href: "#",
  },
};

export const WithValue: Story = {
  args: {
    title: ContextInfoCard.defaultProps.title,
    icon: ContextInfoCard.defaultProps.icon,
    href: "#",
    content: (
      <Text size="m" weight="medium" color="gray-800">
        123,45€
      </Text>
    ),
  },
};
