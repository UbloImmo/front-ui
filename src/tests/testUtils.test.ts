import { describe, expect, it, mock } from "bun:test";
import { fakeFetchFactory, testPrimitives } from "../utils";
import { isUndefined, objectValues } from "@ubloimmo/front-util";

const responseMethodKeys = [
  "text",
  "json",
  "formData",
  "arrayBuffer",
  "blob",
] as const;

const responseDataKeys = [
  "ok",
  "redirected",
  "status",
  "statusText",
  "url",
  "type",
  "headers",
  "body",
  "bodyUsed",
] as const;

const responseKeys: (keyof Response)[] = [
  ...responseDataKeys,
  ...responseMethodKeys,
] as const;

describe("test utils", () => {
  describe("fetch fetch", () => {
    describe("factory", () => {
      it("should be a function", () => {
        expect(fakeFetchFactory).toBeDefined();
        expect(fakeFetchFactory).toBeFunction();
      });
      it("should not throw when a non-function body is provided", () => {
        objectValues(testPrimitives).forEach((primitive) => {
          expect(async () => await fakeFetchFactory(primitive)).not.toThrow();
        });
      });
      it("should not throw when a function body is provided", () => {
        objectValues(testPrimitives).forEach((primitive) => {
          const objectFn = mock(() => primitive);
          expect(async () => await fakeFetchFactory(objectFn)).not.toThrow();
          expect(objectFn).toHaveBeenCalled();
        });
      });
      it("should not throw when an async function body is provided", () => {
        objectValues(testPrimitives).forEach((primitive) => {
          expect(
            async () => await fakeFetchFactory(async () => await primitive)
          ).not.toThrow();
        });
      });
    });

    describe("generated fetch function", () => {
      it("should be a function", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(() => primitive);
            expect(fakeFetch).toBeDefined();
            expect(fakeFetch).toBeFunction();
          })
        );
      });
      it("should not throw", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(() => primitive);
            expect(async () => await fakeFetch("")).not.toThrow();
          })
        );
      });
      it("should return a complete response object", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(() => primitive);
            const response = await fakeFetch("");
            expect(response).toBeObject();
            expect(response).toContainKeys(responseKeys);
          })
        );
      });
      it("should return a response object which methods do not throw", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(() => primitive);
            const response = await fakeFetch("");
            expect(response).toBeObject();
            responseMethodKeys.forEach((key) => {
              const method = response[key];
              expect(method).toBeDefined();
              expect(method).toBeFunction();
              expect(async () => await method()).not.toThrow();
            });
          })
        );
      });
      it("should return a response which data fits the given options and body", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(primitive);
            const response = await fakeFetch("");
            expect(response).toBeObject();
            // text() method
            const text = await response.text();
            expect(text).toBeString();
            expect(text).toBe(
              isUndefined(primitive)
                ? String(primitive)
                : JSON.stringify(primitive)
            );
            // json() method
            const json = await response.json();
            expect(json).toEqual(primitive);
          })
        );
      });
      it("should return a clonable response object", async () => {
        await Promise.all(
          objectValues(testPrimitives).map(async (primitive) => {
            const fakeFetch = await fakeFetchFactory(() => primitive);
            const response = await fakeFetch("");
            expect(response).toBeObject();
            const clone = await response.clone();
            expect(clone).toBeObject();
            expect(clone).toEqual(response);
          })
        );
      });
    });
  });
});
