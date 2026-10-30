import { describe, expect, mock } from "bun:test";

import { TimePicker } from "./TimePicker.component";

import { testComponentFactory } from "@/tests";

import type { TimePickerProps } from "./TimePicker.types";
import type { RenderResult } from "@testing-library/react";
import type { TestIdProps, TimeStr } from "@types";

describe("TimePicker", () => {
  const testTimePicker = testComponentFactory<TimePickerProps & TestIdProps>(
    "TimePicker",
    TimePicker
  );

  type ItemType = "hour" | "minute";

  const getItems = ({ queryAllByTestId }: RenderResult, type: ItemType) =>
    queryAllByTestId("time-picker-item").filter(
      (item) => item.dataset.type === type
    );

  const getItem = (result: RenderResult, type: ItemType, value: number) => {
    const item = getItems(result, type).find(
      (item) => item.dataset.value === String(value)
    );
    expect(item).toBeDefined();
    return item as HTMLElement;
  };

  const getValues = (result: RenderResult, type: ItemType) =>
    getItems(result, type).map((item) => Number(item.dataset.value));

  const getSelected = (result: RenderResult, type: ItemType) =>
    getItems(result, type)
      .filter((item) => item.getAttribute("aria-selected") === "true")
      .map((item) => Number(item.dataset.value));

  const isDisabled = (item: HTMLElement) =>
    (item as HTMLButtonElement).disabled;

  testTimePicker({})("should render", ({ queryByTestId }) => {
    expect(queryByTestId("time-picker")).not.toBeNull();
  });

  testTimePicker({ testId: "custom", overrideTestId: true })(
    "should override its test id",
    ({ queryByTestId }) => {
      expect(queryByTestId("custom")).not.toBeNull();
      expect(queryByTestId("time-picker")).toBeNull();
    }
  );

  testTimePicker({})("should render every hour and minute", (result) => {
    expect(getValues(result, "hour")).toEqual(
      Array.from({ length: 24 }, (_, hour) => hour)
    );
    expect(getValues(result, "minute")).toEqual(
      Array.from({ length: 60 }, (_, minute) => minute)
    );
  });

  testTimePicker({ step: 15 })(
    "should render minutes based on step",
    (result) => {
      expect(getValues(result, "minute")).toEqual([0, 15, 30, 45]);
    }
  );

  testTimePicker({})("should have no selection without time", (result) => {
    expect(getSelected(result, "hour")).toEqual([]);
    expect(getSelected(result, "minute")).toEqual([]);
  });

  testTimePicker({})(
    "should disable minutes until an hour is selected",
    (result) => {
      getItems(result, "minute").forEach((item) =>
        expect(isDisabled(item)).toBeTrue()
      );
      getItems(result, "hour").forEach((item) =>
        expect(isDisabled(item)).toBeFalse()
      );
    }
  );

  testTimePicker({ time: "09:30" })(
    "should select the provided time",
    (result) => {
      expect(getSelected(result, "hour")).toEqual([9]);
      expect(getSelected(result, "minute")).toEqual([30]);
    }
  );

  testTimePicker({ time: "invalid" as TimeStr })(
    "should ignore an invalid time",
    (result) => {
      expect(getSelected(result, "hour")).toEqual([]);
      expect(getSelected(result, "minute")).toEqual([]);
    }
  );

  testTimePicker({ time: "09:30" })(
    "should update selection when time changes",
    (result) => {
      result.rerenderWithProps({ time: "14:45" });
      expect(getSelected(result, "hour")).toEqual([14]);
      expect(getSelected(result, "minute")).toEqual([45]);
      result.rerenderWithProps({ time: null });
      expect(getSelected(result, "hour")).toEqual([]);
      expect(getSelected(result, "minute")).toEqual([]);
    }
  );

  const onHourChange = mock(() => {});
  testTimePicker({ onChange: onHourChange })(
    "should select the first minute when picking an hour without time",
    async (result, { click }) => {
      onHourChange.mockReset();
      await click(getItem(result, "hour", 9));
      expect(onHourChange).toHaveBeenCalledTimes(1);
      expect(onHourChange).toHaveBeenCalledWith("09:00");
      expect(getSelected(result, "hour")).toEqual([9]);
    }
  );

  const onKeepMinuteChange = mock(() => {});
  testTimePicker({ time: "09:30", onChange: onKeepMinuteChange })(
    "should keep the minute when picking another hour",
    async (result, { click }) => {
      onKeepMinuteChange.mockReset();
      await click(getItem(result, "hour", 10));
      expect(onKeepMinuteChange).toHaveBeenCalledWith("10:30");
      expect(getSelected(result, "hour")).toEqual([10]);
      expect(getSelected(result, "minute")).toEqual([30]);
    }
  );

  const onMinuteChange = mock(() => {});
  testTimePicker({ time: "09:30", onChange: onMinuteChange })(
    "should keep the hour when picking a minute",
    async (result, { click }) => {
      onMinuteChange.mockReset();
      await click(getItem(result, "minute", 45));
      expect(onMinuteChange).toHaveBeenCalledWith("09:45");
      expect(getSelected(result, "hour")).toEqual([9]);
      expect(getSelected(result, "minute")).toEqual([45]);
    }
  );

  const onSameChange = mock(() => {});
  testTimePicker({ time: "09:30", onChange: onSameChange })(
    "should not call onChange when picking the current time",
    async (result, { click }) => {
      onSameChange.mockReset();
      await click(getItem(result, "hour", 9));
      await click(getItem(result, "minute", 30));
      expect(onSameChange).not.toHaveBeenCalled();
    }
  );

  const onDisabledChange = mock(() => {});
  testTimePicker({ time: "09:30", disabled: true, onChange: onDisabledChange })(
    "should disable every item and ignore clicks when disabled",
    async (result, { click }) => {
      onDisabledChange.mockReset();
      getItems(result, "hour").forEach((item) =>
        expect(isDisabled(item)).toBeTrue()
      );
      getItems(result, "minute").forEach((item) =>
        expect(isDisabled(item)).toBeTrue()
      );
      await click(getItem(result, "hour", 10));
      await click(getItem(result, "minute", 45));
      expect(onDisabledChange).not.toHaveBeenCalled();
      expect(getSelected(result, "hour")).toEqual([]);
    }
  );

  const onHourBoundChange = mock(() => {});
  testTimePicker({
    time: "10:00",
    min: "09:00",
    max: "17:00",
    onChange: onHourBoundChange,
  })(
    "should disable hours outside of min and max",
    async (result, { click }) => {
      onHourBoundChange.mockReset();
      getItems(result, "hour").forEach((item) => {
        const hour = Number(item.dataset.value);
        expect(isDisabled(item)).toBe(hour < 9 || hour > 17);
      });
      await click(getItem(result, "hour", 8));
      await click(getItem(result, "hour", 18));
      expect(onHourBoundChange).not.toHaveBeenCalled();
      await click(getItem(result, "hour", 12));
      expect(onHourBoundChange).toHaveBeenCalledWith("12:00");
    }
  );

  const onMinuteBoundChange = mock(() => {});
  testTimePicker({
    time: "09:30",
    min: "09:30",
    max: "10:15",
    step: 15,
    onChange: onMinuteBoundChange,
  })(
    "should disable minutes outside of min and max",
    async (result, { click }) => {
      onMinuteBoundChange.mockReset();
      expect(getValues(result, "minute")).toEqual([0, 15, 30, 45]);
      expect(isDisabled(getItem(result, "minute", 0))).toBeTrue();
      expect(isDisabled(getItem(result, "minute", 15))).toBeTrue();
      expect(isDisabled(getItem(result, "minute", 30))).toBeFalse();
      expect(isDisabled(getItem(result, "minute", 45))).toBeFalse();
      await click(getItem(result, "minute", 15));
      expect(onMinuteBoundChange).not.toHaveBeenCalled();
      await click(getItem(result, "minute", 45));
      expect(onMinuteBoundChange).toHaveBeenCalledWith("09:45");
    }
  );
});
