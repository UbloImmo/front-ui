import { expect, mock } from "bun:test";

import { Collapsible } from "./Collapsible.layout";

import { testComponentFactory } from "@/tests";

const testCollapsible = testComponentFactory("Collapsible", Collapsible);
const testId = "collapsible";

const subCollapsible = {
  ...Collapsible.__DEFAULT_PROPS,
  children: "Collapsible children",
};

testCollapsible(Collapsible.__DEFAULT_PROPS)(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

testCollapsible({ ...Collapsible.__DEFAULT_PROPS, subCollapsibles: null })(
  "should not expand when no subCollapsibles",
  async ({ queryByTestId }, { click }) => {
    const collapsibleCaret = queryByTestId(
      "collapsible-caret"
    ) as HTMLDivElement;
    expect(collapsibleCaret).not.toBeNull();
    expect(queryByTestId(testId)).not.toBeNull();

    await click(collapsibleCaret);

    expect(collapsibleCaret.getAttribute("aria-expanded")).toBe("false");
  }
);

const onOpenChange = mock(() => {});

testCollapsible({
  ...Collapsible.__DEFAULT_PROPS,
  onOpenChange,
  subCollapsibles: [subCollapsible, subCollapsible],
})(
  "should update onOpenChange on click",
  async ({ queryByTestId }, { click }) => {
    const collapsibleCaret = queryByTestId(
      "collapsible-caret"
    ) as HTMLDivElement;
    expect(collapsibleCaret).not.toBeNull();
    expect(queryByTestId(testId)).not.toBeNull();

    await click(collapsibleCaret);

    expect(onOpenChange).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  }
);
