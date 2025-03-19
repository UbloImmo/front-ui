import { isNull } from "@ubloimmo/front-util";
import styled, { css } from "styled-components";

import { GridItem } from "@/layouts/GridItem";
import { breakpointsPx } from "@/sizes";

import type { BuiltFormFieldLayoutFixedWidthProp } from "../Form.types";

export const FormFieldGridItem = styled(
  GridItem
)<BuiltFormFieldLayoutFixedWidthProp>`
  @media only screen and (max-width: ${breakpointsPx.XS}) {
    grid-column: 1 / -1;
  }

  ${({ $fixedWidth }) =>
    !isNull($fixedWidth) &&
    css`
      min-width: ${$fixedWidth};
      max-width: ${$fixedWidth};
      width: ${$fixedWidth};
    `}
`;
