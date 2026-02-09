import { StaticIcon } from "./StaticIcon.component";
import { FlexRowLayout } from "../../layouts";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type {
  StaticIconIndicator,
  StaticIconProps,
  StaticIconSize,
} from "./StaticIcon.types";
import type { IconName } from "../Icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColorKeyOrWhite } from "@types";

const componentSource = componentSourceFactory("StaticIcon", undefined);

const colors: ColorKeyOrWhite[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
  "white",
];

const meta: Meta<typeof StaticIcon> = {
  title: "Components/Iconography/StaticIcon/Stories",
  component: StaticIcon,
  decorators: [
    (Story) => (
      <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
        <Story />
      </FlexRowLayout>
    ),
  ],
  argTypes: {
    size: {
      options: ["xs", "s", "m", "l"],
    },
    color: {
      options: colors,
    },
  },
} satisfies Meta<typeof StaticIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: StaticIcon.__DEFAULT_PROPS,
};

export const Colors = (props: Partial<StaticIconProps>) => {
  const defaultProps = useMergedProps(StaticIcon.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={colors}
      for="color"
      of={StaticIcon}
      align="center"
    />
  );
};
Colors.args = {
  name: "Square",
  size: "s",
};
Colors.parameters = {
  docs: componentSource(colors.map((color) => ({ color }))),
};

const sizes: StaticIconSize[] = ["xs", "s", "m", "l"];
export const Sizes = (props: Partial<StaticIconProps>) => {
  const defaultProps = useMergedProps(StaticIcon.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={sizes}
      for="size"
      of={StaticIcon}
      align="center"
    />
  );
};
Sizes.args = {
  name: "Square",
  size: "s",
};
Sizes.parameters = {
  docs: componentSource(sizes.map((size) => ({ size }))),
};

const icons: IconName[] = ["Abacus", "BusinessUnit", "Building", "Alphabet"];
export const Icons = (props: Partial<StaticIconProps>) => {
  const defaultProps = useMergedProps(StaticIcon.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={icons}
      for="name"
      of={StaticIcon}
      propLabels
    />
  );
};
Icons.parameters = {
  docs: componentSource(icons.map((icon) => ({ name: icon }))),
};

export const Stroke = (props: Partial<StaticIconProps>) => {
  const defaultProps = useMergedProps(StaticIcon.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={[false, true]}
      for="stroke"
      propLabels
      of={StaticIcon}
      align="center"
    />
  );
};
Stroke.args = {
  name: "Square",
  size: "s",
};
Stroke.parameters = {
  docs: componentSource([{ stroke: false }, { stroke: true }]),
};

const indicators: StaticIconIndicator[] = [
  {
    name: "Circle2NdHalf",
    color: "pending-base",
  },
  {
    name: "HexagonArrowDown",
    tooltip: {
      content: "Tooltip content",
    },
  },
];
export const Indicators = (props: Partial<StaticIconProps>) => {
  const defaults = useMergedProps(StaticIcon.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={defaults}
      variants={indicators}
      for="indicator"
      of={StaticIcon}
      align="center"
      propLabels
    />
  );
};
Indicators.parameters = {
  docs: componentSource(indicators.map((indicator) => ({ indicator }))),
};
