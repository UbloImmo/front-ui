import type { StyleProps } from "../../types";
import type { GridLayoutDefaultProps, GridLayoutProps } from "./Grid.types";
import { buildGridLayoutStyle } from "./Grid.styles";
import { useStyleProps } from "../../utils";
import styled from "styled-components";

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
 * A grid wrapper layout
 *
 * @param {GridLayoutProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
export const GridLayout = (props: GridLayoutProps) => {
  const innerProps = useStyleProps(props);
  return <GridLayoutInner {...innerProps}>{props.children}</GridLayoutInner>;
};

const GridLayoutInner = styled.div<StyleProps<GridLayoutProps>>`
  ${buildGridLayoutStyle(defaultGridLayoutProps)}
`;
