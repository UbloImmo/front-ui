import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon.component";
import { IconProps } from "./Icon.types";
import { ColorPalette, PaletteColor } from "../../types";
import { FlexRowLayout } from "../../layouts";

const meta = {
  title: "Components/Icon",
  component: Icon,
  decorators: [
    (Story) => {
      return (
        <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
          <Story />
        </FlexRowLayout>
      );
    },
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Subtract",
  },
};

export const AllColors = (props: Partial<IconProps>) => {
  const colors: Exclude<keyof ColorPalette, "gray">[] = [
    "primary",
    "error",
    "pending",
    "success",
    "warning",
    "error",
  ];
  const colorShades: PaletteColor[] = colors.flatMap(
    (color): `${typeof color}-${"base" | "light" | "dark" | "medium"}`[] => [
      `${color}-base`,
      `${color}-light`,
      `${color}-medium`,
      `${color}-dark`,
    ]
  );
  return (
    <>
      {colorShades.map((colorShade, index) => (
        <Icon
          name="Airplane"
          {...props}
          color={colorShade}
          key={`${colorShade}-${index}`}
        />
      ))}
    </>
  );
};
