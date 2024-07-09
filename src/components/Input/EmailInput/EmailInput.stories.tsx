import { useState } from "react";

import { EmailInput } from "./EmailInput.component";

import type { InputProps } from "../Input.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";

const meta = {
  title: "Components/Input/EmailInput/Stories",
  component: EmailInput,
  args: {
    uncontrolled: true,
  },
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "mail@ublo.immo",
    error: false,
    disabled: false,
  },
};

export const Controlled = (props: Partial<InputProps<"email">>) => {
  const [email, setEmail] = useState<Nullable<string>>(null);

  return (
    <EmailInput
      {...props}
      value={email}
      onChange={setEmail}
      uncontrolled={false}
    />
  );
};
