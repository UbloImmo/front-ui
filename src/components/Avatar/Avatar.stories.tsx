import { Avatar } from "./Avatar.component";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { AvatarProps, AvatarSize } from "./Avatar.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<AvatarProps>(
  "Avatar",
  Avatar.defaultProps
);

const sizes: AvatarSize[] = ["m", "l", "xl"];

const meta = {
  component: Avatar,
  title: "Components/Commons/Avatar/Stories",
  args: {
    size: "m",
    firstName: "Testing",
    lastName: "User",
    avatarUrl: null,
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    name: {
      control: "text",
    },
    firstName: {
      control: "text",
    },
    lastName: {
      control: "text",
    },
    avatarUrl: {
      control: "text",
    },
    organization: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const variants: DetailConfigVariants<AvatarProps> = [
  {
    size: "m",
    firstName: "John",
    lastName: "Doe",
    avatarUrl: null,
    __propVariantLabel: "Name Variant",
  },
  {
    size: "m",
    firstName: "John",
    lastName: "Doe",
    avatarUrl: "https://t.ly/lJMVh",
    __propVariantLabel: "Image Variant",
  },
  {
    size: "m",
    count: 2,
    __propVariantLabel: "Number Variant",
  },
];

export const Variants = () => {
  return (
    <ComponentVariants
      defaults={Avatar.defaultProps}
      variants={variants}
      of={Avatar}
      propLabels
    />
  );
};

const withImageUrl = ["https://t.ly/lJMVh", null];

export const ImageVariants = (props: Partial<AvatarProps>) => {
  const mergedProps = useMergedProps(Avatar.defaultProps, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={withImageUrl}
      of={Avatar}
      for="avatarUrl"
      propLabels
    />
  );
};

const fullNames: DetailConfigVariants<AvatarProps> = [
  {
    name: "Company",
  },
  {
    firstName: "John",
    lastName: "Doe",
  },
];

export const NameVariants = (props: Partial<AvatarProps>) => {
  const mergedProps = useMergedProps(Avatar.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={fullNames}
      of={Avatar}
      align="center"
      propLabels
    />
  );
};

NameVariants.args = {
  firstName: null,
  lastName: null,
};

export const NumberVariants = (props: Partial<AvatarProps>) => {
  const mergedProps = useMergedProps(Avatar.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={[2, 4, 5]}
      for="count"
      of={Avatar}
      propLabels
    />
  );
};

export const Sizes = (props: Partial<AvatarProps>) => {
  const mergedProps = useMergedProps(Avatar.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={sizes}
      for="size"
      of={Avatar}
      align="center"
      propLabels
    />
  );
};

const bools = [false, true];

export const Organization = (props: Partial<AvatarProps>) => {
  const mergedProps = useMergedProps(Avatar.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={bools}
      for="organization"
      of={Avatar}
      align="center"
      propLabels
    />
  );
};
