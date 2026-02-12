import { fn } from "storybook/test";

import { IconPicker } from "./IconPicker.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { IconPickerProps } from "./IconPicker.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<IconPickerProps>(
  "IconPicker",
  IconPicker.__DEFAULT_PROPS
);

const meta = {
  component: IconPicker,
  title: "Components/Forms/IconPicker/Stories",
  args: {
    icons: [
      "EmojiHeartEyes",
      "EmojiSmile",
      "EmojiNeutral",
      "EmojiFrown",
      "EmojiAngry",
      "EmojiWink",
    ],
    onChange: fn(),
    value: "EmojiHeartEyes",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof IconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Icons: Story = {
  args: {
    icons: [
      "CircleDashed",
      "Circle",
      "Circle2NdHalf",
      "CircleFill",
      "CircleHalf",
    ],
    value: "CircleDashed",
  },
};

export const Rows: Story = {
  args: {
    icons: [
      [
        "Box",
        "Buildings",
        "Building",
        "Houses",
        "HouseDoor",
        "House",
        "PSquare",
        "HSquare",
        "Hospital",
        "Suitcase",
        "Luggage",
        "Tree",
        "Cart3",
      ],
      [
        "BoxFill",
        "BuildingsFill",
        "BuildingFill",
        "HousesFill",
        "HouseDoorFill",
        "HouseFill",
        "PSquareFill",
        "HSquareFill",
        "HospitalFill",
        "SuitcaseFill",
        "LuggageFill",
        "TreeFill",
        "BroadcastPin",
      ],
    ],
  },
};
