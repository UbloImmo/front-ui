import { type ReactNode, useId, useMemo, useRef } from "react";

import { useFormContext } from "../../Form.context";
import { FormFieldGridItem } from "../FormFieldGridItem.component";
import styles from "./FormTableField.module.scss";
import {
  FormTableFieldContent,
  type FormTableFieldContentRefs,
} from "./FormTableFieldContent";
import { FormTableFieldEmptyState } from "./FormTableFieldEmptyState";
import { FormTableFieldFooter } from "./FormTableFieldFooter";
import { FormTableFieldScrollbars } from "./FormTableFieldScrollbars";

import fieldStyles from "@/components/Field/Field.module.scss";
import { useFieldAssistiveText } from "@/components/Field/Field.utils";
import { Icon } from "@/components/Icon";
import { InputAssistiveText } from "@/components/InputAssistiveText";
import { InputLabel } from "@/components/InputLabel";
import { FlexColumnLayout } from "@/layouts/Flex";
import { isNonEmptyString } from "@utils";

import type { BuiltFormTableProps } from "../../Form.types";
import type { TooltipProps } from "@/components/Tooltip";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * A form table component that displays data in a tabular format with optional editing capabilities.
 * Supports row deletion, reordering via drag and drop, and dynamic row addition.
 *
 * @version 0.1.2
 *
 * @param {BuiltFormTableProps} props - The props for the form table component
 * @returns {ReactNode} The rendered form table component
 */
export function FormTableField(props: BuiltFormTableProps): ReactNode {
  const {
    layout,
    assistiveText,
    error,
    errorText,
    label,
    required,
    tooltip,
    compact,
    data,
    modifiers,
    displayRows,
    EmptyCard,
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<FormTableFieldContentRefs>(null);

  const scrollerId = useId();

  const { isEditing } = useFormContext();

  const errorTooltip = useMemo<Nullable<TooltipProps>>(() => {
    if (!error || !errorText) return null;
    return {
      children: (
        <Icon name="ExclamationCircleFill" color="error-medium" size="s-4" />
      ),
      content: errorText,
    };
  }, [error, errorText]);

  const labelTooltip = useMemo(
    () => (isEditing ? tooltip : errorTooltip),
    [isEditing, errorTooltip, tooltip]
  );
  const hasLabel = useMemo(() => isNonEmptyString(label), [label]);
  const tableAssistiveText = useFieldAssistiveText(
    { assistiveText, error, errorText },
    data
  );

  /**
   * Computes whether the table is currently empty (no rows are shown)
   */
  const isEmpty = useMemo<boolean>(() => {
    // when selectable behavior is set to "filter",
    // we hide all rows that are not selected while in "read" mode,
    // and if none are selected, display the empty state.
    if (
      modifiers.selectable &&
      modifiers.selectable.behavior === "filter" &&
      !isEditing
    ) {
      return !displayRows.some(({ selected }) => selected);
    }
    // otherwhise, we just evaluate the number of rows
    return !displayRows.length;
  }, [displayRows, isEditing, modifiers.selectable]);

  return (
    <FormFieldGridItem
      columnEnd={layout.columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FlexColumnLayout
        className={fieldStyles.field}
        testId="form-custom-field"
        overrideTestId
        data-field-type="custom"
        gap="s-2"
        fill
      >
        {hasLabel && (
          <InputLabel
            label={label}
            required={isEditing ? required : false}
            tooltip={labelTooltip}
            compact={!isEditing || compact}
            testId="field-label"
            overrideTestId
          />
        )}
        <FlexColumnLayout
          gap={0}
          fill="row"
          className={styles.wrapper}
          ref={wrapperRef}
          testId="form-table-field"
          overrideTestId
        >
          <FormTableFieldContent
            {...props}
            scrollerId={scrollerId}
            ref={contentRefs}
            isEmpty={isEmpty}
          />
          {isEmpty ? (
            <FormTableFieldEmptyState EmptyCard={EmptyCard} />
          ) : (
            <FormTableFieldScrollbars
              scrollerId={scrollerId}
              contentRefs={contentRefs}
            />
          )}
          <FormTableFieldFooter {...props} />
        </FlexColumnLayout>
        {tableAssistiveText.shouldDisplay && isEditing && (
          <InputAssistiveText
            assistiveText={tableAssistiveText.assistiveText}
            errorText={errorText}
            error={error}
            testId="field-assistive-text"
            overrideTestId
          />
        )}
      </FlexColumnLayout>
    </FormFieldGridItem>
  );
}
