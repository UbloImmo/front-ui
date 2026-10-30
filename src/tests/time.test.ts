import { describe, expect, it } from "bun:test";

import { TimeStr } from "@types";
import {
  formatTimePart,
  formatTimeSplit,
  isTimeStr,
  makeTimeSlots,
  parseTimeStr,
  makeTimeSlotMap,
} from "@utils";

describe("TimePicker utils", () => {
  describe("isTimeStr", () => {
    it("should accept valid time strings", () => {
      expect(isTimeStr("00:00")).toBeTrue();
      expect(isTimeStr("09:05")).toBeTrue();
      expect(isTimeStr("12:30")).toBeTrue();
      expect(isTimeStr("23:59")).toBeTrue();
    });
    it("should reject non-string and empty values", () => {
      expect(isTimeStr(null)).toBeFalse();
      expect(isTimeStr(undefined)).toBeFalse();
      expect(isTimeStr(1230)).toBeFalse();
      expect(isTimeStr({})).toBeFalse();
      expect(isTimeStr("")).toBeFalse();
    });
    it("should reject strings without a separator", () => {
      expect(isTimeStr("1230")).toBeFalse();
      expect(isTimeStr("12-30")).toBeFalse();
    });
    it("should reject missing hour or minute parts", () => {
      expect(isTimeStr(":30")).toBeFalse();
      expect(isTimeStr("12:")).toBeFalse();
      expect(isTimeStr(":")).toBeFalse();
    });
    it("should reject non-numeric parts", () => {
      expect(isTimeStr("ab:cd")).toBeFalse();
      expect(isTimeStr("12:cd")).toBeFalse();
      expect(isTimeStr("ab:30")).toBeFalse();
    });
    it("should reject strings with trailing or surrounding characters", () => {
      expect(isTimeStr("12abc:30xyz")).toBeFalse();
      expect(isTimeStr("12:30:45")).toBeFalse();
      expect(isTimeStr("12.7:30")).toBeFalse();
      expect(isTimeStr(" 12:30")).toBeFalse();
      expect(isTimeStr("12:30 ")).toBeFalse();
      expect(isTimeStr("123:30")).toBeFalse();
      expect(isTimeStr("12:300")).toBeFalse();
      expect(isTimeStr("12:30\n")).toBeFalse();
    });
    it("should reject non zero-padded parts", () => {
      expect(isTimeStr("1:30")).toBeFalse();
      expect(isTimeStr("12:5")).toBeFalse();
      expect(isTimeStr("1:5")).toBeFalse();
    });
    it("should reject signed or non-ascii digits", () => {
      expect(isTimeStr("+1:30")).toBeFalse();
      expect(isTimeStr("12:+5")).toBeFalse();
      expect(isTimeStr("１２:３０")).toBeFalse();
    });
    it("should reject out-of-range parts", () => {
      expect(isTimeStr("24:00")).toBeFalse();
      expect(isTimeStr("12:60")).toBeFalse();
      expect(isTimeStr("-1:30")).toBeFalse();
      expect(isTimeStr("12:-1")).toBeFalse();
    });
  });

  describe("parseTimeStr", () => {
    it("should parse valid time strings", () => {
      expect(parseTimeStr("00:00")).toEqual({ hour: 0, minute: 0 });
      expect(parseTimeStr("09:05")).toEqual({ hour: 9, minute: 5 });
      expect(parseTimeStr("23:59")).toEqual({ hour: 23, minute: 59 });
    });
    it("should return null for nullish values", () => {
      expect(parseTimeStr(null)).toBeNull();
      expect(parseTimeStr(undefined as unknown as null)).toBeNull();
    });
    it("should return null for invalid time strings", () => {
      expect(parseTimeStr("" as TimeStr)).toBeNull();
      expect(parseTimeStr("24:00" as TimeStr)).toBeNull();
      expect(parseTimeStr("12:60" as TimeStr)).toBeNull();
      expect(parseTimeStr("ab:cd" as TimeStr)).toBeNull();
      expect(parseTimeStr("1230" as TimeStr)).toBeNull();
    });
  });

  describe("makeTimeSlots", () => {
    it("should generate a full day without min and max", () => {
      const slots = makeTimeSlots(null, null, 15);
      expect(slots).toHaveLength(24);
      expect(slots[0]).toEqual({ hour: 0, minutes: [0, 15, 30, 45] });
      expect(slots[23]).toEqual({ hour: 23, minutes: [0, 15, 30, 45] });
    });
    it("should respect the step", () => {
      const slots = makeTimeSlots(null, null, 30);
      slots.forEach((slot) => expect(slot.minutes).toEqual([0, 30]));
    });
    it("should clamp the step between 1 and 60", () => {
      expect(makeTimeSlots(null, null, 0)[0].minutes).toHaveLength(60);
      expect(makeTimeSlots(null, null, -10)[0].minutes).toHaveLength(60);
      expect(makeTimeSlots(null, null, 1000)[0].minutes).toEqual([0]);
    });
    it("should fall back to the minimum step for NaN steps", () => {
      expect(makeTimeSlots(null, null, NaN)[0].minutes).toHaveLength(60);
    });
    it("should fall back to the minimum step for non-integer steps", () => {
      const minutes = makeTimeSlots(null, null, 7.5)[0].minutes;
      expect(minutes).toHaveLength(60);
      minutes.forEach((minute) => expect(Number.isInteger(minute)).toBeTrue());
    });
    it("should fall back to the minimum step for infinite steps", () => {
      expect(makeTimeSlots(null, null, Infinity)[0].minutes).toHaveLength(60);
      expect(makeTimeSlots(null, null, -Infinity)[0].minutes).toHaveLength(60);
    });
    it("should restrict minutes on the min and max hours", () => {
      const slots = makeTimeSlots(
        { hour: 9, minute: 30 },
        { hour: 11, minute: 15 },
        15
      );
      expect(slots).toEqual([
        { hour: 9, minutes: [30, 45] },
        { hour: 10, minutes: [0, 15, 30, 45] },
        { hour: 11, minutes: [0, 15] },
      ]);
    });
    it("should handle a single-hour range", () => {
      const slots = makeTimeSlots(
        { hour: 9, minute: 10 },
        { hour: 9, minute: 40 },
        10
      );
      expect(slots).toEqual([{ hour: 9, minutes: [10, 20, 30, 40] }]);
    });
    it("should only apply a min or a max when the other is missing", () => {
      const fromMin = makeTimeSlots({ hour: 22, minute: 30 }, null, 30);
      expect(fromMin).toEqual([
        { hour: 22, minutes: [30] },
        { hour: 23, minutes: [0, 30] },
      ]);
      const toMax = makeTimeSlots(null, { hour: 1, minute: 30 }, 30);
      expect(toMax).toEqual([
        { hour: 0, minutes: [0, 30] },
        { hour: 1, minutes: [0, 30] },
      ]);
    });
    it("should wrap around midnight when min hour is after max hour", () => {
      const slots = makeTimeSlots(
        { hour: 22, minute: 30 },
        { hour: 1, minute: 30 },
        30
      );
      expect(slots.map(({ hour }) => hour)).toEqual([22, 23, 0, 1]);
      expect(slots[0].minutes).toEqual([30]);
      expect(slots[1].minutes).toEqual([0, 30]);
      expect(slots[2].minutes).toEqual([0, 30]);
      expect(slots[3].minutes).toEqual([0, 30]);
    });
    it("should allow the whole day except the gap when same hour but min minute is after max minute", () => {
      const slots = makeTimeSlots(
        { hour: 16, minute: 45 },
        { hour: 16, minute: 25 },
        10
      );
      expect(slots).toHaveLength(24);
      slots.forEach((slot, index) => {
        expect(slot.hour).toBe(index);
        if (index === 16) return;
        expect(slot.minutes).toEqual([0, 10, 20, 30, 40, 50]);
      });
      expect(slots[16].minutes).toEqual([0, 10, 20, 45, 55]);
    });
    it("should clamp out-of-range bounds", () => {
      const slots = makeTimeSlots(
        { hour: -5, minute: -5 },
        { hour: 99, minute: 99 },
        30
      );
      expect(slots).toHaveLength(24);
      expect(slots[0].minutes).toEqual([0, 30]);
      expect(slots[23].minutes).toEqual([0, 30]);
    });
    it("should fall back to the default bounds for NaN bounds", () => {
      const slots = makeTimeSlots(
        { hour: NaN, minute: NaN },
        { hour: NaN, minute: NaN },
        30
      );
      expect(slots).toHaveLength(24);
      expect(slots[0].minutes).toEqual([0, 30]);
      expect(slots[23].minutes).toEqual([0, 30]);
    });
    it("should fall back to the default bounds for non-integer bounds", () => {
      const slots = makeTimeSlots(
        { hour: 9.5, minute: 10.5 },
        { hour: 11.5, minute: 20.5 },
        30
      );
      expect(slots).toHaveLength(24);
      expect(slots[0]).toEqual({ hour: 0, minutes: [0, 30] });
      expect(slots[23]).toEqual({ hour: 23, minutes: [0, 30] });
    });
    it("should fall back to the default bounds for infinite bounds", () => {
      const slots = makeTimeSlots(
        { hour: -Infinity, minute: -Infinity },
        { hour: Infinity, minute: Infinity },
        30
      );
      expect(slots).toHaveLength(24);
      expect(slots[0].minutes).toEqual([0, 30]);
      expect(slots[23].minutes).toEqual([0, 30]);
    });
  });

  describe("makeTimeSlotMap", () => {
    it("should return an empty map for no slots", () => {
      const map = makeTimeSlotMap([]);
      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBe(0);
    });
    it("should index slots by hour with a minute set", () => {
      const map = makeTimeSlotMap([
        { hour: 9, minutes: [0, 30] },
        { hour: 10, minutes: [15] },
      ]);
      expect(map.size).toBe(2);
      const nine = map.get(9);
      expect(nine?.hour).toBe(9);
      expect(nine?.minutes).toEqual([0, 30]);
      expect(nine?.minuteSet).toBeInstanceOf(Set);
      expect(nine?.minuteSet.has(30)).toBeTrue();
      expect(nine?.minuteSet.has(15)).toBeFalse();
      expect(map.get(10)?.minuteSet.has(15)).toBeTrue();
      expect(map.has(11)).toBeFalse();
    });
    it("should be compatible with makeTimeSlots output", () => {
      const map = makeTimeSlotMap(makeTimeSlots(null, null, 15));
      expect(map.size).toBe(24);
      expect(map.get(12)?.minuteSet.size).toBe(4);
    });
  });

  describe("formatTimePart", () => {
    it("should pad single digits with a leading zero", () => {
      expect(formatTimePart(0)).toBe("00");
      expect(formatTimePart(5)).toBe("05");
    });
    it("should not pad two-digit numbers", () => {
      expect(formatTimePart(10)).toBe("10");
      expect(formatTimePart(59)).toBe("59");
    });
  });

  describe("formatTimeSplit", () => {
    it("should format a time split as a time string", () => {
      expect(formatTimeSplit({ hour: 0, minute: 0 })).toBe("00:00");
      expect(formatTimeSplit({ hour: 9, minute: 5 })).toBe("09:05");
      expect(formatTimeSplit({ hour: 23, minute: 59 })).toBe("23:59");
    });
    it("should return null for nullish values", () => {
      expect(formatTimeSplit(null)).toBeNull();
    });
    it("should round-trip with parseTimeStr", () => {
      const time: TimeStr = "07:45";
      expect(formatTimeSplit(parseTimeStr(time))).toBe(time);
    });
  });
});
