import type { FormTableFieldContentRefs } from "../FormTableFieldContent";
import type { RefObject } from "react";

export type FormTableFieldScrollbarsProps = {
  contentRefs: RefObject<FormTableFieldContentRefs>;
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
