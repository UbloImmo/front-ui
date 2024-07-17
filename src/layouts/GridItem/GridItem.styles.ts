import { css, type RuleSet } from "styled-components";

/**
 * Returns a CSS rule set for a grid item with the specified style properties.
 *
 * @param {GridItemStyleProps} props - The style properties for the grid item.
 * @param {string} props.$rowStart - The starting row position of the grid item.
 * @param {string} props.$rowEnd - The ending row position of the grid item.
 * @param {string} props.$columnStart - The starting column position of the grid item.
 * @param {string} props.$columnEnd - The ending column position of the grid item.
 * @param {string} props.$align - The alignment of the grid item along the row axis.
 * @param {string} props.$justify - The alignment of the grid item along the column axis.
 * @return {RuleSet} The CSS rule set for the grid item.
 */
import type { GridItemStyleProps } from "./GridItem.types";

export const gridItemStyles = ({
  $rowStart,
  $rowEnd,
  $columnStart,
  $columnEnd,
  $align,
  $justify,
  $fill,
}: GridItemStyleProps): RuleSet => css`
  grid-row: ${$rowStart} / ${$rowEnd};
  grid-column: ${$columnStart} / ${$columnEnd};
  align-self: ${$align};
  justify-self: ${$justify};
  ${$fill &&
  css`
    width: 100%;
    height: 100%;
  `}

  ${$fill === "force" &&
  css`
    & > :first-child {
      width: 100%;
      height: 100%;
    }
  `}
`;
