import { useMemo } from "react";

import { FlexColumnLayout, GridLayout } from "@/layouts";
import { ComponentVariants } from "@docs/blocks";
import {
  componentPropTemplate,
  componentSourceFactory,
} from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import { Text } from ".";

import type { Meta, StoryObj } from "@storybook/react";
import type {
  ColorKey,
  PaletteColor,
  TextProps,
  TextSize,
  TypographyWeight,
} from "@types";
import type { GenericFn } from "@ubloimmo/front-util";

const lorem = "The brown fox jumps over the lazy dog.";
const componentSource = componentSourceFactory<TextProps>(
  "Text",
  { children: lorem },
  Text.defaultProps
);

const meta = {
  component: Text,
  title: "Components/Text/Stories",
  args: {
    children: lorem,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const sizes: TextSize[] = ["m", "s", "xs"];

export const Sizes = (props: TextProps) => {
  const mergedProps = useMergedProps(Text.defaultProps, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={sizes}
      for="size"
      of={Text}
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

const TextSizeRenderer = (props: TextProps) => {
  const sizeProps = useMemo<TextProps[]>(() => {
    return sizes.map((size) => ({ ...props, size }));
  }, [props]);

  return (
    <FlexColumnLayout gap={1}>
      {sizeProps.map((props) => (
        <Text {...props} key={props.size}>
          {props.children}
        </Text>
      ))}
    </FlexColumnLayout>
  );
};

const weights: TypographyWeight[] = ["regular", "semiBold", "bold"] as const;
export const Weights = (props: TextProps) => {
  const mergedProps = useMergedProps(Text.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={weights}
      for="weight"
      of={TextSizeRenderer}
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

export const Italic = (props: TextProps) => {
  const mergedProps = useMergedProps(Text.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={booleans}
      for="italic"
      of={TextSizeRenderer}
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

export const Decorations = (props: TextProps) => {
  const mergedProps = useMergedProps(Text.defaultProps, props);
  return (
    <GridLayout columns={["1fr", "1fr", "1fr"]}>
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="underline"
        of={TextSizeRenderer}
        align="start"
        gap={1}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="overline"
        of={TextSizeRenderer}
        align="start"
        gap={1}
        scaling={1}
        propLabels
      />
      <ComponentVariants
        defaults={mergedProps}
        variants={[true]}
        for="lineThrough"
        of={TextSizeRenderer}
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

const colorToShades = (color: ColorKey): PaletteColor[] => {
  const grayShades = ["700", "600", "500", "400"];
  const colorShades = ["dark", "base", "medium", "light"];
  const shades = color === "gray" ? grayShades : colorShades;
  return shades.map((shade) => `${color}-${shade}` as PaletteColor);
};

const TextColorRenderer = (color: ColorKey) => (props: Required<TextProps>) => {
  const colorShades = useMemo<PaletteColor[]>(() => colorToShades(color), []);

  return (
    <ComponentVariants
      defaults={props}
      variants={colorShades}
      for="color"
      of={Text}
      direction="column"
      align="start"
      gap={1}
      scaling={1}
      propLabels
    />
  );
};

const colors: ColorKey[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
];
export const Colors = (props: TextProps) => {
  const mergedProps = useMergedProps(Text.defaultProps, props);

  const renderers = useMemo(() => {
    return colors.map(
      (color): [ColorKey, GenericFn<[Required<TextProps>], JSX.Element>] => [
        color,
        TextColorRenderer(color),
      ]
    );
  }, []);

  return (
    <GridLayout gap={1} columns={["1fr", "1fr", "1fr"]}>
      {renderers.map(([color, Renderer]) => (
        <Renderer key={color} {...mergedProps} />
      ))}
    </GridLayout>
  );
};
Colors.args = {};
Colors.parameters = {
  docs: componentSource(
    componentPropTemplate("color", colors.flatMap(colorToShades))
  ),
};
