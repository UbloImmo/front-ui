import { FormFieldGridItem } from "./FormFieldGridItem.component";

import { Text } from "@/components/Text";

import type { BuiltFormTextProps } from "../Form.types";
import type { ReactNode } from "react";

/**
 * A form field that renders a {@link Text} component.
 *
 * This component is used by the Form component to render text fields.
 *
 * @version 0.1.0
 *
 * @param {BuiltFormTextProps} props - The component props.
 * @returns {ReactNode} The rendered component.
 */
export const FormText = (props: BuiltFormTextProps): ReactNode => {
  const { kind: _, children, ...textProps } = props;

  return (
    <FormFieldGridItem columnStart={1} columnEnd={-1} fill="force">
      <Text {...textProps} testId="form-text" overrideTestId>
        {children}
      </Text>
    </FormFieldGridItem>
  );
};
