import { useMemo } from "react";

import { Heading } from "../Heading";
import { Text } from "../Text";
import styles from "./AccountBalance.module.scss";
import { formatAmount } from "./AccountBalance.utils";

import {
  useLogger,
  useTestId,
  useMergedProps,
  useCssClasses,
  useCssStyles,
} from "@utils";

import type {
  AccountBalanceProps,
  AccountBalanceDefaultProps,
} from "./AccountBalance.types";
import type { TestIdProps } from "@types";

const defaultAccountBalanceProps: AccountBalanceDefaultProps = {
  title: "Title",
  value: null,
  compact: true,
  className: null,
  styleOverride: null,
};

/**
 * Render a component to display the account balance with correct format and € currency in the entity info card for rental folder.
 *
 * @version 0.1.0
 *
 * @param {AccountBalanceProps & TestIdProps} props - AccountBalance component props
 * @returns {JSX.Element}
 */
const AccountBalance = (
  props: AccountBalanceProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("AccountBalance", { hideLogs: true });
  const mergedProps = useMergedProps(defaultAccountBalanceProps, props);
  const testId = useTestId("account-balance", props);
  const className = useCssClasses(
    styles["account-balance"],
    mergedProps.className
  );
  const style = useCssStyles(mergedProps.styleOverride);

  if (!props.title) warn("Missing title prop");

  const formattedValue = useMemo(
    () => formatAmount(mergedProps.value, mergedProps.compact),
    [mergedProps.value, mergedProps.compact]
  );

  return (
    <div className={className} style={style} data-testid={testId}>
      <Text
        size="m"
        color="gray-800"
        weight="medium"
        fill
        ellipsis
        testId={`${testId}-title`}
        overrideTestId
      >
        {mergedProps.title} :
      </Text>
      <Heading
        size="h3"
        weight="bold"
        color="gray-800"
        align="right"
        testId={`${testId}-value`}
        overrideTestId
      >
        {formattedValue}
      </Heading>
    </div>
  );
};
AccountBalance.defaultProps = defaultAccountBalanceProps;

export { AccountBalance };
