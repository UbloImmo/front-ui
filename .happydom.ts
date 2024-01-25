import { GlobalRegistrator } from "@happy-dom/global-registrator";

/**
 * Exposes dom global variables to bun:test and thus
 * enables `@testing-library/react` to function without issues
 */
GlobalRegistrator.register();
