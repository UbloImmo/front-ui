import { NullishPrimitives } from "@ubloimmo/front-util";

import { SelectOptionGroup } from "../SelectInput.types";

import { Text } from "@/components/Text";
import { TestIdProps } from "@types";

const SelectInputGroupOption = <TValue extends NullishPrimitives>(
  props: SelectOptionGroup<TValue> & TestIdProps
) => {
  return <Text uppercase>Label</Text>;
};

export { SelectInputGroupOption };
