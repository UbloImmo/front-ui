import type {
  DefaultCommonInputProps,
  InputType,
  InputValue,
} from "./Input.types";
import type { Nullable, Optional } from "@ubloimmo/front-util";
import type { ChangeEvent, MutableRefObject } from "react";
import { describe, expect, mock } from "bun:test";
import { testHookFactory } from "../../tests";
import {
  useInputOnChange,
  useInputValue,
  useInputStyles,
  useInputControlCallback,
} from ".";

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

const inputProps: DefaultCommonInputProps = {
  error: true,
  disabled: true,
  placeholder: "test",
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
