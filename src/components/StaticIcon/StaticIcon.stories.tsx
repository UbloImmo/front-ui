import type { Meta, StoryObj } from "@storybook/react";

import { StaticIcon } from "./StaticIcon.component";
import { FlexRowLayout } from "../../layouts";

const meta: Meta<typeof StaticIcon> = {
  title: "Components/StaticIcon",
  component: StaticIcon,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof StaticIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Square",
    stroke: true,
    color: "primary",
    size: "s",
  },
};
