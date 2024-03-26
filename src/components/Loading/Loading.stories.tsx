import { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./Loading.component";

const meta = {
  title: "Components/Loading",
  component: Loading,
  args: Loading.defaultProps,
} satisfies Meta<typeof Loading>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...Loading.defaultProps, size: "6rem" },
};
