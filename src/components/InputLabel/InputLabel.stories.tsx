import { InputLabel } from "./InputLabel.component";
import {
  InputLabelProps,
  type InputLabelTooltipProps,
} from "./InputLabel.types";
import { FlexRowLayout } from "../../layouts";
import { useMergedProps } from "../../utils";

import { ComponentVariants } from "@docs/blocks";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Nullable } from "@ubloimmo/front-util";

const meta = {
  title: "Components/Forms/InputLabel/Stories",
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
  args: InputLabel.__DEFAULT_PROPS,
};

const required = [false, true];

export const Required = (props: Partial<InputLabelProps>) => {
  const defaultProps = useMergedProps(InputLabel.__DEFAULT_PROPS, props);

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

const tooltipProps: Nullable<InputLabelTooltipProps>[] = [
  null,
  { content: "Label tooltip" },
];
export const Tooltips = (props: Partial<InputLabelProps>) => {
  const defaultProps = useMergedProps(InputLabel.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={tooltipProps}
      for="tooltip"
      of={InputLabel}
    />
  );
};
