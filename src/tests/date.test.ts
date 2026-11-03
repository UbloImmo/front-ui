import { describe, expect, it } from "bun:test";

import {
  dateFormatters,
  dateISOToDate,
  dateISOToDateNativeStr,
  dateISOToDateStr,
  dateNativeStrToDate,
  dateNativeStrToDateStr,
  dateStrToDate,
  dateStrToDateISO,
  dateToDateISO,
  isValidDate,
  isValidDateISO,
  isValidDateNativeStr,
  isValidDateStr,
  normalizeToDate,
  normalizeToDateISO,
  normalizeToDateNativeStr,
  normalizeToDateStr,
} from "@utils";

// all fixtures are expressed in local time to keep tests independent from the machine's timezone
const dateStr = "14/08/2024";
const dateNativeStr = "2024-08-14";
const dateISO = "2024-08-14T10:30:00";
const isoPattern = /^2024-08-14T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;
const midnightIsoPattern = /^2024-08-14T00:00:00(Z|[+-]\d{2}:\d{2})$/;

const localDate = () => new Date(2024, 7, 14, 10, 30);

const expectSameDay = (date: Date | null) => {
  expect(date).not.toBeNull();
  expect(date?.getFullYear()).toBe(2024);
  expect(date?.getMonth()).toBe(7);
  expect(date?.getDate()).toBe(14);
};

