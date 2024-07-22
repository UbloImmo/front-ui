import { NullishPrimitives } from "@ubloimmo/front-util";

import { SelectInputOption } from "./SelectInputOption.component";
import { SelectOptionGroup } from "../SelectInput.types";

import { Text } from "@/components/Text";
import { TestIdProps } from "@types";

const SelectInputGroupOption = <TValue extends NullishPrimitives>(
  props: SelectOptionGroup<TValue> & TestIdProps
) => {
  return (
    <>
      <Text color="gray-800" weight="medium" size="m" uppercase>
        {props.label}
      </Text>
      {props.options.map((option, index) => (
        <SelectInputOption
          key={`${option.label}-${index}`}
          label={option.label}
          value={option.value}
          disabled={option.disabled}
        />
      ))}
    </>
  );
};

export { SelectInputGroupOption };
