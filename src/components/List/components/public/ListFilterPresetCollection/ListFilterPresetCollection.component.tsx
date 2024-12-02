import { useListFilterPresetCollection } from "./ListFilterPresetCollection.utils";
import { ListFilterPreset } from "../ListFilterPreset";

import { FlexLayout } from "@layouts";
import { useTestId } from "@utils";

import type { ListFilterPresetCollectionProps } from "./ListFilterPresetCollection.types";
import type { TestIdProps } from "@/types/test.types";

export const ListFilterPresetCollection = ({
  testId,
  overrideTestId,
  ...props
}: ListFilterPresetCollectionProps & TestIdProps) => {
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
