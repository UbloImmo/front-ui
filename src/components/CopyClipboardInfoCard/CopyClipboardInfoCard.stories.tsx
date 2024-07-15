import { CopyClipboardInfoCard } from "./CopyClipboardInfoCard.component";
import { allIconNames } from "../Icon/Icon.types";

import { componentSourceFactory } from "@docs/docs.utils";

import type { CopyClipboardInfoCardProps } from "./CopyClipboardInfoCard.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CopyClipboardInfoCardProps>(
  "CopyClipboardInfoCard"
);

const meta = {
  component: CopyClipboardInfoCard,
  title: "Components/CopyClipboardInfoCard/Stories",
  args: {
    // TODO
    info: "[Info]",
  },

  argTypes: {
    info: {
      type: "string",
    },
    href: {
      type: "string",
    },
    icon: {
      options: allIconNames,
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof CopyClipboardInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} as Story;
