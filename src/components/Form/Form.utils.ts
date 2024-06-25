import {
  isArray,
  isNull,
  isNumber,
  isObject,
  isString,
  objectKeys,
  type DeepKeyOf,
  type DeepValueOf,
  type KeyOf,
  type Optional,
  type VoidFn,
} from "@ubloimmo/front-util";
import { ZodNullable, ZodOptional, ZodUnion, type ZodType } from "zod";

import type { InputType } from "@components";

import type {
  BuiltFieldProps,
  BuiltFormContent,
  FormContent,
  FormDividerProps,
  FormSchema,
  FormSource,
} from "./Form.types";

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
  if (schema instanceof ZodUnion) {
    return schema.options.some((option: ZodType) => isSchemaOptional(option));
  }
  return schema instanceof ZodOptional || schema instanceof ZodNullable;
};

/**
 * Checks if a field in the given schema is required.
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

  if (!("shape" in schema)) return false;

  if (!tails.length && schema.shape[head]) {
    return !isSchemaOptional(schema.shape[head]);
  }

  const tail = tails.join(".");
  return isSchemaFieldRequired(schema.shape[head] as unknown as ZodType, tail);
};

/**
 * Determines if the given `fieldOrDivider` is a {@link FormDividerProps} type.
 *
 * @template {object} TData - The type of the form data.
 *
 * @param {FormContent<TData, InputType> | BuiltFormContent<InputType>} fieldOrDivider - The object to check.
 * @return {boolean} Returns `true` if `fieldOrDivider` is a `FormDividerProps`, otherwise `false`.
 */
export const isFormDivider = <TData extends object>(
  fieldOrDivider: FormContent<TData> | BuiltFormContent<InputType>
): fieldOrDivider is FormDividerProps => {
  if (isString(fieldOrDivider) && fieldOrDivider === "divider") return true;
  const keys = objectKeys(fieldOrDivider);
  if (keys.length === 0) return true;
  if (
    keys.length === 1 &&
    keys[0] === "label" &&
    (isString(fieldOrDivider.label) || isNull(fieldOrDivider.label))
  )
    return true;
  return false;
};

/**
 * Checks if the given `fieldOrDivider` is a built form field.
 *
 * @template {InputType} TType - The type of the input.
 *
 * @param {BuiltFormContent<TType>} fieldOrDivider - The object to check.
 * @return {fieldOrDivider is BuiltFieldProps<TType>} Returns `true` if `fieldOrDivider` is a built form field, otherwise `false`.
 */
export const isBuiltFormField = <TType extends InputType>(
  fieldOrDivider: BuiltFormContent<TType>
): fieldOrDivider is BuiltFieldProps<TType> => {
  if (isFormDivider(fieldOrDivider)) return false;
  return true;
};
