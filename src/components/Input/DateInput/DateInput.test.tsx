import { describe, expect, mock } from "bun:test";

import { DateInput } from "./DateInput.component";

import { testComponentFactory } from "@/tests";
import {
  dateISOToDateNativeStr,
  dateISOToDateStr,
  dateToDateISO,
} from "@utils";

const dateFormats = {
  nativeStr: "2024-08-14",
  str: "14/08/2024",
  ISO: "2024-08-14T00:00:00Z",
  date: new Date("2024-08-14T00:00:00+00:00"),
};

describe("Input", () => {
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

      expect(await findByTestId(calendarTestId)).not.toBeNull();

      await keyboard("[Escape]");
      expect(await queryByTestId(calendarTestId)).toBeNull();
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
