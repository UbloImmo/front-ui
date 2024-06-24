import { InfoBox } from "./InfoBox.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { InfoBoxProps } from "./InfoBox.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<InfoBoxProps>(
  "InfoBox",
  {
    icon: "Square",
    label: "[Label]",
    info: "[Info]",
  },
  InfoBox.defaultProps
);

const meta = {
  component: InfoBox,
  title: "Components/InfoBox/Stories",
  args: {
    icon: "Square",
    label: "[Label]",
    info: "[Info]",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof InfoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const infos = ["UI Kit Maker", null];

export const Info = (props: InfoBoxProps) => {
  const mergedProps = useMergedProps(InfoBox.defaultProps, {
    ...props,
    icon: "Briefcase",
    label: "Current position",
  });

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={infos}
      for="info"
      of={InfoBox}
      align="center"
      propLabels
      scaling={1}
    />
  );
};
