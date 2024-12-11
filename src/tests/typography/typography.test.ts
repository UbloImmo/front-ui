import { describe, expect, it } from "bun:test";

import { testLenghts } from "../css.test";

import { buildTypographyWeightMap } from "@/typography/typogaphy.weight";
import { typographyFontFace, linkFontFace } from "@/typography/typography.font";
import {
  typographyTextDecoration,
  mobileFontSize,
  defaultTypographyProps,
  sanitizeTypographyProps,
  buildTypographyStyle,
} from "@/typography/typography.styles";
import { cssRem } from "@utils";

import type { AnyTypographyProps, TextProps, TypographyProps } from "@types";

describe("typography", () => {
  describe("font", () => {
    it("should assign font", () => {
      expect(typographyFontFace).toBeDefined();
      expect(typographyFontFace).toBeFunction();
      expect(() => typographyFontFace()).not.toThrow();
      expect(typographyFontFace()).toBeString();
    });

    it("should link font face", () => {
      expect(linkFontFace).toBeDefined();
      expect(linkFontFace).toBeFunction();
      expect(() => linkFontFace()).not.toThrow();
      expect(linkFontFace()).toBeObject();
    });
  });

  describe("styles", () => {
    it("should build weight map", () => {
      expect(buildTypographyWeightMap).toBeDefined();
      expect(buildTypographyWeightMap).toBeFunction();
      expect(() => buildTypographyWeightMap()).not.toThrow();
      expect(buildTypographyWeightMap()).toBeObject();
      expect(buildTypographyWeightMap()).not.toBeEmptyObject();
      expect(buildTypographyWeightMap()).toContainKeys([
        "bold",
        "medium",
        "regular",
      ]);
    });

    it("should format text decorations", () => {
      const underlineProps: Pick<
        TypographyProps,
        "underline" | "overline" | "lineThrough"
      > = { underline: true };
      const lineThroughProps: Pick<
        TypographyProps,
        "underline" | "overline" | "lineThrough"
      > = { lineThrough: true };
      const noProps: Pick<
        TypographyProps,
        "underline" | "overline" | "lineThrough"
      > = {};
      const allProps: Pick<
        TypographyProps,
        "underline" | "overline" | "lineThrough"
      > = {
        underline: true,
        lineThrough: false,
        overline: true,
      };
      expect(typographyTextDecoration).toBeDefined();
      expect(typographyTextDecoration).toBeFunction();
      expect(() => typographyTextDecoration(noProps)).not.toThrow();
      expect(typographyTextDecoration(noProps)).toBeString();
      expect(typographyTextDecoration(noProps)).toBe("none");
      expect(typographyTextDecoration(underlineProps)).toInclude("underline");
      expect(typographyTextDecoration(lineThroughProps)).toInclude(
        "line-through"
      );
      expect(typographyTextDecoration(allProps)).toInclude(
        "underline overline"
      );
    });

    it("should scale font sizes for mobile", () => {
      expect(mobileFontSize).toBeDefined();
      expect(mobileFontSize).toBeFunction();
      expect(() => mobileFontSize("10rem")).not.toThrow();
      expect(mobileFontSize("10rem")).toBeString();
      expect(mobileFontSize(testLenghts.cssRem.int)).toBe(
        cssRem(testLenghts.rem.int + 0.125)
      );
    });

    describe("props sanitization", () => {
      const defaultProps: Required<AnyTypographyProps> = {
        ...defaultTypographyProps,
        size: "m",
      };

      it("should be a function", () => {
        expect(sanitizeTypographyProps).toBeDefined();
        expect(sanitizeTypographyProps).toBeFunction();
      });

      it("should assign default missing props", () => {
        const noProps = {};
        expect(() =>
          sanitizeTypographyProps(defaultProps, noProps)
        ).not.toThrow();
        expect(sanitizeTypographyProps(defaultProps, noProps)).toBeObject();
        expect(
          sanitizeTypographyProps(defaultProps, noProps)
        ).not.toBeEmptyObject();
        expect(sanitizeTypographyProps(defaultProps, noProps)).toContainKeys([
          "size",
          "weight",
          "color",
          "italic",
          "underline",
          "overline",
          "lineThrough",
          "uppercase",
        ]);
        expect(sanitizeTypographyProps(defaultProps, noProps)).toEqual(
          defaultProps
        );
      });

      it("sould correct invalid size", () => {
        const invalidSizeProps = {
          ...defaultProps,
          size: "invalid size",
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Need to ingore to test invalid size
        expect(sanitizeTypographyProps(defaultProps, invalidSizeProps)).toEqual(
          defaultProps
        );
      });

      it("should correct invalid weight", () => {
        const invalidWeightProps = {
          ...defaultProps,
          weight: "invalid weight",
        };
        expect(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore Need to ingore to test invalid weight
          sanitizeTypographyProps(defaultProps, invalidWeightProps)
        ).toEqual(defaultProps);
      });

      it("should accept valid props", () => {
        const validProps: Required<AnyTypographyProps> = {
          size: "h1",
          color: "primary-base",
          italic: true,
          underline: true,
          overline: true,
          uppercase: true,
          lineThrough: true,
          weight: "medium",
          important: false,
          children: null,
          className: null,
          ellipsis: false,
          align: "left",
          fill: true,
          noWrap: true,
        };
        expect(sanitizeTypographyProps(defaultProps, validProps)).toEqual(
          validProps
        );
      });
    });
  });

  describe("style build", () => {
    it("should build style for text component", () => {
      const defaultProps: Required<AnyTypographyProps> = {
        ...defaultTypographyProps,
        size: "m",
      };
      const validProps: TextProps = {
        size: "m",
        color: "primary-base",
        italic: true,
        underline: true,
        overline: true,
        lineThrough: true,
      };
      expect(buildTypographyStyle).toBeDefined();
      expect(buildTypographyStyle).toBeFunction();
      expect(() => buildTypographyStyle(defaultProps)).not.toThrow();
      expect(buildTypographyStyle(defaultProps)).toBeFunction();
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Don't want to mock styled-components execution context
        buildTypographyStyle(defaultProps)(validProps)
      ).not.toThrow();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Don't want to mock styled-components execution context
      expect(buildTypographyStyle(defaultProps)(validProps)).toBeObject();
    });
  });
});
