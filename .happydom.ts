import { GlobalRegistrator } from "@happy-dom/global-registrator";

/**
 * Exposes dom global variables to bun:test and thus
 * enables `@testing-library/react` to function without issues
 */
GlobalRegistrator.register();

/**
 * happy-dom does not implement the web animations api (`Element.animate`)
 * Stubs it with a no-op animation so components relying on it can render in tests
 */
if (!("animate" in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, "animate", {
    configurable: true,
    value: () => ({ cancel: () => {}, onfinish: null }),
  });
}
