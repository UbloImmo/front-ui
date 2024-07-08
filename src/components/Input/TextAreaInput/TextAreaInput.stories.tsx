import { TextAreaInput } from "./TextAreaInput.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { InputProps } from "../Input.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<InputProps<"textarea">>(
  "TextAreaInput",
  TextAreaInput.defaultProps
);

const meta = {
  component: TextAreaInput,
  title: "Components/Input/TextAreaInput/Stories",
  args: {},
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Resize = (props: InputProps<"textarea">) => {
  const mergedProps = useMergedProps(props, TextAreaInput.defaultProps);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={[false, true]}
      for="resize"
      of={TextAreaInput}
      propLabels
    />
  );
};
