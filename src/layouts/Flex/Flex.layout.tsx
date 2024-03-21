import type { StyleProps } from "../../types";
import type {
  FlexDirectionLayoutProps,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
} from "./Flex.types";
import { buildFlexLayoutStyle } from "./Flex.styles";
import { useStyleProps } from "../../utils";
import styled from "styled-components";

const defaultFlexLayoutProps: FlexLayoutDefaultProps = {
  direction: "row",
  gap: 0,
  justify: "start",
  align: "start",
  wrap: false,
  reverse: false,
  inline: false,
  children: null,
} as const;

/**
 * A flexbox wrapper layout
 *
 * @param {FlexLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexLayout = (props: FlexLayoutProps) => {
  const innerProps = useStyleProps(props);
  return <FlexLayoutInner {...innerProps}>{props.children}</FlexLayoutInner>;
};

/**
 * A {@link FlexLayout} variant with fixed `row` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexRowLayout = (props: FlexDirectionLayoutProps) => {
  return <FlexLayout direction="row" {...props} />;
};

/**
 * A {@link FlexLayout} variant with fixed `column` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexColumnLayoutProps] - optional props.
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexColumnLayout = (props: FlexDirectionLayoutProps) => {
  return <FlexLayout direction="column" {...props} />;
};

export const FlexLayoutInner = styled.div<StyleProps<FlexLayoutProps>>`
  ${buildFlexLayoutStyle(defaultFlexLayoutProps)}
`;
