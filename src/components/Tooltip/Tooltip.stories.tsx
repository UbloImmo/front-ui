import { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

import { Tooltip } from "./Tooltip.component";

const Container = styled.div`
  height: 50vh;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip/Stories",
  component: Tooltip,
  argTypes: {
    direction: {
      options: ["top", "bottom", "left", "right"],
    },
  },
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
};
