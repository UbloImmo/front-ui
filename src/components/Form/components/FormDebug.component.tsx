import { isString, type Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";
import styled from "styled-components";

import { useFormContext } from "../Form.context";
import { formDebugPreStyles, formDebugContainerStyles } from "../Form.styles";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { GridLayout, GridItem, type GridItemProps } from "@layouts";
import { arrayOf } from "@utils";

import type { FormDebugPreStyleProps } from "../Form.types";
import type { PaletteColor, ColorKey } from "@types";

/**
 * Memoizes and transforms form debug information for rendering in a debug panel.
 *
 * @return {Nullable<JSX.Element>} The debug information stringified with specific transformations.
 */
export const FormDebug = (): Nullable<JSX.Element> => {
  const {
    debug,
    schema,
    data,
    initialData,
    isEditing,
    readonly,
    isLoading,
    validateOnBlur,
    validateOnChange,
    validateOnSubmit,
  } = useFormContext();

  const isDataDifferent = useMemo(
    () => JSON.stringify(data) !== JSON.stringify(initialData),
    [data, initialData]
  );

  const validationDisabled = useMemo(
    () =>
      !schema || (!validateOnBlur && !validateOnChange && !validateOnSubmit),
    [schema, validateOnBlur, validateOnChange, validateOnSubmit]
  );

  const validation = useMemo(() => {
    if (!schema) return "Disabled (no schema)";

    const options: string[] = [];
    if (validateOnBlur) options.push("on blur");
    if (validateOnChange) options.push("on change");
    if (validateOnSubmit) options.push("on submit");

    if (validationDisabled) return "Disabled explicitly";
    return options;
  }, [
    schema,
    validateOnBlur,
    validateOnChange,
    validateOnSubmit,
    validationDisabled,
  ]);

  if (!debug) return null;

  return (
    <DebugContainer
      columns={4}
      rows={arrayOf(6, (): "auto" => "auto")}
      gap="s-3"
    >
      <DebugBlock
        label="Mode"
        content={readonly ? "Read only" : isEditing ? "Edit" : "Display"}
        column="4 / span 1"
        row="1 / span 1"
        color={readonly ? "warning" : "primary"}
      />
      <DebugBlock
        label="Initial data fetch"
        content={isLoading ? "Loading" : "Loaded"}
        color={isLoading ? "pending" : "success"}
        column="3 / span 1"
        row="1 / span 1"
      />
      <DebugBlock
        label="Schema"
        content={schema ? "Provided" : "Missing"}
        color={schema ? "success" : "warning"}
        column="3 / span 1"
        row="2 / span 1"
      />

      <DebugBlock
        label="Validation"
        content={validation}
        color={validationDisabled ? "warning" : "pending"}
        column="4 / span 1"
        row="2 / span 1"
      />
      <DebugBlock
        label="Mode"
        content={readonly ? "Read only" : isEditing ? "Edit" : "Display"}
        column="4 / span 1"
        row="1 / span 1"
        color="primary"
      />
      <DebugBlock
        label={`Active Data (${isDataDifferent ? "Edited" : "Untouched"})`}
        content={data}
        color={isDataDifferent ? "warning" : "pending"}
        column="1 / span 2"
        row="auto / span 2"
        align="start"
        justify="start"
        open
      />
      <DebugBlock
        label="Initial Data"
        content={data}
        column="1 / span 2"
        row="auto / span 2"
        align="start"
        justify="start"
        color="primary"
      />
      <DebugErrorsBlock column="3 / span 2" row="auto / span 2" />
    </DebugContainer>
  );
};

const DebugErrorsBlock = (layout: GridItemProps) => {
  const { errors } = useFormContext();

  const label = useMemo(() => `Errors (${errors.length})`, [errors]);

  if (!errors.length)
    return (
      <DebugBlock
        label="Valid"
        content="No errors"
        color="success"
        {...layout}
      />
    );

  return (
    <DebugBlockParentContainer fill {...layout}>
      <DebugPre $color="error">
        <details>
          <summary>
            <Heading size="h4" weight="medium" color="error-base">
              {label}
            </Heading>
          </summary>
          {errors.map(({ path, ...error }, index) => (
            <DebugBlock
              key={`${path}-${index}`}
              label={`${path} (${error.code})`}
              content={error}
              color="error"
            />
          ))}
        </details>
      </DebugPre>
    </DebugBlockParentContainer>
  );
};

type DebugBlockProps = Omit<GridItemProps, "children"> & {
  label: string;
  content: object | string;
  color?: ColorKey;
  open?: boolean;
};

const DebugBlock = ({
  label,
  content,
  color = "warning",
  open,
  ...layout
}: DebugBlockProps) => {
  const debugInfo = useMemo(() => {
    if (isString(content)) return `"${content}"`;
    return JSON.stringify(content, undefined, 2).replaceAll(
      /"(\S+)":\s/g,
      "$1: "
    );
  }, [content]);

  const headingColor = useMemo<PaletteColor>(
    () => `${color}-base` as PaletteColor,
    [color]
  );

  return (
    <GridItem fill {...layout}>
      <DebugPre $color={color}>
        <details open={open}>
          <summary>
            <Heading size="h4" weight="medium" color={headingColor}>
              {label}
            </Heading>
          </summary>

          <Text size="s">
            <code>{debugInfo}</code>
          </Text>
        </details>
      </DebugPre>
    </GridItem>
  );
};

const DebugContainer = styled(GridLayout)`
  ${formDebugContainerStyles}
`;

const DebugPre = styled.pre<FormDebugPreStyleProps>`
  ${formDebugPreStyles}
`;

const DebugBlockParentContainer = styled(GridItem)`
  max-height: 100%;
  overflow: auto;
`;
