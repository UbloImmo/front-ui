import { isFunction, isNull, type Nullable } from "@ubloimmo/front-util";
import { useMemo, type FC, type ReactNode } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";

import type { BuiltFormCustomContentProps } from "../Form.types";

/**
 * A component that renders a custom content inside a form, which can be a React component
 * or a React node.
 *
 * @version 0.1.0
 *
 * @param {BuiltFormCustomContentProps} props - The props of the component.
 * @returns {JSX.Element} The rendered component.
 */
export const FormCustomContent = ({
  content,
}: BuiltFormCustomContentProps): Nullable<JSX.Element> => {
  const renderedContent = useMemo<ReactNode>(() => {
    if (isFunction<FC>(content)) {
      const ContentFc = content;
      return <ContentFc />;
    }
    return content;
  }, [content]);

  // do not render anything if renderedContent doesn't
  if (isNull(renderedContent)) return null;

  return (
    <FormFieldGridItem columnStart={1} columnEnd={-1} fill>
      {renderedContent}
    </FormFieldGridItem>
  );
};
