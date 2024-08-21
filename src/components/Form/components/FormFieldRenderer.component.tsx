import { isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { FormDivider } from "./FormDivider.component";
import { FormField } from "./FormField.component";
import { FormText } from "./FormText.component";
import { useFormContext } from "../Form.context";
import { formFieldListContainerStyles } from "../Form.styles";
import {
  isBuiltFormField,
  isBuiltFormText,
  isFormDivider,
} from "../Form.utils";

import { GridLayout } from "@layouts";

import type { DividerProps } from "@/components/Divider";

export const FormFieldRenderer = <TData extends object>() => {
  const { content } = useFormContext<TData>();

  const renderedContent = useMemo<Nullable<JSX.Element>[]>(() => {
    return content.map((contentItem, index) => {
      if (isBuiltFormField(contentItem)) {
        return <FormField {...contentItem} key={`form-field-${index}`} />;
      }
      if (isBuiltFormText(contentItem)) {
        return <FormText {...contentItem} key={`form-field-${index}`} />;
      }
      if (!isFormDivider(contentItem)) return null;
      const dividerProps: DividerProps = isString(contentItem)
        ? {}
        : contentItem;
      return <FormDivider {...dividerProps} key={`form-divider-${index}`} />;
    });
  }, [content]);

  return (
    <FieldListContainer
      columns={2}
      gap="s-6"
      testId="form-field-list"
      overrideTestId
    >
      {renderedContent}
    </FieldListContainer>
  );
};

const FieldListContainer = styled(GridLayout)`
  ${formFieldListContainerStyles}
`;
