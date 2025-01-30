import { isObject } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { useListContext } from "@/components/List/context";
import { useClassName, useMergedProps } from "@utils";

import type { ListFilterPresetProps } from "../ListFilterPreset";
import type {
  ListFilterPresetCollectionDefaultProps,
  ListFilterPresetCollectionProps,
} from "./ListFilterPresetCollection.types";
import type { FilterSignature } from "@/components/List/modules";

const listFilterPresetCollectionDefaultProps: ListFilterPresetCollectionDefaultProps =
  {
    filterPresets: null,
    direction: "row",
    gap: "s-2",
    justify: "start",
    align: "center",
    wrap: true,
    reverse: false,
    fill: true,
    inline: false,
    role: "listbox",
    id: null,
    className: null,
    as: "div",
  };

export const useListFilterPresetCollection = (
  props: ListFilterPresetCollectionProps
) => {
  const { filterPresets } = useListContext();
  const mergedProps = useMergedProps(
    listFilterPresetCollectionDefaultProps,
    props
  );

  const filterPresetSignatures = useMemo<FilterSignature[]>(() => {
    if (!mergedProps.filterPresets)
      return filterPresets.map(({ signature }) => signature);
    return mergedProps.filterPresets.map((filterPresetOrSignature) => {
      if (
        isObject(filterPresetOrSignature) &&
        "signature" in filterPresetOrSignature
      )
        return filterPresetOrSignature.signature;
      return filterPresetOrSignature;
    });
  }, [mergedProps.filterPresets, filterPresets]);

  const listFilterPresets = useMemo<
    (ListFilterPresetProps & { key: string })[]
  >(() => {
    return filterPresetSignatures.map((signature, index) => {
      const key = [signature, index].join("-");
      return {
        signature,
        key,
      };
    });
  }, [filterPresetSignatures]);

  const hasFilterPresets = useMemo(
    () => !!listFilterPresets.length,
    [listFilterPresets]
  );

  const className = useClassName(mergedProps);

  return {
    filterPresetSignatures,
    hasFilterPresets,
    mergedProps,
    listFilterPresets,
    className,
  };
};
