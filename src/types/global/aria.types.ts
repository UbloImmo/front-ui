import { Nullish } from "@ubloimmo/front-util";
import { AriaAttributes } from "react";

export type AriaPropertyName = keyof AriaAttributes;

export type AriaProps = {
  [k in AriaPropertyName]?: Nullish<AriaAttributes[k]>;
};
