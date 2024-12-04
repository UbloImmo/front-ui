import { css, type RuleSet } from "styled-components";

import { parseFixedLength } from "@/sizes/size.utils";

import type { TableHeaderStyleProps } from "./TableHeader.types";

export const tableHeaderStyles = ({
  $sticky,
  $top,
}: TableHeaderStyleProps): RuleSet => {
  if (!$sticky) return css``;
  const top = parseFixedLength($top);
  return css`
    position: sticky;
    top: ${top};
  `;
};
