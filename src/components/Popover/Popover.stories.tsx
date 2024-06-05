import { Popover } from "./Popover.component";
import { Badge } from "../Badge";
import { StateIndicator } from "../StateIndicator";

import { componentSourceFactory } from "@docs/docs.utils";
import { GridLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { PopoverProps } from "./Popover.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { NonNullish } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const componentSource = componentSourceFactory<PopoverProps>(
  "Popover",
  Popover.defaultProps
);

const meta = {
  component: Popover,
  title: "Components/Popover/Stories",
  args: {
    ...Popover.defaultProps,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const triggers: NonNullish<ReactNode>[] = [
  Popover.defaultProps.children,
  <Badge key="badge" label="Badge with popover" />,
  <StateIndicator key="state-indicator" label="State Indicator with popover" />,
];

export const Triggers = (props: Partial<PopoverProps>) => {
  const defaults = useMergedProps(Popover.defaultProps, props);
  return (
    <GridLayout columns={3} gap="s-8" align="center" justify="center">
      {triggers.map((trigger, index) => (
        <Popover key={"trigger-" + index} {...defaults}>
          {trigger}
        </Popover>
      ))}
      {triggers.map((trigger, index) => (
        <Popover key={"trigger-" + index} {...defaults} wrapContent>
          {trigger}
        </Popover>
      ))}
    </GridLayout>
  );
};
