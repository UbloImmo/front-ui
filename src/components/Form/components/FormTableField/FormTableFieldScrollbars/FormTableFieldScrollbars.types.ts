import type { FormTableFieldContentRefs } from "../FormTableFieldContent";
import type { Nullable } from "@ubloimmo/front-util";
import type { RefObject } from "react";

export type FormTableFieldScrollbarsProps = {
  contentRefs: RefObject<Nullable<FormTableFieldContentRefs>>;
  scrollerId: string;
};

export interface FormTableFieldScrollbarsMeasurements {
  scrollWidth: number;
  scrollHeight: number;
  width: number;
  height: number;
  scrollLeft: number;
  scrollTop: number;
}
