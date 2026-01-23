import { objectKeys } from "@ubloimmo/front-util";

import * as assetsIndex from "./assets";
import { EmptyStateCard } from "./EmptyStateCard.component";
import { Button } from "../Button";
import { Icon } from "../Icon";
import {
  EmptyStateCardDefaultProps,
  type EmptyStateCardProps,
} from "./EmptyStateCard.types";
import { allIconNames, type IconName } from "../Icon/Icon.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import type { ColorKey } from "@types";

const assetNames = objectKeys(assetsIndex);

const componentSource = componentSourceFactory<EmptyStateCardProps>(
  "EmptyStateCard",
  {},
  EmptyStateCard.defaultProps
);

const meta = {
  component: EmptyStateCard,
  title: "Components/Feedbacks/EmptyStateCard/Stories",
  args: {
    // TODO
  },
  argTypes: {
    asset: {
      options: [null, ...assetNames],
      table: {
        defaultValue: {
          summary: undefined,
        },
      },
      control: {
        type: "select",
      },
    },
    icon: {
      options: allIconNames,
      table: {
        defaultValue: {
          summary: "Square",
        },
      },
      control: {
        type: "select",
      },
    },
    color: {
      options: ["primary", "pending", "success", "warning", "error", "gray"],
      table: {
        defaultValue: {
          summary: "primary",
        },
      },
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof EmptyStateCard>;

export default meta;
type Story = StoryObj<typeof meta> | StoryFn<typeof meta>;

export const Default: Story = {};

const descriptions = [
  null,
  "Hello",
  <>
    This is an icon <Icon name="CircleFill" size="s-3" color="gray-600" />
  </>,
  <FlexRowLayout
    key="button"
    fill="row"
    justify="center"
    gap="s-1"
    align="center"
  >
    This description contains a <Button label="button" />
  </FlexRowLayout>,
];

export const Descriptions = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps(EmptyStateCard.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={descriptions}
      for="description"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Descriptions.parameters = {
  docs: componentSource(descriptions.map((description) => ({ description }))),
};

const colors: ColorKey[] = [
  "primary",
  "gray",
  "error",
  "warning",
  "pending",
  "success",
];

export const Colors = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps<
    EmptyStateCardDefaultProps,
    EmptyStateCardProps
  >({ ...EmptyStateCard.defaultProps, asset: "EmptyBox" }, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={colors}
      for="color"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Colors.parameters = {
  docs: componentSource(colors.map((color) => ({ asset: "EmptyBox", color }))),
};

const titles: string[] = [
  "This is a custom title",
  "This is a very long title that will most likely be rendered as multi-line text",
];

export const Titles = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps(EmptyStateCard.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={titles}
      for="title"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Titles.parameters = {
  docs: componentSource(titles.map((title) => ({ title }))),
};

export const Assets = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps(EmptyStateCard.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={assetNames}
      for="asset"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Assets.parameters = {
  docs: componentSource(assetNames.map((asset) => ({ asset }))),
};

const icons: IconName[] = [
  "ExclamationTriangle",
  "FolderSparkle",
  "Person",
  "Invoice2Out",
];

export const Icons = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps<
    EmptyStateCardDefaultProps,
    EmptyStateCardProps
  >({ ...EmptyStateCard.defaultProps, asset: "EmptyBox" }, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={icons}
      for="icon"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Icons.parameters = {
  docs: componentSource(icons.map((icon) => ({ asset: "EmptyBox", icon }))),
};

export const Transparent = (props: Partial<EmptyStateCardProps>) => {
  const defaults = useMergedProps<
    EmptyStateCardDefaultProps,
    EmptyStateCardProps
  >({ ...EmptyStateCard.defaultProps, asset: "EmptyBox" }, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={[false, true]}
      for="transparent"
      of={EmptyStateCard}
      columns={2}
      propLabels
    />
  );
};
Transparent.parameters = {
  docs: componentSource(
    [false, true].map((transparent) => ({
      asset: "EmptyBox",
      transparent,
    }))
  ),
};
