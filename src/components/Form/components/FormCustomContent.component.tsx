import { isFunction } from "@ubloimmo/front-util";
import { useMemo, type FC, type ReactNode } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";

import type { BuiltFormCustomContentProps } from "../Form.types";

export const FormCustomContent = ({ content }: BuiltFormCustomContentProps) => {
  const renderedContent = useMemo<ReactNode>(() => {
    if (isFunction<FC>(content)) {
      const ContentFc = content;
      return <ContentFc />;
    }
    return content;
  }, [content]);

  return (
    <FormFieldGridItem columnStart={1} columnEnd={-1} fill>
      {renderedContent}
    </FormFieldGridItem>
  );
};
