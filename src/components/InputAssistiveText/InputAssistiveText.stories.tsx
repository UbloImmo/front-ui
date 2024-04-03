import { InputAssistiveText } from "./InputAssistiveText.component";
import { InputAssistiveTextProps } from "./InputAssistiveText.types";
import { FlexRowLayout } from "../../layouts";

import { ComponentVariants } from "@docs/blocks";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/InputAssistiveText/Stories",
  component: InputAssistiveText,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
} satisfies Meta<typeof InputAssistiveText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    assistiveText: "[Assistive text]",
    errorText: "[Error text]",
  },
};

const errors = [false, true];
export const States = (props: InputAssistiveTextProps) => {
  const defaultProps = useMergedProps(InputAssistiveText.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={errors}
      for="error"
      of={InputAssistiveText}
      justify="center"
      scaling={1.1}
      propLabels
    />
  );
};

States.args = {
  assistiveText: "This is an assistive text for the input.",
  errorText: "This is an error message for the input.",
};

const assistiveTexts = [
  "Please enter a valid email address.",
  "Please enter a valid email address in the format example@example.com. This email will be used to send you important updates and notifications.",
];

export const TextLength = (props: InputAssistiveTextProps) => {
  const defaultProps = useMergedProps(InputAssistiveText.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={assistiveTexts}
      for="assistiveText"
      of={InputAssistiveText}
      justify="center"
      scaling={1.1}
      columns={2}
    />
  );
};
