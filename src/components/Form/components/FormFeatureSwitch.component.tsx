import { useMemo } from "react";

import { FormFieldGridItem } from "./FormFieldGridItem.component";
import { useFormContext } from "../Form.context";

import { FeatureSwitch } from "@/components/FeatureSwitch";

import type { BuiltFormFeatureSwitchProps } from "../Form.types";

export const FormFeatureSwitch = (props: BuiltFormFeatureSwitchProps) => {
  const { layout, disabled: baseDisabled, ...rest } = props;
  const { isEditing } = useFormContext<object>();
  const disabled = useMemo(
    () => baseDisabled || !isEditing,
    [baseDisabled, isEditing]
  );

  if (layout.hidden) return null;

  return (
    <FormFieldGridItem
      columnEnd={layout.columnEnd}
      align="start"
      testId="form-field-container"
      overrideTestId
      fill
    >
      <FeatureSwitch {...rest} disabled={disabled} />
    </FormFieldGridItem>
  );
};
