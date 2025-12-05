import { describe, expect, it, mock } from "bun:test";

import { MonthYearInput } from "./MonthYearInput.component";
import {
  autoFormatMonthYear,
  formatMonthYearForBackend,
  incrementMonthOrYear,
  isValidMonthYearStr,
  isValidYearMonthStr,
  monthYearToYearMonth,
  yearMonthToMonthYear,
} from "./MonthYearInput.utils";

import { testComponentFactory } from "@/tests";

describe("Input", () => {
  describe("MonthYearInput", () => {
    describe("utils", () => {
      describe("isValidMonthYearStr", () => {
        it("should accept valid MM/YYYY format", () => {
          expect(isValidMonthYearStr("01/2024")).toBe(true);
          expect(isValidMonthYearStr("12/2024")).toBe(true);
          expect(isValidMonthYearStr("06/2025")).toBe(true);
        });

        it("should reject invalid month", () => {
          expect(isValidMonthYearStr("00/2024")).toBe(false);
          expect(isValidMonthYearStr("13/2024")).toBe(false);
        });

        it("should reject invalid format", () => {
          expect(isValidMonthYearStr("1/2024")).toBe(false);
          expect(isValidMonthYearStr("01-2024")).toBe(false);
          expect(isValidMonthYearStr("2024/01")).toBe(false);
        });
      });

      describe("isValidYearMonthStr", () => {
        it("should accept valid YYYY-MM format", () => {
          expect(isValidYearMonthStr("2024-01")).toBe(true);
          expect(isValidYearMonthStr("2024-12")).toBe(true);
          expect(isValidYearMonthStr("2025-06")).toBe(true);
        });

        it("should reject invalid month", () => {
          expect(isValidYearMonthStr("2024-00")).toBe(false);
          expect(isValidYearMonthStr("2024-13")).toBe(false);
        });

        it("should reject invalid format", () => {
          expect(isValidYearMonthStr("2024-1")).toBe(false);
          expect(isValidYearMonthStr("2024/01")).toBe(false);
          expect(isValidYearMonthStr("01-2024")).toBe(false);
        });
      });

      describe("monthYearToYearMonth", () => {
        it("should convert MM/YYYY to YYYY-MM", () => {
          expect(monthYearToYearMonth("01/2024")).toBe("2024-01");
          expect(monthYearToYearMonth("12/2025")).toBe("2025-12");
        });

        it("should return null for invalid input", () => {
          expect(monthYearToYearMonth("invalid")).toBe(null);
          expect(monthYearToYearMonth(null)).toBe(null);
        });
      });

      describe("yearMonthToMonthYear", () => {
        it("should convert YYYY-MM to MM/YYYY", () => {
          expect(yearMonthToMonthYear("2024-01")).toBe("01/2024");
          expect(yearMonthToMonthYear("2025-12")).toBe("12/2025");
        });

        it("should return null for invalid input", () => {
          expect(yearMonthToMonthYear("invalid")).toBe(null);
          expect(yearMonthToMonthYear(null)).toBe(null);
        });
      });

      describe("autoFormatMonthYear", () => {
        it("should auto-format single digit 2-9 to 0X/", () => {
          expect(autoFormatMonthYear("2")).toBe("02/");
          expect(autoFormatMonthYear("9")).toBe("09/");
        });

        it("should add slash after 2 digits", () => {
          expect(autoFormatMonthYear("12")).toBe("12/");
          expect(autoFormatMonthYear("01")).toBe("01/");
        });

        it("should format complete input", () => {
          expect(autoFormatMonthYear("122024")).toBe("12/2024");
          expect(autoFormatMonthYear("012025")).toBe("01/2025");
        });

        it("should prevent month 00", () => {
          expect(autoFormatMonthYear("00")).toBe("0");
        });

        it("should prevent year starting with 0", () => {
          expect(autoFormatMonthYear("120")).toBe("12/");
          // When typing 1202024, it takes 12 as month, 0 is rejected, so it continues with 2024
          expect(autoFormatMonthYear("122024")).toBe("12/2024");
        });

        it("should handle invalid month by auto-correcting", () => {
          expect(autoFormatMonthYear("13")).toBe("01/3");
          expect(autoFormatMonthYear("15")).toBe("01/5");
        });
      });

      describe("formatMonthYearForBackend", () => {
        it("should return YYYY-MM if already in that format", () => {
          expect(formatMonthYearForBackend("2024-01")).toBe("2024-01");
        });

        it("should convert MM/YYYY to YYYY-MM", () => {
          expect(formatMonthYearForBackend("01/2024")).toBe("2024-01");
        });

        it("should return null for invalid input", () => {
          expect(formatMonthYearForBackend("invalid")).toBe(null);
          expect(formatMonthYearForBackend(null)).toBe(null);
        });
      });

      describe("incrementMonthOrYear", () => {
        it("should increment month", () => {
          expect(incrementMonthOrYear("01/2024", true, 1)).toBe("02/2024");
          expect(incrementMonthOrYear("11/2024", true, 1)).toBe("12/2024");
        });

        it("should decrement month", () => {
          expect(incrementMonthOrYear("02/2024", true, -1)).toBe("01/2024");
          expect(incrementMonthOrYear("12/2024", true, -1)).toBe("11/2024");
        });

        it("should wrap month and increment year", () => {
          expect(incrementMonthOrYear("12/2024", true, 1)).toBe("01/2025");
        });

        it("should wrap month and decrement year", () => {
          expect(incrementMonthOrYear("01/2024", true, -1)).toBe("12/2023");
        });

        it("should increment year", () => {
          expect(incrementMonthOrYear("01/2024", false, 1)).toBe("01/2025");
        });

        it("should decrement year", () => {
          expect(incrementMonthOrYear("01/2024", false, -1)).toBe("01/2023");
        });

        it("should handle partial input with defaults", () => {
          expect(incrementMonthOrYear("", true, 1)).toMatch(/^\d{2}\/\d{4}$/);
        });
      });
    });

    const testId = "input-month-year";

    const testMonthYearInput = testComponentFactory(
      "MonthYearInput",
      MonthYearInput
    );

    const testDefaultProps = testMonthYearInput({});

    testDefaultProps("should render", ({ getByTestId }) => {
      expect(getByTestId(testId)).not.toBeNull();
    });

    testDefaultProps("should have correct placeholder", ({ getByTestId }) => {
      const input = getByTestId(testId) as HTMLInputElement;
      expect(input.placeholder).toBe("MM/YYYY");
    });

    testDefaultProps(
      "should have aria-label for accessibility",
      ({ getByTestId }) => {
        const input = getByTestId(testId) as HTMLInputElement;
        expect(input.getAttribute("aria-label")).toBe(
          "Month and year input. Format: MM/YYYY. Valid years: 1000 to 2999. You can use arrow keys to increment or decrement values."
        );
      }
    );

    testDefaultProps("should have numeric inputMode", ({ getByTestId }) => {
      const input = getByTestId(testId) as HTMLInputElement;
      expect(input.getAttribute("inputMode")).toBe("numeric");
    });

    const onChange = mock(() => {});

    const testControlled = testMonthYearInput({
      value: "2024-01",
      onChange,
    });

    testControlled(
      "should display value in MM/YYYY format",
      ({ getByTestId }) => {
        const input = getByTestId(testId) as HTMLInputElement;
        expect(input.value).toBe("01/2024");
      }
    );

    testMonthYearInput({ disabled: true })(
      "should be disabled",
      ({ getByTestId }) => {
        const input = getByTestId(testId) as HTMLInputElement;
        expect(input.disabled).toBe(true);
      }
    );

    testMonthYearInput({ required: true })(
      "should be required",
      ({ getByTestId }) => {
        const input = getByTestId(testId) as HTMLInputElement;
        expect(input.required).toBe(true);
      }
    );
  });
});
