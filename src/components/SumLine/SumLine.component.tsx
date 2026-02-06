import { useMemo } from "react";

import { formatAmount } from "../AccountBalance";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { useSumLineClassNames } from "./SumLine.styles";

import { FlexRowLayout } from "@/layouts/Flex";
import { useMergedProps, useTestId } from "@utils";

import type { SumLineDefaultProps, SumLineProps } from "./SumLine.types";
import type { TestIdProps, StyleOverrideProps } from "@types";

const defaultSumLineProps: SumLineDefaultProps = {
  label: "[Label]",
  value: 0,
  size: "m",
  unit: "€",
  period: null,
  compact: false,
};

/**
 * Displays a single number value with a label, a unit and a period
 *
 * @version 0.1.0
 *
 * @param {SumLineProps & TestIdProps & Omit<StyleOverrideProps, "as">} props - The component's props
 */
const SumLine = (
  props: SumLineProps & TestIdProps & Omit<StyleOverrideProps, "as">
) => {
  const { label, value, size, unit, period, compact } = useMergedProps(
    defaultSumLineProps,
    props
  );
  const testId = useTestId("sum-line", props);
  const classNames = useSumLineClassNames(size, props.className);

  const labelTestId = useMemo(() => `${testId}-label`, [testId]);
  const valueTestId = useMemo(() => `${testId}-value`, [testId]);
  const periodTestId = useMemo(() => `${testId}-period`, [testId]);

  const displayValue = useMemo(() => {
    const formattedValue = formatAmount(value ?? 0, compact)
      .split("€")[0]
      .trim();
    if (!unit) return formattedValue;
    return `${formattedValue} ${unit}`;
  }, [value, unit, compact]);

  const periodLabel = useMemo(() => {
    if (!period) return null;
    return `/ ${period}`;
  }, [period]);

  return (
    <FlexRowLayout
      className={classNames.container}
      styleOverride={props.styleOverride}
      testId={testId}
      overrideTestId
      align="center"
      fill="row"
      gap="s-2"
      justify="space-between"
    >
      <Text
        color="gray-700"
        size="m"
        weight="bold"
        testId={labelTestId}
        overrideTestId
        ellipsis
      >
        {label}
      </Text>
      <FlexRowLayout align="center" justify="end" gap="s-2">
        {size === "l" ? (
          <Heading
            className={classNames.heading}
            size="h2"
            color="gray-800"
            weight="bold"
            testId={valueTestId}
            overrideTestId
            noWrap
          >
            {displayValue}
          </Heading>
        ) : (
          <Text
            color="gray-800"
            size="m"
            weight="bold"
            testId={valueTestId}
            overrideTestId
            noWrap
          >
            {displayValue}
          </Text>
        )}
        {periodLabel && (
          <Text
            color="gray-800"
            size="m"
            weight="regular"
            testId={periodTestId}
            overrideTestId
          >
            {periodLabel}
          </Text>
        )}
      </FlexRowLayout>
    </FlexRowLayout>
  );
};

SumLine.defaultProps = defaultSumLineProps;

export { SumLine };
