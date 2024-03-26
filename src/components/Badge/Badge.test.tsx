import { describe } from "bun:test";
import { componentTestFactory } from "src/tests";
import { Badge, defaultBadgeProps } from "./Badge.component";

describe("Badge", () => {
  componentTestFactory("Badge", "badge", Badge, defaultBadgeProps);
});
