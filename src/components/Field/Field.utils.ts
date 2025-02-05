import { isFunction, isNullish, objectEntries } from "@ubloimmo/front-util";
import { useMemo, useReducer } from "react";

import { useUikitTranslation, type TranslationKey } from "@utils";

import type {
  FieldAssistiveTextFn,
  FieldAssistiveTextProps,
  FieldDefaultProps,
} from "./Field.types";
import type { InputType } from "../Input";
import type { Nullable, ValueMap } from "@ubloimmo/front-util";

type ValidityStateKey = keyof ValidityState;
type InvalidStateKey = Exclude<ValidityStateKey, "valid" | "customError">;
/**
 * Conversion type to be able to use objectEntries on validityState
 */
export type ValidityStateRecord = Record<ValidityStateKey, boolean>;

const invalidErrorMessages: ValueMap<
  InvalidStateKey,
  TranslationKey<"validation">
> = {
  valueMissing: "missing",
  badInput: "badInput",
  patternMismatch: "patternMismatch",
  tooLong: "tooLong",
  tooShort: "tooShort",
  rangeOverflow: "tooHigh",
  rangeUnderflow: "tooLow",
  stepMismatch: "stepMismatch",
  typeMismatch: "typeMismatch",
} as const;

/**
 * Converts a ValidityState object into a ValidityStateRecord
 * @param {ValidityState} validityState - The ValidityState object to convert
 * @returns {ValidityStateRecord} A record containing all validity state flags
 */
export const constructValidityStateRecord = (
  validityState: ValidityState
): ValidityStateRecord => {
  return {
    badInput: validityState.badInput,
    customError: validityState.customError,
    patternMismatch: validityState.patternMismatch,
    rangeOverflow: validityState.rangeOverflow,
    rangeUnderflow: validityState.rangeUnderflow,
    stepMismatch: validityState.stepMismatch,
    tooLong: validityState.tooLong,
    tooShort: validityState.tooShort,
    typeMismatch: validityState.typeMismatch,
    valid: validityState.valid,
    valueMissing: validityState.valueMissing,
  };
};

/**
 * Custom hook that manages the validity state of a field
 * @param {FieldDefaultProps<InputType>} mergedProps - The merged props for the field
 * @returns {Object} An object containing the validity state and a function to set it
 */
export const useFieldValidity = (mergedProps: FieldDefaultProps<InputType>) => {
  const [validityState, setValidityState] = useReducer(
    (
      _prevState: Nullable<ValidityStateRecord>,
      rootState: Nullable<ValidityState>
    ): Nullable<ValidityStateRecord> => {
      if (!rootState) return null;
      return constructValidityStateRecord(rootState);
    },
    null
  );

  /**
   * Determines the invalid state key based on the validity state
   * @returns {Nullable<ValidityStateKey>} The invalid state key or null if valid
   */
  const invalidState = useMemo<Nullable<ValidityStateKey>>(() => {
    if (!validityState) return null;
    const stateKey = (objectEntries(validityState).find(
      ([_key, flag]) => flag
    ) ?? ["valid", true])[0];
    if (stateKey === "valid") return null;
    return stateKey;
  }, [validityState]);

  /**
   * Determines if the field has an error based on the merged props and validity state
   * @returns {boolean} True if the field has an error, false otherwise
   */
  const error = useMemo<boolean>(() => {
    return mergedProps.error || !!invalidState;
  }, [mergedProps, invalidState]);

  const tl = useUikitTranslation();

  /**
   * Determines the error text translatio to display based on the invalid state
   * @returns {Nullable<string>} The error text or null if no error
   */
  const errorText = useMemo<Nullable<string>>(() => {
    if (
      !invalidState ||
      invalidState === "valid" ||
      invalidState === "customError"
    )
      return mergedProps.errorText;
    const translationKey = invalidErrorMessages[invalidState];
    return tl.validation[translationKey]();
  }, [mergedProps, invalidState, tl.validation]);

  return {
    error,
    errorText,
    setValidityState,
    validityState,
  };
};

/**
 * Custom hook that computes a field's assistive text based on its props and current value
 *
 * @param {FieldAssistiveTextProps} props - The field's assistive text props
 * @param {unknown} value - The field's current value
 * @returns {{assistiveText: Nullable<string>, shouldDisplay: boolean}} The computed assistive text or null if none, and a boolean to determine whether to display the assistive text
 */
export const useFieldAssistiveText = (
  { assistiveText, errorText, error }: FieldAssistiveTextProps,
  value: unknown
) => {
  const text = useMemo<Nullable<string>>(() => {
    if (isNullish(assistiveText)) return null;
    if (isFunction<FieldAssistiveTextFn>(assistiveText)) {
      return assistiveText(value);
    }
    return assistiveText;
  }, [assistiveText, value]);

  const shouldDisplay = useMemo(() => {
    return !!(text || (errorText && error));
  }, [text, errorText, error]);
  return {
    assistiveText: text,
    shouldDisplay,
  };
};
