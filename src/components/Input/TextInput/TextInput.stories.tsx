import { TextInput } from "./TextInput.component";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Forms/Input/TextInput/Stories",
  component: TextInput,
  args: {
    uncontrolled: true,
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Text input",
  },
};
