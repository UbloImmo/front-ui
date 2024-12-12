import styled from "styled-components";

import { accountBalanceStyle } from "./AccountBalance.styles";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { formatAmount } from "./AccountBalance.utils";

import { StyleProps, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  AccountBalanceProps,
  AccountBalanceDefaultProps,
} from "./AccountBalance.types";

const defaultAccountBalanceProps: AccountBalanceDefaultProps = {
  title: "Titre",
  value: null,
};

/**
 * Render a component to display the account balance with correct format and € currency in the entity info card for rental folder.
 *
 * @version 0.0.1
 *
 * @param {AccountBalanceProps & TestIdProps} props - AccountBalance component props
 * @returns {JSX.Element}
 */
const AccountBalance = (
  props: AccountBalanceProps & TestIdProps
): JSX.Element => {
  const { log, warn } = useLogger("AccountBalance", { hideLogs: true });
  const mergedProps = useMergedProps(defaultAccountBalanceProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("account-balance", props);

  log(mergedProps);

  if (!props.title) warn("Missing title prop");
  if (!props.value) warn("Missing value prop");

  return (
    <AccountBalanceContainer data-testid={testId} {...styledProps}>
      <Text
        size="m"
        color="gray-800"
        testId="account-balance-title"
        overrideTestId
      >
        {mergedProps.title} :
      </Text>
      <Heading
        size="h3"
        weight="bold"
        color="gray-800"
        testId="account-balance-value"
        overrideTestId
      >
        {formatAmount(mergedProps.value)}€
      </Heading>
    </AccountBalanceContainer>
  );
};
AccountBalance.defaultProps = defaultAccountBalanceProps;

export { AccountBalance };

const AccountBalanceContainer = styled.div<StyleProps<AccountBalanceProps>>`
  ${accountBalanceStyle}
`;
