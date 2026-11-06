import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { ListFilterOptionItem } from "./ListFilterOptionItem.component";

import {
  filterOptionData,
  filterOptionMatch,
} from "@/components/List/modules/FilterOption/FilterOption.data";

import type {
  FilterOption,
  FilterOptionConfig,
} from "@/components/List/modules";

type MockData = { value: number };

const mockOption = (
  label: string,
  config: FilterOptionConfig = {}
): FilterOption<MockData> => ({
  ...filterOptionData(
    label,
    filterOptionMatch<MockData>("value", "=", 0),
    config
  ),
  select: mock(() => {}),
  unselect: mock(() => {}),
});

describe("ListFilterOptionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render an icon & a text by default", () => {
    const { queryByTestId, queryByText } = render(
      <ListFilterOptionItem option={mockOption("Option")} />
    );
    expect(queryByTestId("badge")).toBeNull();
    expect(queryByText("Option")).not.toBeNull();
  });

  it("should render the option as a badge with its icon", () => {
    const { getByTestId } = render(
      <ListFilterOptionItem
        option={mockOption("Catégorie", {
          badge: true,
          color: "mantis",
          icon: "Tag",
        })}
      />
    );
    expect(getByTestId("badge").childElementCount).toBe(2);
  });

  it("should render a badge without icon when none is provided", () => {
    const { getByTestId } = render(
      <ListFilterOptionItem
        option={mockOption("Catégorie", { badge: true, color: "mantis" })}
      />
    );
    expect(getByTestId("badge").childElementCount).toBe(1);
  });

  it("should keep the checkbox in multi mode", () => {
    const { queryByTestId } = render(
      <ListFilterOptionItem
        multi
        option={mockOption("Catégorie", { badge: true })}
      />
    );
    expect(queryByTestId("checkbox")).not.toBeNull();
  });
});
