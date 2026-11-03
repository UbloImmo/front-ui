import { fireEvent } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, mock, spyOn } from "bun:test";

import { TimeInput } from "./TimeInput.component";

import { testComponentFactory } from "@/tests";

describe("Input", () => {
  describe("TimeInput", () => {
    const testId = "input-time";
    const containerTestId = "input-time-container";
    const controlTestId = "input-control";
    const pickerTestId = "input-time-picker";
    const pickerItemTestId = "time-picker-item";

    const testTimeInput = testComponentFactory("TimeInput", TimeInput);

    const getItem = (
      items: HTMLElement[],
      type: "hour" | "minute",
      value: number
    ) => {
      const item = items.find(
        (item) =>
          item.dataset.type === type && item.dataset.value === String(value)
      );
      expect(item).toBeDefined();
      return item as HTMLElement;
    };

    const testDefaultProps = testTimeInput({});

    testDefaultProps("should render", ({ getByTestId }) => {
      expect(getByTestId(testId)).not.toBeNull();
      expect(getByTestId(containerTestId)).not.toBeNull();
      expect(getByTestId(controlTestId)).not.toBeNull();
    });

    testDefaultProps(
      "should be empty and closed by default",
      ({ getByTestId, queryByTestId }) => {
        expect((getByTestId(testId) as HTMLInputElement).value).toBe("");
        expect(queryByTestId(pickerTestId)).toBeNull();
      }
    );

    testDefaultProps(
      "should open the time picker in a popover",
      async ({ findByTestId }, { click }) => {
        await click(await findByTestId(controlTestId));
        expect(await findByTestId(pickerTestId)).not.toBeNull();
      }
    );

    testDefaultProps(
      "should open the time picker with the keyboard",
      async ({ findByTestId, queryByTestId }, { click, keyboard }) => {
        await click(await findByTestId(testId));
        expect(queryByTestId(pickerTestId)).toBeNull();
        await keyboard("{Enter}");
        expect(await findByTestId(pickerTestId)).not.toBeNull();
      }
    );

    testDefaultProps(
      "should close the time picker with escape",
      async ({ findByTestId, queryByTestId }, { click, keyboard }) => {
        await click(await findByTestId(testId));
        await keyboard("{Enter}");
        expect(await findByTestId(pickerTestId)).not.toBeNull();
        await keyboard("{Escape}");
        expect(queryByTestId(pickerTestId)).toBeNull();
      }
    );

    testTimeInput({ placeholder: "Pick a time", required: true })(
      "should forward placeholder and required",
      ({ getByTestId }) => {
        const input = getByTestId(testId) as HTMLInputElement;
        expect(input.placeholder).toBe("Pick a time");
        expect(input.required).toBeTrue();
      }
    );

    testTimeInput({ step: 15 })(
      "should convert the step to seconds",
      ({ getByTestId }) => {
        expect((getByTestId(testId) as HTMLInputElement).step).toBe("900");
      }
    );

    testTimeInput({ step: 0 })(
      "should clamp the step to at least a minute",
      ({ getByTestId }) => {
        expect((getByTestId(testId) as HTMLInputElement).step).toBe("60");
      }
    );

    testTimeInput({ step: 1000 })(
      "should clamp the step to at most an hour",
      ({ getByTestId }) => {
        expect((getByTestId(testId) as HTMLInputElement).step).toBe("3600");
      }
    );

    const testDisabled = testTimeInput({ disabled: true });

    testDisabled("should be disabled", ({ getByTestId }) => {
      expect((getByTestId(testId) as HTMLInputElement).disabled).toBeTrue();
    });

    testDisabled(
      "should not open the time picker",
      async ({ findByTestId, queryByTestId }, { click }) => {
        await click(await findByTestId(controlTestId));
        expect(queryByTestId(pickerTestId)).toBeNull();
      }
    );

    const testControlled = testTimeInput({ value: "09:30" });

    testControlled("should hold a value", ({ getByTestId }) => {
      expect((getByTestId(testId) as HTMLInputElement).value).toBe("09:30");
    });

    // the warning is logged while rendering, so the spy is cleared before each test
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    beforeEach(() => warn.mockClear());
    afterAll(() => warn.mockRestore());

    testControlled("should not warn for a valid value", ({ getByTestId }) => {
      expect((getByTestId(testId) as HTMLInputElement).value).toBe("09:30");
      expect(warn).not.toHaveBeenCalled();
    });

    testTimeInput({ value: "not a time" })(
      "should warn and stay empty for a non-time string",
      ({ getByTestId }) => {
        expect(warn).toHaveBeenCalled();
        expect(String(warn.mock.calls[0])).toContain("Invalid value provided");
        expect(String(warn.mock.calls[0])).toContain("not a time");
        expect((getByTestId(testId) as HTMLInputElement).value).toBe("");
      }
    );

    ["9:30", "24:00", "09:60", "09:30:00", "0930"].forEach((invalid) => {
      testTimeInput({ value: invalid })(
        `should warn for the invalid time "${invalid}"`,
        ({ getByTestId }) => {
          expect(warn).toHaveBeenCalled();
          expect((getByTestId(testId) as HTMLInputElement).value).toBe("");
        }
      );
    });

    testControlled(
      "should warn and clear when its value becomes invalid",
      ({ getByTestId, rerenderWithProps }) => {
        expect(warn).not.toHaveBeenCalled();
        rerenderWithProps({ value: "invalid" });
        expect(warn).toHaveBeenCalled();
        expect((getByTestId(testId) as HTMLInputElement).value).toBe("");
      }
    );

    testControlled(
      "should update its value",
      ({ getByTestId, rerenderWithProps }) => {
        rerenderWithProps({ value: "14:45" });
        expect((getByTestId(testId) as HTMLInputElement).value).toBe("14:45");
        rerenderWithProps({ value: null });
        expect((getByTestId(testId) as HTMLInputElement).value).toBe("");
      }
    );

    testControlled(
      "should switch between text and time type on focus",
      async ({ findByTestId }, { click }) => {
        const input = (await findByTestId(testId)) as HTMLInputElement;
        expect(input.type).toBe("text");
        await click(input);
        expect(input.type).toBe("time");
      }
    );

    const onChangeTyped = mock(() => {});
    testTimeInput({ onChange: onChangeTyped })(
      "should propagate typed times",
      async ({ findByTestId }, { click }) => {
        onChangeTyped.mockReset();
        const input = (await findByTestId(testId)) as HTMLInputElement;
        await click(input);
        fireEvent.change(input, { target: { value: "10:15" } });
        expect(onChangeTyped).toHaveBeenCalledWith("10:15");
        expect(input.value).toBe("10:15");
      }
    );

    const onChangeInvalid = mock(() => {});
    testTimeInput({ value: "09:30", onChange: onChangeInvalid })(
      "should propagate null when the typed time is invalid",
      async ({ findByTestId }, { click }) => {
        onChangeInvalid.mockReset();
        const input = (await findByTestId(testId)) as HTMLInputElement;
        await click(input);
        fireEvent.change(input, { target: { value: "" } });
        expect(onChangeInvalid).toHaveBeenCalledWith(null);
      }
    );

    const onChangeHour = mock(() => {});
    testTimeInput({ onChange: onChangeHour })(
      "should select an hour from the time picker",
      async ({ findByTestId, findAllByTestId }, { click }) => {
        onChangeHour.mockReset();
        await click(await findByTestId(controlTestId));
        const items = await findAllByTestId(pickerItemTestId);
        await click(getItem(items, "hour", 9));
        expect(onChangeHour).toHaveBeenCalledWith("09:00");
        expect(((await findByTestId(testId)) as HTMLInputElement).value).toBe(
          "09:00"
        );
      }
    );

    const onChangeMinute = mock(() => {});
    testTimeInput({ value: "09:30", step: 15, onChange: onChangeMinute })(
      "should select a minute from the time picker",
      async ({ findByTestId, findAllByTestId }, { click }) => {
        onChangeMinute.mockReset();
        await click(await findByTestId(controlTestId));
        const items = await findAllByTestId(pickerItemTestId);
        await click(getItem(items, "minute", 45));
        expect(onChangeMinute).toHaveBeenCalledWith("09:45");
        expect(((await findByTestId(testId)) as HTMLInputElement).value).toBe(
          "09:45"
        );
      }
    );

    testTimeInput({ value: "10:00", min: "09:00", max: "17:00" })(
      "should forward min and max to the time picker",
      async ({ findByTestId, findAllByTestId }, { click }) => {
        await click(await findByTestId(controlTestId));
        const items = await findAllByTestId(pickerItemTestId);
        expect(
          (getItem(items, "hour", 8) as HTMLButtonElement).disabled
        ).toBeTrue();
        expect(
          (getItem(items, "hour", 12) as HTMLButtonElement).disabled
        ).toBeFalse();
        expect(
          (getItem(items, "hour", 18) as HTMLButtonElement).disabled
        ).toBeTrue();
      }
    );

    testTimeInput({ value: "09:30", step: 15 })(
      "should forward step to the time picker",
      async ({ findByTestId, findAllByTestId }, { click }) => {
        await click(await findByTestId(controlTestId));
        const items = await findAllByTestId(pickerItemTestId);
        const minutes = items
          .filter((item) => item.dataset.type === "minute")
          .map((item) => Number(item.dataset.value));
        expect(minutes).toEqual([0, 15, 30, 45]);
      }
    );
  });
});
