import { CopyClipboardInfoCard } from "./CopyClipboardInfoCard.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { CopyClipboardInfoCardProps } from "./CopyClipboardInfoCard.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CopyClipboardInfoCardProps>(
  "CopyClipboardInfoCard"
);

const meta = {
  component: CopyClipboardInfoCard,
  title: "Components/CopyClipboardInfoCard/Stories",
  args: {
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

export const Info = (props: CopyClipboardInfoCardProps) => {
  const mergedProps = useMergedProps(CopyClipboardInfoCard.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      for="info"
      of={CopyClipboardInfoCard}
      variants={["Some info", "Some other info"]}
      propLabels
      columns={2}
    />
  );
};

export const Empty = (props: CopyClipboardInfoCardProps) => {
  const mergedProps = useMergedProps(CopyClipboardInfoCard.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      for="info"
      of={CopyClipboardInfoCard}
      variants={["Some info", null]}
      propLabels
      columns={2}
    />
  );
};

export const Href = (props: CopyClipboardInfoCardProps) => {
  const mergedProps = useMergedProps(CopyClipboardInfoCard.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      for="href"
      of={CopyClipboardInfoCard}
      variants={["some-url.com", null]}
      propLabels
      columns={2}
    />
  );
};

export const Icon = (props: CopyClipboardInfoCardProps) => {
  const mergedProps = useMergedProps(CopyClipboardInfoCard.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      for="icon"
      of={CopyClipboardInfoCard}
      variants={["Airplane", "Bug"]}
      propLabels
      columns={2}
    />
  );
};

export const CopyData = (props: CopyClipboardInfoCardProps) => {
  const mergedProps = useMergedProps(CopyClipboardInfoCard.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      of={CopyClipboardInfoCard}
      variants={[
        {
          icon: "_1Circle",
          info: "Copy me",
          __propVariantLabel: "copyData unset",
        },
        {
          icon: "_2Circle",
          info: "Copy me",
          copyData: "Suprise!",
          __propVariantLabel: "custom copyData",
        },
      ]}
      propLabels
      columns={2}
    />
  );
};
