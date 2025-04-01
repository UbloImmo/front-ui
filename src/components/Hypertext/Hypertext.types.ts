import { Nullable, RequireAtLeastOne, VoidFn } from "@ubloimmo/front-util";
import { ReactNode } from "react";

import type { ColorKey } from "@types";

type BaseHypertextProps = {
  /**
   * The Hypertext's rendered text.
   * @type {ReactNode}
   * @required
   */
  children: ReactNode;
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

export type HypertextProps = BaseHypertextProps &
  RequireAtLeastOne<{
    /**
     * The Hypertext's destination URL.
     * @type {string}
     */
    href?: string;
    /**
     * The Hypertext's click handler.
     * @type {Nullable<VoidFn>}
     */
    onClick?: Nullable<VoidFn>;
  }>;
