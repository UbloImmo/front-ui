import { Text } from "@/components/Text";

import type { BuiltFormTextProps } from "../Form.types";
import { FormFieldGridItem } from "./FormFieldGridItem.component";

export const FormText = (props: BuiltFormTextProps) => {
  const { kind: _, children, ...textProps } = props;

  return (
    <FormFieldGridItem columnStart={1} columnEnd={-1} fill>
      <Text {...textProps} testId="form-text" overrideTestId>
        {children}
      </Text>
    </FormFieldGridItem>
  );
};
