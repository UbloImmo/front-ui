import { describe, expect, it, mock, type Mock } from "bun:test";

import { useListConfig } from "./ListContextConfig";
import {
  filterData,
  filterOptionData,
  filterOptionMatch,
  filterPresetData,
  useStaticDataProvider,
  type FilterConfig,
  type FilterData,
  type FilterDataMap,
  type FilterOptionMatch,
  type FilterPresetMap,
  type UseDataProviderFn,
} from "../../modules";
import {
  findFilterByIndexAndLabel,
  findFilterPresetByLabel,
  listConfigFilterPresetReducer,
  listConfigFilterReducer,
} from "../ListContext.utils";
import { useListConfigSearch } from "./ListContextConfig.search";

import { testHookFactory } from "@/tests";
import { arrayOf } from "@utils";

import type {
  UseListConfigFilterPresetReducerAction,
  UseListConfigFilterReducerAction,
} from "../ListContext.types";
import type { VoidFn } from "@ubloimmo/front-util";

type MockItem = {
  value: number;
  index: number;
  selected: boolean;
};

const mockItems: MockItem[] = arrayOf(
  100,
  (index): MockItem => ({
    index,
    value: index * 2,
    selected: Math.random() > 0.5,
  }),
);

const useMockDataProvider: UseDataProviderFn<MockItem> = (setData) =>
  useStaticDataProvider(mockItems, setData);

const testListConfigReducers = () => {
  describe("useListConfig", () => {
    describe("reducers", () => {
      describe("listConfigFilterReducer", () => {
        const map: FilterDataMap = new Map();
        const label = "filter";
        const config: FilterConfig = {
          index: 0,
        };
        const options = [
          filterOptionData("option", filterOptionMatch("value", ">", 2)),
        ];

        const filter = filterData(label, [], config, true);
        const loadedFilter = filterData(label, options, config, false);

        describe("findFilterByIndexAndLabel", () => {
          it("should be a function", () => {
            expect(findFilterByIndexAndLabel).toBeFunction();
          });

          it("should not throw", () => {
            expect(findFilterByIndexAndLabel).not.toThrow();
            // @ts-expect-error needed to test base case
            expect(findFilterByIndexAndLabel()).toBeNull();
          });

          it("should return null if the map is empty", () => {
            expect(findFilterByIndexAndLabel(map, filter)).toBeNull();
          });

          it("should return the filter if found", () => {
            expect(
              findFilterByIndexAndLabel(
                new Map([[filter.signature, filter]]),
                filter,
              ),
            ).toEqual(filter);
          });
        });

        it("should be a function", () => {
          expect(listConfigFilterReducer).toBeFunction();
        });

        it("should register a filter to the map", () => {
          const action: UseListConfigFilterReducerAction = ["register", filter];
          const result = listConfigFilterReducer(map, action);
          expect(result).toBeInstanceOf(Map);
          expect(result.size).toBe(1);
          expect(result.get(filter.signature)).toEqual(filter);
        });

        it("should update a filter in the map", () => {
          const action: UseListConfigFilterReducerAction = [
            "update",
            loadedFilter,
          ];
          const result = listConfigFilterReducer(map, action);
          expect(result).toBeInstanceOf(Map);
          expect(result.size).toBe(1);
          expect(result.get(loadedFilter.signature)).toEqual(loadedFilter);
        });
      });

      describe("listConfigFilterPresetReducer", () => {
        const map: FilterPresetMap = new Map();
        const label = "filterPreset";
        const options = [
          filterOptionData("option", filterOptionMatch("value", ">", 2)),
        ];
        const preset = filterPresetData(label, [], {}, true);
        const loadedPreset = filterPresetData(label, options, {}, false);

        describe("findFilterPresetByLabel", () => {
          it("should be a function", () => {
            expect(findFilterPresetByLabel).toBeFunction();
          });

          it("should not throw", () => {
            expect(findFilterPresetByLabel).not.toThrow();
            // @ts-expect-error needed to test base case
            expect(findFilterPresetByLabel()).toBeNull();
          });

          it("should return null if the map is empty", () => {
            expect(findFilterPresetByLabel(map, preset)).toBeNull();
          });
        });

        it("should be a function", () => {
          expect(listConfigFilterPresetReducer).toBeFunction();
        });

        it("should register a filter preset to the map", () => {
          const action: UseListConfigFilterPresetReducerAction = [
            "register",
            preset,
          ];
          const result = listConfigFilterPresetReducer(map, action);
          expect(result).toBeInstanceOf(Map);
          expect(result.size).toBe(1);
          expect(result.get(preset.signature)).toEqual(preset);
        });

        it("should update a filter preset in the map", () => {
          const action: UseListConfigFilterPresetReducerAction = [
            "update",
            loadedPreset,
          ];
          const result = listConfigFilterPresetReducer(map, action);
          expect(result).toBeInstanceOf(Map);
          expect(result.size).toBe(1);
          expect(result.get(loadedPreset.signature)).toEqual(loadedPreset);
        });
      });
    });
  });
};

