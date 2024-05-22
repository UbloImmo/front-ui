import { ReactNode } from "react";

export type HypertextProps = {
  /**
   * The Hypertext's rendered text.
   * @type {ReactNode}
   * @required
   * @default null
   */
  children: ReactNode;
  /**
   * The Hypertext's destination URL.
   * @type {string}
   * @required
   * @default ""
   */
  href: string;
  /**
   * The Hypertext's additional information when hovered.
   * @type {string}
   * @required
   * @default ""
   */
  title: string;
};

export type DefaultHypertextProps = Required<HypertextProps>;
