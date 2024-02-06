import { describe, it, expect } from "bun:test";
import { svgTextNodeToTsx, transformSvgs } from "./svg.transformer";
import { exportSvgFiles } from "./svg.exporter";

describe("svg to tsx conversion", () => {
  describe("transformer", () => {
    it("should be a function", () => {
      expect(transformSvgs).toBeDefined();
      expect(transformSvgs).toBeFunction();
      expect(svgTextNodeToTsx).toBeDefined();
      expect(svgTextNodeToTsx).toBeFunction();
    });

    it("should not throw", () => {
      expect(async () => transformSvgs()).not.toThrow();
      expect(() =>
        svgTextNodeToTsx({ type: "text", value: "value" })
      ).not.toThrow();
    });
  });

  describe("exporter", () => {
    it("should be a function", () => {
      expect(exportSvgFiles).toBeDefined();
      expect(exportSvgFiles).toBeFunction();
    });
  });
});
