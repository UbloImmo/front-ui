import { describe, expect, mock } from "bun:test";
import { testHookFactory } from "../../tests";
import {
  InputType,
  useInputOnChange,
  type InputValue,
  useInputValue,
  useInputStyles,
} from ".";
import type { Nullable, Optional } from "@ubloimmo/front-util";
import type { ChangeEvent } from "react";

const mockOnChange = mock((_value: Nullable<InputValue<InputType>>) => {});

const testUseInputOnChange = () => {
  type Hook = typeof useInputOnChange;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputOnChange",
    useInputOnChange,
    {
      params: [() => true, () => "test"],
      tests: [
        {
          name: "should return a function",
          test: (result) => expect(result).toBeFunction(),
        },
      ],
    }
  );

  testHook(
    () => false,
    () => null,
    mockOnChange
  )("should never call onChange but call condition", (cb) => {
    cb({ target: { value: "test" } } as ChangeEvent<HTMLInputElement>);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  const mockTransformer = mock((value: Optional<string | number>) =>
    String(value)
  );

  testHook(
    () => true,
    mockTransformer,
    mockOnChange
  )("should call onChange & transformer", (cb) => {
    cb({ target: { value: "test" } } as ChangeEvent<HTMLInputElement>);
    expect(mockTransformer).toHaveBeenCalledWith("test");
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });
};

const testUseInputValue = () => {
  type Hook = typeof useInputValue;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputValue",
    useInputValue
  );

  testHook(null)("should return undefined", (value) => {
    expect(value).toBeUndefined();
  });

  testHook("test")("should return string", (value) =>
    expect(value).toBeString()
  );

  testHook(123)("should return number", (value) => expect(value).toBeNumber());

  const mockTransformer = mock(
    (_value: Nullable<InputValue<InputType>>) => "transformed"
  );

  testHook("test", mockTransformer)(
    "should return transformed value",
    (value) => {
      expect(value).toBe("transformed");
      expect(mockTransformer).toHaveBeenCalledWith("test");
    }
  );
};

const testUseInputStyles = () => {
  type Hook = typeof useInputStyles;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputStyles",
    useInputStyles,
    {
      params: [{ error: true, disabled: true, placeholder: "test" }],
      tests: [
        {
          name: "should return an object",
          test: (result) => expect(result).toBeObject(),
        },
      ],
    }
  );

  testHook({ error: true, disabled: true, placeholder: "test" })(
    "should transform input style props",
    (styles) => {
      expect(styles).toEqual({
        $error: true,
        $disabled: true,
        $placeholder: "test",
      });
    }
  );
};

describe("Input", () => {
  describe("utils", () => {
    testUseInputOnChange();
    testUseInputValue();
    testUseInputStyles();
  });
});
