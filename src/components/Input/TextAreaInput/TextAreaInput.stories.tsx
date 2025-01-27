import { TextAreaInput } from "./TextAreaInput.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { TextAreaInputProps } from "./TextAreaInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<TextAreaInputProps>(
  "TextAreaInput",
  TextAreaInput.defaultProps,
);

const meta = {
  component: TextAreaInput,
  title: "Components/Forms/Input/TextAreaInput/Stories",
  args: {
    uncontrolled: true,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Textarea input",
  },
};

export const Resize = (props: Partial<TextAreaInputProps>) => {
  const mergedProps = useMergedProps(props, TextAreaInput.defaultProps);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={[false, true]}
      for="resize"
      columns={2}
      scaling={1}
      of={TextAreaInput}
      propLabels
    />
  );
};
