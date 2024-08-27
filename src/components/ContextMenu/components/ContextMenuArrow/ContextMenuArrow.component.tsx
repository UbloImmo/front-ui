import { PopoverArrow } from "@radix-ui/react-popover";
import styled from "styled-components";

import { contextMenuArrowStyles } from "./ContextMenuArrow.styles";

export const ContextMenuArrow = () => {
  return <StyledPopoverArrow height={4} width={8} />;
};

const StyledPopoverArrow = styled(PopoverArrow)`
  ${contextMenuArrowStyles}
`;
