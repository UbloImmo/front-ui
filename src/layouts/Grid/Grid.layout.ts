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
} as const;

export const GridLayout = styled.div<GridLayoutProps>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;
