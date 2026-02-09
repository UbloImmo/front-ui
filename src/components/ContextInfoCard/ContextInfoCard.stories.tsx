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
  args: ContextInfoCard.__DEFAULT_PROPS,
};

export const WithLabel: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    label: "Context Label",
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
  },
};

export const WithDescription: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    description: "This is a description of the context",
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
  },
};

export const WithDetails: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    details: "This is a details of the context",
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
  },
};

export const WithAllProps: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    label: "Context Label",
    description: "This is a description of the context",
    details: "This is a details of the context",
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
  },
};

export const DifferentIcon: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    icon: {
      name: "InvoiceClock",
      color: "pending",
    },
  },
};

export const WithHref: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
    href: "#",
  },
};

export const WithValue: Story = {
  args: {
    title: ContextInfoCard.__DEFAULT_PROPS.title,
    icon: ContextInfoCard.__DEFAULT_PROPS.icon,
    href: "#",
    content: (
      <Text size="m" weight="medium" color="gray-800">
        123,45€
      </Text>
    ),
  },
};
