import { useMemo } from "react";
import { styled } from "styled-components";

import { formatAmount } from "../AccountBalance";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { sumLineContainerStyles, sumLineHeadingStyles } from "./SumLine.styles";

import { FlexRowLayout } from "@layouts";
import { useMergedProps, useTestId, useClassName, useStyleProps } from "@utils";

import type {
  SumLineDefaultProps,
  SumLineProps,
  SumlineStyleProps,
} from "./SumLine.types";
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
 * @version 0.0.3
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
  const className = useClassName(props);

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

  const styleProps = useStyleProps({ size });

  return (
    <SumLineContainer
      className={className}
      styleOverride={props.styleOverride}
      testId={testId}
      overrideTestId
      align="center"
      fill="row"
      gap="s-2"
      justify="space-between"
      {...styleProps}
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
          <SumLineHeading
            size="h2"
            color="gray-800"
            weight="bold"
            testId={valueTestId}
            overrideTestId
            noWrap
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
    </SumLineContainer>
  );
};

SumLine.defaultProps = defaultSumLineProps;

export { SumLine };

const SumLineContainer = styled(FlexRowLayout)<SumlineStyleProps>`
  ${sumLineContainerStyles}
`;

const SumLineHeading = styled(Heading)`
  ${sumLineHeadingStyles}
`;
