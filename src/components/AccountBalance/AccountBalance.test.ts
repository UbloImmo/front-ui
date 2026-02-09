import { Nullish } from "@ubloimmo/front-util";
import { expect, test } from "bun:test";

import { AccountBalance } from "./AccountBalance.component";
import { AccountBalanceProps } from "./AccountBalance.types";
import { formatAmount } from "./AccountBalance.utils";

import { testComponentFactory } from "@/tests";

const testId = "account-balance";

const testAccountBalance = testComponentFactory<AccountBalanceProps>(
  "AccountBalance",
  AccountBalance
);

const testFormatAmount = (
  testName: string,
  value: Nullish<number>,
  expected: string
) => {
  return test(testName, () => {
    expect(formatAmount(value)).toBe(expected);
  });
};

testAccountBalance({
  ...AccountBalance.__DEFAULT_PROPS,
})("should render with default props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-title")?.textContent).toBe("Title :");
  expect(queryByTestId("account-balance-value")?.textContent).toBe("— €");
});

testAccountBalance({
  title: "Solde locataire",
  value: 99999999,
})(
  "should render with custom title and value in thousands",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId("account-balance-title")?.textContent).toBe(
      "Solde locataire :"
    );
    expect(queryByTestId("account-balance-value")?.textContent).toBe(
      "999,99 k€"
    );
  }
);

testAccountBalance({
  ...AccountBalance.__DEFAULT_PROPS,
  value: 100000050,
})("should render value in millions", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("1,00 M€");
});

testAccountBalance({
  ...AccountBalance.__DEFAULT_PROPS,
  value: -5000075,
})("should render negative value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toEqual(
    "- 50 000,75 €"
  );
});

testAccountBalance({
  ...AccountBalance.__DEFAULT_PROPS,
  value: null,
})("should render with null value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("— €");
});

testAccountBalance({
  ...AccountBalance.__DEFAULT_PROPS,
  value: 100000000099,
})("should render value in billions", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("1,00 G€");
});

testFormatAmount("should format null value", null, "— €");

testFormatAmount("should format undefined value", undefined, "— €");

testFormatAmount("should format regular amount", 123456, "1 234,56 €");

testFormatAmount("should format negative amount", -123456, "- 1 234,56 €");

testFormatAmount("should format thousands amount", 99999999, "999,99 k€");

testFormatAmount("should format millions amount", 100000000, "1,00 M€");

testFormatAmount("should format billions amount", 100000000000, "1,00 G€");

testFormatAmount("should handle decimal precision", 123456.78, "1 234,57 €");
