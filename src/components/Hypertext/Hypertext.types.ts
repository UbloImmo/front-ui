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
};
