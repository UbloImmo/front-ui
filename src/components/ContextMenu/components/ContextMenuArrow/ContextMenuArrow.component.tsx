import { PopoverArrow } from "@radix-ui/react-popover";

import { useContextMenuArrowStyles } from "./ContextMenuArrow.styles";

export const ContextMenuArrow = () => {
  const className = useContextMenuArrowStyles();
  return <PopoverArrow className={className} height={4} width={8} />;
};
