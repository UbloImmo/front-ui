import { fn } from "@storybook/test";
import styled, { css } from "styled-components";

import { SelectInput } from "./SelectInput.component";
import { flattenSelectOptions } from "./SelectInput.utils";

import { Badge, type BadgeProps } from "@/components/Badge";
import { allIconNames, type IconName } from "@/components/Icon/Icon.types";
import { Text } from "@/components/Text";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";

import type {
  CustomOptionComponent,
  CustomSelectedOptionComponent,
  SelectInputProps,
  SelectOptionOrGroup,
} from "./SelectInput.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  SelectInputProps<NullishPrimitives>
>("SelectInput", SelectInput.defaultProps);

const meta = {
  component: SelectInput,
  title: "Components/Forms/Input/SelectInput/Stories",
  args: {
    placeholder: "Select an option",
    options: [
      {
        label: "Option 1",
        value: "option-1",
      },
      {
        label: "Option 2",
        value: "option-2",
      },
      {
        label: "Option 3",
        value: "option-3",
      },
      {
        label: "Option 4",
        value: "option-4",
      },
    ],
    onChange: fn(),
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    error: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    required: {
      type: "boolean",
    },
    clearable: {
      type: "boolean",
    },
    controlIcon: {
      options: allIconNames,
    },
  },
} satisfies Meta<typeof SelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DisabledOptions: Story = {
  args: {
    placeholder: "Select an option",
    options: [
      {
        label: "This option is selectable",
        value: "option-1",
      },
      {
        label: "This option is selectable too...",
        value: "option-2",
      },
      {
        label: "...But not this one",
        value: "option-3",
        disabled: true,
      },
    ],
  },
};

export const IconOptions: Story = {
  args: {
    placeholder: "These options have icons",
    options: [
      {
        label: "I have an icon",
        value: "option-1",
        icon: "Triangle",
      },
      {
        label: "Me too !",
        value: "option-2",
        icon: "EmojiWink",
      },
      {
        label: "...I don't 😢",
        value: "option-3",
      },
    ],
  },
};

export const Searchable: Story = {
  args: {
    searchable: true,
    placeholder: "Type to search for an option",
    options: [
      {
        label: "First option",
        value: "option-1",
      },
      {
        label: "Second option",
        value: "option-2",
      },
      {
        label: "Third option",
        value: "option-3",
      },
    ],
  },
};

export const GroupOptions: Story = {
  args: {
    options: [
      {
        label: "Group 1",
        options: [
          {
            label: "Option 1",
            value: "option-1",
          },
          {
            label: "Option 2",
            value: "option-2",
          },
          {
            label: "Option 3",
            value: "option-3",
          },
        ],
      },
      {
        label: "Group 2",
        options: [
          {
            label: "Option 4",
            value: "option-4",
          },
          {
            label: "Option 5",
            value: "option-5",
          },
          {
            label: "Option 6",
            value: "option-6",
          },
        ],
      },
    ],
  },
};

const CustomOption: CustomOptionComponent<string, BadgeProps> = (option) => {
  return (
    <CustomOptionContainer justify="space-between" align="center" fill>
      <Text>{option.label}</Text>
      <Badge {...option.extraData} />
    </CustomOptionContainer>
  );
};

const CustomSelectedOption: CustomSelectedOptionComponent<string> = ({
  value,
  disabled,
}: {
  value: Nullable<string>;
  disabled?: boolean;
}) => {
  if (disabled) {
    return (
      <CustomOptionContainer align="center" fill>
        <Text>Not selectable</Text>
      </CustomOptionContainer>
    );
  }

  return (
    <CustomOptionContainer justify="space-between" align="center" fill>
      <Text>Selected value: {value}</Text>
    </CustomOptionContainer>
  );
};

const options: SelectOptionOrGroup<string, BadgeProps>[] = [
  {
    label: "Option 1",
    value: "option-1",
    extraData: {
      label: "Badge",
      color: "primary",
      shade: "light",
    },
  },
  {
    label: "Option 2",
    value: "option-2",
    extraData: {
      label: "Another badge",
      color: "warning",
      shade: "dark",
    },
  },
  {
    label: "Custom group",
    options: [
      {
        label: "Option 3",
        value: "option-3",
        extraData: {
          label: "Another badge",
          color: "success",
          shade: "light",
          icon: "EmojiSmile",
        },
      },
    ],
  },
];

export const CustomComponents = (
  props: SelectInputProps<string, BadgeProps>
) => {
  return (
    <SelectInput
      {...props}
      options={options}
      Option={CustomOption}
      SelectedOption={CustomSelectedOption}
    />
  );
};

const CustomOptionContainer = styled(FlexRowLayout)<{ $active?: boolean }>`
  padding: var(--s-2);

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--primary-light);
    `}
`;

const delayedOptions = (query: Nullable<string>) => {
  const optionsCopy = flattenSelectOptions(options);
  return new Promise<SelectOptionOrGroup<string, BadgeProps>[]>((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(optionsCopy);
        return;
      }
      resolve(optionsCopy.filter(({ label }) => label.includes(query)));
    }, 3000);
  });
};

export const LoadingOptions: Story = {
  args: {
    options: delayedOptions,
    searchable: true,
  },
};

const controlIcons: IconName[] = [
  "CaretDownFill",
  "Person",
  "BuildingAdd",
  "Bank",
];

export const ControlIcon = () => {
  return (
    <ComponentVariants
      defaults={meta.args}
      variants={controlIcons}
      of={SelectInput}
      for="controlIcon"
      propLabels
    />
  );
};

export const Clearable: Story = {
  args: {
    clearable: true,
    placeholder: "Try clearing the selection",
    options: [
      {
        label: "First option",
        value: "option-1",
      },
      {
        label: "Second option",
        value: "option-2",
      },
      {
        label: "Third option",
        value: "option-3",
      },
    ],
  },
};
