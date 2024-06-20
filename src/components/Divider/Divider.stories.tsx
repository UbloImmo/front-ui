import { Divider } from "./Divider.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { DividerProps } from "./Divider.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<DividerProps>(
  "Divider",
  {},
  Divider.defaultProps
);

const meta = {
  component: Divider,
  title: "Components/Divider/Stories",
  argTypes: {
    label: {
      type: "string",
      control: { type: "text" },
      description: "The label to display",
      table: { defaultValue: { summary: "null" } },
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const labels = [null, "Divider label"];

export const Labels = (props: DividerProps) => {
  const mergedProps = useMergedProps(Divider.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={labels}
      for="label"
      of={Divider}
      scaling={1}
      columns={2}
      align="center"
      propLabels
    />
  );
};
Labels.parameters = {
  docs: componentSource(labels.map((label) => ({ label }))),
};
