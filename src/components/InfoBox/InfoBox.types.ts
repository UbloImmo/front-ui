import { Nullable } from "@ubloimmo/front-util";

import type { IconName } from "../Icon";

export type InfoBoxProps = {
  /**
   * The info box's icon.
   *
   * @required
   * @type {IconName}
   * @default "Square"
   */
  icon: IconName;

  /**
   * The label of the contextual data.
   *
   * @required
   * @type {string}
   * @default null
   */
  label: Nullable<string>;

  /**
   * The contextual data.
   *
   * @type {string}
   * @default null
   */
  info?: Nullable<string>;
};

export type InfoBoxDefaultProps = Required<InfoBoxProps>;
