import { ContextLine } from "./ContextLine.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ContextLineProps } from "./ContextLine.types";
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentVariants } from "@docs/blocks";

const args = {
  ...ContextLine.defaultProps,
};

const componentSource = componentSourceFactory<ContextLineProps>(
  "ContextLine",
  {
    first: "default",
    label: "label",
  },
  ContextLine.defaultProps
);

const meta = {
  component: ContextLine,
  title: "Components/ContextLine/Stories",
  args: {
    first: "default",
    label: "label",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ContextLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};

export const First = (props: ContextLineProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={["first", "default", "last"]}
      for="first"
      of={ContextLine}
      align="center"
      propLabels
    />
  );
};

First.args = {
  first: "first",
};
