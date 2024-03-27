import { TextInput } from "./TextInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Input/TextInput",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Text input",
  },
};
