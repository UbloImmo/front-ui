import { Meta, StoryObj } from "@storybook/react";

import { Hypertext } from "./Hypertext.component";
import { HypertextProps } from "./Hypertext.types";

import { FlexRowLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

const componentSource = componentSourceFactory<HypertextProps>(
  "Hypertext",
  Hypertext.defaultProps
);

const meta = {
  title: "Components/Hypertext/Stories",
  component: Hypertext,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof Hypertext>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: Hypertext.defaultProps,
};

const texts = [
  "a short link",
  "a much longer and much more descriptive link to a page",
];

export const TextLengths = (props: HypertextProps) => {
  const defaultProps = useMergedProps(Hypertext.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={texts}
      for="children"
      of={Hypertext}
      scaling={1}
      propLabels
    />
  );
};

TextLengths.args = {
  href: "https://www.ublo.immo/",
};
TextLengths.parameters = {
  docs: componentSource(
    texts.flatMap((text) => ({
      children: text,
      href: "https://www.ublo.immo/",
    }))
  ),
};
