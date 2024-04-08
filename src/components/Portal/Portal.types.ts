import type { ReactNode } from "react";

export type PortalProps = {
  /**
   * The content to render inside the portal's root element
   * @default undefined
   */
  children?: ReactNode;
  /**
   * A css selector needed to find the root element to attach the portal to
   * @default "#portal-root"
   */
  rootSelector?: string;
};

export type DefaultPortalProps = Required<PortalProps>;
