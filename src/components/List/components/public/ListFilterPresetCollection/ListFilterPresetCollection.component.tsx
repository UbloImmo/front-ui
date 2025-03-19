import { useListFilterPresetCollection } from "./ListFilterPresetCollection.utils";
import { ListFilterPreset } from "../ListFilterPreset";

import { FlexLayout } from "@/layouts/Flex";
import { useTestId } from "@utils";

import type { ListFilterPresetCollectionProps } from "./ListFilterPresetCollection.types";
import type { TestIdProps } from "@/types/test.types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * A component that displays a collection of filter presets.
 *
 * @version 0.0.1
 *
 * @param {ListFilterPresetCollectionProps & TestIdProps} props
 * @returns {Nullable<JSX.Element>}
 */
export const ListFilterPresetCollection = ({
  testId,
  overrideTestId,
  ...props
}: ListFilterPresetCollectionProps & TestIdProps): Nullable<JSX.Element> => {
  const elementTestId = useTestId("list-filter-preset-collection", {
    testId,
    overrideTestId,
  });

  const { listFilterPresets, hasFilterPresets, mergedProps } =
    useListFilterPresetCollection(props);

  if (!hasFilterPresets) return null;

  return (
    <FlexLayout {...mergedProps} testId={elementTestId} overrideTestId>
      {listFilterPresets.map(({ key, ...filterPresetProps }) => (
        <ListFilterPreset key={key} {...filterPresetProps} />
      ))}
    </FlexLayout>
  );
};
