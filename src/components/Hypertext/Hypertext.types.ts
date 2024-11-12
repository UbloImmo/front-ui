import { ReactNode } from "react";

import type { ColorKey } from "@types";

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
  /**
   * The Hypertext's main color.
   * @type {ColorKey}
   * @default "primary"
   */
  color?: ColorKey;
};

export type DefaultHypertextProps = Required<HypertextProps>;
