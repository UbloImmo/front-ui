import { useMemo } from "react";

import { FlexColumnLayout, GridLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import {
  componentPropTemplate,
  componentSourceFactory,
} from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import { Heading } from ".";

import type { Meta, StoryObj } from "@storybook/react";
import type {
  HeadingProps,
  HeadingSize,
  PaletteColor,
  TypographyWeight,
} from "@types";

const lorem = "The brown fox jumps over the lazy dog.";

const componentSource = componentSourceFactory<HeadingProps>(
  "Heading",
  { children: lorem },
  Heading.defaultProps
);

const meta = {
  component: Heading,
  title: "Components/Heading/Stories",
  args: {
    children: lorem,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const sizes: HeadingSize[] = ["h1", "h2", "h3", "h4"];

export const Sizes = (props: HeadingProps) => {
  const mergedProps = useMergedProps(Heading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={sizes}
      for="size"
      of={Heading}
      align="start"
      direction="column"
      gap={1}
      scaling={1}
    />
  );
};
Sizes.args = {};
Sizes.parameters = {
  docs: componentSource(componentPropTemplate("size", sizes)),
};

const HeadingSizeRenderer = (props: HeadingProps) => {
  const sizeProps = useMemo<HeadingProps[]>(() => {
    return sizes.map((size) => ({ ...props, size }));
  }, [props]);

  return (
    <FlexColumnLayout gap={1}>
      {sizeProps.map((props) => (
        <Heading {...props} key={props.size}>
          {props.children}
        </Heading>
      ))}
    </FlexColumnLayout>
  );
};

const weights: TypographyWeight[] = ["regular", "semiBold", "bold"] as const;
export const Weights = (props: HeadingProps) => {
  const mergedProps = useMergedProps(Heading.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={weights}
      for="weight"
      of={HeadingSizeRenderer}
      align="start"
      gap={1}
      columns="auto"
      scaling={1}
      propLabels
    />
  );
};
Weights.args = {};
Weights.parameters = {
  docs: componentSource(componentPropTemplate("weight", weights)),
};

const booleans = [false, true];
export const Italic = (props: HeadingProps) => {
  const mergedProps = useMergedProps(Heading.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={booleans}
      for="italic"
      of={HeadingSizeRenderer}
      align="start"
      columns={2}
      gap={1}
      scaling={1}
      propLabels
    />
  );
};
Italic.args = {};
Italic.parameters = {
  docs: componentSource(componentPropTemplate("italic", booleans)),
};

export const Decorations = (props: HeadingProps) => {
  const mergedProps = useMergedProps(Heading.defaultProps, props);
  return (
    <GridLayout columns={["1fr"]}>
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="underline"
        of={HeadingSizeRenderer}
        align="start"
        gap={1}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="overline"
        of={HeadingSizeRenderer}
        align="start"
        gap={1}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="lineThrough"
        of={HeadingSizeRenderer}
        align="start"
        gap={1}
        scaling={1}
        propLabels
      />
    </GridLayout>
  );
};
Decorations.args = {};
Decorations.parameters = {
  docs: componentSource([
    {
      underline: true,
    },
    {
      overline: true,
    },
    {
      lineThrough: true,
    },
  ]),
};

const colors: PaletteColor[] = [
  "gray-800",
  "primary-dark",
  "success-dark",
  "pending-dark",
  "warning-dark",
  "error-dark",
];
export const Colors: Story = (props: HeadingProps) => {
  const mergedProps = useMergedProps(Heading.defaultProps, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={colors}
      for="color"
      of={HeadingSizeRenderer}
      align="start"
      columns={2}
      gap={1}
      scaling={1}
      propLabels
    />
  );
};
Colors.args = {};
Colors.parameters = {
  docs: componentSource(componentPropTemplate("color", colors)),
};
