import { isNull, isString } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import { useDividerStyles } from "./Divider.styles";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { FlexRowLayout } from "@/layouts/Flex";
import { useTestId, useMergedProps, useLogger } from "@utils";

import type { DividerProps, DividerDefaultProps } from "./Divider.types";
import type { TestIdProps } from "@types";

const defaultDividerProps: DividerDefaultProps = {
  label: null,
  justify: "start",
  className: null,
  as: "div",
  styleOverride: null,
};

/**
 * Divider component
 *
 * A horizontal line that can be used to separate content, with an optional label.
 *
 * @version 0.1.0
 *
 * @param {DividerProps & TestIdProps} props - Divider component props
 * @returns {JSX.Element}
 */
const Divider = (props: DividerProps & TestIdProps): JSX.Element => {
  const { error } = useLogger("Divider");
  const mergedProps = useMergedProps(defaultDividerProps, props);
  const { justify } = mergedProps;
  const testId = useTestId("divider", props);
  const { classNames, style } = useDividerStyles(mergedProps);

  const label = useMemo(() => {
    if (isString(mergedProps.label) || isNull(mergedProps.label))
      return mergedProps.label;
    error(`label should be a string or null, received ${mergedProps.label}`);
    return null;
  }, [error, mergedProps.label]);

  const Line = useCallback(
    () => <div className={classNames.line} data-testid="divider-line" />,
    [classNames.line]
  );

  return (
    <FlexRowLayout
      className={classNames.wrapper}
      testId={testId}
      overrideTestId
      as={mergedProps.as}
      gap="s-2"
      align="center"
      justify="center"
      fill
      styleOverride={style}
    >
      {label && justify === "center" ? (
        <>
          <Line />
          <Text
            size="s"
            color="gray-400"
            weight="medium"
            testId="divider-label"
            overrideTestId
          >
            {label}
          </Text>
        </>
      ) : label ? (
        <Heading
          size="h4"
          color="gray-700"
          weight="bold"
          testId="divider-label"
          overrideTestId
        >
          {label}
        </Heading>
      ) : null}
      <Line />
    </FlexRowLayout>
  );
};
Divider.__DEFAULT_PROPS = defaultDividerProps;

export { Divider };
