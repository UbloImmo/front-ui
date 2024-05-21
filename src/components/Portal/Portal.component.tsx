import { Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { createPortal } from "react-dom";

import { useLogger, useMergedProps } from "@utils";

import type { DefaultPortalProps, PortalProps } from "./Portal.types";

const defaultPortalProps: DefaultPortalProps = {
  children: null,
  rootSelector: "#portal-root",
};

/**
 * Renders its children in a portal, using the specified root element selector.
 *
 * @version 0.0.1
 *
 * @private - Used interally by Dialog
 *
 * @param {PortalProps} props - the properties for the Portal component
 * @return {JSX.Element} the rendered content in the portal
 */
const Portal = (props: PortalProps) => {
  const { children, rootSelector } = useMergedProps(defaultPortalProps, props);
  const { error } = useLogger("Portal");
  const root = useMemo<Nullable<HTMLElement>>(() => {
    if (!rootSelector) return null;
    return document.querySelector(rootSelector) ?? null;
  }, [rootSelector]);

  if (!root) {
    error(`No root element found for selector ${rootSelector}`);
    return null;
  }
  return createPortal(children, root);
};

Portal.defaultProps = defaultPortalProps;

export { Portal };
