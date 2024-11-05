import {
  isArray,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  objectKeys,
  type DeepKeyOf,
  type DeepValueOf,
  type KeyOf,
  type NullishPrimitives,
  type Optional,
  type ValueMap,
  type VoidFn,
} from "@ubloimmo/front-util";
import { type FC } from "react";
import {
  ZodNull,
  ZodNullable,
  ZodOptional,
  ZodUnion,
  type ZodIssueCode,
  type ZodType,
} from "zod";

import type {
  BuiltFieldProps,
  BuiltFormContent,
  BuiltFormCustomFieldProps,
  BuiltFormFeatureSwitchProps,
  BuiltFormTableProps,
  BuiltFormTextProps,
  CustomFormInputProps,
  FormContent,
  FormCustomContentProps,
  FormCustomFieldProps,
  FormDividerProps,
  FormError,
  FormFeatureSwitchProps,
  FormFieldProps,
  FormSchema,
  FormSource,
  FormTableProps,
  FormTextProps,
  StableFormTableId,
} from "./Form.types";
import type { InputType } from "@/components/Input";
import type { TranslationContext } from "@utils";

/**
 * Checks if the given key is a valid array index key.
 *
 * @param {string | number | `${number}`} key - The key to check.
 * @return {key is `${number} | number`} Returns `true` if the key is a valid array index key, otherwise `false`.
 */
const isArrayIndexKey = (
  key: string | number | `${number}`
): key is `${number}` | number => {
  if (isNumber(key)) return true;
  const n = parseInt(key as `${number}`);
  if (isNaN(n)) return false;
  return n.toString() === key;
};

/**
 * Sets a value in an object at a given key path using recursion.
 *
 * @remarks Does not mutate the original object but operateds on a copy.
 *
 * @template {object} TObject - The type of the object.
 * @template {DeepKeyof<TObject>} TKey - The type of the key.
 * @template {DeepValueOf<TObject, TKey>} TValue - The type of the value.
 * @param {TObject} object - The object to modify.
 * @param {TKey} key - The key path to set the value at.
 * @param {Optional<TValue>} value - The value to set.
 * @param {VoidFn<[unknown]>} [warn=() => {}] - A warning function to call if the object is not an object or the key is not a string.
 * @return {TObject} - The modified object.
 */
export const setObjectValue = <
  TObject extends object,
  TKey extends DeepKeyOf<TObject>,
  TValue extends DeepValueOf<TObject, TKey>
>(
  object: TObject,
  key: TKey,
  value: Optional<TValue>,
  warn: VoidFn<[unknown]> = () => {}
): TObject => {
  if (!isObject(object)) {
    warn("object must be an object");
    return object;
  }
  const copy = (isArray(object) ? [...object] : { ...object }) as TObject;

  /**
   * Handle direct values for objects and arrays, either:
   * - direct keys
   * - tail keys
   */
  if (key in copy) {
    const directKey = key as KeyOf<TObject>;
    const directValue = value as TObject[typeof directKey];

    copy[directKey] = directValue;
    return copy;
  }

  if (!isString(key)) {
    warn(`Non-array direct key (${key}) must be a string`);
    return object as TObject;
  }

  const [head, ...tails] = key.split(".");

  const assignHead = (v: unknown): TObject => {
    const directKey = head as KeyOf<TObject>;
    const directValue = v as TObject[typeof directKey];

    copy[directKey] = directValue;
    return copy;
  };

  if (!tails.length) return assignHead(value);

  // target nested object or created one if missing
  const nestedObject =
    object[head as KeyOf<TObject>] ?? (isArrayIndexKey(head) ? [] : {});

  if (!isObject(nestedObject)) {
    warn(
      `object[${head}] is not an object but path still contains remaining key(s): ${tails.join(
        "."
      )}`
    );
    return object;
  }
  const tail = tails.join(".") as DeepKeyOf<typeof nestedObject>;

  return assignHead(setObjectValue(nestedObject, tail, value, warn));
};

