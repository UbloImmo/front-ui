import styled from "styled-components";

import { buildFlexLayoutStyle } from "./Flex.styles";
import { useStyleProps } from "../../utils";

import type {
  FlexDirectionLayoutProps,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
} from "./Flex.types";
import type { StyleProps } from "@types";

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
} as const;

/**
 * A flexbox wrapper layout, with default properties direction set to `row`, align and justify set to `start`
 *
 * @version 0.0.1
 * @param {FlexLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexLayout = (props: FlexLayoutProps): JSX.Element => {
  const innerProps = useStyleProps(props);
  return (
    <FlexLayoutInner {...innerProps} data-testid="flex">
      {props.children}
    </FlexLayoutInner>
  );
};

/**
 * A {@link FlexLayout} variant with fixed `row` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexLayoutProps] - optional props
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexRowLayout = (props: FlexDirectionLayoutProps): JSX.Element => {
  return <FlexLayout direction="row" {...props} data-testid="flex-row" />;
};

/**
 * A {@link FlexLayout} variant with fixed `column` direction
 *
 * @param {FlexDirectionLayoutProps} [props = defaultFlexColumnLayoutProps] - optional props.
 * @return {JSX.Element} The styled flex wrapper
 */
export const FlexColumnLayout = (
  props: FlexDirectionLayoutProps
): JSX.Element => {
  return <FlexLayout direction="column" {...props} />;
};

FlexLayout.defaultProps = defaultFlexLayoutProps;

export const FlexLayoutInner = styled.div<StyleProps<FlexLayoutProps>>`
  ${buildFlexLayoutStyle(defaultFlexLayoutProps)}
`;
