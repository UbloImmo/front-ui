import { Meta, StoryObj } from "@storybook/react";

import { Hypertext } from "./Hypertext.component";
import { HypertextProps } from "./Hypertext.types";
import { Text } from "../Text";

import { FlexLayout } from "@/layouts";
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
  args: {
    children: "[Hypertext]",
    href: "https://www.ublo.immo/",
    title: "Ublo's homepage",
  },
  decorators: [
    (Story) => (
      <FlexLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexLayout>
    ),
  ],
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Hypertext>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

TextLengths.parameters = {
  docs: componentSource(
    texts.flatMap((text) => ({
      children: text,
      title: "Ublo's homepage",
      href: "https://www.ublo.immo/",
    }))
  ),
};

const HypertextInTextRenderer = (props: HypertextProps) => {
  return (
    <Text>
      lorem ipsum <Hypertext {...props}> dolor </Hypertext> sit amet
    </Text>
  );
};

export const HypertextInText = (props: HypertextProps) => {
  const defaultProps = useMergedProps(Hypertext.defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={["dolor"]}
      for="children"
      of={HypertextInTextRenderer}
      scaling={1}
      propLabels
    />
  );
};
