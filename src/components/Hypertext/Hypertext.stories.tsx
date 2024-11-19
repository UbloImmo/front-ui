import { Meta, StoryObj } from "@storybook/react";

import { Hypertext } from "./Hypertext.component";
import { HypertextProps } from "./Hypertext.types";
import { Text } from "../Text";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { ColorKey } from "@types";

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
    <Text size="s">
      lorem ipsum <Hypertext {...props}>{props.children}</Hypertext> sit amet.
      Cras consectetur fermentum ante, sed venenatis sem semper vel. Vestibulum
      convallis nulla fermentum tincidunt fermentum. Etiam hendrerit bibendum
      vestibulum.
    </Text>
  );
};

export const HypertextInText = (props: HypertextProps) => {
  const defaultProps = useMergedProps(Hypertext.defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={texts}
      for="children"
      of={HypertextInTextRenderer}
      scaling={1}
      propLabels
    />
  );
};
HypertextInText.parameters = {
  docs: componentSource(
    texts.map((text) => ({
      ...Hypertext.defaultProps,
      children: text,
    }))
  ),
};

const urls = ["https://www.ublo.immo/", "https://www.google.com/"];

export const Redirection = (props: HypertextProps) => {
  const defaultProps = useMergedProps(Hypertext.defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={urls}
      for="href"
      of={Hypertext}
      scaling={1}
      propLabels
    />
  );
};

Redirection.args = {
  children: "[Hypertext]",
  title: "Redirects to another page",
};
Redirection.parameters = {
  docs: componentSource(
    urls.map((url) => ({
      ...Hypertext.defaultProps,
      href: url,
    }))
  ),
};

const colors: ColorKey[] = [
  "primary",
  "pending",
  "warning",
  "success",
  "error",
  "gray",
];

export const Colors = (props: HypertextProps) => {
  const defaultProps = useMergedProps(Hypertext.defaultProps, props);
  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={Hypertext}
      scaling={1}
      propLabels
    />
  );
};
Colors.parameters = {
  docs: componentSource(
    colors.map((color) => ({
      ...Hypertext.defaultProps,
      color,
    }))
  ),
};