const testListConfig = () => {
  type Hook = typeof useListConfig<MockItem>;
  type HookReturn = ReturnType<Hook>;
  type HookParams = Parameters<Hook>;
  const testHook = testHookFactory<HookParams, HookReturn, Hook>(
    "useListConfig",
    useListConfig<MockItem>,
  )(useMockDataProvider);

  testHook("should return a valid object containing a config", (result) => {
    expect(result).toBeObject();
    expect(result.config).toBeObject();
  });

  testHook("should store the provided dataProvider hook", (result) => {
    expect(result.config.useDataProvider).toBeFunction();
  });

  testHook(
    "should store and mutate the default operator",
    (result, _params, { getResult, rerender }) => {
      expect(result.config.operator).toBe("AND");
      expect(result.setOperator).toBeFunction();
      result.setOperator("OR");
      rerender();
      expect(getResult().config.operator).toBe("OR");
    },
  );

  testHook("should return an object containing sync methods", (result) => {
    expect(result.divider).toBeFunction();
    expect(result.match).toBeFunction();
    expect(result.matches).toBeFunction();
    expect(result.not).toBeFunction();
    expect(result.option).toBeFunction();
    expect(result.options).toBeFunction();
    expect(result.filter).toBeFunction();
    expect(result.filterPreset).toBeFunction();
  });

  testHook("should return an object containing async methods", (result) => {
    expect(result.async).toBeObject();
    expect(result.async.option).toBeFunction();
    expect(result.async.options).toBeFunction();
    expect(result.async.filter).toBeFunction();
    expect(result.async.filterPreset).toBeFunction();
  });

  testHook("should return a match from the match() method", (result) => {
    expect(result.match).toBeFunction();
    expect(() => result.match("index", ">", 2)).not.toThrow();
    const match = result.match("index", ">", 2);
    expect(match).toBeObject();
    expect(match.property).toBe("index");
    expect(match.comparison).toBe(">");
    expect(match.value).toBe(2);
  });

  testHook(
    "should return a list of matches from the matches() method",
    (result) => {
      expect(result.matches).toBeFunction();
      expect(() => result.matches("index", ">", [2, 4])).not.toThrow();
      const matches = result.matches("index", ">", [2, 4]);
      expect(matches).toBeArray();
      expect(matches.length).toBe(2);
      expect(matches[0].property).toBe("index");
      expect(matches[0].comparison).toBe(">");
      expect(matches[0].value).toBe(2);
      expect(matches[1].property).toBe("index");
      expect(matches[1].comparison).toBe(">");
      expect(matches[1].value).toBe(4);
    },
  );

  testHook("should invert a match from the not() method", (result) => {
    expect(result.not).toBeFunction();
    const match = result.match("index", ">", 2);
    expect(() => result.not(match)).not.toThrow();
    const invertedMatch = result.not(match);
    expect(invertedMatch).toBeObject();
    expect(invertedMatch.property).toBe(match.property);
    expect(invertedMatch.comparison).toBe("<");
    expect(invertedMatch.value).toBe(match.value);
  });

  testHook(
    "should create & return a divider from the divider() method",
    (result) => {
      expect(result.divider).toBeFunction();
      const divider = result.divider("test");
      expect(divider).toBeObject();
      expect(divider.label).toBe("test");
      expect(divider.kind).toBe("divider");
    },
  );

  testHook(
    "shuold create & register an option from the option() method",
    (result, _params, { getResult, rerender }) => {
      expect(result.option).toBeFunction();
      const match = result.match("selected", "=", true);
      const option = result.option("selected", match);
      expect(option).toBeObject();
      expect(option.label).toBe("selected");
      expect(option.matches).toEqual([match]);
      rerender();
      expect(getResult().config.options).toBeArray();
      expect(getResult().config.options?.length).toBe(1);
      expect(getResult().config.options?.[0]).toEqual(option);
    },
  );

  testHook(
    "should create & register multiple options from the options() method",
    (result, _params, { getResult, rerender }) => {
      expect(result.options).toBeFunction();
      const values = [15, 30, 45];
      const property = "value" as const;
      const comparison = ">=" as const;
      const options = result.options(
        property,
        comparison,
        values.map((value) => ({
          value,
          label: String(value),
        })),
      );
      expect(options).toBeArray();
      expect(options).toHaveLength(values.length);
      options.forEach((option, index) => {
        expect(option).toBeObject();
        expect(option.label).toBeString();
        expect(option.matches).toBeArray();
        expect(option.matches).toHaveLength(1);
        expect(option.matches[0].property).toBe(property);
        expect(option.matches[0].comparison).toBe(comparison);
        expect(option.matches[0].value).toBe(values[index]);
      });
      rerender();
      expect(getResult().config.options).toBeArray();
      expect(getResult().config.options).toEqual(options);
    },
  );

  testHook(
    "should create & register a filter from the filter() method",
    (result, _params, { getResult, rerender }) => {
      expect(result.filter).toBeFunction();
      const options = result.options(
        "value",
        ">=",
        [15, 30, 45].map((value) => ({
          value,
          label: String(value),
        })),
      );
      const divider = result.divider("divider");
      const label = "filter";
      const filter = result.filter(label, [
        options[0],
        divider,
        options[1],
        options[2].signature,
      ]);
      expect(filter).toBeObject();
      expect(filter.label).toBe(label);
      expect(filter.optionSignatures).toBeArray();
      expect(filter.optionSignatures).toEqual(
        options.map(({ signature }) => signature),
      );
      expect(filter.optionDividers).toBeArray();
      expect(filter.optionDividers).toHaveLength(1);
      expect(filter.optionDividers[0].label).toBe(divider.label);
      expect(filter.optionDividers[0].kind).toBe(divider.kind);
      expect(filter.optionDividers[0].beforeSignature).toBe(
        options[1].signature,
      );
      rerender();
      expect(getResult().config.filters).toBeArray();
      expect(getResult().config.filters).toEqual([filter]);
    },
  );

  testHook(
    "should create & register a filter preset from the filterPreset() method",
    (result, _params, { getResult, rerender }) => {
      expect(result.filterPreset).toBeFunction();
      const options = result.options(
        "selected",
        "=",
        [true, false].map((value) => ({
          value,
          label: String(value),
        })),
      );
      const label = "filterPreset";
      const filterPreset = result.filterPreset(label, options);
      expect(filterPreset).toBeObject();
      expect(filterPreset.label).toBe(label);
      expect(filterPreset.optionSignatures).toBeArray();
      expect(filterPreset.optionSignatures).toEqual(
        options.map(({ signature }) => signature),
      );
      rerender();
      expect(getResult().config.filterPresets).toBeArray();
      expect(getResult().config.filterPresets).toEqual([filterPreset]);
    },
  );

  testHook("should return valid async methods", (result) => {
    expect(result.async).toBeObject();
    expect(result.async.option).toBeFunction();
    expect(result.async.options).toBeFunction();
    expect(result.async.filter).toBeFunction();
    expect(result.async.filterPreset).toBeFunction();
  });

  testHook(
    "should create & register an option from the async.option() method",
    async (result, _params, { getResult, rerender }) => {
      expect(result.async.option).toBeFunction();
      const match = result.match("selected", "=", true);
      const label = "option";
      const matchGetter = () => Promise.resolve(match);
      const optionPromise = result.async.option(label, matchGetter);
      expect(optionPromise).resolves.toBeObject();
      const option = await optionPromise;
      expect(option).toBeObject();
      expect(option.label).toBe(label);
      expect(option.matches).toEqual([match]);
      rerender();
      expect(getResult().config.options).toBeArray();
      expect(getResult().config.options).toEqual([option]);
    },
  );

  global.console.error = mock(() => {});
  testHook(
    "should log an error and throw if the async.option() callback throws an error",
    async (result) => {
      expect(result.async.option).toBeFunction();
      const label = "option";
      const matchGetter = (): Promise<FilterOptionMatch<MockItem>> =>
        Promise.reject(new Error("test"));
      try {
        expect(await result.async.option(label, matchGetter)).toThrow();
        await result.async.option(label, matchGetter);
      } catch (error) {
        expect(global.console.error).toHaveBeenCalledTimes(2);
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe("test");
      }
      (global.console.error as Mock<VoidFn>).mockReset();
    },
  );
  testHook(
    "should create & register multiple options from the async.options() method",
    async (result, _, { getResult, rerender }) => {
      expect(result.async.options).toBeFunction();
      const optionsPromise = result.async.options("value", "=", () =>
        Promise.resolve(
          [5, 10, 15].map((value) => ({ value, label: String(value) })),
        ),
      );
      expect(optionsPromise).resolves.toBeArray();
      const options = await optionsPromise;
      expect(options).toBeArray();
      expect(options).toHaveLength(3);
      rerender();
      expect(getResult().config.options).toBeArray();
      expect(getResult().config.options).toEqual(options);
    },
  );

  testHook(
    "should log an error and return an empty array if the async.options() callback throws an error",
    async (result) => {
      expect(result.async.options).toBeFunction();
      const optionsPromise = result.async.options("value", "=", () =>
        Promise.reject(new Error("test")),
      );
      expect(optionsPromise).resolves.toBeArray();
      const options = await optionsPromise;
      expect(options).toBeArray();
      expect(options).toHaveLength(0);
      expect(global.console.error).toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
    },
  );

  testHook(
    "should create & register a filter from the async.filter() method",
    async (result) => {
      expect(result.async.filter).toBeFunction();
      const optionsPromise = result.async.options("value", "=", () =>
        Promise.resolve(
          [5, 10, 15].map((value) => ({ value, label: String(value) })),
        ),
      );
      const label = "filter";
      const filterPromise = result.async.filter(label, optionsPromise);
      expect(filterPromise).resolves.toBeObject();
      const filter = await filterPromise;
      expect(filter).toBeObject();
      expect(filter).not.toBeNull();
      expect((filter as FilterData).label).toBe(label);
      expect((filter as FilterData).optionSignatures).toEqual(
        (await optionsPromise).map(({ signature }) => signature),
      );
    },
  );

  testHook(
    "should log an error and return null if the async.filterPreset() callback throws an error",
    async (result) => {
      expect(result.async.filter).toBeFunction();
      const filterPromise = result.async.filter(
        "filter",
        Promise.reject(new Error("test")),
      );

      expect(filterPromise).resolves.toBeNull();
      expect(global.console.error).toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
    },
  );

  testHook(
    "should create & register a filter preset from the async.filterPreset() method",
    async (result) => {
      expect(result.async.filterPreset).toBeFunction();
      const optionsPromise = result.async.options("value", "=", () =>
        Promise.resolve(
          [5, 10, 15].map((value) => ({ value, label: String(value) })),
        ),
      );
      const label = "filterPreset";
      const filterPresetPromise = result.async.filterPreset(
        label,
        optionsPromise,
      );
      expect(filterPresetPromise).resolves.toBeObject();
      const filterPreset = await filterPresetPromise;
      expect(filterPreset).toBeObject();
      if (!filterPreset) {
        return;
      }
      expect(filterPreset.label).toBe(label);
      expect(filterPreset.optionSignatures).toEqual(
        (await optionsPromise).map(({ signature }) => signature),
      );
    },
  );

  testHook(
    "should log an error and return null if the async.filterPreset() callback throws an error",
    async (result) => {
      expect(result.async.filterPreset).toBeFunction();
      const filterPresetPromise = result.async.filterPreset(
        "filterPreset",
        Promise.reject(new Error("test")),
      );
      expect(filterPresetPromise).resolves.toBeNull();
      expect(global.console.error).toHaveBeenCalled();
      (global.console.error as Mock<VoidFn>).mockReset();
    },
  );

  testHook(
    "should configure the search params from the configureSearchParams() method",
    (result, _, { getResult, rerender }) => {
      expect(result.configureSearchParams).toBeFunction();
      const searchParams = {
        sync: true,
        readParams: null,
        writeParams: () => {},
      };
      result.configureSearchParams(searchParams);
      rerender();
      expect(getResult().config.searchParams).toEqual(searchParams);
    },
  );

  testHook(
    "should set the default operator from the setOperator() method",
    (result, _, { getResult, rerender }) => {
      expect(result.setOperator).toBeFunction();
      const operator = "AND";
      result.setOperator(operator);
      rerender();
      expect(getResult().config.operator).toBe(operator);
    },
  );
};

