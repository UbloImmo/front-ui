import styled from "styled-components";

import { buildGridLayoutStyle } from "./Grid.styles";

import { useStyleProps } from "@utils";

import type { GridLayoutDefaultProps, GridLayoutProps } from "./Grid.types";
import type { StyleProps } from "@types";

const defaultGridLayoutProps: GridLayoutDefaultProps = {
  flow: "row",
  gap: "1rem",
  justify: "start",
  align: "start",
  columns: 12,
  rows: "unset",
  inline: false,
  children: null,
} as const;

/**
 * A grid wrapper layout with default `row` flow and 12 columns
 *
 * @version 0.0.1
 *
 * @param {GridLayoutProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
export const GridLayout = (props: GridLayoutProps): JSX.Element => {
  const innerProps = useStyleProps(props);
  return (
    <GridLayoutInner {...innerProps} data-testid="grid">
      {props.children}
    </GridLayoutInner>
  );
};

const GridLayoutInner = styled.div<StyleProps<GridLayoutProps>>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;

GridLayout.defaultProps = defaultGridLayoutProps;
