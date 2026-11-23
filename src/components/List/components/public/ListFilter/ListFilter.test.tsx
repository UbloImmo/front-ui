import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { ListFilter } from "./ListFilter.component";

import { Icon } from "@/components/Icon";
import {
  filterData,
  filterOptionData,
  filterOptionMatch,
  type Filter,
} from "@/components/List/modules";

/**
 * Renders an icon alone with the same color as in ListFilter & returns its svg content,
 * to compare it with the icon rendered by the component
 *
 * @remarks Custom icons put their color on each path, so the color must match
 */
const getIconPaths = async (name: "Lock" | "CircleDashed"): Promise<string> => {
  const { findByTestId, unmount } = render(
    <Icon name={name} color="gray-500" />
  );
  const paths = (await findByTestId("icon")).innerHTML;
  unmount();
  return paths;
};

/**
 * Waits for the lazy-loaded icon displayed next to the filter's empty label
 */
const findEmptyStateIconPaths = (emptyLabel: HTMLElement): Promise<string> =>
  waitFor(() => {
    const icon = emptyLabel.parentElement?.querySelector(
      '[data-testid="icon"]'
    );
    if (!icon) throw new Error("Icon not loaded yet");
    return icon.innerHTML;
  });

type MockData = { value: number };

const option = filterOptionData(
  "Option",
  filterOptionMatch<MockData>("value", "=", 0)
);

const mockFilter = (
  overrides: Partial<Filter<MockData>> = {}
): Filter<object> =>
  ({
    ...filterData("Filter", [option]),
    options: [{ ...option, select: mock(() => {}), unselect: mock(() => {}) }],
    active: false,
    selectedOptions: [],
    clear: mock(() => {}),
    selectAll: mock(() => {}),
    ...overrides,
  }) as Filter<object>;

describe("ListFilter", () => {
  afterEach(() => {
    cleanup();
  });

  it("should open on click when enabled", () => {
    const onOpened = mock(() => {});
    const { getByTestId } = render(
      <ListFilter filter={mockFilter()} onOpened={onOpened} />
    );
    fireEvent.click(getByTestId("list-filter-label-container"));
    expect(onOpened).toHaveBeenCalled();
  });

  it("should not open on click when disabled", () => {
    const onOpened = mock(() => {});
    const { getByTestId } = render(
      <ListFilter filter={mockFilter({ disabled: true })} onOpened={onOpened} />
    );
    fireEvent.click(getByTestId("list-filter-label-container"));
    expect(onOpened).not.toHaveBeenCalled();
  });

  it("should wrap the header in a focusable tooltip when disabled with a tooltip", () => {
    const { getByTestId, queryByTestId } = render(
      <ListFilter
        filter={mockFilter({ disabled: true, disabledTooltip: "Unavailable" })}
      />
    );
    expect(queryByTestId("tooltip-wrapper")).not.toBeNull();
    expect(
      getByTestId("list-filter-label-container").getAttribute("tabindex")
    ).toBe("0");
  });

  it("should not render a tooltip when disabled without a tooltip", () => {
    const { getByTestId, queryByTestId } = render(
      <ListFilter filter={mockFilter({ disabled: true })} />
    );
    expect(queryByTestId("tooltip-wrapper")).toBeNull();
    expect(
      getByTestId("list-filter-label-container").getAttribute("tabindex")
    ).toBeNull();
  });

  it("should display a lock icon when disabled", async () => {
    const lockPaths = await getIconPaths("Lock");
    const { container } = render(
      <ListFilter filter={mockFilter({ disabled: true })} />
    );
    const emptyLabel = container.querySelector<HTMLElement>(
      '[data-testid~="filter-empty-label"]'
    );
    expect(emptyLabel).not.toBeNull();
    expect(await findEmptyStateIconPaths(emptyLabel as HTMLElement)).toBe(
      lockPaths
    );
  });

  it("should display the dashed circle icon when enabled", async () => {
    const circlePaths = await getIconPaths("CircleDashed");
    const { container } = render(<ListFilter filter={mockFilter()} />);
    const emptyLabel = container.querySelector<HTMLElement>(
      '[data-testid~="filter-empty-label"]'
    );
    expect(emptyLabel).not.toBeNull();
    expect(await findEmptyStateIconPaths(emptyLabel as HTMLElement)).toBe(
      circlePaths
    );
  });
});
