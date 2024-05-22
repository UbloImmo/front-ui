import { ReactNode } from "react";

export type HypertextProps = {
  /**
   * The Hypertext's rendered text.
   * @type {ReactNode}
   * @required
   */
  children: ReactNode;
  /**
   * The Hypertext's destination URL.
   * @type {string}
   * @required
   */
  href: string;
  /**
   * The Hypertext's additional information when hovered.
   * @type {string}
   * @required
   */
  title: string;
};

export type DefaultHypertextProps = Required<HypertextProps>;
