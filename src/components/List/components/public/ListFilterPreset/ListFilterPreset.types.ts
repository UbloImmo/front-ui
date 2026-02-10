import type { FilterPreset, FilterSignature } from "@/components/List/modules";
import type { Nullable, RequireAtLeastOne, VoidFn } from "@ubloimmo/front-util";

export type ListFilterPresetProps<TItem extends object = object> =
  RequireAtLeastOne<{
    /**
     * The filter preset to apply
     */
    filterPreset: FilterPreset<TItem>;
    /**
     * The signature of the filter preset, used to identify the filter preset in the list
     */
    signature: FilterSignature;
  }> & {
    /**
     * The callback function to be called when the filter preset is selected
     *
     * @type {Nullable<VoidFn>}
     *
     * @default null
     */
    onSelected?: Nullable<VoidFn>;
    /**
     * The callback function to be called when the filter preset is unselected
     *
     * @type {Nullable<VoidFn>}
     *
     * @default null
     */
    onUnselected?: Nullable<VoidFn>;
    /**
     * The callback function to be called when the filter preset is toggled
     *
     * @type {Nullable<VoidFn>}
     *
     * @default null
     */
    onToggled?: Nullable<VoidFn>;
  };

export type ListFilterPresetStyleProps = Pick<
  FilterPreset<object>,
  "disabled" | "active" | "colorKey"
>;
