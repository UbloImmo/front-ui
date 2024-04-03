import { Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { createPortal } from "react-dom";

import { useLogger } from "@utils";

import type { PortalProps } from "./Dialog.types";

/**
 * Renders its children in a portal, using the specified root element selector.
 *
 * @param {PortalProps} props - the properties for the Portal component
 * @return {JSX.Element} the rendered content in the portal
 */
export const Portal = (props: PortalProps) => {
  const { error } = useLogger("Portal");
  const root = useMemo<Nullable<HTMLElement>>(() => {
    if (!props.rootSelector) return null;
    return document.querySelector(props?.rootSelector) ?? null;
  }, [props]);

  if (!root) {
    error(
      `No root element found for selector ${props.rootSelector}\nRendering content inline.`
    );
    return <>{props.children}</>;
  }
  return createPortal(props.children, root);
};