/**
 * Checks if a field in the given schema is optional.
 *
 * @param {ZodType} schema - The schema to check.
 * @return {boolean} Returns true if the schema is optional, false otherwise.
 */
const isSchemaOptional = (schema: ZodType) => {
  if (!schema) return true;
  if (schema instanceof ZodUnion) {
    return schema.options.some((option: ZodType) => isSchemaOptional(option));
  }
  const typeName: string =
    "_def" in schema &&
    "typeName" in schema._def &&
    isString(schema._def.typeName)
      ? schema._def.typeName
      : "";
  return (
    schema instanceof ZodOptional ||
    schema instanceof ZodNullable ||
    schema instanceof ZodNull ||
    typeName.includes("ZodOptional") ||
    typeName.includes("ZodNullable") ||
    typeName.includes("ZodNull")
  );
};

/**
 * Checks if a field in the given schema is required.
 *
 * @remarks Handles object as well as array schemas.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormSchema<TData> | ZodType} schema - The schema to check.
 * @param {FormSource<NoInfer<TData>> | string} key - The key of the field to check.
 * @return {boolean} Returns true if the field is required, false otherwise.
 */
export const isSchemaFieldRequired = <TData extends object>(
  schema: FormSchema<TData> | ZodType,
  key: FormSource<NoInfer<TData>> | string
): boolean => {
  if (isNumber(key)) {
    key = `${key}` as DeepKeyOf<TData> & string;
  }
  const [head, ...tails] = key.split(".") as [
    KeyOf<TData>,
    ...DeepKeyOf<TData[KeyOf<TData>]>[]
  ];

  if (isSchemaOptional(schema)) {
    return false;
  }

  if ("shape" in schema) {
    if (!tails.length && schema.shape[head]) {
      return !isSchemaOptional(schema.shape[head]);
    }
    const tail = tails.join(".");
    return isSchemaFieldRequired(
      schema.shape[head] as unknown as ZodType,
      tail
    );
  }

  if ("element" in schema && (isNumber(head) || isNumber(parseInt(head)))) {
    if (!tails.length)
      return !isSchemaOptional(schema.element as unknown as ZodType);
    const tail = tails.join(".");
    return isSchemaFieldRequired(schema.element as unknown as ZodType, tail);
  }

  return false;
};

/**
 * Determines if the given `fieldOrDivider` is a {@link FormDividerProps} type.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData, InputType> | BuiltFormContent<InputType>} content - The object to check.
 * @return {content is FormDividerProps} Returns `true` if `fieldOrDivider` is a `FormDividerProps`, otherwise `false`.
 */
export const isFormDivider = <TData extends object>(
  content: FormContent<TData> | BuiltFormContent<InputType>
): content is FormDividerProps => {
  if (isString(content) && content === "divider") return true;
  if (
    isFormText(content) ||
    isBuiltFormText(content) ||
    isFormCustomContent(content) ||
    isBuiltFormTable(content) ||
    isFormTable(content)
  )
    return false;
  const keys = objectKeys(content);
  if (keys.length === 0) return true;
  if (
    keys.length === 1 &&
    keys[0] === "label" &&
    (isString(content.label) || isNull(content.label))
  )
    return true;
  return false;
};

/**
 * Checks if the given `content` is a `FormCustomContentProps` object.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData, InputType> | BuiltFormContent<InputType>} content - The content to check.
 * @return {content is FormCustomContentProps} - `true` if `content` is a `FormCustomContentProps` object, `false` otherwise.
 */
export const isFormCustomContent = <TData extends object>(
  content: FormContent<TData> | BuiltFormContent<InputType>
): content is FormCustomContentProps => {
  if (isFunction<FC>(content)) return true;
  return (
    isObject(content) &&
    "kind" in content &&
    content.kind === "content" &&
    "content" in content
  );
};

