import { describe, expect, it, mock } from "bun:test";
import { set, subDays } from "date-fns";

import { DateTimeInput } from "./DateTimeInput.component";
import { extractTimeAndDate } from "./DateTimeInput.utils";

import { testComponentFactory } from "@/tests";
import { dateISOToDateNativeStr, dateToDateISO, isTimeStr } from "@utils";

import type { RenderResult } from "@testing-library/react";

describe("Input", () => {
  describe("DateTimeInput", () => {
    // date & time inputs both append the shared test id to their own
    const wrapperTestId = "input-date-time-wrapper";
    const dateTestId = "input-date";
    const timeTestId = "input-date-time";
    const controlTestId = "input-control";
    const calendarTestId = "input-date-calendar";
    const pickerTestId = "input-time-picker";
    const pickerItemTestId = "time-picker-item";

    // fixtures are expressed in local time to stay independent from the machine's timezone
    const value = "2024-08-14T10:30:00";
    const today = dateISOToDateNativeStr(dateToDateISO(new Date()));

    const testDateTimeInput = testComponentFactory(
      "DateTimeInput",
      DateTimeInput
    );

    const getItem = (
      items: HTMLElement[],
      type: "hour" | "minute",
      itemValue: number
    ) => {
      const item = items.find(
        (item) =>
          item.dataset.type === type && item.dataset.value === String(itemValue)
      );
      expect(item).toBeDefined();
      return item as HTMLElement;
    };

    const testDefaultProps = testDateTimeInput({});

    testDefaultProps("should render", ({ getByTestId, getAllByTestId }) => {
      expect(getByTestId(wrapperTestId)).not.toBeNull();
      expect(getByTestId(dateTestId)).not.toBeNull();
      expect(getByTestId(timeTestId)).not.toBeNull();
      expect(getAllByTestId(controlTestId)).toHaveLength(2);
    });

    testDefaultProps("should be empty by default", ({ getByTestId }) => {
      expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe("");
      expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe("");
    });

    testDefaultProps(
      "should disable time until a date is set",
      ({ getByTestId }) => {
        expect(
          (getByTestId(dateTestId) as HTMLInputElement).disabled
        ).toBeFalse();
        expect(
          (getByTestId(timeTestId) as HTMLInputElement).disabled
        ).toBeTrue();
      }
    );

    testDateTimeInput({ value })(
      "should split its value into a date and a time",
      ({ getByTestId }) => {
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe(
          "14/08/2024"
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "10:30"
        );
      }
    );

    testDateTimeInput({ value })(
      "should enable time once a date is set",
      ({ getByTestId }) => {
        expect(
          (getByTestId(timeTestId) as HTMLInputElement).disabled
        ).toBeFalse();
      }
    );

    testDateTimeInput({ value: "invalid" })(
      "should ignore an invalid value",
      ({ getByTestId }) => {
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe("");
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe("");
      }
    );

    testDateTimeInput({ value })(
      "should update its value",
      ({ getByTestId, rerenderWithProps }) => {
        rerenderWithProps({ value: "2025-01-02T23:45:00" });
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe(
          "02/01/2025"
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "23:45"
        );
      }
    );

    testDateTimeInput({ value })(
      "should clear when its value is reset",
      ({ getByTestId, rerenderWithProps }) => {
        rerenderWithProps({ value: null });
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe("");
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe("");
      }
    );

    testDateTimeInput({
      value,
      placeholder: "Pick a date",
      timePlaceholder: "Pick a time",
    })("should forward placeholders", ({ getByTestId }) => {
      expect((getByTestId(dateTestId) as HTMLInputElement).placeholder).toBe(
        "Pick a date"
      );
      expect((getByTestId(timeTestId) as HTMLInputElement).placeholder).toBe(
        "Pick a time"
      );
    });

    testDateTimeInput({ placeholder: "Pick" })(
      "should fall back to the placeholder for the time input",
      ({ getByTestId }) => {
        expect((getByTestId(timeTestId) as HTMLInputElement).placeholder).toBe(
          "Pick"
        );
      }
    );

    testDateTimeInput({ value, disabled: true })(
      "should be disabled",
      ({ getByTestId }) => {
        expect(
          (getByTestId(dateTestId) as HTMLInputElement).disabled
        ).toBeTrue();
        expect(
          (getByTestId(timeTestId) as HTMLInputElement).disabled
        ).toBeTrue();
      }
    );

    const onChangeHour = mock(() => {});
    testDateTimeInput({ value, onChange: onChangeHour })(
      "should update the hour from the time picker and keep the date",
      async ({ getAllByTestId, findAllByTestId, getByTestId }, { click }) => {
        onChangeHour.mockReset();
        await click(getAllByTestId(controlTestId)[1]);
        const items = await findAllByTestId(pickerItemTestId);
        await click(getItem(items, "hour", 14));
        expect(onChangeHour).toHaveBeenCalledTimes(1);
        expect((onChangeHour.mock.calls[0] as unknown[])[0]).toStartWith(
          "2024-08-14T14:30:00"
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "14:30"
        );
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe(
          "14/08/2024"
        );
      }
    );

    const onChangeMinute = mock(() => {});
    testDateTimeInput({ value, onChange: onChangeMinute })(
      "should update the minutes from the time picker and keep the date",
      async ({ getAllByTestId, findAllByTestId, getByTestId }, { click }) => {
        onChangeMinute.mockReset();
        await click(getAllByTestId(controlTestId)[1]);
        const items = await findAllByTestId(pickerItemTestId);
        await click(getItem(items, "minute", 45));
        expect((onChangeMinute.mock.calls[0] as unknown[])[0]).toStartWith(
          "2024-08-14T10:45:00"
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "10:45"
        );
      }
    );

    const onChangeDate = mock(() => {});
    testDateTimeInput({ onChange: onChangeDate })(
      "should set the date from the calendar with a midnight time",
      async ({ getAllByTestId, findByTestId, getByTestId }, { click }) => {
        onChangeDate.mockReset();
        await click(getAllByTestId(controlTestId)[0]);
        const calendar = await findByTestId(calendarTestId);
        const dayCell = calendar.querySelector(
          `td[role="gridcell"][data-day="${today}"]`
        );
        expect(dayCell).not.toBeNull();
        await click(
          dayCell?.querySelector("button") ?? (dayCell as HTMLElement)
        );
        expect(onChangeDate).toHaveBeenCalledTimes(1);
        expect((onChangeDate.mock.calls[0] as unknown[])[0]).toStartWith(
          `${today}T00:00:00`
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "00:00"
        );
        expect(
          (getByTestId(timeTestId) as HTMLInputElement).disabled
        ).toBeFalse();
      }
    );

    const onChangeDateMin = mock(() => {});
    testDateTimeInput({ min: `${today}T09:15:00`, onChange: onChangeDateMin })(
      "should use the min time when setting a date without a previous time",
      async ({ getAllByTestId, findByTestId, getByTestId }, { click }) => {
        onChangeDateMin.mockReset();
        await click(getAllByTestId(controlTestId)[0]);
        const calendar = await findByTestId(calendarTestId);
        const dayCell = calendar.querySelector(
          `td[role="gridcell"][data-day="${today}"]`
        );
        expect(dayCell).not.toBeNull();
        await click(
          dayCell?.querySelector("button") ?? (dayCell as HTMLElement)
        );
        expect((onChangeDateMin.mock.calls[0] as unknown[])[0]).toStartWith(
          `${today}T09:15:00`
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "09:15"
        );
      }
    );

    const onChangeDateKeep = mock(() => {});
    const todayValue = dateToDateISO(
      new Date(new Date().setHours(10, 30, 0, 0))
    );
    testDateTimeInput({ value: todayValue, onChange: onChangeDateKeep })(
      "should clear the value when the selected day is deselected",
      async ({ getAllByTestId, findByTestId, getByTestId }, { click }) => {
        onChangeDateKeep.mockReset();
        await click(getAllByTestId(controlTestId)[0]);
        const calendar = await findByTestId(calendarTestId);
        const dayCell = calendar.querySelector(
          `td[role="gridcell"][data-day="${today}"]`
        );
        expect(dayCell).not.toBeNull();
        await click(
          dayCell?.querySelector("button") ?? (dayCell as HTMLElement)
        );
        // the calendar toggles a selected day off, which clears the whole value
        expect(onChangeDateKeep).toHaveBeenCalledTimes(1);
        expect(onChangeDateKeep).toHaveBeenCalledWith(null);
        expect((getByTestId(dateTestId) as HTMLInputElement).value).toBe("");
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe("");
        expect(
          (getByTestId(timeTestId) as HTMLInputElement).disabled
        ).toBeTrue();
      }
    );

    testDateTimeInput({ value, step: 15 })(
      "should forward step to the time picker",
      async ({ getAllByTestId, findAllByTestId, findByTestId }, { click }) => {
        await click(getAllByTestId(controlTestId)[1]);
        expect(await findByTestId(pickerTestId)).not.toBeNull();
        const items = await findAllByTestId(pickerItemTestId);
        const minutes = items
          .filter((item) => item.dataset.type === "minute")
          .map((item) => Number(item.dataset.value));
        expect(minutes).toEqual([0, 15, 30, 45]);
      }
    );

    testDateTimeInput({
      value,
      min: "2024-08-14T09:00:00",
      max: "2024-08-14T17:00:00",
    })(
      "should forward min and max times to the time picker",
      async ({ getAllByTestId, findAllByTestId }, { click }) => {
        await click(getAllByTestId(controlTestId)[1]);
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

    const openTimePicker = async (
      {
        getAllByTestId,
        findAllByTestId,
      }: Pick<RenderResult, "getAllByTestId" | "findAllByTestId">,
      click: (element: Element) => Promise<void>
    ) => {
      await click(getAllByTestId(controlTestId)[1]);
      return findAllByTestId(pickerItemTestId);
    };

    const isDisabled = (item: HTMLElement) =>
      (item as HTMLButtonElement).disabled;

    const boundsProps = {
      min: "2024-08-14T09:00:00",
      max: "2024-08-16T17:00:00",
    };

    testDateTimeInput({ ...boundsProps, value: "2024-08-14T10:30:00" })(
      "should only apply the min time on the min date",
      async (result, { click }) => {
        const items = await openTimePicker(result, click);
        expect(isDisabled(getItem(items, "hour", 8))).toBeTrue();
        expect(isDisabled(getItem(items, "hour", 18))).toBeFalse();
      }
    );

    testDateTimeInput({ ...boundsProps, value: "2024-08-16T10:30:00" })(
      "should only apply the max time on the max date",
      async (result, { click }) => {
        const items = await openTimePicker(result, click);
        expect(isDisabled(getItem(items, "hour", 8))).toBeFalse();
        expect(isDisabled(getItem(items, "hour", 18))).toBeTrue();
      }
    );

    testDateTimeInput({ ...boundsProps, value: "2024-08-15T10:30:00" })(
      "should not limit time between the min and max dates",
      async (result, { click }) => {
        const items = await openTimePicker(result, click);
        expect(isDisabled(getItem(items, "hour", 8))).toBeFalse();
        expect(isDisabled(getItem(items, "hour", 18))).toBeFalse();
      }
    );

    testDateTimeInput({
      min: "2024-08-14T09:00:00",
      max: "2024-08-14T17:00:00",
      value: "2024-08-14T10:30:00",
    })(
      "should apply both time bounds when min and max share a date",
      async (result, { click }) => {
        const items = await openTimePicker(result, click);
        expect(isDisabled(getItem(items, "hour", 8))).toBeTrue();
        expect(isDisabled(getItem(items, "hour", 12))).toBeFalse();
        expect(isDisabled(getItem(items, "hour", 18))).toBeTrue();
      }
    );

    const yesterdayMin = dateToDateISO(
      set(subDays(new Date(), 1), { hours: 9, minutes: 15 })
    );
    const onChangeAfterMin = mock(() => {});
    testDateTimeInput({ min: yesterdayMin, onChange: onChangeAfterMin })(
      "should default to midnight when picking a date after the min date",
      async ({ getAllByTestId, findByTestId, getByTestId }, { click }) => {
        onChangeAfterMin.mockReset();
        await click(getAllByTestId(controlTestId)[0]);
        const calendar = await findByTestId(calendarTestId);
        const dayCell = calendar.querySelector(
          `td[role="gridcell"][data-day="${today}"]`
        );
        expect(dayCell).not.toBeNull();
        await click(
          dayCell?.querySelector("button") ?? (dayCell as HTMLElement)
        );
        expect((onChangeAfterMin.mock.calls[0] as unknown[])[0]).toStartWith(
          `${today}T00:00:00`
        );
        expect((getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "00:00"
        );
      }
    );

    // the calendar opens on the month of the current value
    const pickDate = async (
      {
        getAllByTestId,
        findByTestId,
      }: Pick<RenderResult, "getAllByTestId" | "findByTestId">,
      click: (element: Element) => Promise<void>,
      day: string
    ) => {
      await click(getAllByTestId(controlTestId)[0]);
      const calendar = await findByTestId(calendarTestId);
      const dayCell = calendar.querySelector(
        `td[role="gridcell"][data-day="${day}"]`
      );
      expect(dayCell).not.toBeNull();
      await click(dayCell?.querySelector("button") ?? (dayCell as HTMLElement));
    };

    const emittedValue = (onChange: { mock: { calls: unknown[][] } }) => {
      expect(onChange.mock.calls).toHaveLength(1);
      return onChange.mock.calls[0][0];
    };

    const onChangeClampMin = mock(() => {});
    testDateTimeInput({
      ...boundsProps,
      value: "2024-08-15T08:00:00",
      onChange: onChangeClampMin,
    })(
      "should clamp the time to the min time when picking the min date",
      async (result, { click }) => {
        onChangeClampMin.mockReset();
        await pickDate(result, click, "2024-08-14");
        expect(emittedValue(onChangeClampMin)).toStartWith(
          "2024-08-14T09:00:00"
        );
        expect((result.getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "09:00"
        );
      }
    );

    const onChangeClampMax = mock(() => {});
    testDateTimeInput({
      ...boundsProps,
      value: "2024-08-15T20:15:00",
      onChange: onChangeClampMax,
    })(
      "should clamp the time to the max time when picking the max date",
      async (result, { click }) => {
        onChangeClampMax.mockReset();
        await pickDate(result, click, "2024-08-16");
        expect(emittedValue(onChangeClampMax)).toStartWith(
          "2024-08-16T17:00:00"
        );
        expect((result.getByTestId(timeTestId) as HTMLInputElement).value).toBe(
          "17:00"
        );
      }
    );

    const onChangeNoClamp = mock(() => {});
    testDateTimeInput({
      ...boundsProps,
      value: "2024-08-15T10:30:00",
      onChange: onChangeNoClamp,
    })(
      "should keep the time when it already is within the new date's bounds",
      async (result, { click }) => {
        onChangeNoClamp.mockReset();
        await pickDate(result, click, "2024-08-14");
        expect(emittedValue(onChangeNoClamp)).toStartWith(
          "2024-08-14T10:30:00"
        );
      }
    );

    const onChangeNoLimit = mock(() => {});
    testDateTimeInput({
      ...boundsProps,
      value: "2024-08-14T09:00:00",
      onChange: onChangeNoLimit,
    })(
      "should not clamp the time when picking a date between the bounds",
      async (result, { click }) => {
        onChangeNoLimit.mockReset();
        await pickDate(result, click, "2024-08-15");
        expect(emittedValue(onChangeNoLimit)).toStartWith(
          "2024-08-15T09:00:00"
        );
      }
    );

    describe("utils", () => {
      describe("extractTimeAndDate", () => {
        const isoPattern = /^2024-08-14T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

        it("should extract the time and date of an ISO string", () => {
          const { time, date } = extractTimeAndDate("2024-08-14T10:30:00");
          expect(time).toBe("10:30");
          expect(date).toMatch(isoPattern);
          expect(date).toStartWith("2024-08-14T10:30:00");
        });
        it("should zero-pad the time", () => {
          expect(extractTimeAndDate("2024-08-14T07:05:00").time).toBe("07:05");
        });
        it("should drop seconds from the time but keep them in the date", () => {
          const { time, date } = extractTimeAndDate("2024-08-14T10:30:45");
          expect(time).toBe("10:30");
          expect(date).toStartWith("2024-08-14T10:30:45");
        });
        it("should extract midnight from a date without time", () => {
          ["2024-08-14", "14/08/2024"].forEach((value) => {
            const { time, date } = extractTimeAndDate(value);
            expect(time).toBe("00:00");
            expect(date).toStartWith("2024-08-14T00:00:00");
          });
        });
        it("should keep the same instant when given an offset", () => {
          const value = "2024-08-14T10:30:00+02:00";
          const { time, date } = extractTimeAndDate(value);
          expect(isTimeStr(time)).toBeTrue();
          expect(new Date(date as string).getTime()).toBe(
            new Date(value).getTime()
          );
        });
        it("should return a valid time string", () => {
          expect(
            isTimeStr(extractTimeAndDate("2024-08-14T23:59:00").time)
          ).toBeTrue();
        });
        it("should be stable when applied to its own output", () => {
          const extracted = extractTimeAndDate("2024-08-14T10:30:00");
          expect(extractTimeAndDate(extracted.date)).toEqual(extracted);
        });
        it("should return null time and date for nullish values", () => {
          expect(extractTimeAndDate(null)).toEqual({ time: null, date: null });
        });
        it("should return null time and date for invalid values", () => {
          expect(extractTimeAndDate("")).toEqual({ time: null, date: null });
          expect(extractTimeAndDate("invalid")).toEqual({
            time: null,
            date: null,
          });
          expect(extractTimeAndDate("2024-13-45T10:30:00")).toEqual({
            time: null,
            date: null,
          });
        });
      });
    });
  });
});
