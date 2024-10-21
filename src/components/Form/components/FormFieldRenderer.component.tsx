import { isFunction, isString, type Nullable } from "@ubloimmo/front-util";
import { FC, useMemo } from "react";
import styled from "styled-components";

import { FormCustomContent } from "./FormCustomContent.component";
import { FormCustomField } from "./FormCustomField.component";
import { FormDivider } from "./FormDivider.component";
import { FormField } from "./FormField.component";
import { FormText } from "./FormText.component";
import { useFormContext } from "../Form.context";
import { formFieldListContainerStyles } from "../Form.styles";
import {
  isBuiltCustomFormField,
  isBuiltFormField,
  isBuiltFormTable,
  isBuiltFormText,
  isFormCustomContent,
  isFormDivider,
} from "../Form.utils";
import { FormTable } from "./FormTable/FormTable.component";

import { GridLayout } from "@layouts";

import type { BuiltFormCustomContentProps } from "../Form.types";
import type { DividerProps } from "@/components/Divider";

export const FormFieldRenderer = <TData extends object>() => {
  const { content, columns, isLoading } = useFormContext<TData>();

  const renderedContent = useMemo<Nullable<JSX.Element>[]>(() => {
    return content.map((contentItem, index) => {
      if (isBuiltFormField(contentItem)) {
        return <FormField {...contentItem} key={`form-field-${index}`} />;
      }
      if (isBuiltCustomFormField(contentItem)) {
        return (
          <FormCustomField
            {...contentItem}
            key={`form-custom-field-${index}`}
          />
        );
      }
      if (isBuiltFormText(contentItem)) {
        return <FormText {...contentItem} key={`form-text-${index}`} />;
      }
      if (isFormCustomContent(contentItem)) {
        const contentProps: BuiltFormCustomContentProps = {
          content: isFunction<FC>(contentItem)
            ? contentItem
            : contentItem.content,
          kind: "content",
        };
        return (
          <FormCustomContent
            {...contentProps}
            key={`form-custom-content-${index}`}
          />
        );
      }
      if (isBuiltFormTable(contentItem)) {
        return <FormTable {...contentItem} key={`form-table-${index}`} />;
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
      columns={columns}
      gap="s-6"
      testId="form-field-list"
      overrideTestId
      $isLoading={isLoading}
    >
      {renderedContent}
    </FieldListContainer>
  );
};

const FieldListContainer = styled(GridLayout)<{ $isLoading: boolean }>`
  ${formFieldListContainerStyles}
`;
