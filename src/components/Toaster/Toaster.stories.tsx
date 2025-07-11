import { toast } from "sonner";

import { Toaster } from "./Toaster.component";
import { Button } from "../Button";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ToasterProps } from "./Toaster.types";
import type { Meta, StoryObj } from "@storybook/react";
import { delay } from "@utils";

const componentSource = componentSourceFactory<ToasterProps>(
  "Toaster",
  {
    // TODO
  },
  Toaster.defaultProps
);

const meta = {
  component: Toaster,
  title: "Components/Toaster/Stories",
  args: {
    // TODO
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Button
          onClick={() =>
            toast.promise(delay(70000), {
              loading: "Loading",
              success: "Success!",
              error: "Error!",
            })
          }
          label="Show toast"
        />
      </>
    ),
  ],
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
