import { Text } from "@/components/Text";
import { GridItem } from "@layouts";

import type { BuiltFormTextProps } from "../Form.types";

export const FormText = (props: BuiltFormTextProps) => {
  const { kind: _, children, ...textProps } = props;

  return (
    <GridItem columnStart={1} columnEnd={-1} fill>
      <Text {...textProps} testId="form-text" overrideTestId>
        {children}
      </Text>
    </GridItem>
  );
};
