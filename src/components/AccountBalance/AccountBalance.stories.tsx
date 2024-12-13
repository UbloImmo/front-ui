import { AccountBalance } from "./AccountBalance.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { AccountBalanceProps } from "./AccountBalance.types";
import type { Meta, StoryObj } from "@storybook/react";

const args = {
  ...AccountBalance.defaultProps,
};

const componentSource = componentSourceFactory<AccountBalanceProps>(
  "AccountBalance",
  {
    title: "Titre",
    value: 999_999,
  },
  AccountBalance.defaultProps
);

const meta = {
  component: AccountBalance,
  title: "Components/AccountBalance/Stories",
  parameters: {
    docs: componentSource(),
  },
  args: {
    value: 999_999,
  },
} satisfies Meta<typeof AccountBalance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};

const titleVariants = [
  {
    __propVariantLabel: "For default title",
    title: "Titre",
  },
  {
    __propVariantLabel: "For tenant balance title",
    title: "Solde locataire",
  },
];

export const Title = (props: AccountBalanceProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={titleVariants}
      of={AccountBalance}
      columns={2}
    />
  );
};

Title.parameters = {
  docs: componentSource(titleVariants.map((variant) => ({ ...variant }))),
};

const valueVariants = [
  {
    __propVariantLabel: "For unknown value",
    value: null,
  },
  {
    __propVariantLabel: "For 0 € amount",
    value: 0,
  },
  {
    __propVariantLabel: "For amount <100k",
    value: 99_999_99,
  },
  {
    __propVariantLabel: "For amount between 100,00 k€ and 999,99 k€",
    value: 999_999_99,
  },
  {
    __propVariantLabel: "For amount between 1,00 M€ and 999,99 M€",
    value: 999_999_999_99,
  },
  {
    __propVariantLabel: "For amount between 1,00 G€ and 999,99 G€",
    value: 999_999_999_999_99,
  },
  {
    __propVariantLabel: "For negative amount",
    value: -999_999_999_999_99,
  },
];

export const Value = (props: AccountBalanceProps) => {
  const mergedProps = useMergedProps(AccountBalance.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={valueVariants}
      of={AccountBalance}
      columns={2}
    />
  );
};

Value.parameters = {
  docs: componentSource(
    valueVariants.map((variant) => ({ ...args, ...variant }))
  ),
};
