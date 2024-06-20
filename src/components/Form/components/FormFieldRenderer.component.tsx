import { isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formFieldListContainerStyles } from "../Form.styles";
import { isBuiltFormField, isFormDivider } from "../Form.utils";

import { GridLayout } from "@layouts";

import { FormField, FormDivider } from ".";

import type { DividerProps } from "@/components/Divider";

export const FormFieldRenderer = <TData extends object>() => {
  const { content } = useFormContext<TData>();

  const renderedContent = useMemo<Nullable<JSX.Element>[]>(() => {
    return content.map((fieldOrDivider, index) => {
      if (isBuiltFormField(fieldOrDivider)) {
        return <FormField {...fieldOrDivider} key={`form-field-${index}`} />;
      }
      if (!isFormDivider(fieldOrDivider)) return null;
      const dividerProps: DividerProps = isString(fieldOrDivider)
        ? {}
        : fieldOrDivider;
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