/**
 * Determines if the given `content` is a `FormCustomFieldProps` type.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData>} content - The object to check.
 * @return {content is FormCustomFieldProps<TData>} Returns `true` if `fieldOrDivider` is a `FormCustomFieldProps`, otherwise `false`.
 */
export const isFormCustomField = <TData extends object>(
  content: FormContent<TData>
): content is FormCustomFieldProps<TData> => {
  if (
    isFormDivider(content) ||
    isFormText(content) ||
    isFormCustomContent(content)
  )
    return false;
  return (
    isObject(content) &&
    "kind" in content &&
    content.kind === "custom-field" &&
    "source" in content &&
    isString(content.source) &&
    "CustomInput" in content &&
    isFunction(content.CustomInput)
  );
};

/**
 * Determines if the given `content` is a `FormFieldProps` type.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData>} content - The object to check.
 * @return {content is FormFieldProps<TData>} Returns `true` if `content` is a `FormFieldProps`, otherwise `false`.
 */
export const isFormField = <TData extends object>(
  content: FormContent<TData>
): content is FormFieldProps<TData> => {
  if (
    isFormDivider(content) ||
    isFormText(content) ||
    isFormCustomContent(content) ||
    isFormCustomField(content) ||
    isFormFeatureSwitch(content)
  )
    return false;
  return (
    isObject(content) &&
    "type" in content &&
    "source" in content &&
    "label" in content
  );
};

/**
 * Checks if the given `contentOrText` is a `FormTextProps` object.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData> | BuiltFormContent<InputType>} content - The content or text to check.
 * @return {contentOrText is FormTextProps} - `true` if `contentOrText` is a `FormTextProps` object, `false` otherwise.
 */
export const isFormText = <TData extends object>(
  content: FormContent<TData> | BuiltFormContent<InputType>
): content is FormTextProps => {
  return (
    isObject(content) &&
    "kind" in content &&
    content.kind === "text" &&
    "content" in content
  );
};

/**
 * Checks if the given `content` is a `FormTableProps` object.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData>} content - The content to check.
 * @return {content is FormTableProps<TData>} - `true` if `content` is a `FormTableProps` object, `false` otherwise.
 */
export const isFormTable = <TData extends object>(
  content: FormContent<TData>
): content is FormTableProps<TData> => {
  return (
    isObject(content) &&
    "columns" in content &&
    isArray(content.columns) &&
    "kind" in content &&
    content.kind === "table" &&
    "source" in content &&
    isString(content.source)
  );
};

export const isFormFeatureSwitch = <TData extends object>(
  content: FormContent<TData>
): content is FormFeatureSwitchProps<TData> => {
  if (
    isFormCustomContent(content) ||
    isFormCustomField(content) ||
    isFormText(content) ||
    isFormDivider(content)
  )
    return false;
  return (
    isObject(content) &&
    "variant" in content &&
    isString(content.variant) &&
    "kind" in content &&
    "source" in content &&
    isString("source") &&
    isString(content.kind) &&
    (content as unknown as { kind: string }).kind === "feature-switch"
  );
};

/**
 * Checks if the given `content` is a `BuiltFormTableProps` object.
 *
 * @param {BuiltFormContent<InputType>} content - The content to check.
 * @return {content is BuiltFormTableProps} - `true` if `content` is a `BuiltFormTableProps` object, `false` otherwise.
 */
export const isBuiltFormTable = (
  content: BuiltFormContent<InputType>
): content is BuiltFormTableProps => {
  return (
    isObject(content) &&
    "headers" in content &&
    isArray(content.headers) &&
    "kind" in content &&
    content.kind === "table" &&
    "rows" in content &&
    isArray(content.rows)
  );
};

/**
 * Checks if the given `contentOrText` is a `BuiltFormTextProps` object.
 *
 * @param {FormContent<TData> | BuiltFormContent<InputType>} contentOrText - The content or text to check.
 * @returns {contentOrText is BuiltFormTextProps} - `true` if `contentOrText` is a `BuiltFormTextProps` object, `false` otherwise.
 */
