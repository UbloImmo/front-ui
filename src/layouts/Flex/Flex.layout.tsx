import styled from "styled-components";
import {
  FlexDirectionLayoutProps,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
} from "./Flex.types";
import { buildFlexLayoutStyle } from "./Flex.styles";

const defaultFlexLayoutProps: FlexLayoutDefaultProps = {
  direction: "row",
  gap: 0,
  justify: "start",
  align: "start",
  wrap: false,
  reverse: false,
} as const;

/**
 * A flexbox wrapper layout
 *
 * @param {FlexLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexLayout = styled.div<FlexLayoutProps>`
  ${buildFlexLayoutStyle(defaultFlexLayoutProps)}
`;

/**
 * A {@link FlexLayout} variant with fixed `row` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexRowLayout = styled.div<FlexDirectionLayoutProps>`
  ${buildFlexLayoutStyle(defaultFlexLayoutProps)}
`;

const defaultFlexColumnLayoutProps: FlexLayoutDefaultProps = {
  ...defaultFlexLayoutProps,
  direction: "column",
} as const;

/**
 * A {@link FlexLayout} variant with fixed `column` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexColumnLayoutProps] - optional props.
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexColumnLayout = styled.div<FlexDirectionLayoutProps>`
  ${buildFlexLayoutStyle(defaultFlexColumnLayoutProps)}
`;
