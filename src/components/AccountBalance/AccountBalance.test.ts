import { expect } from "bun:test";

import { AccountBalance } from "./AccountBalance.component";
import { AccountBalanceProps } from "./AccountBalance.types";

import { testComponentFactory } from "@/tests";

const testId = "account-balance";

const testAccountBalance = testComponentFactory<AccountBalanceProps>(
  "AccountBalance",
  AccountBalance
);

testAccountBalance({
  ...AccountBalance.defaultProps,
})("should render with default props", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-title")?.textContent).toBe("Titre :");
  expect(queryByTestId("account-balance-value")?.textContent).toBe("— €");
});

testAccountBalance({
  title: "Solde locataire",
  value: 999999.99,
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
  ...AccountBalance.defaultProps,
  value: 1000000.5,
})("should render value in millions", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("1,00 M€");
});

testAccountBalance({
  ...AccountBalance.defaultProps,
  value: -50000.75,
})("should render negative value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toEqual(
    "- 50 000,75 €"
  );
});

testAccountBalance({
  ...AccountBalance.defaultProps,
  value: null,
})("should render with null value", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("— €");
});

testAccountBalance({
  ...AccountBalance.defaultProps,
  value: 1000000000.99,
})("should render value in billions", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("account-balance-value")?.textContent).toBe("1,00 G€");
});
