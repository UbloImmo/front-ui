import { InputAssistiveText } from "./InputAssistiveText.component";
import { InputAssistiveTextProps } from "./InputAssistiveText.types";
import { FlexRowLayout } from "../../layouts";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react-vite";

const source = componentSourceFactory(
  "InputAssistiveText",
  {},
  InputAssistiveText.__DEFAULT_PROPS
);
const meta = {
  title: "Components/Forms/InputAssistiveText/Stories",
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
export const States: Story = (props: InputAssistiveTextProps) => {
  const defaultProps = useMergedProps(
    InputAssistiveText.__DEFAULT_PROPS,
    props
  );

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={errors}
      for="error"
      of={InputAssistiveText}
      justify="center"
      scaling={1.1}
      propLabels
      columns={2}
    />
  );
};

States.args = {
  assistiveText: "This is an assistive text for the input.",
  errorText: "This is an error message for the input.",
};
States.parameters = {
  docs: source(errors.map((error) => ({ error }))),
};

const assistiveTexts = [
  "Please enter a valid email address.",
  "Please enter a valid email address in the format example@example.com. This email will be used to send you important updates and notifications.",
];

export const TextLength = (props: InputAssistiveTextProps) => {
  const defaultProps = useMergedProps(
    InputAssistiveText.__DEFAULT_PROPS,
    props
  );

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
TextLength.args = {
  assistiveText: "This is an assistive text for the input.",
};
TextLength.parameters = {
  docs: source(assistiveTexts.map((text) => ({ assistiveText: text }))),
};

const booleans = [false, true];

export const Icons = (props: InputAssistiveTextProps) => {
  const defaultProps = useMergedProps(
    InputAssistiveText.__DEFAULT_PROPS,
    props
  );

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={booleans}
      for="assistiveTextIcon"
      of={InputAssistiveText}
      justify="center"
      scaling={1.1}
      propLabels
      columns={2}
    />
  );
};
Icons.args = {
  assistiveText: "This is an assistive text for the input.",
};
Icons.parameters = {
  docs: source(booleans.map((bool) => ({ assistiveTextIcon: bool }))),
};