describe("date utils", () => {
  describe("dateToDateISO", () => {
    it("should convert a date to an ISO string", () => {
      const iso = dateToDateISO(localDate());
      expect(iso).toMatch(isoPattern);
      expect(iso.startsWith(dateISO)).toBeTrue();
    });
    it("should throw for an invalid date", () => {
      expect(() => dateToDateISO(new Date("invalid"))).toThrow(RangeError);
    });
    it("should return null for null", () => {
      expect(dateToDateISO(null)).toBeNull();
    });
  });

  describe("dateISOToDateStr", () => {
    it("should convert an ISO string to dd/MM/yyyy", () => {
      expect(dateISOToDateStr(dateISO)).toBe(dateStr);
    });
    it("should throw for an invalid string", () => {
      expect(() => dateISOToDateStr("invalid")).toThrow(RangeError);
    });
    it("should return null for null", () => {
      expect(dateISOToDateStr(null)).toBeNull();
    });
  });

  describe("dateISOToDateNativeStr", () => {
    it("should convert an ISO string to yyyy-MM-dd", () => {
      expect(dateISOToDateNativeStr(dateISO)).toBe(dateNativeStr);
    });
    it("should throw for an invalid string", () => {
      expect(() => dateISOToDateNativeStr("invalid")).toThrow(RangeError);
    });
    it("should return null for null", () => {
      expect(dateISOToDateNativeStr(null)).toBeNull();
    });
  });

  describe("dateStrToDateISO", () => {
    it("should convert a dd/MM/yyyy string to an ISO string at midnight", () => {
      expect(dateStrToDateISO(dateStr)).toMatch(midnightIsoPattern);
    });
    it("should throw for an invalid string", () => {
      expect(() => dateStrToDateISO("invalid")).toThrow(RangeError);
      expect(() => dateStrToDateISO("31/02/2024")).toThrow(RangeError);
    });
    it("should return null for null", () => {
      expect(dateStrToDateISO(null)).toBeNull();
    });
  });

  describe("dateNativeStrToDateStr", () => {
    it("should convert a yyyy-MM-dd string to dd/MM/yyyy", () => {
      expect(dateNativeStrToDateStr(dateNativeStr)).toBe(dateStr);
    });
    it("should throw for an invalid string", () => {
      expect(() => dateNativeStrToDateStr("invalid")).toThrow(RangeError);
      expect(() => dateNativeStrToDateStr("2024-02-30")).toThrow(RangeError);
    });
    it("should return null for null", () => {
      expect(dateNativeStrToDateStr(null)).toBeNull();
    });
  });

  describe("dateISOToDate", () => {
    it("should convert an ISO string to a date", () => {
      const date = dateISOToDate(dateISO);
      expectSameDay(date);
      expect(date?.getHours()).toBe(10);
      expect(date?.getMinutes()).toBe(30);
    });
    it("should return an invalid date for an invalid string", () => {
      expect(isValidDate(dateISOToDate("invalid"))).toBeFalse();
    });
    it("should return null for null", () => {
      expect(dateISOToDate(null)).toBeNull();
    });
  });

  describe("dateStrToDate", () => {
    it("should convert a dd/MM/yyyy string to a date at midnight", () => {
      const date = dateStrToDate(dateStr);
      expectSameDay(date);
      expect(date?.getHours()).toBe(0);
      expect(date?.getMinutes()).toBe(0);
    });
    it("should return an invalid date for an invalid string", () => {
      expect(isValidDate(dateStrToDate("invalid"))).toBeFalse();
      expect(isValidDate(dateStrToDate("31/02/2024"))).toBeFalse();
    });
    it("should return null for null", () => {
      expect(dateStrToDate(null)).toBeNull();
    });
  });

  describe("dateNativeStrToDate", () => {
    it("should convert a yyyy-MM-dd string to a date at midnight", () => {
      const date = dateNativeStrToDate(dateNativeStr);
      expectSameDay(date);
      expect(date?.getHours()).toBe(0);
      expect(date?.getMinutes()).toBe(0);
    });
    it("should return an invalid date for an invalid string", () => {
      expect(isValidDate(dateNativeStrToDate("invalid"))).toBeFalse();
      expect(isValidDate(dateNativeStrToDate("2024-02-30"))).toBeFalse();
    });
    it("should return null for null", () => {
      expect(dateNativeStrToDate(null)).toBeNull();
    });
  });

  describe("isValidDate", () => {
    it("should accept valid dates", () => {
      expect(isValidDate(new Date())).toBeTrue();
      expect(isValidDate(localDate())).toBeTrue();
    });
    it("should reject invalid dates", () => {
      expect(isValidDate(new Date("invalid"))).toBeFalse();
    });
    it("should reject non-date values", () => {
      expect(isValidDate(null)).toBeFalse();
      expect(isValidDate(undefined)).toBeFalse();
      expect(isValidDate(dateISO)).toBeFalse();
      expect(isValidDate(1723631400000)).toBeFalse();
      expect(isValidDate({})).toBeFalse();
    });
  });

  describe("isValidDateStr", () => {
    it("should accept valid dd/MM/yyyy strings", () => {
      expect(isValidDateStr(dateStr)).toBeTrue();
      expect(isValidDateStr("01/01/2000")).toBeTrue();
      expect(isValidDateStr("29/02/2024")).toBeTrue();
    });
    it("should reject non-existent dates", () => {
      expect(isValidDateStr("31/02/2024")).toBeFalse();
      expect(isValidDateStr("29/02/2023")).toBeFalse();
      expect(isValidDateStr("32/01/2024")).toBeFalse();
      expect(isValidDateStr("14/13/2024")).toBeFalse();
    });
    it("should reject two-digit years", () => {
      expect(isValidDateStr("14/08/24")).toBeFalse();
    });
    it("should reject other formats", () => {
      expect(isValidDateStr(dateNativeStr)).toBeFalse();
      expect(isValidDateStr(dateISO)).toBeFalse();
      expect(isValidDateStr("14-08-2024")).toBeFalse();
      expect(isValidDateStr("invalid")).toBeFalse();
      expect(isValidDateStr("")).toBeFalse();
    });
    it("should reject non-string values", () => {
      expect(isValidDateStr(null)).toBeFalse();
      expect(isValidDateStr(undefined)).toBeFalse();
      expect(isValidDateStr(localDate())).toBeFalse();
      expect(isValidDateStr(20240814)).toBeFalse();
    });
  });

  describe("isValidDateNativeStr", () => {
    it("should accept valid yyyy-MM-dd strings", () => {
      expect(isValidDateNativeStr(dateNativeStr)).toBeTrue();
      expect(isValidDateNativeStr("2000-01-01")).toBeTrue();
      expect(isValidDateNativeStr("2024-02-29")).toBeTrue();
    });
    it("should reject non-existent dates", () => {
      expect(isValidDateNativeStr("2024-02-30")).toBeFalse();
      expect(isValidDateNativeStr("2023-02-29")).toBeFalse();
      expect(isValidDateNativeStr("2024-13-01")).toBeFalse();
      expect(isValidDateNativeStr("2024-01-32")).toBeFalse();
    });
    it("should reject two-digit years", () => {
      expect(isValidDateNativeStr("24-08-14")).toBeFalse();
    });
    it("should reject other formats", () => {
      expect(isValidDateNativeStr(dateStr)).toBeFalse();
      expect(isValidDateNativeStr(dateISO)).toBeFalse();
      expect(isValidDateNativeStr("2024/08/14")).toBeFalse();
      expect(isValidDateNativeStr("invalid")).toBeFalse();
      expect(isValidDateNativeStr("")).toBeFalse();
    });
    it("should reject non-string values", () => {
      expect(isValidDateNativeStr(null)).toBeFalse();
      expect(isValidDateNativeStr(undefined)).toBeFalse();
      expect(isValidDateNativeStr(localDate())).toBeFalse();
      expect(isValidDateNativeStr(20240814)).toBeFalse();
    });
  });

  describe("isValidDateISO", () => {
    it("should accept valid ISO strings", () => {
      expect(isValidDateISO(dateISO)).toBeTrue();
      expect(isValidDateISO("2024-08-14T00:00:00Z")).toBeTrue();
      expect(isValidDateISO("2024-08-14T10:30:00+02:00")).toBeTrue();
      expect(isValidDateISO(dateToDateISO(localDate()))).toBeTrue();
    });
    it("should reject native date strings", () => {
      expect(isValidDateISO(dateNativeStr)).toBeFalse();
    });
    it("should reject invalid strings", () => {
      expect(isValidDateISO("invalid")).toBeFalse();
      expect(isValidDateISO("")).toBeFalse();
      expect(isValidDateISO(dateStr)).toBeFalse();
      expect(isValidDateISO("2024-13-45T10:30:00")).toBeFalse();
    });
    it("should reject non-string values", () => {
      expect(isValidDateISO(null)).toBeFalse();
      expect(isValidDateISO(undefined)).toBeFalse();
      expect(isValidDateISO(localDate())).toBeFalse();
      expect(isValidDateISO(20240814)).toBeFalse();
    });
  });

  describe("normalizeToDateISO", () => {
    it("should normalize a date", () => {
      expect(normalizeToDateISO(localDate())).toMatch(isoPattern);
    });
    it("should normalize a native date string", () => {
      expect(normalizeToDateISO(dateNativeStr)).toMatch(midnightIsoPattern);
    });
    it("should normalize a dd/MM/yyyy string", () => {
      expect(normalizeToDateISO(dateStr)).toMatch(midnightIsoPattern);
    });
    it("should return an ISO string as is", () => {
      expect(normalizeToDateISO(dateISO)).toBe(dateISO);
    });
    it("should return null for invalid or nullish values", () => {
      expect(normalizeToDateISO("invalid")).toBeNull();
      expect(normalizeToDateISO(new Date("invalid"))).toBeNull();
      expect(normalizeToDateISO(null)).toBeNull();
    });
  });

  describe("normalizeToDateStr", () => {
    it("should normalize a date", () => {
      expect(normalizeToDateStr(localDate())).toBe(dateStr);
    });
    it("should return a dd/MM/yyyy string as is", () => {
      expect(normalizeToDateStr(dateStr)).toBe(dateStr);
    });
    it("should normalize an ISO string", () => {
      expect(normalizeToDateStr(dateISO)).toBe(dateStr);
    });
    it("should normalize a native date string", () => {
      expect(normalizeToDateStr(dateNativeStr)).toBe(dateStr);
    });
    it("should return null for invalid or nullish values", () => {
      expect(normalizeToDateStr("invalid")).toBeNull();
      expect(normalizeToDateStr(new Date("invalid"))).toBeNull();
      expect(normalizeToDateStr(null)).toBeNull();
    });
  });

  describe("normalizeToDate", () => {
    it("should return a valid date as is", () => {
      const date = localDate();
      expect(normalizeToDate(date)).toBe(date);
    });
    it("should normalize a native date string", () => {
      expectSameDay(normalizeToDate(dateNativeStr));
    });
    it("should normalize an ISO string", () => {
      const date = normalizeToDate(dateISO);
      expectSameDay(date);
      expect(date?.getHours()).toBe(10);
    });
    it("should normalize a dd/MM/yyyy string", () => {
      expectSameDay(normalizeToDate(dateStr));
    });
    it("should return null for invalid or nullish values", () => {
      expect(normalizeToDate("invalid")).toBeNull();
      expect(normalizeToDate(new Date("invalid"))).toBeNull();
      expect(normalizeToDate(null)).toBeNull();
    });
  });

  describe("normalizeToDateNativeStr", () => {
    it("should return a native date string as is", () => {
      expect(normalizeToDateNativeStr(dateNativeStr)).toBe(dateNativeStr);
    });
    it("should normalize a date", () => {
      expect(normalizeToDateNativeStr(localDate())).toBe(dateNativeStr);
    });
    it("should normalize a dd/MM/yyyy string", () => {
      expect(normalizeToDateNativeStr(dateStr)).toBe(dateNativeStr);
    });
    it("should normalize an ISO string", () => {
      expect(normalizeToDateNativeStr(dateISO)).toBe(dateNativeStr);
    });
    it("should return null for invalid or nullish values", () => {
      expect(normalizeToDateNativeStr("invalid")).toBeNull();
      expect(normalizeToDateNativeStr(new Date("invalid"))).toBeNull();
      expect(normalizeToDateNativeStr(null)).toBeNull();
    });
  });

  describe("normalizers round trips", () => {
    it("should keep the same day across every format", () => {
      const inputs = [localDate(), dateStr, dateNativeStr, dateISO];
      inputs.forEach((input) => {
        expect(normalizeToDateStr(input)).toBe(dateStr);
        expect(normalizeToDateNativeStr(input)).toBe(dateNativeStr);
        expect(normalizeToDateISO(input)).toStartWith(dateNativeStr);
        expectSameDay(normalizeToDate(input));
      });
    });
  });

  describe("dateFormatters", () => {
    it("should map each format to its normalizer", () => {
      expect(dateFormatters.iso).toBe(normalizeToDateISO);
      expect(dateFormatters.native).toBe(normalizeToDateNativeStr);
      expect(dateFormatters["dd/mm/yyyy"]).toBe(normalizeToDateStr);
    });
    it("should format a date using each formatter", () => {
      expect(dateFormatters.iso(localDate())).toMatch(isoPattern);
      expect(dateFormatters.native(localDate())).toBe(dateNativeStr);
      expect(dateFormatters["dd/mm/yyyy"](localDate())).toBe(dateStr);
    });
    it("should return null for nullish values", () => {
      expect(dateFormatters.iso(null)).toBeNull();
      expect(dateFormatters.native(null)).toBeNull();
      expect(dateFormatters["dd/mm/yyyy"](null)).toBeNull();
    });
  });
});
