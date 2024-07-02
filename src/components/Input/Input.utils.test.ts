import { describe, expect, mock } from "bun:test";

import { testHookFactory } from "../../tests";

import {
  NativeInputOnChangeFn,
  useInputControlCallback,
  useInputOnChange,
  useInputStyles,
  useInputValue,
} from ".";

import type {
  DefaultCommonInputProps,
  InputType,
  InputValue,
} from "./Input.types";
import type { Nullable, Optional } from "@ubloimmo/front-util";
import type { ChangeEvent, MutableRefObject } from "react";

const mockOnChange = mock((_value: Nullable<InputValue<InputType>>) => {});
const mockOnChangeNative = mock<NativeInputOnChangeFn>((_event) => {});

const mockEvent = {
  target: { value: "test" },
} as ChangeEvent<HTMLInputElement>;

const testUseInputOnChange = () => {
  type Hook = typeof useInputOnChange;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputOnChange",
    useInputOnChange,
    {
      params: [() => true, () => "test", () => {}, () => {}],
      tests: [
        {
          name: "should return a function",
          test: (result) => expect(result).toBeFunction(),
        },
      ],
    }
  );
  const mockTransformer = mock((value: Optional<string | number>) =>
    String(value)
  );

  testHook(
    () => false,
    () => null,
    mockOnChange,
    mockOnChangeNative
  )("should never call onChange but call condition", (cb) => {
    cb(mockEvent);
    expect(mockTransformer).not.toHaveBeenCalled();
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(mockOnChangeNative).toHaveBeenCalledWith(mockEvent);

    mockTransformer.mockReset();
    mockOnChange.mockReset();
    mockOnChangeNative.mockReset();
  });

  testHook(
    () => true,
    mockTransformer,
    mockOnChange,
    mockOnChangeNative
  )("should call onChange & transformer", (cb) => {
    cb(mockEvent);
    expect(mockTransformer).toHaveBeenCalledWith(mockEvent.target.value);
    expect(mockOnChange).toHaveBeenCalledWith(
      mockTransformer(mockEvent.target.value)
    );
    expect(mockOnChangeNative).toHaveBeenCalledWith(mockEvent);

    mockTransformer.mockReset();
    mockOnChange.mockReset();
    mockOnChangeNative.mockReset();
  });
};

const testUseInputValue = () => {
  type Hook = typeof useInputValue;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputValue",
    useInputValue
  );

  testHook(null)("should return an empty string", (value) => {
    expect(value).toBe("");
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

const inputProps: DefaultCommonInputProps = {
  error: true,
  disabled: true,
  required: true,
  table: true,
  placeholder: "test",
  inputRef: null,
  onChangeNative: null,
  onBlur: null,
};

const testUseInputStyles = () => {
  type Hook = typeof useInputStyles;
  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputStyles",
    useInputStyles,
    {
      params: [inputProps],
      tests: [
        {
          name: "should return an object",
          test: (result) => expect(result).toBeObject(),
        },
      ],
    }
  );

  testHook(inputProps)("should transform input style props", (styles) => {
    expect(styles).toEqual({
      $error: true,
      $disabled: true,
      $required: true,
      $table: true,
      $placeholder: "test",
    });
  });
};

const testUseInputControlCallback = () => {
  type Hook = typeof useInputControlCallback;
  const fakeNoInputRef: MutableRefObject<Nullable<HTMLInputElement>> = {
    current: null,
  };
  const fakeInputRef: MutableRefObject<Nullable<HTMLInputElement>> = {
    current: {
      focus: mock(() => {}),
    } as unknown as HTMLInputElement,
  };

  const callback = mock(() => {});

  const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
    "useInputControlCallback",
    useInputControlCallback,
    {
      params: [fakeNoInputRef, inputProps, callback],
      tests: [
        {
          name: "should return a function",
          test: (result) => expect(result).toBeFunction(),
        },
      ],
    }
  );

  testHook(
    fakeNoInputRef,
    inputProps,
    callback
  )("should call callback when called", (result, [_, __, cb]) => {
    result();
    cb();
    expect(callback).toHaveBeenCalled();
  });

  testHook(
    fakeInputRef,
    inputProps,
    callback
  )("should focus input", (result, [_, __, cb]) => {
    result();
    cb();
    expect(cb).toHaveBeenCalled();
  });
};

describe("Input", () => {
  describe("utils", () => {
    testUseInputOnChange();
    testUseInputValue();
    testUseInputStyles();
    testUseInputControlCallback();
  });
});
