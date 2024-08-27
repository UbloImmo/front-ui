import { Popover } from "./Popover.layout";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { GridLayout } from "@layouts";
import { useMergedProps } from "@utils";

import { Badge, StateIndicator, Button, Field } from "@components";

import type { PopoverProps } from "./Popover.types";
import type { Meta } from "@storybook/react";

const componentSource = componentSourceFactory<PopoverProps>(
  "Popover",
  Popover.defaultProps
);

const meta = {
  component: Popover,
  title: "Layouts/Popover/Stories",
  args: {
    ...Popover.defaultProps,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Popover>;

export default meta;

const buildLabeledElementsList = (label: string) => {
  return [
    <Button key="button" label={"Button " + label} color="black" />,
    <Badge key="badge" label={"Badge " + label} />,
    <StateIndicator key="state-indicator" label={"State Indicator " + label} />,
    <Field key="field" type="text" label={"Field " + label} />,
  ];
};

const defaultTrigger = buildLabeledElementsList("trigger")[0];
export const Default = (props: Partial<PopoverProps>) => {
  return (
    <Popover content="[Popover Content]" {...props}>
      {defaultTrigger}
    </Popover>
  );
};

const triggers = buildLabeledElementsList("trigger");

const bools = [false, true];

export const Triggers = (props: Partial<PopoverProps>) => {
  const defaults = useMergedProps(Popover.defaultProps, props);
  return (
    <ComponentVariants
      columns={1}
      gap="s-8"
      align="center"
      justify="center"
      variants={bools}
      for="wrapContent"
      defaults={defaults}
      scaling={1}
      propLabels
      of={(props: PopoverProps) => (
        <GridLayout
          columns={triggers.length}
          gap="s-8"
          align="center"
          justify="center"
        >
          {triggers.map((trigger, index) => (
            <Popover key={"variant-" + index} {...props}>
              {trigger}
            </Popover>
          ))}
        </GridLayout>
      )}
    />
  );
};

const contents = buildLabeledElementsList("within popover");

export const Content = (props: Partial<PopoverProps>) => {
  const defaults = useMergedProps(Popover.defaultProps, props);
  return (
    <ComponentVariants
      columns={1}
      gap="s-8"
      align="center"
      justify="center"
      variants={bools}
      for="wrapContent"
      defaults={defaults}
      scaling={1}
      propLabels
      of={(props: PopoverProps) => (
        <GridLayout
          columns={triggers.length}
          gap="s-8"
          align="center"
          justify="center"
        >
          {contents.map((content, index) => (
            <Popover
              key={"content-" + index + contents.length}
              {...props}
              content={content}
            >
              <Button label="Trigger popover" color="black" secondary />
            </Popover>
          ))}
        </GridLayout>
      )}
    />
  );
};

export const Fit = (props: Partial<PopoverProps>) => {
  const defaults = useMergedProps(Popover.defaultProps, {
    ...props,
    content: <div>Contents</div>,
    children: buildLabeledElementsList("trigger")[0],
  });

  return (
    <ComponentVariants
      columns={2}
      align="center"
      justify="center"
      defaults={defaults}
      variants={bools}
      for="fitTriggerWidth"
      of={Popover}
      scaling={1}
    />
  );
};

// TODO: other props
