import styled from "styled-components";
import { buildGridLayoutStyle } from "./Grid.styles";
import { GridLayoutDefaultProps, GridLayoutProps } from "./Grid.types";

const defaultGridLayoutProps: GridLayoutDefaultProps = {
  flow: "row",
  gap: "1rem",
  justify: "start",
  align: "start",
  columns: 12,
  rows: "unset",
  inline: false,
} as const;

/**
 * A grid wrapper layout
 *
 * @param {GridLayoutProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
export const GridLayout = styled.div<GridLayoutProps>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;
