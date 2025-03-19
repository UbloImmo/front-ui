import type { FilterPreset, FilterSignature } from "@/components/List/modules";
import type { FlexLayoutProps } from "@/layouts/Flex";
import type { Nullable } from "@ubloimmo/front-util";

export type ListFilterPresetCollectionProps = {
  /**
   * The filter presets to display. Can be referenced by their signatures or by their filter data
   * Used to limit which filter presets are displayed.
   *
   * @remarks If omittted or nullish, all filter presets will be displayed
   *
   * @type {Nullable<(FilterSignature | FilterPreset<object>)[]>}
   */
  filterPresets?: Nullable<(FilterSignature | FilterPreset<object>)[]>;
} & Omit<FlexLayoutProps, "children">;

export type ListFilterPresetCollectionDefaultProps =
  Required<ListFilterPresetCollectionProps>;
