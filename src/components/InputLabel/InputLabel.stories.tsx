import { InputLabel } from "./InputLabel.component";
import { InputLabelProps } from "./InputLabel.types";
import { FlexRowLayout } from "../../layouts";
import { useMergedProps } from "../../utils";

import { ComponentVariants } from "@docs/blocks";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/InputLabel/Stories",
  component: InputLabel,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: InputLabel.defaultProps,
};

const required = [false, true];

export const Required = (props: Partial<InputLabelProps>) => {
  const defaultProps = useMergedProps(InputLabel.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={required}
      for="required"
      of={InputLabel}
      propLabels
    />
  );
};
