import styled from "styled-components";

import { breakpointsPx } from "@/sizes";
import { GridItem } from "@layouts";

export const FormFieldGridItem = styled(GridItem)`
  @media only screen and (max-width: ${breakpointsPx.XS}) {
    grid-column: 1 / -1;
  }
`;
