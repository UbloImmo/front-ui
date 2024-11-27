import { objectEntries, objectKeys } from "@ubloimmo/front-util";
import { describe, expect, it, mock } from "bun:test";

import { DateInput } from "./DateInput.component";
import {
  dateISOToDateNativeStr,
  dateISOToDateStr,
  dateToDateISO,
  isValidDate,
  isValidDateISO,
  isValidDateNativeStr,
  isValidDateStr,
  normalizeToDate,
  normalizeToDateISO,
  normalizeToDateNativeStr,
  normalizeToDateStr,
} from "./DateInput.utils";

import { testComponentFactory } from "@/tests";

const dateFormats = {
  nativeStr: "2024-08-14",
  str: "14/08/2024",
  ISO: "2024-08-14T00:00:00Z",
  date: new Date("2024-08-14T00:00:00+00:00"),
};

const predicates = {
  nativeStr: isValidDateNativeStr,
  str: isValidDateStr,
  ISO: isValidDateISO,
  date: isValidDate,
};

describe("Input", () => {
  describe("DateInput", () => {
    describe("utils", () => {
      describe("predicates", () => {
        const formatKeys = objectKeys(dateFormats);
        formatKeys.forEach((predicate) => {
          formatKeys.forEach((dateLike) => {
            const isValid = dateLike === predicate;
            it(`should ${
              isValid ? "" : "not "
            }accept ${dateLike} as ${predicate}`, () => {
              expect(predicates[predicate](dateFormats[dateLike])).toBe(
                isValid
              );
            });
          });
        });
      });
      describe("normalizeToDate", () => {
        objectEntries(dateFormats).forEach(([format, dateLike]) => {
          it(`should normalize ${format} to date`, () => {
            expect(normalizeToDate(dateLike)).toEqual(dateFormats.date);
          });
        });
      });
      describe("normalizeToDateStr", () => {
        objectEntries(dateFormats).forEach(([format, dateLike]) => {
          it(`should normalize ${format} to str`, () => {
            expect(normalizeToDateStr(dateLike)).toBe(dateFormats.str);
          });
        });
      });
      describe("normalizeToDateNativeStr", () => {
        objectEntries(dateFormats).forEach(([format, dateLike]) => {
          it(`should normalize ${format} to nativeStr`, () => {
            expect(normalizeToDateNativeStr(dateLike)).toBe(
              dateFormats.nativeStr
            );
          });
        });
      });
      describe("normalizeToDateISO", () => {
        objectEntries(dateFormats).forEach(([format, dateLike]) => {
          it(`should normalize ${format} to ISO`, () => {
            expect(normalizeToDateISO(dateLike)).toBe(dateFormats.ISO);
          });
        });
      });
    });
  });

  const testId = "input-date";
  const calendarTestId = "input-date-calendar";
  const controlTestId = "input-control";

  const testDateInput = testComponentFactory("DateInput", DateInput);

  const testDefaultProps = testDateInput({});

  testDefaultProps("should render", ({ getByTestId }) => {
    expect(getByTestId(testId)).not.toBeNull();
    expect(getByTestId(controlTestId)).not.toBeNull();
  });

  testDefaultProps(
    "should open calendar in popover",
    async ({ findByTestId }, { click }) => {
      const input = await findByTestId(testId);
      expect(input).not.toBeNull();
      const control = await findByTestId(controlTestId);
      expect(control).not.toBeNull();
      await click(control);
      const calendar = await findByTestId(calendarTestId);
      expect(calendar).not.toBeNull();
    }
  );

  testDefaultProps(
    "should toggle calendar with keyboards",
    async ({ findByTestId, queryByTestId }, { keyboard, click }) => {
      const input = await findByTestId(testId);
      expect(input).not.toBeNull();
      await click(input);
      await keyboard("[Space]");
      const calendar = await findByTestId(calendarTestId);
      expect(calendar).not.toBeNull();

      await keyboard("[Escape]");
      const closedCalendar = await queryByTestId(calendarTestId);
      expect(closedCalendar).toBeNull();
    }
  );

  const onChange = mock(() => {});

  testDateInput({ onChange })(
    "should select a date from the calendar",
    async ({ findByTestId }, { click }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;
      expect(input).not.toBeNull();

      const control = await findByTestId(controlTestId);
      expect(control).not.toBeNull();
      await click(control);

      const dateToSelect = dateISOToDateNativeStr(dateToDateISO(new Date()));

      const dayCell = await findByTestId(calendarTestId).then((calendar) => {
        return calendar.querySelector(
          `td[role="gridcell"][data-day="${dateToSelect}"]`
        );
      });
      expect(dayCell).not.toBeNull();

      const dayButton = dayCell?.querySelector(
        "button.rdp-day_button"
      ) as HTMLElement;
      expect(dayButton).not.toBeNull();

      await click(dayButton);
      expect(onChange).toHaveBeenCalled();

      const expectedDate = dateISOToDateStr(dateToDateISO(new Date())) ?? "";
      expect(input.value).toBe(expectedDate);
    }
  );

  const testControlled = testDateInput({
    value: dateFormats.ISO,
    onChange,
  });

  testControlled("should hold a value", async ({ findByTestId }) => {
    const input = await findByTestId(testId);
    expect(input).not.toBeNull();
    expect((input as HTMLInputElement).value).toBe(dateFormats.str);
  });

  testControlled(
    "should switch between text and date type on focus",
    async ({ findByTestId }, { click }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;
      expect(input).not.toBeNull();
      expect(input.value).toBe(dateFormats.str);
      expect(input.type).toBe("text");
      await click(input);
      expect(input.value).toBe(dateFormats.nativeStr);
      expect(input.type).toBe("date");
    }
  );
});
