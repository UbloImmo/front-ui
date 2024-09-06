import { forwardRef } from "react";
import styled from "styled-components";

import { buildFlexLayoutStyle } from "./Flex.styles";

import {
  useClassName,
  useHtmlAttribute,
  useStyleProps,
  useTestId,
} from "@utils";

import type {
  FlexDirectionLayoutProps,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
} from "./Flex.types";
import type { StyleProps, TestIdProps } from "@types";

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
} as const;

/**
 * A flexbox wrapper layout, with default properties direction set to `row`, align and justify set to `start`
 *
 * @version 0.0.2
 * @param {FlexLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexLayout = forwardRef<
  HTMLDivElement,
  FlexLayoutProps & TestIdProps
>((props: FlexLayoutProps & TestIdProps, ref): JSX.Element => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("flex", props);
  const className = useClassName(props);
  const id = useHtmlAttribute(props.id ?? null);
  return (
    <FlexLayoutInner
      {...innerProps}
      ref={ref}
      data-testid={testId}
      className={className}
      id={id}
      role={props.role ?? undefined}
    >
      {props.children}
    </FlexLayoutInner>
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
  FlexDirectionLayoutProps & TestIdProps
>((props: FlexDirectionLayoutProps & TestIdProps, ref): JSX.Element => {
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
  FlexDirectionLayoutProps & TestIdProps
>((props: FlexDirectionLayoutProps & TestIdProps, ref): JSX.Element => {
  const testId = useTestId("flex-column", props);
  return <FlexLayout {...props} ref={ref} direction="column" testId={testId} />;
});

FlexLayout.defaultProps = defaultFlexLayoutProps;

const FlexLayoutInner = styled.div<StyleProps<FlexLayoutProps>>`
  ${buildFlexLayoutStyle(defaultFlexLayoutProps)}
`;
