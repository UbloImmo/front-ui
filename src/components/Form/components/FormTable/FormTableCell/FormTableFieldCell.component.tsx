import { isFunction, isString } from "@ubloimmo/front-util";
import { useMemo, type FC, type ReactNode } from "react";
import styled from "styled-components";

import {
  FormTableCellControls,
  type FormTableCellControlsProps,
} from "./FormTableCellControls.component";

import { useFormContext } from "@/components/Form/Form.context";
import { computeFieldDisplayContent } from "@/components/Form/Form.format";
import { Input, useInputId, type InputType } from "@/components/Input";
import { Text } from "@/components/Text";
import { breakpointsPx } from "@/sizes";
import { TableCell } from "@layouts";

import type { BuiltFieldProps } from "@/components/Form/Form.types";

type FormTableFieldCellProps = BuiltFieldProps<InputType> &
  FormTableCellControlsProps & {
    colSpan: number;
  };

/**
 * Renders a form field inside a table cell, depending on the form mode.
 *
 * If the form is in editing mode, the component renders an `Input` component
 * with the provided props.
 *
 * If the form is in read mode, the component renders a `Text` component with
 * the content of the field computed by the `computeFieldDisplayContent` function.
 *
 * @param {BuiltFieldProps<InputType>} props - The props of the form field.
 * @returns {JSX.Element} The rendered component.
 */
export const FormTableFieldCell = ({
  layout,
  colSpan,
  controls,
  isFirst,
  isLast,
  ...props
}: FormTableFieldCellProps): JSX.Element => {
  const { isEditing } = useFormContext();
  const displayContent = useMemo<ReactNode>(() => {
    const content = computeFieldDisplayContent(props.type, props);
    if (isString(content))
      return (
        <Text color="gray-800" weight="medium" fill ellipsis>
          {content}
        </Text>
      );
    if (isFunction<FC>(content)) {
      const DisplayContent = content;
      return <DisplayContent />;
    }
    return content;
  }, [props]);

  const isDisplay = useMemo(
    () => !isEditing || layout.readonly,
    [isEditing, layout.readonly]
  );

  const inputId = useInputId(props);

  return (
    <FormTableCell padded={isDisplay} colSpan={colSpan}>
      <FormTableCellControls
        controls={controls}
        isFirst={isFirst}
        isLast={isLast}
      />
      {isDisplay ? (
        <FormTableDisplayCellInner>{displayContent}</FormTableDisplayCellInner>
      ) : (
        <Input {...props} table id={inputId} />
      )}
    </FormTableCell>
  );
};

const FormTableCell = styled(TableCell)`
  position: relative;
`;

const FormTableDisplayCellInner = styled.div`
  min-height: var(--s-6);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media only screen and (max-width: ${breakpointsPx.XS}) {
    min-height: var(--s-8);
  }
`;
