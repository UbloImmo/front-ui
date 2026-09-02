import { FormTableFieldContentRefs } from "../FormTableFieldContent";

import type { RefObject } from "react";

export type FormTableFieldScrollbarsProps = {
  // scrollerRef: RefObject<HTMLElement>;
  // contentRef: RefObject<HTMLElement>;
  // headerRef: RefObject<HTMLElement>;
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
