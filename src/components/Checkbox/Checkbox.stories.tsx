import { useMemo, useState } from "react";
import { fn } from "storybook/test";

import { Checkbox } from "./Checkbox.component";
import { Text } from "../Text";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { arrayOf } from "@utils";

import type { CheckboxProps, CheckboxStatus } from "./Checkbox.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<CheckboxProps>(
  "Checkbox",
  Checkbox.__DEFAULT_PROPS
);

const checkboxStatus: CheckboxStatus[] = [true, "mixed", false];

const meta = {
  component: Checkbox,
  title: "Components/Forms/Checkbox/Stories",
  args: {
    active: false,
    disabled: false,
    onChange: fn(),
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    active: {
      options: checkboxStatus,
    },
    disabled: {
      type: "boolean",
    },
    onChange: {
      type: "function",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const States = () => {
  return (
    <ComponentVariants
      of={Checkbox}
      for="active"
      defaults={Checkbox.__DEFAULT_PROPS}
      variants={checkboxStatus}
      propLabels
    />
  );
};

const disabledStates: DetailConfigVariants<CheckboxProps> = [
  {
    active: true,
    disabled: true,
    __propVariantLabel: "Disabled and Active",
  },
  {
    active: "mixed",
    disabled: true,
    __propVariantLabel: "Disabled and Mixed",
  },
  {
    active: false,
    disabled: true,
    __propVariantLabel: "Disabled",
  },
];

export const Disabled = () => {
  return (
    <ComponentVariants
      of={Checkbox}
      defaults={Checkbox.__DEFAULT_PROPS}
      variants={disabledStates}
      propLabels
    />
  );
};

const baseItems: { label: string; checked: CheckboxStatus }[] = arrayOf(
  5,
  (index) => ({
    label: "Item " + index,
    checked: false,
  })
);

export const Mixed = () => {
  const [items, setItems] = useState(baseItems);

  const checkItem = (index: number) => (active: CheckboxStatus) => {
    const newItems = items.map((item, i) => {
      if (index === i)
        return {
          ...item,
          checked: active,
        };
      return item;
    });

    setItems(newItems);
  };

  const checkAll = (active: CheckboxStatus) => {
    setItems(
      items.map((item) => ({
        ...item,
        checked: active,
      }))
    );
  };

  const allChecked = useMemo<CheckboxStatus>(() => {
    return items.every(({ checked }) => checked)
      ? true
      : items.some(({ checked }) => checked)
        ? "mixed"
        : false;
  }, [items]);

  return (
    <FlexColumnLayout gap="s-4">
      <FlexRowLayout gap="s-2">
        <Checkbox active={allChecked} onChange={checkAll} />
        <Text weight="bold">Select all</Text>
      </FlexRowLayout>
      <FlexColumnLayout gap="s-2">
        {items.map((item, index) => (
          <FlexRowLayout key={item.label} gap="s-2">
            <Checkbox active={item.checked} onChange={checkItem(index)} />
            <Text>{item.label}</Text>
          </FlexRowLayout>
        ))}
      </FlexColumnLayout>
    </FlexColumnLayout>
  );
};
