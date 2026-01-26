import { forwardRef } from "react";

import { useFlexLayoutStyle } from "./Flex.styles";

import { useAriaProps } from "@/utils/aria.utils";
import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  FlexDirectionLayoutProps,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
} from "./Flex.types";
import type { AriaProps, TestIdProps } from "@types";

const defaultFlexLayoutProps: FlexLayoutDefaultProps = {
  direction: "row",
  gap: 0,
  justify: "start",
  align: "start",
  wrap: false,
  reverse: false,
  inline: false,
  fill: false,
  children: null,
  className: null,
  role: null,
  id: null,
  as: "div",
  styleOverride: null,
  overflow: "unset",
} as const;

/**
 * A flexbox wrapper layout, with default properties direction set to `row`, align and justify set to `start`
 *
 * @version 0.1.0
 * @param {FlexLayoutProps & TestId & AriaProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexLayout = forwardRef<
  HTMLDivElement,
  FlexLayoutProps & TestIdProps & AriaProps
>((props, ref): JSX.Element => {
  const testId = useTestId("flex", props);
  const id = useHtmlAttribute(props.id ?? null);

  const mergedProps = useMergedProps(defaultFlexLayoutProps, props);
  const { className, style } = useFlexLayoutStyle(mergedProps);

  const ariaProps = useAriaProps(props);

  const Element = mergedProps.as;

  return (
    <Element
      ref={ref}
      data-testid={testId}
      className={className}
      style={style}
      id={id}
      role={props.role ?? undefined}
      {...ariaProps}
    >
      {props.children}
    </Element>
  );
});

/**
 * A {@link FlexLayout} variant with fixed `row` directionS
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexRowLayout = forwardRef<
  HTMLDivElement,
  FlexDirectionLayoutProps & TestIdProps & AriaProps
>((props, ref): JSX.Element => {
  const testId = useTestId("flex-row", props);

  return <FlexLayout {...props} ref={ref} direction="row" testId={testId} />;
});

/**
 * A {@link FlexLayout} variant with fixed `column` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexColumnLayoutProps] - optional props.
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexColumnLayout = forwardRef<
  HTMLDivElement,
  FlexDirectionLayoutProps & TestIdProps & AriaProps
>((props, ref): JSX.Element => {
  const testId = useTestId("flex-column", props);
  return <FlexLayout {...props} ref={ref} direction="column" testId={testId} />;
});

FlexLayout.defaultProps = defaultFlexLayoutProps;
