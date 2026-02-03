import { fn } from "storybook/test";

import { Button } from "../Button";
import { Toaster } from "./Toaster.component";
import { toast } from "./Toaster.utils";

import { componentSourceFactory } from "@docs/docs.utils";
import { delay } from "@utils";

import type { ToasterProps } from "./Toaster.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<ToasterProps>(
  "Toaster",
  Toaster.defaultProps
);

const meta = {
  component: Toaster,
  title: "Components/Feedbacks/Toaster/Stories",
  decorators: [
    (Story) => (
      <>
        <Story />
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            onClick={() =>
              toast("Basic toast", {
                id: "basic-toast",
                className: "test-toast-success",
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
              toast.promise(delay(3_000), {
                loading: "Loading...",
                success: () => ({
                  message: "Success!",
                  description: "Promise resolved!",
                }),
                error: () => ({
                  message: "Error!",
                  description: "something went wrong",
                }),
                id: "loading-toast",
                description: "Promise is pending",
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
          <Button
            onClick={() =>
              toast.success("Succes toast with description", {
                description: "This is a detailed description for the toast",
                id: "success-toast-with-description",
                className: "test-toast-description",
              })
            }
            label="Success toast with description"
          />
          <Button
            onClick={() =>
              toast.error("Toast with action", {
                id: "basic-toast-action",
                className: "test-toast-basic",
                description: "test",
                action: {
                  onClick: fn(),
                  label: "Action",
                },
              })
            }
            label="Toast with action"
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

export const RichColors: Story = {
  args: {
    richColors: true,
  },
};

export const Inverted: Story = {
  args: {
    invert: true,
  },
};
