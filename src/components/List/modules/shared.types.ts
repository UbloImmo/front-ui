import type { IconName } from "@/components/Icon/Icon.types";
import type { ColorKey } from "@/types/themes";
import type { PaletteColor } from "@types";
import type { DeepKeyOf, Nullable } from "@ubloimmo/front-util";

/**
 * The signature of a filter or a filter option
 * Used to identify a filter or filter option when comparing them
 *
 * @type {string}
 */
export type FilterSignature = string;

/**
 * The property to filter on
 *
 * @type {string}
 */
export type FilterProperty<TItem extends object> = DeepKeyOf<TItem>;

/**
 * The color of the filter option
 * Either a palette color or a color key
 *
 * @remarks ColorKeys get translated to palette colors at build time
 *
 * @type {PaletteColor | ColorKey}
 */
export type FilterOptionColor = PaletteColor | ColorKey;

export type FilterComparisonOperatorName =
  | "eq"
  | "neq"
  | "lt"
  | "lte"
  | "gt"
  | "gte";

/**
 * The comparison operator, used to match the value against the property
 *
 * @type {"=" | ">" | "<" | ">=" | "<="}
 * @default "="
 */
export type FilterComparisonOperator = "!=" | "=" | ">" | "<" | ">=" | "<=";

/**
 * The boolean operator, used to combine filters
 *
 * @type {"AND" | "OR"}
 * @default "AND"
 */
export type FilterBooleanOperator = "AND" | "OR";

export type FilterVisualData = {
  /**
   * The option's or filter's label
   *
   * @type {string}
   */
  label: string;
};

export type FilterPresetVisualData = FilterVisualData & {
  /**
   * The color of the filter preset or filter option option
   * Either a palette color or a color key
   *
   * @remarks ColorKeys get translated to palette colors at build time
   *
   * @type {PaletteColor | ColorKey}
   * @default "gray" for filter options, "primary" for filter presets
   */
  color?: PaletteColor | ColorKey;
};

/**
 * Visual options of a filter option
 */
export type FilterOptionVisualData = FilterPresetVisualData & {
  /**
   * The icon of the filter or filter option
   *
   * @type {Nullable<IconName>}
   * @default null
   */
  icon?: Nullable<IconName>;
};

/**
 * Visual data that gets displated when there are no options selected
 */
export type FilterEmptyVisualData = Partial<Omit<FilterVisualData, "color">>;
