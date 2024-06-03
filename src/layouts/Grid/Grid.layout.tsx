import styled from "styled-components";

import { buildGridLayoutStyle } from "./Grid.styles";

import { useClassName, useStyleProps, useTestId } from "@utils";

import type { GridLayoutDefaultProps, GridLayoutProps } from "./Grid.types";
import type { StyleProps, TestIdProps } from "@types";

const defaultGridLayoutProps: GridLayoutDefaultProps = {
  flow: "row",
  gap: "1rem",
  justify: "start",
  align: "start",
  columns: 12,
  rows: "unset",
  inline: false,
  children: null,
  className: null,
} as const;

/**
 * A grid wrapper layout with default `row` flow and 12 columns
 *
 * @version 0.0.1
 *
 * @param {GridLayoutProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
const GridLayout = (props: GridLayoutProps & TestIdProps): JSX.Element => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("grid", props);
  const className = useClassName(props);
  return (
    <GridLayoutInner {...innerProps} data-testid={testId} className={className}>
      {props.children}
    </GridLayoutInner>
  );
};
GridLayout.defaultProps = defaultGridLayoutProps;

export { GridLayout };

const GridLayoutInner = styled.div<StyleProps<GridLayoutProps>>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;