const testListConfigSearch = () => {
  type Hook = typeof useListConfigSearch<MockItem>;
  type HookReturn = ReturnType<Hook>;
  type HookParams = Parameters<Hook>;

  const testHook = testHookFactory<HookParams, HookReturn, Hook>(
    "useListConfigSearch",
    useListConfigSearch<MockItem>,
  )();

  testHook(
    "should return a valid object containing the search config & setters",
    (result) => {
      expect(result).toBeObject();
      expect(result).toHaveProperty("searchConfig");
      expect(result.searchConfig).toBeObject();
      expect(result.searchConfig).toHaveProperty("properties");
      expect(result.searchConfig).toHaveProperty("strategy");
      expect(result.searchConfig).toHaveProperty("initialQuery");
      expect(result).toHaveProperty("setters");
      expect(result.setters).toBeObject();
      expect(result.setters).toHaveProperty("properties");
      expect(result.setters).toHaveProperty("strategy");
      expect(result.setters).toHaveProperty("initialQuery");
    },
  );

  const properties = ["index" as const, "value" as const];
  const strategy = "startsWith";
  const initialQuery = "test";
  const debounceDelay = 1000;

  testHook(
    "should set the search config at once",
    (result, _params, { rerender, getResult }) => {
      expect(result.setters.set).toBeFunction();
      expect(result.setters.set).not.toThrow();
      result.setters.set({
        properties,
        strategy,
        initialQuery,
        debounceDelay,
      });
      rerender();
      expect(getResult().searchConfig).toEqual({
        properties,
        strategy,
        initialQuery,
        debounceDelay,
      });
    },
  );

  testHook(
    "should set the properties",
    (result, _params, { rerender, getResult }) => {
      expect(result.setters.properties).toBeFunction();
      result.setters.properties(properties);
      rerender();
      expect(getResult().searchConfig.properties).toEqual(properties);
    },
  );

  testHook(
    "should set the strategy",
    (result, _params, { rerender, getResult }) => {
      expect(result.setters.strategy).toBeFunction();
      result.setters.strategy(strategy);
      rerender();
      expect(getResult().searchConfig.strategy).toEqual(strategy);
    },
  );

  testHook(
    "should set the initial query",
    (result, _params, { rerender, getResult }) => {
      expect(result.setters.initialQuery).toBeFunction();
      result.setters.initialQuery(initialQuery);
      rerender();
      expect(getResult().searchConfig.initialQuery).toEqual(initialQuery);
    },
  );
};

describe("List Context Config", () => {
  testListConfigReducers();
  testListConfig();
  testListConfigSearch();
});