export const isBuiltFormText = <TData extends object>(
  content: FormContent<TData> | BuiltFormContent<InputType>
): content is BuiltFormTextProps => {
  return (
    isObject(content) &&
    "kind" in content &&
    content.kind === "text" &&
    "children" in content
  );
};

/**
 * Checks if the given `content` is a built form field.
 *
 * @template {InputType} TType - The type of the input.
 *
 * @param {BuiltFormContent<TType>} content - The object to check.
 * @return {content is BuiltFieldProps<TType>} Returns `true` if `fieldOrDivider` is a built form field, otherwise `false`.
 */
export const isBuiltFormField = <TType extends InputType>(
  content: BuiltFormContent<TType>
): content is BuiltFieldProps<TType> => {
  return (
    !isFormDivider(content) &&
    !isBuiltFormText(content) &&
    !isFormCustomContent(content) &&
    !isBuiltCustomFormField(content) &&
    !isBuiltFormTable(content) &&
    !isBuiltFormFeatureSwitch(content)
  );
};

/**
 * Checks if the given `content` is a `BuiltFormCustomFieldProps` object.
 *
 * @param {BuiltFormContent<InputType>} content - The content to check.
 * @returns {content is BuiltFormCustomFieldProps} - `true` if `content` is a `BuiltFormCustomFieldProps` object, `false` otherwise.
 */
export const isBuiltCustomFormField = (
  content: BuiltFormContent<InputType>
): content is BuiltFormCustomFieldProps => {
  return (
    isObject(content) &&
    "CustomInput" in content &&
    !("source" in content) &&
    isFunction<FC<CustomFormInputProps<NullishPrimitives>>>(content.CustomInput)
  );
};

export const isBuiltFormFeatureSwitch = (
  content: BuiltFormContent<InputType>
): content is BuiltFormFeatureSwitchProps => {
  return (
    isObject(content) && "kind" in content && content.kind === "feature-switch"
  );
};

/**
 * Builds a `BuiltFormTextProps` object from a `FormTextProps` object.
 *
 * @param {FormTextProps} formText - The input `FormTextProps` object.
 * @return {BuiltFormTextProps} The resulting `BuiltFormTextProps` object.
 */
export const buildFormText = (formText: FormTextProps): BuiltFormTextProps => {
  const { kind, content, ...rest } = formText;
  return {
    ...rest,
    kind,
    children: content,
  };
};

/**
 * Builds a stable table id from a table's source and its index in the form content array.
 *
 * @param {string} tableSource - The table's source.
 * @param {number} contentIndex - The table's index in the form content array.
 * @return {StableFormTableId} The stable table id.
 */
export const builtFormTableId = (
  tableSource: string,
  contentIndex: number
): StableFormTableId => `${tableSource}-${contentIndex}`;

const zodIssueTranslationMap: ValueMap<
  Exclude<ZodIssueCode, "custom">,
  KeyOf<TranslationContext["validation"]>
> = {
  invalid_arguments: "invalid",
  invalid_date: "invalid",
  invalid_enum_value: "notAllowed",
  invalid_intersection_types: "notAllowed",
  invalid_literal: "notAllowed",
  invalid_return_type: "invalid",
  invalid_string: "patternMismatch",
  invalid_type: "typeMismatch",
  invalid_union: "typeMismatch",
  invalid_union_discriminator: "typeMismatch",
  not_finite: "patternMismatch",
  not_multiple_of: "patternMismatch",
  too_big: "tooBig",
  too_small: "tooSmall",
  unrecognized_keys: "notAllowed",
};

/**
 * Translates a FormError into a localized error message.
 *
 * @param {FormError} error - The form error to translate.
 * @param {TranslationContext} tl - The translation context.
 * @return {string} The localized error message.
 */
export const formErrorTranslation = (
  error: FormError,
  tl: TranslationContext
): string => {
  if (error.code === "custom") return error.message;
  return tl.validation[zodIssueTranslationMap[error.code]]();
};
