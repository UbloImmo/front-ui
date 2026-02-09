import { fn } from "storybook/test";

import { MultiSelectInput } from "./MultiSelectInput.component";
import { flattenSelectOptions } from "../SelectInput/SelectInput.utils";

import { Badge, type BadgeProps } from "@/components/Badge";
import { Text } from "@/components/Text";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { type FlexDirectionLayoutProps, FlexRowLayout } from "@layouts";
import { useCssStyles } from "@utils";

import type { MultiSelectInputProps } from "./MultiSelectInput.types";
import type {
  CustomOptionComponent,
  SelectOptionOrGroup,
} from "../SelectInput";
import type { IconName } from "@/components/Icon";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  MultiSelectInputProps<NullishPrimitives>
>("MultiSelectInput", MultiSelectInput.__DEFAULT_PROPS);

const meta = {
  component: MultiSelectInput,
  title: "Components/Forms/Input/MultiSelectInput/Stories",
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
} satisfies Meta<typeof MultiSelectInput>;

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
    <CustomOptionContainer
      justify="space-between"
      align="center"
      fill
      $active={option.active}
    >
      <Text>{option.label}</Text>
      {!!option.extraData && <Badge {...option.extraData} />}
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
  props: MultiSelectInputProps<string, BadgeProps>
) => {
  return (
    <MultiSelectInput {...props} options={options} Option={CustomOption} />
  );
};

const CustomOptionContainer = ({
  $active,
  ...props
}: FlexDirectionLayoutProps & { $active?: boolean }) => {
  const style = useCssStyles(
    { padding: "var(--s-2)" },
    $active ? { background: "var(--primary-light)" } : undefined
  );
  return <FlexRowLayout {...props} styleOverride={style} />;
};

const delayedOptions = (query: Nullable<string>) => {
  const optionsCopy = flattenSelectOptions(options);
  return new Promise<SelectOptionOrGroup<string, BadgeProps>[]>((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(optionsCopy);
        return;
      }
      resolve(optionsCopy.filter(({ label }) => label.includes(query)));
    }, 1500);
  });
};

export const LoadingOptions: Story = {
  args: {
    options: delayedOptions,
  },
};

const controlIcons: IconName[] = [
  "CaretDownFill",
  "Tag",
  "BusinessUnit",
  "Person",
];

export const ControlIcon = () => {
  return (
    <ComponentVariants<MultiSelectInputProps<NullishPrimitives>>
      defaults={meta.args}
      variants={controlIcons}
      of={MultiSelectInput}
      for="controlIcon"
      propLabels
    />
  );
};

export const Clearable: Story = {
  args: {
    placeholder: "Select options (with clear button)",
    clearable: true,
    value: ["option-1", "option-2"],
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
  },
};
