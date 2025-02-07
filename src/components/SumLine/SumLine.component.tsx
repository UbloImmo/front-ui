import { useMemo } from "react";
import { styled } from "styled-components";

import { formatAmount } from "../AccountBalance";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { sumLineContainerStyles, sumLineHeadingStyles } from "./SumLine.styles";

import { FlexRowLayout } from "@layouts";
import { useMergedProps, useTestId, useClassName } from "@utils";

import type { SumLineDefaultProps, SumLineProps } from "./SumLine.types";
import type { TestIdProps, StyleOverrideProps } from "@types";

const defaultSumLineProps: SumLineDefaultProps = {
  label: "[Label]",
  value: 0,
  size: "m",
  unit: "€",
  period: null,
};

export const SumLine = (
  props: SumLineProps & TestIdProps & Omit<StyleOverrideProps, "as">
) => {
  const { label, value, size, unit, period } = useMergedProps(
    defaultSumLineProps,
    props
  );
  const testId = useTestId("sum-line", props);
  const className = useClassName(props);

  const labelTestId = useMemo(() => `${testId}-label`, [testId]);
  const valueTestId = useMemo(() => `${testId}-value`, [testId]);
  const periodTestId = useMemo(() => `${testId}-period`, [testId]);

  const displayValue = useMemo(() => {
    const formattedValue = formatAmount(value);
    if (!unit) return formattedValue;
    return `${formattedValue} ${unit}`;
  }, [value, unit]);

  const periodLabel = useMemo(() => {
    if (!period) return null;
    return `/ ${period}`;
  }, [period]);

  return (
    <SumLineContainer
      className={className}
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
      >
        {label}
      </Text>
      <FlexRowLayout align="center" justify="end" gap="s-2">
        {size === "l" ? (
          <SumLineHeading
            size="h2"
            color="gray-800"
            testId={valueTestId}
            overrideTestId
          >
            {displayValue}
          </SumLineHeading>
        ) : (
          <Text
            color="gray-800"
            size="m"
            weight="bold"
            testId={valueTestId}
            overrideTestId
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
    </SumLineContainer>
  );
};

const SumLineContainer = styled(FlexRowLayout)`
  ${sumLineContainerStyles}
`;

const SumLineHeading = styled(Heading)`
  ${sumLineHeadingStyles}
`;
