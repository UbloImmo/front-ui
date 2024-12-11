import type {
  FilterOptionData,
  FilterOptionDataOrSignature,
} from "../FilterOption";
import type {
  FilterBooleanOperator,
  FilterPresetVisualData,
  FilterSignature,
} from "../shared.types";
import type { ColorKey, PaletteColor } from "@/types/themes";
import type { MaybePromise } from "@types";
import type {
  AsyncFn,
  GenericFn,
  Nullable,
  VoidFn,
} from "@ubloimmo/front-util";

export type FilterPresetBehavior = {
  /**
   * Whether the filter preset is disabled
   *
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * Whether the filter preset is hidden
   *
   * @type {boolean}
   */
  hidden?: boolean;
  /**
   * The operator to use when combining the options
   *
   * @type {FilterBooleanOperator}
   * @default "AND"
   */
  operator?: FilterBooleanOperator;
  /**
   * Whether the filter preset is exclusive,
   * e.g. it unselects all other options when selected
   *
   * @type {boolean}
   * @default false
   */
  exclusive?: boolean;
};

type FilterPresetIdentifiers = {
  /**
   * A unique identifier for the filter preset
   * Used to identify the filter when mutating its options / selection
   *
   * @remarks defaults to the computed signature if missing
   *
   * @type {string}
   */
  id?: string;
  /**
   * An identifier to trigger the filter preset element during e2e tests
   *
   * @remarks defaults to `list-filter-preset-${id}` if missing
   *
   * @type {string}
   */
  testId?: string;
};

export type FilterPresetConfig = Omit<FilterPresetVisualData, "label"> &
  FilterPresetBehavior &
  FilterPresetIdentifiers;

export type FilterPresetData = Required<
  FilterPresetVisualData & FilterPresetBehavior & FilterPresetIdentifiers
> & {
  /**
   * The signatures of the options to include in the preset
   * Works across filters
   *
   * @type {FilterSignature[]}
   */
  optionSignatures: FilterSignature[];
  /**
   * The color key of the filter preset
   *
   * @type {ColorKey}
   */
  colorKey: ColorKey;
  /**
   * The signature of the filter preset
   *
   * @type {FilterSignature}
   */
  signature: FilterSignature;
  /**
   * The palette color of the filter preset
   *
   * @type {PaletteColor}
   */
  paletteColor: PaletteColor;
  /**
   * Whether the filter preset is loading (e.g. fetching its count)
   *
   * @type {boolean}
   */
  loading: boolean;
};

export type FilterPreset<TItem extends object> = FilterPresetData & {
  /**
   * The options of the filter preset, derived from the option signatures
   *
   * @type {FilterOptionData<TItem>[]}
   * @default []
   */
  options: FilterOptionData<TItem>[];
  /**
   * Whether the filter preset is active
   * (e.g. has at least one or all selected options depending on the operator)
   *
   * @type {boolean}
   */
  active: boolean;

  /**
   * The number of items that match the filter preset
   *
   * @type {number}
   */
  count: number;
  /**
   * Selects all options of the filter preset
   *
   * @type {VoidFn}
   */
  select: VoidFn;
  /**
   * Unselects all options of the filter preset
   *
   * @type {VoidFn}
   */
  unselect: VoidFn;
  /**
   * Toggles the filter preset between active and inactive
   *
   * @type {VoidFn}
   */
  toggle: VoidFn;
};

export type ListConfigFilterPresetFnParams<TItem extends object> = [
  label: string,
  optionsOrSignatures: (FilterOptionData<TItem> | FilterSignature)[],
  config?: FilterPresetConfig,
  loading?: boolean
];

export type ListConfigFilterPresetFn<TItem extends object> = GenericFn<
  ListConfigFilterPresetFnParams<TItem>,
  FilterPresetData
>;

export type ListConfigAsyncFilterPresetFnParams<TItem extends object> = [
  label: string,
  optionsOrSignaturesPromise: MaybePromise<
    MaybePromise<FilterOptionDataOrSignature<TItem>>[]
  >,
  config?: FilterPresetConfig
];

export type ListConfigAsyncFilterPresetFn<TItem extends object> = AsyncFn<
  ListConfigAsyncFilterPresetFnParams<TItem>,
  Nullable<FilterPresetData>
>;

export type FilterPresetMap = Map<FilterSignature, FilterPresetData>;
