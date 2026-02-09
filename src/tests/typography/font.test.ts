import { objectValues } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import { fontFace, fontFamily } from "@/typography/font.utils";
import { DMMono, Gilroy } from "@/typography/fonts";

import type { FontFaceDeclaration } from "@types";

const fontData: FontFaceDeclaration = {
  fontFamily: "test",
  src: "font-src-url.com",
  format: "opentype",
  weight: 500,
};

describe("font", () => {
  describe("fontFace", () => {
    it("should be a function", () => {
      expect(fontFace).toBeFunction();
      expect(fontFace).not.toThrow();
    });
    it("should return a string", () => {
      expect(fontFace(fontData)).toBeString();
    });
    it("should return a valid font face", () => {
      const fontFaceStr = fontFace(fontData);
      objectValues(fontData)
        .map(String)
        .forEach((fontValue) => {
          expect(fontFaceStr).toInclude(fontValue);
        });
    });
  });

  describe("fontFamily", () => {
    it("should be a function", () => {
      expect(fontFamily).toBeFunction();
      expect(fontFamily).not.toThrow();
    });
    it("should return a function", () => {
      expect(fontFamily(fontData)).toBeFunction();
    });
    it("should return a fontFace constructor", () => {
      expect(fontFamily(fontData)).toBeFunction();
      expect(fontFamily(fontData)).not.toThrow();
      expect(fontFamily(fontData)([])).toBeString();
    });
    it("should return a valid font family", () => {
      const fontFamilyStr = fontFamily(fontData)([fontData, fontData]);
      objectValues(fontData)
        .map(String)
        .forEach((fontValue) => {
          expect(fontFamilyStr).toIncludeRepeated(fontValue, 2);
        });
    });
  });

  describe("Gilroy", () => {
    it("should be a valid font family", () => {
      expect(Gilroy).toBeFunction();
      expect(Gilroy).not.toThrow();
      expect(Gilroy()).toString();
    });
  });

  describe("DMMono", () => {
    it("should be a valid font family", () => {
      expect(DMMono).toBeFunction();
      expect(DMMono).not.toThrow();
      expect(DMMono()).toBeString();
    });
  });
});
