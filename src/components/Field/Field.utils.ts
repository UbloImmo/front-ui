import { objectEntries } from "@ubloimmo/front-util";
import { useMemo, useReducer } from "react";

import type { FieldDefaultProps } from "./Field.types";
import type { InputType } from "../Input";
import type { Nullable, ValueMap } from "@ubloimmo/front-util";

type ValidityStateKey = keyof ValidityState;
type InvalidStateKey = Exclude<ValidityStateKey, "valid" | "customError">;
/**
 * Conversion type to be able to use objectEntries on validityState
 */
export type ValidityStateRecord = Record<ValidityStateKey, boolean>;

const invalidErrorMessages: ValueMap<InvalidStateKey, string> = {
  valueMissing: "Value is required",
  badInput: "Unable to make sense of value",
  patternMismatch: "Value does not respect the required format",
  tooLong: "Value is too long",
  tooShort: "Value is too short",
  rangeOverflow: "Value is too large",
  rangeUnderflow: "Value is too small",
  stepMismatch: "Value does not respect the required step",
  typeMismatch: "Value does not respect the required type",
} as const;

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

  const invalidState = useMemo<Nullable<ValidityStateKey>>(() => {
    if (!validityState) return null;
    const stateKey = (objectEntries(validityState).find(([_key, flag]) => {
      return flag;
    }) ?? ["valid", true])[0];
    if (stateKey === "valid") return null;
    return stateKey;
  }, [validityState]);

  const error = useMemo<boolean>(() => {
    return mergedProps.error || !!invalidState;
  }, [mergedProps, invalidState]);

  const errorText = useMemo<Nullable<string>>(() => {
    if (
      !invalidState ||
      invalidState === "valid" ||
      invalidState === "customError"
    )
      return mergedProps.errorText;
    return invalidErrorMessages[invalidState];
  }, [mergedProps, invalidState]);

  return {
    error,
    errorText,
    setValidityState,
    validityState,
  };
};
