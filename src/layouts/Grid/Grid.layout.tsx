import styled from "styled-components";

import { buildGridLayoutStyle } from "./Grid.styles";

import {
  useClassName,
  useHtmlAttribute,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

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
  fill: false,
  children: null,
  className: null,
  role: null,
} as const;

/**
 * A grid wrapper layout with default `row` flow and 12 columns
 *
 * @version 0.0.3
 *
 * @param {GridLayoutProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
const GridLayout = (props: GridLayoutProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultGridLayoutProps, props);
  const innerProps = useStyleProps(mergedProps);
  const testId = useTestId("grid", props);
  const className = useClassName(props);
  const role = useHtmlAttribute(mergedProps.role);
  return (
    <GridLayoutInner
      {...innerProps}
      data-testid={testId}
      role={role}
      className={className}
    >
      {props.children}
    </GridLayoutInner>
  );
};
GridLayout.defaultProps = defaultGridLayoutProps;

export { GridLayout };

const GridLayoutInner = styled.div<StyleProps<GridLayoutProps>>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;
