import { isArray, isBoolean, objectValues } from "@ubloimmo/front-util";

import { computeFilterOptionSignature } from "./FilterOption.utils";
import { BooleanOperators } from "../../List.enums";

import {
  mergeDefaultProps,
  normalizeToColorKey,
  normalizeToPaletteColor,
} from "@utils";

import type {
  FilterOptionBehavior,
  FilterOptionData,
  FilterOptionMatch,
  ListConfigOptionFnParams,
} from "./FilterOption.types";
import type { FilterOptionVisualData } from "../shared.types";

const defaultFilterOptionBehavior: Required<FilterOptionBehavior> = {
  default: false,
  initial: false,
  disabled: false,
  fixed: false,
  hidden: false,
};

const defaultFilterOptionVisualData: Required<FilterOptionVisualData> = {
  label: "[MISSING OPTION LABEL]",
  icon: null,
  color: "gray-600",
};

export const filterOptionData = <TItem extends object>(
  ...[label, matchOrMatches, config = {}]: ListConfigOptionFnParams<TItem>
): FilterOptionData<TItem> => {
  const matches: FilterOptionMatch<TItem>[] = isArray(matchOrMatches)
    ? matchOrMatches
    : [matchOrMatches];
  const operator = config?.operator ?? BooleanOperators.AND;
  const signature = computeFilterOptionSignature({
    label,
    matches,
    operator,
  });

  const visualData = mergeDefaultProps<
    Required<FilterOptionVisualData>,
    FilterOptionVisualData
  >(defaultFilterOptionVisualData, { label, ...config }, true);

  const behavior = mergeDefaultProps<
    Required<FilterOptionBehavior>,
    FilterOptionBehavior
  >(defaultFilterOptionBehavior, config, true);

  const { disabled, ...restBehavior } = behavior;
  const selected =
    !disabled &&
    objectValues(restBehavior)
      .filter(isBoolean)
      .some((bool) => bool);

  const paletteColor = normalizeToPaletteColor(visualData.color);
  const colorKey = normalizeToColorKey(visualData.color);

  return {
    // visual data
    ...visualData,
    paletteColor,
    colorKey,
    // logic data
    matches,
    operator,
    signature,
    // behavior data
    ...behavior,
    selected,
  };
};
