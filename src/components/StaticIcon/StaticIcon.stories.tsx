import { useMemo } from "react";

import { StaticIcon } from "./StaticIcon.component";
import { FlexRowLayout } from "../../layouts";

import { ComponentVariants } from "@docs/blocks";

import type { StaticIconProps, StaticIconSize } from "./StaticIcon.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { ColorPalette } from "@types";

const meta: Meta<typeof StaticIcon> = {
  title: "Components/StaticIcon/Stories",
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
  args: StaticIcon.defaultProps,
};

export const Colors = (props: Partial<StaticIconProps>) => {
  const colors: (keyof ColorPalette)[] = [
    "primary",
    "success",
    "pending",
    "warning",
    "error",
    "gray",
  ];
  const defaultProps = useMemo(() => {
    return {
      ...StaticIcon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={StaticIcon}
      align="center"
    />
  );
};
Colors.args = {
  name: "Square",
  size: "s",
};

export const Sizes = (props: Partial<StaticIconProps>) => {
  const sizes: StaticIconSize[] = ["xs", "s", "m", "l"];
  const defaultProps = useMemo(() => {
    return {
      ...StaticIcon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={StaticIcon}
      align="center"
    />
  );
};
Sizes.args = {
  name: "Square",
  size: "s",
};

export const Stroke = (props: Partial<StaticIconProps>) => {
  const defaultProps = useMemo(() => {
    return {
      ...StaticIcon.defaultProps,
      ...props,
    };
  }, [props]);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={[false, true]}
      for="stroke"
      propLabels
      of={StaticIcon}
      align="center"
    />
  );
};
Stroke.args = {
  name: "Square",
  size: "s",
};
