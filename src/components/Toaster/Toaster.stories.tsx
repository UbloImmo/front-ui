import { Button } from "../Button";

import { componentSourceFactory } from "@docs/docs.utils";
import { delay } from "@utils";

import { Toaster, toast } from "./";

import type { ToasterProps } from "./Toaster.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<ToasterProps>(
  "Toaster",
  Toaster.defaultProps
);

const meta = {
  component: Toaster,
  title: "Components/Toaster/Stories",
  decorators: [
    (Story) => (
      <>
        <Story />
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            onClick={() =>
              toast("Basic toast with close button", {
                id: "basic-toast",
                className: "test-toast-basic",
              })
            }
            label="Basic toast"
          />
          <Button
            onClick={() =>
              toast.success("Success toast!", {
                id: "success-toast",
                className: "test-toast-success",
              })
            }
            label="Success toast"
          />
          <Button
            onClick={() =>
              toast.error("Error toast!", {
                id: "error-toast",
                className: "test-toast-error",
              })
            }
            label="Error toast"
          />
          <Button
            onClick={() =>
              toast.warning("Warning toast!", {
                id: "warning-toast",
                className: "test-toast-warning",
              })
            }
            label="Warning toast"
          />
          <Button
            onClick={() =>
              toast.info("Info toast!", {
                id: "info-toast",
                className: "test-toast-info",
              })
            }
            label="Info toast"
          />
          <Button
            onClick={() =>
              toast.promise(delay(3000), {
                loading: "Loading",
                success: "Success!",
                error: "Error!",
              })
            }
            label="Promise toast"
          />
          <Button
            onClick={() =>
              toast("Long lasting toast", {
                duration: 10000,
                id: "long-toast",
                className: "test-toast-long",
              })
            }
            label="Long toast (10s)"
          />
          <Button
            onClick={() =>
              toast("Toast with description", {
                description: "This is a detailed description for the toast",
                id: "toast-with-description",
                className: "test-toast-description",
              })
            }
            label="Toast with description"
          />
        </div>
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

export const WithoutCloseButton: Story = {
  args: {
    closeButton: false,
  },
};
