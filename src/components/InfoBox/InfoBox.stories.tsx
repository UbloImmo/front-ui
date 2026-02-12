import { InfoBox } from "./InfoBox.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { InfoBoxProps } from "./InfoBox.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<InfoBoxProps>(
  "InfoBox",
  {
    icon: "Square",
    label: "[Label]",
    info: "[Info]",
  },
  InfoBox.__DEFAULT_PROPS
);

const meta = {
  component: InfoBox,
  title: "Components/Entity/InfoBox/Stories",
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
  const mergedProps = useMergedProps(InfoBox.__DEFAULT_PROPS, {
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

Info.parameters = {
  docs: componentSource(
    infos.map((info) => ({
      ...InfoBox.__DEFAULT_PROPS,
      info,
    }))
  ),
};

const examples: DetailConfigVariants<InfoBoxProps> = [
  {
    icon: "Heart",
    label: "Favorite food",
    info: "Pizza",
    __propVariantLabel: "Favorite food",
  },
  {
    icon: "Globe",
    label: "Location",
    info: "Paris",
    __propVariantLabel: "Location",
  },
  {
    icon: "CashStack",
    label: "Income",
    info: "0 €",
    __propVariantLabel: "Income",
  },
];

export const Examples = () => {
  return (
    <ComponentVariants
      defaults={InfoBox.__DEFAULT_PROPS}
      variants={examples}
      of={InfoBox}
      columns={examples.length}
    />
  );
};

Examples.parameters = {
  docs: componentSource(
    examples.map((example) => ({
      ...InfoBox.__DEFAULT_PROPS,
      ...example,
    }))
  ),
};
