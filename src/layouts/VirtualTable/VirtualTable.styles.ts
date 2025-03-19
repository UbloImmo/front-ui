import { isNull, isNullish } from "@ubloimmo/front-util";
import { css, type RuleSet } from "styled-components";

import { cssDimensions } from "@/utils/styles.utils";

import type {
  VirtualTableCellStyleProps,
  VirutalTableRowStyleProps,
} from "./VirtualTable.types";

/**
 * Generates CSS styles for a virtual table row.
 *
 * @param {VirutalTableRowStyleProps} props - The style props
 * @param {string} [props.$fixedItemHeight] - Optional fixed height for the row
 * @param {boolean} [props.$clickable] - Whether the row should have hover styles
 * @returns {RuleSet} The generated CSS styles
 */
export const virtualTableRowStyles = ({
  $fixedItemHeight,
  $clickable,
  $style,
}: VirutalTableRowStyleProps): RuleSet => css`
  // set fixed height if provided
  ${!isNull($fixedItemHeight) &&
  css`
    height: ${$fixedItemHeight};
    min-height: ${$fixedItemHeight};
    max-height: ${$fixedItemHeight};
  `}

  ${$style === "list" &&
  css`
    // reset styles since virtualized lists make these unreliable
    &:nth-child(even) > td,
    &:nth-child(odd) > td {
      background: var(--white);
    }

    &.even > td {
      background: var(--gray-50);
    }
  `}

  ${$clickable &&
  css`
    // re-apply hover styles
    &:hover > td {
      background: var(--primary-light);
    }
  `}
`;

/**
 * Generates CSS styles for a virtual table cell.
 *
 * @param {VirtualTableCellStyleProps} props - The style props
 * @param {string} [props.$fixedWidth] - Optional fixed width for the cell
 * @returns {RuleSet} The generated CSS styles
 */
export const virtualTableCellStyles = ({
  $fixedWidth,
}: VirtualTableCellStyleProps): RuleSet => css`
  ${!isNullish($fixedWidth) && cssDimensions($fixedWidth, "auto", true)}
`;
