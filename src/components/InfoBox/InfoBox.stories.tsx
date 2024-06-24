import { InfoBox } from "./InfoBox.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
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
  argTypes: {
    icon: {
      options: allIconNames,
    },
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
      propLabels
    />
  );
};

const examples: DetailConfigVariants<InfoBoxProps> = [
  {
    icon: "Heart",
    label: "Favorite food",
    info: "Pizza",
  },
  {
    icon: "Globe",
    label: "Location",
    info: "Paris",
    __propVariantLabel: "Location info box",
  },
  {
    icon: "CashStack",
    label: "Income",
    info: "0 €",
  },
];

export const Examples = () => {
  return (
    <ComponentVariants
      defaults={InfoBox.defaultProps}
      variants={examples}
      of={InfoBox}
      columns={examples.length}
    />
  );
};
